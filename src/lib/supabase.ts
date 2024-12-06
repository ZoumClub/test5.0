import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tklblvxgprkvletfrsnn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbGJsdnhncHJrdmxldGZyc25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxODUwMTMsImV4cCI6MjA0ODc2MTAxM30.8WhBp_PZbLxXXJp8ECO2ezjG3dWc5J8k59bCKvkeOOA';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Profile = {
  id: string;
  username: string;
  role: 'admin' | 'user';
  created_at: string;
};

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  savings: number;
  created_at: string;
  updated_at: string;
};