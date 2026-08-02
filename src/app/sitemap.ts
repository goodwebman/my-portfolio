import type { MetadataRoute } from 'next';

import { PROJECTS } from '@/entities/project';
import { getPathname, routing } from '@/shared/i18n';
import { absoluteUrl } from '@/shared/lib/seo';

/** Статические разделы сайта в порядке важности. */
const STATIC_ROUTES = [
  { href: '/', priority: 1 },
  { href: '/projects', priority: 0.9 },
  { href: '/about', priority: 0.8 },
  { href: '/tech-stack', priority: 0.7 },
  { href: '/contact', priority: 0.6 },
] as const;

/**
 * Карта сайта со ссылками на все локали каждой страницы (`alternates.languages`).
 * Так поисковик видит языковые версии как одну страницу, а не как дубликаты.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    ...STATIC_ROUTES,
    ...PROJECTS.map((project) => ({
      href: `/projects/${project.slug}`,
      priority: 0.8,
    })),
  ];

  return routes.map(({ href, priority }) => ({
    url: absoluteUrl(getPathname({ href, locale: routing.defaultLocale })),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          absoluteUrl(getPathname({ href, locale })),
        ]),
      ),
    },
  }));
}
