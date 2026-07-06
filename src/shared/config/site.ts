/**
 * Нелокализуемые данные сайта (идентификаторы, ссылки). Тексты (role, tagline,
 * bio, location) живут в messages/{locale}.json → namespace `Site`.
 */
export const SITE = {
  name: 'Данил Шебалов',
  email: 'goodwebman72@gmail.com',
  avatar: '/avatar.svg',
  url: 'https://example.com',
} as const;
