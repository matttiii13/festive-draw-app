// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://inamxixpmcsspjzvnajn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYW14aXhwbWNzc3BqenZuYWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Mzk2NDIsImV4cCI6MjA0OTQxNTY0Mn0.Rz3pzqbA5ZFGvgynzIpdCMzS9VtrkHFk9ZmlsyYulhU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);