import fs from 'fs';
import path from 'path';
import os from 'os';

const TMP_DIR = process.env.TMPDIR || process.env.TEMP || process.env.TMP || os.tmpdir() || './';
const FILE_PATH = path.join(TMP_DIR, 'nfcs_leads.json');

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

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

async function kvFetch(command, ...args) {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const url = `${KV_URL.replace(/\/$/, '')}/${command}/${args.map(a => encodeURIComponent(typeof a === 'object' ? JSON.stringify(a) : a)).join('/')}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`
      }
    });
    if (res.ok) {
      const json = await res.json();
      return json.result;
    }
  } catch (err) {
    console.warn('Vercel KV fetch exception:', err.message);
  }
  return null;
}

export async function getLeads() {
  // Try Vercel KV REST first if configured
  if (KV_URL && KV_TOKEN) {
    try {
      const kvData = await kvFetch('get', 'nfcs_training_leads');
      if (kvData) {
        const parsed = typeof kvData === 'string' ? JSON.parse(kvData) : kvData;
        if (Array.isArray(parsed)) {
          global._nfcs_leads_cache = parsed;
          return parsed;
        }
      }
    } catch (e) {}
  }

  // Fallback to local file / memory cache
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

  if (existingIdx >= 0) {
    leads[existingIdx] = { ...leads[existingIdx], ...lead, updatedAt: new Date().toISOString() };
  } else {
    leads.push({ ...lead, submittedAt: lead.submittedAt || new Date().toISOString() });
  }

  global._nfcs_leads_cache = leads;

  // Persist to Vercel KV if available
  if (KV_URL && KV_TOKEN) {
    try {
      await kvFetch('set', 'nfcs_training_leads', JSON.stringify(leads));
    } catch (e) {}
  }

  // Persist to local disk fallback
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
