/**
 * Нелокализуемые данные сайта (идентификаторы, ссылки). Тексты (name, role,
 * tagline, bio, location) живут в messages/{locale}.json → namespace `Site`.
 *
 * Базовый URL здесь не хранится: он зависит от окружения и живёт в
 * `@/shared/lib/seo` (`SITE_URL`), где читается из переменных окружения.
 */
export const SITE = {
  /** Каноничное имя для разметки Person. В UI имя берётся из `Site.name`. */
  name: 'Данил Шебалов',
  /** Латиницей — для OG-картинки и `alternateName` в разметке Person. */
  nameLatin: 'Danil Shebalov',
  email: 'super0kesha@mail.ru',
  github: 'https://github.com/goodwebman',
  telegram: 'https://t.me/danya_js',
  avatar: '/person.png',
  avatarHover: '/person_hover.png',
} as const;
