import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { NAV, SITE } from '@/shared/config';
import { UIContainer } from '@/shared/ui';

import { FooterSocials } from './footer-socials';

/** Подвал сайта: бренд, навигация, соц-ссылки, копирайт. Server component. */
export async function SiteFooter() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Nav');
  const tSite = await getTranslations('Site');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <UIContainer>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-accent-foreground">
                &lt;/&gt;
              </span>
              {SITE.name}
            </Link>
            <p className="mt-4 max-w-sm text-small text-muted-foreground">
              {tSite('shortBio')}
            </p>
          </div>

          <nav aria-label={t('footerNav')}>
            <h2 className="text-caption font-semibold uppercase tracking-wider text-muted-foreground">
              {t('sections')}
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-caption font-semibold uppercase tracking-wider text-muted-foreground">
              {t('contacts')}
            </h2>
            <FooterSocials />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 text-caption text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t('copyright', { year, name: SITE.name })}</p>
          <p>{t('builtWith')}</p>
        </div>
      </UIContainer>
    </footer>
  );
}
