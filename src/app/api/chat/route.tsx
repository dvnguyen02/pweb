import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(key: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(key);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userLimit.count >= limit) {
    return false; // Rate limit exceeded
  }
  
  userLimit.count++;
  return true;
}

function sanitizeInput(input: string): string {
  // Remove potentially harmful content
  return input
    .trim()
    .slice(0, 1000) // Limit input length
    .replace(/[<>]/g, ''); // Remove basic HTML tags
}

function validateConversation(conversation: any[]): boolean {
  if (!Array.isArray(conversation)) return false;
  if (conversation.length > 20) return false; // Limit conversation history
  
  return conversation.every(msg => 
    msg && 
    typeof msg.role === 'string' && 
    typeof msg.content === 'string' &&
    ['user', 'assistant'].includes(msg.role) &&
    msg.content.length <= 1000
  );
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey, 10, 60000)) { // 10 requests per minute
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate request origin (optional - for extra security)
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://davidnguyen.codes',
      'https://www.davidnguyen.codes',
      'http://localhost:3000', // For development
    ];
    
    if (process.env.NODE_ENV === 'production' && origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { message, conversation = [] } = body;

    // Input validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Valid message is required' },
        { status: 400 }
      );
    }

    if (!validateConversation(conversation)) {
      return NextResponse.json(
        { error: 'Invalid conversation format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedMessage = sanitizeInput(message);
    // Define message interface
    interface ChatMessage {
      role: string;
      content: string;
    }
    
    // Apply types to the conversation map
    const sanitizedConversation: ChatMessage[] = conversation.map((msg: ChatMessage) => ({
      role: msg.role,
      content: sanitizeInput(msg.content)
    }));

    // Create system prompt with context about David
    const systemPrompt = `You are David Nguyen's AI assistant on his portfolio website. 

About David:
- Third-year Data Science student at Victoria University of Wellington
- Previous Data Science Intern at NZ Transport Agency (NZTA)
- Passionate about machine learning, AI, and web development
- Currently working on projects like Notetaker (real-time transcription app) and RAG systems
- Skills: Python, TypeScript, React, Next.js, FastAPI, PyTorch, LangGraph
- Located in Wellington, New Zealand
- Looking for graduate roles in data science/software engineering

IMPORTANT SAFETY RULES:
- Only answer questions about David's professional background, projects, and skills
- Do not provide personal information beyond what's publicly available on the portfolio
- Do not engage with inappropriate, harmful, or off-topic requests
- If asked about sensitive topics, politely redirect to David's professional qualifications
- Keep responses professional and focused on career/technical topics

Be helpful, professional, and knowledgeable about David's background.`;

    // Prepare messages for OpenAI with content filtering
    const messages = [
      { role: 'system', content: systemPrompt },
      ...sanitizedConversation.slice(-10), // Only keep last 10 messages for context
      { role: 'user', content: sanitizedMessage }
    ];

    // Create streaming response with additional safety
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      stream: true,
      max_tokens: 500, // Reduced to prevent very long responses
      temperature: 0.3, // Lower temperature for more focused responses
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    // Create readable stream for client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              // Basic content filtering (you can enhance this)
              const filteredContent = content.replace(/[<>]/g, '');
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: filteredContent })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? 'https://davidnguyen.codes' : '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Don't expose internal error details
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? 'https://davidnguyen.codes' : '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}