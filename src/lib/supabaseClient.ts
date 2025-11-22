// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Load your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local and Vercel → Environment Variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
