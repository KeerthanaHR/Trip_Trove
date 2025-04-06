
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the user
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://crwbnkeadskmggpvkgin.supabase.co';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyd2Jua2VhZHNrbWdncHZrZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTUyMzYsImV4cCI6MjA1OTQzMTIzNn0.n1qtQC5U6Ph-W6QOm8ognWVUIaLJPpIlr8J7ju5DKFQ';
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    // Extract the JWT token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the JWT and get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    // Get the trip data from the request
    const { tripName, destinations, budget, startDate, endDate, notes } = await req.json();
    
    console.log("Saving trip for user:", user.id);
    console.log("Trip details:", { tripName, destinations, budget });

    // Insert the trip data into the database
    const { data, error } = await supabase
      .from('trips')
      .insert({
        user_id: user.id,
        trip_name: tripName,
        destinations: destinations,
        budget: budget,
        start_date: startDate,
        end_date: endDate,
        notes: notes
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Trip saved successfully',
      trip: data
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in save-trip function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
