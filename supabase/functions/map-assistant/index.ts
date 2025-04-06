
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
      console.error("OpenAI API key is not configured");
      return new Response(JSON.stringify({ 
        message: "I'm sorry, but I'm currently unavailable. The travel assistant service is experiencing issues. Please try again later or contact support for assistance."
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    // Call OpenAI API
    try {
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
              content: 'You are a specialized travel assistant for Karnataka, India. You know all about tourist destinations across the ENTIRE state of Karnataka, including lesser-known places, hidden gems, and popular attractions across all regions (North Karnataka, South Karnataka, Coastal Karnataka, Western Ghats, Central Karnataka). Provide information on local customs, transportation, accommodations, food, festivals, and travel tips specifically for Karnataka. Provide helpful, accurate and specific advice to travelers. Limit your responses to Karnataka-related travel information. Provide rich, detailed responses, but keep them concise under 1500 characters.'
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

      console.log("Received response from OpenAI");

      if (!openAIResponse.ok) {
        const errorData = await openAIResponse.json();
        console.error("OpenAI API error:", errorData);
        
        return new Response(JSON.stringify({ 
          message: "I'm sorry, but I'm currently unavailable. The travel assistant service is experiencing issues with accessing the latest information. Please try again later." 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
      }

      const openAIData = await openAIResponse.json();
      const aiMessage = openAIData.choices[0].message.content;

      // Return successful response
      return new Response(JSON.stringify({ 
        message: aiMessage
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
      
    } catch (openAIError) {
      console.error('Error calling OpenAI:', openAIError);
      return new Response(JSON.stringify({ 
        message: "I'm sorry, but I'm currently unavailable. The travel assistant service is experiencing technical difficulties. Please try again later." 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }
  } catch (error) {
    console.error('Error in map-assistant function:', error);
    return new Response(JSON.stringify({ 
      message: "I'm sorry, but I'm currently unavailable. The travel assistant service encountered an error. Please try again later."
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }
});
