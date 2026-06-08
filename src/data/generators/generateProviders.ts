import { Provider, Category } from '@/types';
import { DISTRICTS } from './generateDistricts';

const KAZAKH_NAMES = [
  'Астана Спорт', 'Юный Тalent', 'Кreativ Kids', 'Алматы Искусство',
  'Nur Kids', 'Золотой Предел', 'Сказка', 'Жас Отан',
  'Болашак', 'Жамбылат', 'Нұр Астана', 'Арт-Мастер',
  'IT Kids', 'Robot Kazakh', 'Language Pro', 'Future Stars',
  'Sport Line', 'Dance Mix', 'Music Box', 'Chess Academy',
];

const CATEGORY_LIST: Category[] = ['sports', 'arts', 'language', 'school', 'it'];

export function generateProviders(count = 50): Provider[] {
  return Array.from({ length: count }, (_, i) => {
    const categories = [
      CATEGORY_LIST[Math.floor(Math.random() * CATEGORY_LIST.length)],
      CATEGORY_LIST[Math.floor(Math.random() * CATEGORY_LIST.length)],
    ].filter((v, i, arr) => arr.indexOf(v) === i);
    
    return {
      id: `provider-${i + 1}`,
      name: KAZAKH_NAMES[i % KAZAKH_NAMES.length] + (i >= KAZAKH_NAMES.length ? ` ${Math.floor(i / KAZAKH_NAMES.length) + 1}` : ''),
      description: 'Качественные детские занятия с профессиональными инструкторами',
      logo: `https://placehold.co/200x200/00C896/FFFFFF?text=${encodeURIComponent(KAZAKH_NAMES[i % KAZAKH_NAMES.length][0])}`,
      rating: Number((4 + Math.random()).toFixed(1)),
      verified: Math.random() > 0.3,
      categories,
      location: {
        district: DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)].nameKk,
        address: `ул. Абылай хан, ${Math.floor(Math.random() * 100) + 1}`,
        lat: 51.1605 + (Math.random() - 0.5) * 0.1,
        lng: 71.4705 + (Math.random() - 0.5) * 0.1,
      },
      contact: {
        phone: `+7 (7${Math.floor(Math.random() * 90) + 10}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 90) + 10}`,
        email: `info@provider${i + 1}.kz`,
        instagram: `@provider${i + 1}`,
      },
    };
  });
}