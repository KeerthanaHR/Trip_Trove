// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://crwbnkeadskmggpvkgin.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyd2Jua2VhZHNrbWdncHZrZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTUyMzYsImV4cCI6MjA1OTQzMTIzNn0.n1qtQC5U6Ph-W6QOm8ognWVUIaLJPpIlr8J7ju5DKFQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);