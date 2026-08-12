import fs from 'fs';
import path from 'path';

const TMP_DIR = process.env.TMPDIR || '/tmp';
const FILE_PATH = path.join(TMP_DIR, 'nfcs_leads.json');

// Initialize in-memory cache if not already set
if (!global._nfcs_leads_cache) {
  global._nfcs_leads_cache = [];
  try {
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, 'utf8');
      global._nfcs_leads_cache = JSON.parse(data) || [];
    }
  } catch (err) {
    console.warn('Failed to load leads from file store:', err);
  }
}

export function getLeads() {
  try {
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, 'utf8');
      const loaded = JSON.parse(data);
      if (Array.isArray(loaded)) {
        global._nfcs_leads_cache = loaded;
      }
    }
  } catch (err) {
    // Ignore read errors and fall back to memory cache
  }
  return global._nfcs_leads_cache || [];
}

export function saveLead(lead) {
  if (!lead || (!lead.email && !lead.phone)) return getLeads();

  const leads = getLeads();
  // Check for duplicate by email or phone
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

  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.warn('Failed to write leads file store:', err);
  }

  return leads;
}

export function getSlotCount() {
  const leads = getLeads();
  return leads.length;
}
