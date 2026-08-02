import { SITE } from '@/shared/config';
import { getPathname, type Locale } from '@/shared/i18n';

import { absoluteUrl, SITE_URL } from './site-url';

/** Узел разметки schema.org. Сериализуется в `<script type="application/ld+json">`. */
export type JsonLdNode = Record<string, unknown>;

/**
 * # Разметка Person
 * Даёт поисковику связать сайт с человеком: имя, должность, профили в других
 * сервисах (`sameAs`) — основа для панели знаний.
 *
 * @param params.locale - текущая локаль (уходит в `url`)
 * @param params.jobTitle - должность на языке страницы
 * @param params.description - краткое описание на языке страницы
 */
export const buildPersonJsonLd = ({
  locale,
  jobTitle,
  description,
}: {
  readonly locale: Locale;
  readonly jobTitle: string;
  readonly description: string;
}): JsonLdNode => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}#person`,
  name: SITE.name,
  alternateName: SITE.nameLatin,
  url: absoluteUrl(getPathname({ href: '/', locale })),
  image: absoluteUrl(SITE.avatar),
  email: `mailto:${SITE.email}`,
  jobTitle,
  description,
  sameAs: [SITE.github, SITE.telegram],
});

/**
 * # Разметка WebSite
 * Описывает сам сайт и его автора; `inLanguage` помогает связать языковые версии.
 */
export const buildWebSiteJsonLd = ({
  locale,
  description,
}: {
  readonly locale: Locale;
  readonly description: string;
}): JsonLdNode => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: absoluteUrl(getPathname({ href: '/', locale })),
  name: SITE.name,
  description,
  inLanguage: locale,
  author: { '@id': `${SITE_URL}#person` },
});

/**
 * # Разметка проекта (CreativeWork)
 * Кейс портфолио: обложка, год, стек и ссылки на демо/исходники.
 */
export const buildProjectJsonLd = ({
  locale,
  slug,
  name,
  description,
  cover,
  year,
  stack,
  live,
  repo,
}: {
  readonly locale: Locale;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly cover: string;
  readonly year: number;
  readonly stack: readonly string[];
  readonly live?: string;
  readonly repo?: string;
}): JsonLdNode => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': absoluteUrl(getPathname({ href: `/projects/${slug}`, locale })),
  name,
  description,
  image: absoluteUrl(cover),
  url: live ?? absoluteUrl(getPathname({ href: `/projects/${slug}`, locale })),
  dateCreated: String(year),
  inLanguage: locale,
  keywords: stack.join(', '),
  author: { '@id': `${SITE_URL}#person` },
  ...(repo ? { codeRepository: repo } : {}),
});

/**
 * # Хлебные крошки
 * Google рисует их вместо голого URL в выдаче — выше кликабельность сниппета.
 *
 * @param locale - текущая локаль
 * @param items - цепочка от корня к текущей странице
 */
export const buildBreadcrumbJsonLd = (
  locale: Locale,
  items: readonly { readonly name: string; readonly href: string }[],
): JsonLdNode => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(getPathname({ href: item.href, locale })),
  })),
});
