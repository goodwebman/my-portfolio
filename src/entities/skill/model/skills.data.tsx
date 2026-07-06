import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGreensock,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

import type { Skill } from './types';

/**
 * Стек технологий. Иконки — Simple Icons из react-icons/si.
 * `usage` — иллюстративная доля использования (%), заменить на реальные цифры
 * из опроса (напр. StackOverflow Developer Survey).
 */
export const SKILLS: readonly Skill[] = [
  // --- frontend ---
  { id: 'react', name: 'React', icon: <SiReact />, category: 'frontend', brandColor: '#61DAFB', docUrl: 'https://react.dev', usage: 40 },
  { id: 'nextjs', name: 'Next.js', icon: <SiNextdotjs />, category: 'frontend', docUrl: 'https://nextjs.org/docs', usage: 17 },
  { id: 'typescript', name: 'TypeScript', icon: <SiTypescript />, category: 'frontend', brandColor: '#3178C6', docUrl: 'https://www.typescriptlang.org/docs/', usage: 38 },
  { id: 'javascript', name: 'JavaScript', icon: <SiJavascript />, category: 'frontend', brandColor: '#F7DF1E', docUrl: 'https://developer.mozilla.org/docs/Web/JavaScript', usage: 62 },
  { id: 'redux', name: 'Redux Toolkit', icon: <SiRedux />, category: 'frontend', brandColor: '#764ABC', docUrl: 'https://redux-toolkit.js.org/', usage: 20 },
  { id: 'tailwind', name: 'Tailwind CSS', icon: <SiTailwindcss />, category: 'frontend', brandColor: '#06B6D4', docUrl: 'https://tailwindcss.com/docs', usage: 26 },
  { id: 'motion', name: 'Motion', icon: <SiFramer />, category: 'frontend', brandColor: '#0055FF', docUrl: 'https://motion.dev/docs', usage: 8 },
  { id: 'gsap', name: 'GSAP', icon: <SiGreensock />, category: 'frontend', brandColor: '#88CE02', docUrl: 'https://gsap.com/docs/', usage: 6 },
  // --- backend ---
  { id: 'nodejs', name: 'Node.js', icon: <SiNodedotjs />, category: 'backend', brandColor: '#339933', docUrl: 'https://nodejs.org/docs/latest/api/', usage: 40 },
  { id: 'express', name: 'Express', icon: <SiExpress />, category: 'backend', docUrl: 'https://expressjs.com/', usage: 17 },
  { id: 'postgresql', name: 'PostgreSQL', icon: <SiPostgresql />, category: 'backend', brandColor: '#4169E1', docUrl: 'https://www.postgresql.org/docs/', usage: 49 },
  { id: 'prisma', name: 'Prisma', icon: <SiPrisma />, category: 'backend', docUrl: 'https://www.prisma.io/docs', usage: 12 },
  { id: 'mongodb', name: 'MongoDB', icon: <SiMongodb />, category: 'backend', brandColor: '#47A248', docUrl: 'https://www.mongodb.com/docs/', usage: 25 },
  // --- tools ---
  { id: 'git', name: 'Git', icon: <SiGit />, category: 'tools', brandColor: '#F05032', docUrl: 'https://git-scm.com/doc', usage: 93 },
  { id: 'docker', name: 'Docker', icon: <SiDocker />, category: 'tools', brandColor: '#2496ED', docUrl: 'https://docs.docker.com/', usage: 53 },
  { id: 'vite', name: 'Vite', icon: <SiVite />, category: 'tools', brandColor: '#646CFF', docUrl: 'https://vite.dev/guide/', usage: 12 },
  { id: 'figma', name: 'Figma', icon: <SiFigma />, category: 'tools', brandColor: '#F24E1E', docUrl: 'https://help.figma.com/', usage: 55 },
];
