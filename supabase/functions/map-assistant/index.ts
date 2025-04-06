
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.1";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { messages, user_id } = await req.json();
    
    // Log the incoming request for debugging
    console.log("Received request for map-assistant:", { user_id, messageCount: messages.length });

    // Check if OpenAI API key is set in environment
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a specialized travel assistant for Karnataka, India. You know all about tourist destinations, local customs, transportation, accommodations, food, and travel tips specifically for Karnataka. Provide helpful, accurate and specific advice to travelers. Limit your responses to Karnataka-related travel information. Provide rich, detailed responses, but keep them concise under 1500 characters.'
          },
          ...messages.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const openAIData = await openAIResponse.json();
    
    console.log("Received response from OpenAI");

    if (!openAIResponse.ok) {
      console.error("OpenAI API error:", openAIData);
      throw new Error('Failed to get response from AI service');
    }

    const aiMessage = openAIData.choices[0].message.content;

    // Log and store the conversation in the database if needed
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://crwbnkeadskmggpvkgin.supabase.co';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyd2Jua2VhZHNrbWdncHZrZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTUyMzYsImV4cCI6MjA1OTQzMTIzNn0.n1qtQC5U6Ph-W6QOm8ognWVUIaLJPpIlr8J7ju5DKFQ';
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    return new Response(JSON.stringify({ 
      message: aiMessage
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Error in map-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
