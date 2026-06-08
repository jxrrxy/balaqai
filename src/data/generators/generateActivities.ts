import { Activity, Category, Schedule } from '@/types';
import { generateProviders } from './generateProviders';

const ACTIVITY_TITLES: Record<Category, string[]> = {
  sports: ['Футбол', 'Баскетбол', 'Сквош', 'Теннис', 'Плавание', 'Гимнастика', 'Бокс', 'Дзюдо'],
  arts: ['Рисование', 'Лепка', 'Театр', 'Танцы', 'Музыка', 'Акварель', 'Гончарное дело'],
  language: ['Английский язык', 'Китайский язык', 'Русский язык', 'Казахский язык', 'Французский язык'],
  school: ['Ментальная арифметика', 'Абака', 'Подготовка к школе', 'Английский для малышей', 'Развивающие занятия'],
  it: ['Программирование', 'Робототехника', 'Искусственный интеллект', 'Дизайн', 'Кодинг для детей'],
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

export function generateActivities(count = 100): Activity[] {
  const providers = generateProviders(50);
  
  return Array.from({ length: count }, (_, i) => {
    const categories = Object.keys(ACTIVITY_TITLES) as Category[];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const title = ACTIVITY_TITLES[category][Math.floor(Math.random() * ACTIVITY_TITLES[category].length)];
    const provider = providers[Math.floor(Math.random() * providers.length)];
    
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
      photos: Array.from({ length: 3 }, (_, j) => 
        `https://placehold.co/800x400/00C896/FFFFFF?text=${encodeURIComponent(title + (j + 1))}`
      ),
      amenities: AMENITIES.filter(() => Math.random() > 0.5).slice(0, 3),
    };
  });
}