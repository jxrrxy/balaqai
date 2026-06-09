import { generateActivities } from './generators/generateActivities';
import { generateProviders } from './generators/generateProviders';
import { generateReviews } from './generators/generateReviews';
import { DISTRICTS } from './generators/generateDistricts';
import { Activity, Provider, Review, Booking, Parent, ActivityFilters } from '@/types';

const activities = generateActivities(100);
const providers = generateProviders(50);
const reviews = generateReviews(100);

export const api = {
  activities: {
    getAll: async (filters?: ActivityFilters): Promise<Activity[]> => {
      await new Promise((r) => setTimeout(r, 300));
      let result = [...activities];
      
      if (filters?.category) {
        result = result.filter((a) => a.category === filters.category);
      }
      if (filters?.age !== undefined) {
        result = result.filter((a) => filters.age! >= a.ageMin && filters.age! <= a.ageMax);
      }
      if (filters?.district) {
        result = result.filter((a) => a.location.district === filters.district);
      }
      if (filters?.rating) {
        result = result.filter((a) => a.rating >= filters.rating!);
      }
      if (filters?.priceMin !== undefined) {
        result = result.filter((a) => a.price >= filters.priceMin!);
      }
      if (filters?.priceMax !== undefined) {
        result = result.filter((a) => a.price <= filters.priceMax!);
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q)
        );
      }
      
      return result;
    },
    getById: async (id: string): Promise<Activity | null> => {
      await new Promise((r) => setTimeout(r, 200));
      return activities.find((a) => a.id === id) || null;
    },
    getFeatured: async (): Promise<Activity[]> => {
      await new Promise((r) => setTimeout(r, 300));
      return activities
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)
        .map((a) => ({
          ...a,
          reviews: reviews.slice(Math.floor(Math.random() * 5), Math.floor(Math.random() * 5) + 5),
        }));
    },
  },

  providers: {
    getAll: async (): Promise<Provider[]> => {
      await new Promise((r) => setTimeout(r, 300));
      return providers;
    },
    getById: async (id: string): Promise<Provider | null> => {
      await new Promise((r) => setTimeout(r, 200));
      return providers.find((p) => p.id === id) || null;
    },
    getByActivity: async (activityId: string): Promise<Provider | null> => {
      const activity = activities.find((a) => a.id === activityId);
      return activity ? providers.find((p) => p.id === activity.providerId) || null : null;
    },
  },

  districts: {
    getAll: async () => DISTRICTS,
  },
};