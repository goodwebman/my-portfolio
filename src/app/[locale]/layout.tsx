import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import '../globals.css';

import { routing, type Locale } from '@/i18n/routing';
import { SITE } from '@/shared/config';
import { THEME_STORAGE_KEY, type Theme } from '@/shared/theme';
import { SceneBackground } from '@/shared/ui';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface LocaleLayoutProps {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}

/** Статически рендерим обе локали. */
export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });
  const title = `${SITE.name} — ${t('role')}`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: title,
      template: `%s — ${SITE.name}`,
    },
    description: t('description'),
    keywords: t('keywords')
      .split(',')
      .map((keyword) => keyword.trim()),
    authors: [{ name: SITE.name }],
    openGraph: {
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      url: SITE.url,
      siteName: SITE.name,
      title,
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const cookieStore = await cookies();
  const theme: Theme =
    cookieStore.get(THEME_STORAGE_KEY)?.value === 'light' ? 'light' : 'dark';

  return (
    <html
      lang={locale}
      data-theme={theme}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers initialTheme={theme}>
            <SceneBackground />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
