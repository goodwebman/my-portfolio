import type { Project } from './types';

/** Кейсы портфолио — структурные данные. Тексты — в messages `Projects.<slug>`. */
export const PROJECTS: readonly Project[] = [
  {
    slug: 'where-is-pizza',
    title: 'Where is Pizza',
    cover: '/projects/where-is-pizza/cover.svg',
    gallery: [
      '/projects/where-is-pizza/01.svg',
      '/projects/where-is-pizza/02.svg',
      '/projects/where-is-pizza/03.svg',
    ],
    stack: ['Next.js', 'Express', 'Prisma', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'Zod'],
    links: { repo: 'https://github.com/goodwebman/where-is-pizza-next/tree/develop' },
    year: 2026,
    featured: true,
  },
  {
    slug: 'kicks-sneakers',
    title: 'Kicks',
    cover: '/projects/kicks-sneakers/cover.svg',
    gallery: [
      '/projects/kicks-sneakers/01.svg',
      '/projects/kicks-sneakers/02.svg',
      '/projects/kicks-sneakers/03.svg',
    ],
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'React Router', 'Zod', 'SCSS Modules'],
    links: { repo: 'https://github.com/goodwebman/Kicks-sneakers' },
    year: 2025,
    featured: true,
  },
  {
    slug: 'share-your-tales',
    title: 'Share Your Tales',
    cover: '/projects/share-your-tales/cover.svg',
    gallery: [
      '/projects/share-your-tales/01.svg',
      '/projects/share-your-tales/02.svg',
      '/projects/share-your-tales/03.svg',
    ],
    stack: ['React Native', 'Expo', 'Apollo GraphQL', 'React Navigation', 'React Hook Form', 'Zod'],
    links: { repo: 'https://github.com/goodwebman/ReactNative-APOLLO-Share-your-tales' },
    year: 2025,
    featured: true,
  },
  {
    slug: 'bar-menu-animations',
    title: 'Beautiful Bar Menu',
    cover: '/projects/bar-menu-animations/cover.svg',
    gallery: [
      '/projects/bar-menu-animations/01.svg',
      '/projects/bar-menu-animations/02.svg',
      '/projects/bar-menu-animations/03.svg',
    ],
    stack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Vite'],
    links: { repo: 'https://github.com/goodwebman/Beautiful-bar-menu-animations' },
    year: 2026,
  },
  {
    slug: 'eatly',
    title: 'Eatly',
    cover: '/projects/eatly/cover.svg',
    gallery: [
      '/projects/eatly/01.svg',
      '/projects/eatly/02.svg',
      '/projects/eatly/03.svg',
    ],
    stack: ['Next.js', 'TypeScript', 'MUI', 'Radix UI', 'Framer Motion', 'Zustand'],
    links: { repo: 'https://github.com/goodwebman/eatly' },
    year: 2025,
  },
  {
    slug: 'evogym',
    title: 'EvoGym',
    cover: '/projects/evogym/cover.svg',
    gallery: [
      '/projects/evogym/01.svg',
      '/projects/evogym/02.svg',
      '/projects/evogym/03.svg',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Hook Form'],
    links: { repo: 'https://github.com/goodwebman/EVOGYM-TS' },
    year: 2024,
  },
  {
    slug: 'nexcent-tailwind',
    title: 'Nexcent',
    cover: '/projects/nexcent-tailwind/cover.svg',
    gallery: [
      '/projects/nexcent-tailwind/01.svg',
      '/projects/nexcent-tailwind/02.svg',
      '/projects/nexcent-tailwind/03.svg',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Flowbite React'],
    links: { repo: 'https://github.com/goodwebman/NexcentTailwind' },
    year: 2024,
  },
  {
    slug: 'hangman',
    title: 'Hangman',
    cover: '/projects/hangman/cover.svg',
    gallery: [
      '/projects/hangman/01.svg',
      '/projects/hangman/02.svg',
      '/projects/hangman/03.svg',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    links: { repo: 'https://github.com/goodwebman/HangmanTypeScript' },
    year: 2024,
  },
];

/** Проект по slug. */
export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((project) => project.slug === slug);

/** Проекты для главной (featured), с фолбэком на первые N. */
export const getFeaturedProjects = (): readonly Project[] => {
  const featured = PROJECTS.filter((project) => project.featured);

  return featured.length > 0 ? featured : PROJECTS.slice(0, 2);
};
