import fs from 'fs';
import path from 'path';
import os from 'os';

const TMP_DIR = process.env.TMPDIR || process.env.TEMP || process.env.TMP || os.tmpdir() || './';
const FILE_PATH = path.join(TMP_DIR, 'nfcs_leads.json');

function ensureDir() {
  try {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
  } catch (e) {}
}

// In-memory cache initialization
if (!global._nfcs_leads_cache) {
  global._nfcs_leads_cache = [];
  try {
    ensureDir();
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, 'utf8');
      global._nfcs_leads_cache = JSON.parse(data) || [];
    }
  } catch (err) {}
}

function getKvCredentials() {
  const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.KV_URL || '').trim().replace(/^["']|["']$/g, '');
  const token = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_TOKEN || '').trim().replace(/^["']|["']$/g, '');
  return { url, token };
}

async function kvFetch(command, ...args) {
  const { url, token } = getKvCredentials();
  if (!url || !token) return null;

  try {
    const cleanUrl = url.replace(/\/$/, '');
    const res = await fetch(cleanUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([command.toUpperCase(), ...args])
    });

    if (res.ok) {
      const json = await res.json();
      return json.result !== undefined ? json.result : null;
    } else {
      const errText = await res.text();
      console.warn(`KV Fetch Error [${command}] (${res.status}):`, errText);
    }
  } catch (err) {
    console.warn(`Vercel KV fetch exception [${command}]:`, err.message);
  }
  return null;
}

export async function getLeads() {
  const { url: kvUrl, token: kvToken } = getKvCredentials();

  // 1. Try Vercel KV / Upstash Redis first
  if (kvUrl && kvToken) {
    try {
      const kvData = await kvFetch('get', 'nfcs_training_leads');
      if (kvData !== null && kvData !== undefined) {
        const parsed = typeof kvData === 'string' ? JSON.parse(kvData) : kvData;
        if (Array.isArray(parsed)) {
          global._nfcs_leads_cache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading leads from KV:', e.message);
    }
  }

  // 2. Fallback to local file / memory cache
  try {
    ensureDir();
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, 'utf8');
      const loaded = JSON.parse(data);
      if (Array.isArray(loaded)) {
        global._nfcs_leads_cache = loaded;
      }
    }
  } catch (err) {}

  return global._nfcs_leads_cache || [];
}

export async function saveLead(lead) {
  if (!lead || (!lead.email && !lead.phone)) return await getLeads();

  const leads = await getLeads();
  const existingIdx = leads.findIndex(l => 
    (l.email && lead.email && l.email.toLowerCase() === lead.email.toLowerCase()) ||
    (l.phone && lead.phone && l.phone === lead.phone)
  );

  const updatedLead = {
    ...lead,
    email: lead.email ? lead.email.toLowerCase().trim() : '',
    submittedAt: lead.submittedAt || new Date().toISOString()
  };

  if (existingIdx >= 0) {
    leads[existingIdx] = { ...leads[existingIdx], ...updatedLead, updatedAt: new Date().toISOString() };
  } else {
    leads.push(updatedLead);
  }

  global._nfcs_leads_cache = leads;

  const { url: kvUrl, token: kvToken } = getKvCredentials();

  // 1. Persist to Vercel KV if available
  if (kvUrl && kvToken) {
    try {
      await kvFetch('set', 'nfcs_training_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn('Error saving lead to KV:', e.message);
    }
  }

  // 2. Persist to local disk fallback
  try {
    ensureDir();
    fs.writeFileSync(FILE_PATH, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {}

  return leads;
}

export async function deleteLead(idKey) {
  if (!idKey) return await getLeads();
  let leads = await getLeads();
  const searchKey = String(idKey).toLowerCase().trim();

  leads = leads.filter(l => {
    if (!l) return false;
    const lEmail = (l.email || '').toLowerCase().trim();
    const lPhone = (l.phone || '').trim();
    const lTime = (l.submittedAt || '').toLowerCase().trim();
    return lEmail !== searchKey && lPhone !== searchKey && lTime !== searchKey;
  });

  global._nfcs_leads_cache = leads;

  const { url: kvUrl, token: kvToken } = getKvCredentials();
  if (kvUrl && kvToken) {
    try {
      await kvFetch('set', 'nfcs_training_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn('Error deleting lead in KV:', e.message);
    }
  }

  try {
    ensureDir();
    fs.writeFileSync(FILE_PATH, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {}

  return leads;
}

export async function getSlotCount() {
  const leads = await getLeads();
  return leads.length;
}
