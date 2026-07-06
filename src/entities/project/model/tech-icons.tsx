import type { ReactNode } from 'react';

import { LuBox } from 'react-icons/lu';
import {
  SiApollographql,
  SiExpo,
  SiExpress,
  SiFramer,
  SiGreensock,
  SiMui,
  SiNextdotjs,
  SiPrisma,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVite,
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
};

/** Иконка тега стека; для брендов без готовой иконки — нейтральный фолбэк. */
export const getTechIcon = (tag: string): ReactNode => {
  const entry = TECH_ICON[tag];
  if (!entry) return <LuBox />;

  return entry.color ? <span style={{ color: entry.color }}>{entry.icon}</span> : entry.icon;
};
