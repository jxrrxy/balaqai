import { Activity, Category, Schedule } from '@/types';
import { generateProviders } from './generateProviders';

const ACTIVITY_TITLES: Record<Category, string[]> = {
  sports: ['Футбол', 'Баскетбол', 'Сквош', 'Теннис', 'Плавание', 'Гимнастика', 'Бокс', 'Дзюдо'],
  arts: ['Рисование', 'Лепка', 'Театр', 'Танцы', 'Музыка', 'Акварель', 'Гончарное дело'],
  language: ['Английский язык', 'Китайский язык', 'Русский язык', 'Казахский язык', 'Французский язык'],
  school: ['Ментальная арифметика', 'Абака', 'Подготовка к школе', 'Английский для малышей', 'Развивающие занятия'],
  it: ['Программирование', 'Робототехника', 'Искусственный интеллект', 'Дизайн', 'Кодинг для детей'],
};

/* ─────────── Real Unsplash images per activity ─────────── */

const ACTIVITY_IMAGES: Record<string, string[]> = {
  // Sports
  Футбол: [
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=400&fit=crop&auto=format',
  ],
  Баскетбол: [
    'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop&auto=format',
  ],
  Сквош: [
    'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&h=400&fit=crop&auto=format',
  ],
  Теннис: [
    'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&h=400&fit=crop&auto=format',
  ],
  Плавание: [
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=400&fit=crop&auto=format',
  ],
  Гимнастика: [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop&auto=format',
  ],
  Бокс: [
    'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&h=400&fit=crop&auto=format',
  ],
  Дзюдо: [
    'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&h=400&fit=crop&auto=format',
  ],

  // Arts
  Рисование: [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop&auto=format',
  ],
  Акварель: [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop&auto=format',
  ],
  Лепка: [
    'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=400&fit=crop&auto=format',
  ],
  'Гончарное дело': [
    'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=400&fit=crop&auto=format',
  ],
  Театр: [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop&auto=format',
  ],
  Танцы: [
    'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=400&fit=crop&auto=format',
  ],
  Музыка: [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&auto=format',
  ],

  // Language
  'Английский язык': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&auto=format',
  ],
  'Китайский язык': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&auto=format',
  ],
  'Русский язык': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&auto=format',
  ],
  'Казахский язык': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&auto=format',
  ],
  'Французский язык': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&auto=format',
  ],

  // School / early learning
  'Ментальная арифметика': [
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop&auto=format',
  ],
  Абака: [
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop&auto=format',
  ],
  'Подготовка к школе': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&auto=format',
  ],
  'Английский для малышей': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&auto=format',
  ],
  'Развивающие занятия': [
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop&auto=format',
  ],

  // IT
  Программирование: [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop&auto=format',
  ],
  Робототехника: [
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&auto=format',
  ],
  'Искусственный интеллект': [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&auto=format',
  ],
  Дизайн: [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop&auto=format',
  ],
  'Кодинг для детей': [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop&auto=format',
  ],
};

/* ─────────── Fallback images per category ─────────── */

const CATEGORY_FALLBACK: Record<Category, string[]> = {
  sports: ['https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&h=400&fit=crop&auto=format'],
  arts: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop&auto=format'],
  language: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop&auto=format'],
  school: ['https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop&auto=format'],
  it: ['https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&auto=format'],
};

const AMENITIES = ['Парковка', 'Wi-Fi', 'Кондиционер', 'Детская площадка', 'Кофе-бар', 'Тренажеры', 'Музыкальное оборудование'];

function generateSchedule(): Schedule[] {
  const days: Schedule['day'][] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return days
    .filter(() => Math.random() > 0.3)
    .map((day) => ({
      day,
      startTime: `${Math.floor(Math.random() * 8) + 9}:00`,
      endTime: `${Math.floor(Math.random() * 4) + 14}:00`,
    }));
}

function pickPhotos(title: string, category: Category): string[] {
  // Try title-specific images first
  const specific = ACTIVITY_IMAGES[title];
  if (specific) return specific;

  // Fallback to category-level images
  return CATEGORY_FALLBACK[category];
}

export function generateActivities(count = 100): Activity[] {
  const providers = generateProviders(50);

  return Array.from({ length: count }, (_, i) => {
    const categories = Object.keys(ACTIVITY_TITLES) as Category[];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const title = ACTIVITY_TITLES[category][Math.floor(Math.random() * ACTIVITY_TITLES[category].length)];
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const photos = pickPhotos(title, category);

    return {
      id: `activity-${i + 1}`,
      providerId: provider.id,
      title: `${title} для детей ${Math.floor(Math.random() * 5) + 3}-${Math.floor(Math.random() * 8) + 10} лет`,
      description: `Профессиональные занятия ${title.toLowerCase()} для детей. Занятия проводятся опытными инструкторами в специализированных помещениях.`,
      category,
      ageMin: Math.floor(Math.random() * 6) + 3,
      ageMax: Math.floor(Math.random() * 8) + 10,
      price: Math.floor(Math.random() * 15) + 5,
      rating: Number((4 + Math.random()).toFixed(1)),
      reviews: [],
      schedule: generateSchedule(),
      location: provider.location,
      photos,
      amenities: AMENITIES.filter(() => Math.random() > 0.5).slice(0, 3),
    };
  });
}