import data from './data.json';
import type { Profile, ProfileStat, SocialLink } from '../types';

export const profile = data.profile as Profile;
export const stats: ProfileStat[] = profile.stats;
export const socials: SocialLink[] = profile.socials;
