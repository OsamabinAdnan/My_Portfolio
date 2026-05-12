'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { aiAgents } from '@/lib/data/agents';
import { AgentCard } from '@/components/ui/AgentCard';

export function AgenticAI() {
  return (
    <section id="ai-agents" className="py-24 px-6 bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="w-8 h-8 text-accent-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Agentic <span className="text-accent-400">AI</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
            Beyond traditional AI, I specialize in building autonomous AI agents that can perceive, reason, and act independently. Each agent is designed with specific goals, tools, and decision-making capabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {aiAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}