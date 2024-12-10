import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://inamxixpmcsspjzvnajn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYW14aXhwbWNzc3BqenZuYWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Mzk2NDIsImV4cCI6MjA0OTQxNTY0Mn0.Rz3pzqbA5ZFGvgynzIpdCMzS9VtrkHFk9ZmlsyYulhU';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Participant {
  id: number;
  name: string;
  email: string | null;
  result: string;
  consulted: boolean;
}