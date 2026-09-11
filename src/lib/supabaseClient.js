// Public (anon) Supabase client — used ONLY for reading the live
// "tickets sold so far" counter on the purchase page.
// RLS blocks this key from reading/writing any actual buyer data.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
