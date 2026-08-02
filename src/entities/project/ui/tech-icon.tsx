import type { ReactNode } from 'react';

import { LuBox, LuDatabase, LuRadioTower } from 'react-icons/lu';
import {
  SiApollographql,
  SiCssmodules,
  SiExpo,
  SiExpress,
  SiFastify,
  SiFramer,
  SiGreensock,
  SiMobx,
  SiMui,
  SiNeon,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiSocketdotio,
  SiStorybook,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiZod,
} from 'react-icons/si';

/** Иконка + бренд-цвет по названию технологии из `Project.stack`. */
const TECH_ICON: Record<string, { readonly icon: ReactNode; readonly color?: string }> = {
  'Next.js': { icon: <SiNextdotjs /> },
  Express: { icon: <SiExpress /> },
  Prisma: { icon: <SiPrisma />, color: '#2D3748' },
  TypeScript: { icon: <SiTypescript />, color: '#3178C6' },
  React: { icon: <SiReact />, color: '#61DAFB' },
  'React Native': { icon: <SiReact />, color: '#61DAFB' },
  'Redux Toolkit': { icon: <SiRedux />, color: '#764ABC' },
  'TanStack Query': { icon: <SiReactquery />, color: '#FF4154' },
  Zod: { icon: <SiZod /> },
  'React Router': { icon: <SiReactrouter />, color: '#CA4245' },
  'SCSS Modules': { icon: <SiSass />, color: '#CC6699' },
  Expo: { icon: <SiExpo /> },
  'Apollo GraphQL': { icon: <SiApollographql />, color: '#311C87' },
  'React Hook Form': { icon: <SiReacthookform /> },
  GSAP: { icon: <SiGreensock />, color: '#88CE02' },
  'Tailwind CSS': { icon: <SiTailwindcss />, color: '#06B6D4' },
  Vite: { icon: <SiVite />, color: '#646CFF' },
  MUI: { icon: <SiMui />, color: '#007FFF' },
  'Radix UI': { icon: <SiRadixui /> },
  'Framer Motion': { icon: <SiFramer /> },
  'Socket.IO': { icon: <SiSocketdotio /> },
  Fastify: { icon: <SiFastify /> },
  MobX: { icon: <SiMobx />, color: '#FF9955' },
  PostgreSQL: { icon: <SiPostgresql />, color: '#4169E1' },
  Storybook: { icon: <SiStorybook />, color: '#FF4785' },
  Vitest: { icon: <SiVitest />, color: '#6E9F18' },
  Neon: { icon: <SiNeon />, color: '#00E599' },
  'Vercel Functions': { icon: <SiVercel /> },
  'CSS Modules': { icon: <SiCssmodules /> },
  SSE: { icon: <LuRadioTower /> },
  IndexedDB: { icon: <LuDatabase /> },
};

/** Иконка тега стека; для брендов без готовой иконки — нейтральный фолбэк. */
export const getTechIcon = (tag: string): ReactNode => {
  const entry = TECH_ICON[tag];
  if (!entry) return <LuBox />;

  return entry.color ? <span style={{ color: entry.color }}>{entry.icon}</span> : entry.icon;
};
