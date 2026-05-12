import data from './data.json';
import type { Skill } from '../types';

export const skills: Skill[] = data.skills as Skill[];

export const fullstackSkills = skills.filter((s) => s.category === 'fullstack');
export const aiSkills = skills.filter((s) => s.category === 'agentic-ai');
