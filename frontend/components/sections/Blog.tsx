'use client';

import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog';

export function Blog() {
  return (
    <section id="blog" className="py-24 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Insights & <span className="text-primary-600 dark:text-primary-400">Thoughts</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Sharing knowledge about Agentic AI, FullStack development, and the future of technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-md"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <PenLine className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              {!post.isPublished && (
                <span className="inline-block mt-4 px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-500">
                  Coming Soon
                </span>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}