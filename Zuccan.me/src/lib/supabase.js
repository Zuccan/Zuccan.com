import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  '';

// Validate whether real credentials are provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-supabase-anon-key')
);

// Fallback dummy client if credentials aren't yet plugged in
let clientInstance = null;

if (isSupabaseConfigured) {
  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    console.info('⚡ Zuccano: Connected to Supabase backend successfully.');
  } catch (error) {
    console.warn('⚠️ Zuccano: Error initializing Supabase client:', error.message);
  }
} else {
  console.info('ℹ️ Zuccano: Supabase environment keys pending in .env. Running in professional hybrid demo mode.');
}

export const supabase = clientInstance;

export const getSupabaseStatus = () => {
  return {
    isConfigured: isSupabaseConfigured,
    url: isSupabaseConfigured ? supabaseUrl : null,
  };
};

export default supabase;
