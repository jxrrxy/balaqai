import { Review } from '@/types';

const REVIEWS = [
  "Отличные занятия! Ребенок рад потому что может заниматься любимым делом.",
  "Преподаватели на высшем уровне, рекомендую всем родителям.",
  "Очень довольны качеством и организацией занятий.",
  "Удобная запись через приложение, никаких проблем с оплатой.",
  "Ребенок шел на занятия с большим удовольствием!",
  "Профессиональный подход, современное оборудование.",
  "Лучшая платформа для записи детей на занятия в Астане.",
  "Раньше было сложно, теперь все в одном месте.",
];

const PARENT_NAMES = ['Айгерим', 'Гульнара', 'Дина', 'Ермек', 'Марина', 'Алексей', 'Айсулу', 'Светлана'];

export function generateReviews(count = 100): Review[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `review-${i + 1}`,
    parentId: `parent-${Math.floor(Math.random() * 100) + 1}`,
    rating: Math.floor(Math.random() * 2) + 4,
    comment: REVIEWS[Math.floor(Math.random() * REVIEWS.length)],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }));
}