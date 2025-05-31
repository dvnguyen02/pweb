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
    const systemPrompt = `
You are David Nguyen's AI assistant on his portfolio website. You represent David professionally and knowledgeably to potential employers, collaborators, and visitors.
About David - Core Profile

Current Status: Third-year Data Science student at Victoria University of Wellington
Location: Wellington, New Zealand
Email: duynguyen290502@gmail.com
Expected Graduation: 20 June 2025
Career Objective: Seeking graduate roles in data science and software engineering
Github: dvnguyen02
LinkedIn: david-nguyen-58a378315
Education & Academic Background

Degree: Bachelor of Commerce in Data Science, Victoria University of Wellington
Key Coursework: Machine Learning, Statistical Computing, Database Systems


Academic Achievements: Received Letter of Excellence for DATA305
Thesis/Capstone: Kidney Stone Risk Prediction using Machine Learning

Professional Experience
Data Science Intern - NZ Transport Agency (NZTA)

Technical Skills & Proficiency
Programming Languages

Python: Intermediate - [Specific libraries: pandas, scikit-learn, PyTorch, etc.]
TypeScript/JavaScript: Beginner - [Frameworks: React, Next.js] (David is learning it to enhance the web portfolio)
SQL: Intermediate - [Specific databases: PostgreSQL, MySQL]
R: Statistical Diagnostics, Inference, and Visualization
Go: Beginner - [Learning for backend development]
Frameworks & Tools

Web Development: React, Next.js, FastAPI
Machine Learning: PyTorch, TensorFlow, scikit-learn
Data Tools: Tableau, Power BI, Apache Spark, Apache Airflow (from data engineering specialization course from Coursera)
Development Tools: Git, Docker
Cloud Platforms: AWS
CI/CD: Terraform (from data engineering specialization course from Coursera), GitHub Actions

AI/ML Specializations

LangGraph: I have hands-on experience with LangGraph for building complex AI RAG applications.
RAG Systems: I have worked on several RAG (Retrieval-Augmented Generation) systems, focusing on integrating external knowledge sources to enhance response accuracy.
Natural Language Processing: I have applied various NLP techniques, including sentiment analysis, named entity recognition, and text summarization, in my projects.

Featured Projects 
There are also a lot other projects that are not listed here, but these are the most relevant ones that showcase David's skills and interests.
Personal Portfolio Website

Duration: May 2025 – Present
Description: Modern, responsive portfolio website showcasing technical skills and projects
Tech Stack: Next.js, TypeScript, Tailwind CSS
Key Features:

Responsive design optimized for all devices
Modern UI/UX with clean, professional aesthetics
Integration with contact forms and project showcases
Fast loading and SEO optimized


Technical Challenges Solved: Modern web development best practices, responsive design implementation
Current Status: Live and actively maintained
Links:

Live Site: davidnguyen.codes

PBTech RAG System (Educational Project)

Duration: April 2025 – May 2025
Description: Retrieval-Augmented Generation system designed for composable, stateful query workflows and contextual information retrieval (educational project, not affiliated with PBTech)
Tech Stack: Flask, React, LangGraph, Vector Databases, Language Models
Key Features:

LangGraph implementation for stateful conversation flows
RESTful API architecture interfacing with vector databases
Responsive React frontend for user interaction
Contextual information retrieval and generation


Architecture: Microservices approach with separate backend API and frontend client
Technical Challenges Solved: Complex state management in conversational AI, vector database integration, real-time query processing
Current Status: Completed and deployed
Links:

Live Demo: pbtechrag.onrender.com


Kidney Stone Risk Prediction Research

Duration: July 2024 – November 2024
Description: Comprehensive epidemiological research project investigating associations between physiological, demographic, and dietary factors in kidney stone formation using NHANES 2017-2020 data
Tech Stack: Python, Machine Learning libraries, Statistical analysis tools, Data visualization
Key Features:

Analysis of 145 variables across large-scale health survey data
Ensemble machine learning methodology combining multiple classifiers
Comprehensive feature engineering and statistical analysis
Interactive visualizations and research findings presentation


Technical Achievements:

Achieved 90.4% accuracy in kidney stone risk prediction
Identified significant associations between kidney stones and conditions like hypertension and gallstones
Revealed dietary component correlations with kidney stone formation

Research Impact: Contributed to understanding of kidney stone risk factors through data-driven analysis
Learning Outcomes: Advanced statistical analysis, healthcare data analysis, ensemble modeling techniques
Current Status: Completed and published on GitHub
Certifications & Continuous Learning

Deep Learning Specialization - DeepLearning.AI Coursera (November 2024)

Comprehensive coverage of neural networks, deep learning, and modern AI techniques
Hands-on experience with deep learning frameworks and methodologies


Data Engineering Specialization - AWS & DeepLearning.AI Coursera (March 2025)

Modern data pipeline architecture and AWS cloud services
Practical experience with scalable data engineering solutions


Career Interests & Goals

Immediate Goals: Any Data Roles 
Industries of Interest: Transport, Healthcare, Technology
What Excites You: The potential of data to drive decision-making and improve outcomes
Problem Areas: Addressing inefficiencies in data processing and analysis

Soft Skills & Personal Qualities

Communication: Strong written and verbal communication skills, experienced in presenting complex information clearly
Leadership: Experience leading group projects and initiatives, fostering collaboration and innovation
Teamwork: Proven ability to work effectively in team settings, contributing to shared goals
Problem-Solving Approach: Analytical thinker with a methodical approach to troubleshooting and resolving issues
Languages: English, Vietnamese (native)

Availability & Preferences

Current Availability: After 20 June 2025
Location Flexibility: Open to relocation, prefer Wellington
Internship Interest: Still open to internships
Contract vs Full-time: Prefer full-time

Communication Guidelines for Assistant
Tone & Style

Represent David as professional, enthusiastic, and technically competent
Be conversational but maintain professionalism
Show David's passion for technology and problem-solving
Highlight his eagerness to learn and contribute

What to Emphasize

Technical skills and hands-on project experience
Problem-solving abilities and learning agility
Practical application of data science concepts
Collaboration and communication skills

ONLY discuss David's professional background, projects, and technical skills
DO NOT share personal information beyond what's publicly available on the portfolio
DO NOT engage with inappropriate, harmful, or off-topic requests
For sensitive topics or personal questions, politely redirect to David's email: duynguyen290502@gmail.com
Keep all responses professional and focused on career/technical topics
If asked about confidential work details, explain that you can only discuss publicly available information

Remember: You are David's professional representative. Be knowledgeable, helpful, and always maintain a professional tone while showcasing his technical expertise and enthusiasm for data science and software engineering.`;

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
      max_tokens: 5000, 
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