import type { Project } from './types';

/** Кейсы портфолио — структурные данные. Тексты — в messages `Projects.<slug>`. */
export const PROJECTS: readonly Project[] = [
  {
    slug: 'zuko-messenger',
    title: 'Zuko',
    cover: '/projects/zuko-messenger/cover.jpg',
    gallery: [
      '/projects/zuko-messenger/01.jpg',
      '/projects/zuko-messenger/02.jpg',
      '/projects/zuko-messenger/03.jpg',
      '/projects/zuko-messenger/04.jpg',
    ],
    stack: [
      'Next.js',
      'Fastify',
      'Socket.IO',
      'Prisma',
      'TypeScript',
      'TanStack Query',
      'Redux Toolkit',
      'React Hook Form',
      'Zod',
      'Tailwind CSS',
      'PostgreSQL',
    ],
    links: {
      live: 'https://zuko-messenger-web.vercel.app',
      repo: 'https://github.com/goodwebman/zuko-messenger',
    },
    year: 2026,
    featured: true,
  },
  {
    slug: 'siege-castle-chess',
    title: 'Siege Castle',
    cover: '/projects/siege-castle-chess/cover.jpg',
    gallery: [
      '/projects/siege-castle-chess/01.jpg',
      '/projects/siege-castle-chess/02.jpg',
    ],
    stack: [
      'React',
      'Socket.IO',
      'MobX',
      'Prisma',
      'TypeScript',
      'Vite',
      'chess.js',
      'PostgreSQL',
      'Zod',
    ],
    links: {
      live: 'https://chess-websockets-monorep-web.vercel.app',
      repo: 'https://github.com/goodwebman/chess-websockets-monorep',
    },
    year: 2026,
    featured: true,
  },
  {
    slug: 'where-is-pizza',
    title: 'Where is Pizza',
    cover: '/projects/where-is-pizza/cover.jpg',
    gallery: [
      '/projects/where-is-pizza/01.jpg',
      '/projects/where-is-pizza/02.jpg',
      '/projects/where-is-pizza/03.jpg',
      '/projects/where-is-pizza/04.jpg',
      '/projects/where-is-pizza/05.jpg',
      '/projects/where-is-pizza/06.jpg',
      '/projects/where-is-pizza/07.jpg',
      '/projects/where-is-pizza/08.jpg',
    ],
    stack: ['Next.js', 'Express', 'Prisma', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'Zod'],
    links: {
      live: 'https://where-is-pizza-next.vercel.app',
      repo: 'https://github.com/goodwebman/where-is-pizza-next',
    },
    year: 2026,
    featured: true,
  },
  {
    slug: 'frontend-mechanisms',
    title: 'Frontend Mechanisms',
    cover: '/projects/frontend-mechanisms/cover.jpg',
    gallery: [
      '/projects/frontend-mechanisms/01.jpg',
      '/projects/frontend-mechanisms/02.jpg',
      '/projects/frontend-mechanisms/03.jpg',
      '/projects/frontend-mechanisms/04.jpg',
      '/projects/frontend-mechanisms/05.jpg',
    ],
    stack: ['React', 'React Router', 'CSS Modules', 'Vite', 'TypeScript'],
    links: { live: 'https://reusable-frontend-mechanisms.vercel.app' },
    year: 2026,
  },
  {
    slug: 'realtime-transports',
    title: 'Realtime Transports',
    cover: '/projects/realtime-transports/cover.jpg',
    gallery: [
      '/projects/realtime-transports/01.jpg',
      '/projects/realtime-transports/02.jpg',
      '/projects/realtime-transports/03.jpg',
    ],
    stack: [
      'React',
      'SSE',
      'Vercel Functions',
      'Neon',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Zod',
      'Vitest',
    ],
    links: {
      repo: 'https://github.com/goodwebman/background-task-monitoring-polling-long-polling-sse',
    },
    year: 2026,
  },
  {
    slug: 'ai-fairy-tale',
    title: 'Fairy Tale AI',
    cover: '/projects/ai-fairy-tale/cover.jpg',
    gallery: [
      '/projects/ai-fairy-tale/01.jpg',
      '/projects/ai-fairy-tale/02.jpg',
      '/projects/ai-fairy-tale/03.jpg',
      '/projects/ai-fairy-tale/04.jpg',
    ],
    stack: [
      'React',
      'Redux Toolkit',
      'Express',
      'IndexedDB',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
    ],
    links: {
      live: 'https://ai-fairy-tail.vercel.app',
      repo: 'https://github.com/goodwebman/ai-fairy-tail',
    },
    year: 2026,
  },
  {
    slug: 'ui-kit',
    title: 'UI Kit',
    cover: '/projects/ui-kit/cover.jpg',
    gallery: ['/projects/ui-kit/01.jpg', '/projects/ui-kit/02.jpg'],
    stack: ['React', 'Storybook', 'Tailwind CSS', 'Vitest', 'TypeScript', 'Vite', 'CVA'],
    links: {
      live: 'https://ui-kit-goodwebman.vercel.app',
      repo: 'https://github.com/goodwebman/UI-KIT-goodwebman',
    },
    year: 2026,
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
