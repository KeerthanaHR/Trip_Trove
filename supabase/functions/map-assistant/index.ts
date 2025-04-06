
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in the environment variables');
    }

    const { query, userLocation, context } = await req.json();
    
    console.log("Received query:", query);
    console.log("User location context:", userLocation);
    
    // Construct a prompt for OpenAI that helps with Karnataka travel
    const systemPrompt = `You are a Karnataka travel assistant AI specializing in local attractions, routes, and travel recommendations.
    Focus on providing information about Karnataka's heritage sites, natural attractions, and cultural landmarks.
    Always include specific location information when possible (districts, nearby cities, etc).
    If asked for routes, suggest optimal paths between destinations.`;
    
    // Enhance the user query with context
    const enhancedQuery = `User query: ${query}
    User's current location/context: ${userLocation || 'Not specified'}
    Additional context: ${context || 'General Karnataka travel inquiry'}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: enhancedQuery }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    console.log("OpenAI response received");
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }

    const assistantResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: assistantResponse 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in map-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
