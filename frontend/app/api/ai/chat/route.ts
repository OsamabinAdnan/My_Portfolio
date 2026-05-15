import { NextRequest, NextResponse } from 'next/server';
import { profile } from '@/lib/data/profile';
import { projects } from '@/lib/data/projects';
import { techStack } from '@/lib/data/techStack';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build context about the developer
    const context = `
You are an AI assistant representing ${profile.name}, a ${profile.title}.
${profile.subtitle}

About ${profile.name}:
${profile.about}

${profile.name}'s Stats:
${profile.stats.map(s => `- ${s.value} ${s.label}`).join('\n')}

Tech Stack:
Frontend: ${techStack.filter(t => t.category === 'frontend').map(t => t.name).join(', ')}
Backend: ${techStack.filter(t => t.category === 'backend').map(t => t.name).join(', ')}
DevOps: ${techStack.filter(t => t.category === 'devops').map(t => t.name).join(', ')}
Digital Marketing: ${techStack.filter(t => t.category === 'digital-marketing').map(t => t.name).join(', ')}
AI: ${techStack.filter(t => t.category === 'ai').map(t => t.name).join(', ')}
Others: ${techStack.filter(t => t.category === 'others').map(t => t.name).join(', ')}

Projects:
${projects.map(p => `- ${p.title}: ${p.description} (Tech: ${p.techStack.join(', ')})`).join('\n')}

Respond as if you are ${profile.name} talking about yourself. Be friendly, concise, and professional.
Keep responses short (2-3 sentences max) unless asked for more detail.
    `.trim();

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey.startsWith('sk-')) {
      // Use actual OpenAI API
      const openai = await import('openai');
      const client = new openai.default({ apiKey });

      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: context },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
      });

      return NextResponse.json({
        response: response.choices[0]?.message?.content || 'I apologize, but I could not generate a response.',
      });
    }

    // Fallback: Simple keyword-based response (no API key)
    const lowerMessage = message.toLowerCase();

    let response = '';

    if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('technology')) {
      response = `I work with modern technologies including ${techStack.slice(0, 6).map(t => t.name).join(', ')} and more. My expertise spans Frontend, Backend, DevOps, and Digital Marketing.`;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      const projectNames = projects.map(p => p.title).slice(0, 3).join(', ');
      response = `I've built ${projects.length} projects including ${projectNames}. Each project showcases different aspects of my FullStack and AI capabilities. Would you like to know more about any specific project?`;
    } else if (lowerMessage.includes('ai') || lowerMessage.includes('agent') || lowerMessage.includes('agentic')) {
      response = `As an Agentic AI Developer, I can build autonomous AI agents using OpenAI Agents SDK and modern tool-using agent workflows. I've deployed ${profile.stats[3].value} AI agents to production!`;
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('year') || lowerMessage.includes('background')) {
      response = `I have ${profile.stats[0].value} years of experience in FullStack development, complemented by specialized expertise in Agentic AI. I've delivered ${profile.stats[1].value} projects throughout my career.`;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      response = `You can reach me at ${profile.socials[0].url.replace('mailto:', '')} or connect with me on LinkedIn. I'm always excited to discuss new opportunities!`;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = `Hello! I'm ${profile.name}. Feel free to ask me anything about my skills, projects, or experience. How can I help you today?`;
    } else {
      response = `I'm ${profile.name}, a FullStack Developer & Agentic AI Developer with ${profile.stats[0].value}+ years of experience. I specialize in building modern web applications and autonomous AI agents. What would you like to know?`;
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
