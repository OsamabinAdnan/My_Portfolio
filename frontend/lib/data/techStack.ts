import data from './data.json';
import type { TechStackItem, TechStackCategory } from '../types';

export const techStack: TechStackItem[] = data.techStack as TechStackItem[];

export const techStackCategories: TechStackCategory[] = [
  'frontend',
  'backend',
  'devops',
  'digital-marketing',
  'ai',
  'others',
];

export const getTechStackByCategory = (category: TechStackCategory | 'all') => {
  if (category === 'all') return techStack;
  return techStack.filter((item) => item.category === category);
};

export const getCategoryLabel = (category: TechStackCategory | 'all'): string => {
  const labels: Record<TechStackCategory | 'all', string> = {
    all: 'All',
    frontend: 'Frontend',
    backend: 'Backend',
    devops: 'DevOps',
    'digital-marketing': 'Digital Marketing',
    ai: 'AI',
    others: 'Others',
  };
  return labels[category];
};