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
    stack: ['Next.js', 'TypeScript', 'WebSocket', 'Zustand', 'TanStack Query'],
    links: { live: 'https://example.com', repo: 'https://github.com' },
    year: 2024,
    featured: true,
  },
  {
    slug: 'stream-service',
    title: 'Stream Service',
    cover: '/projects/stream-service/cover.svg',
    gallery: [
      '/projects/stream-service/01.svg',
      '/projects/stream-service/02.svg',
      '/projects/stream-service/03.svg',
    ],
    stack: ['React', 'Redux Toolkit', 'RTK Query', 'TypeScript', 'HLS'],
    links: { repo: 'https://github.com' },
    year: 2023,
    featured: true,
  },
  {
    slug: 'design-system',
    title: 'Design System',
    cover: '/projects/design-system/cover.svg',
    gallery: [
      '/projects/design-system/01.svg',
      '/projects/design-system/02.svg',
      '/projects/design-system/03.svg',
    ],
    stack: ['React', 'TypeScript', 'Storybook', 'Changesets', 'npm workspaces'],
    links: { repo: 'https://github.com' },
    year: 2023,
  },
  {
    slug: 'task-flow',
    title: 'Task Flow',
    cover: '/projects/task-flow/cover.svg',
    gallery: [
      '/projects/task-flow/01.svg',
      '/projects/task-flow/02.svg',
      '/projects/task-flow/03.svg',
    ],
    stack: ['Next.js', 'dnd-kit', 'Prisma', 'PostgreSQL', 'IndexedDB'],
    links: { live: 'https://example.com', repo: 'https://github.com' },
    year: 2022,
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
