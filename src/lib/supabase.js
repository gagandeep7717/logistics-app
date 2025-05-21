import { createClient } from '@supabase/supabase-js';
import { ERROR_MESSAGES } from './constants';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(ERROR_MESSAGES.MISSING_SUPABASE_CONFIG);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 