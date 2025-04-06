
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { Application, Router } from 'https://deno.land/x/oak@v12.6.1/mod.ts'
import { corsHeaders } from '../_shared/cors.ts'

// OpenAI API configuration
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || ''
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Create Oak router
const router = new Router()

router.post('/', async (ctx) => {
  try {
    // Handle CORS
    if (ctx.request.method === 'OPTIONS') {
      ctx.response.headers.set('Access-Control-Allow-Origin', '*')
      ctx.response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
      ctx.response.headers.set('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type')
      ctx.response.status = 204
      return
    }

    // Set CORS headers for the actual response
    for (const [key, value] of Object.entries(corsHeaders)) {
      ctx.response.headers.set(key, value)
    }

    // Parse request body
    const body = await ctx.request.body.json()
    const { messages = [], user_id = 'anonymous' } = body

    if (!messages || messages.length === 0) {
      ctx.response.status = 400
      ctx.response.body = { error: 'Messages are required' }
      return
    }

    // Log the request for debugging
    console.log(`Received request from user ${user_id}`)

    // Check if we have the OpenAI API key
    if (!OPENAI_API_KEY) {
      ctx.response.status = 500
      ctx.response.body = { error: 'OpenAI API key not configured' }
      return
    }

    // Prepare the context for the AI
    const karnatakaTravelContext = `
You are a specialized AI assistant for Karnataka tourism in India.
You provide helpful information about:
- Tourist attractions in Karnataka (Hampi, Mysore Palace, Coorg, etc.)
- Local culture, festivals, and cuisine
- Travel tips, best times to visit, and transportation options
- Historical and cultural significance of places
- Itinerary recommendations based on duration and interests
- Safety advice and travel precautions

Always be informative, helpful, and enthusiastic about Karnataka's beauty and cultural heritage.
If you don't know something specific, acknowledge it but provide general related information that might be helpful.
Keep responses concise, informative and practical for travelers.
`

    // Format messages for OpenAI
    const formattedMessages = [
      { role: 'system', content: karnatakaTravelContext },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ]

    // Call OpenAI API
    const openAIResponse = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await openAIResponse.json()

    if (!openAIResponse.ok) {
      console.error('OpenAI API error:', data)
      ctx.response.status = openAIResponse.status
      ctx.response.body = { error: 'Error getting response from AI service', details: data }
      return
    }

    // Extract the assistant's message
    const assistantMessage = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response'

    // Log the AI conversation
    try {
      await supabase
        .from('ai_chat_logs')
        .insert([
          { 
            user_id, 
            user_message: messages[messages.length - 1]?.content || '', 
            assistant_response: assistantMessage 
          }
        ])
      
      console.log('Logged conversation successfully')
    } catch (error) {
      console.error('Error logging conversation:', error)
      // Continue even if logging fails
    }

    // Return the response
    ctx.response.body = { message: assistantMessage }
  } catch (error) {
    console.error('Unexpected error:', error)
    ctx.response.status = 500
    ctx.response.body = { error: 'Internal server error' }
  }
})

// Create Oak application
const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

// Start the server
console.log('Map assistant function is running on port 8000')
await app.listen({ port: 8000 })
