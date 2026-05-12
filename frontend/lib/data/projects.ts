import data from './data.json';
import type { Project } from '../types';

export const projects: Project[] = data.projects as Project[];

export const frontendProjects = projects.filter((p) => p.categories.includes('frontend'));
export const fullstackProjects = projects.filter((p) => p.categories.includes('fullstack'));
export const aiProjects = projects.filter((p) => p.categories.includes('ai'));
