/**
 * Нелокализуемые данные сайта (идентификаторы, ссылки). Тексты (role, tagline,
 * bio, location) живут в messages/{locale}.json → namespace `Site`.
 */
export const SITE = {
  name: 'Данил Шебалов',
  email: 'super0kesha@mail.ru',
  github: 'https://github.com/goodwebman',
  telegram: 'https://t.me/danya_js',
  avatar: '/person.png',
  avatarHover: '/person_hover.png',
  url: 'https://example.com',
} as const;
