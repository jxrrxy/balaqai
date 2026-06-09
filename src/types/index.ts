export type Category = 'sports' | 'arts' | 'language' | 'school' | 'it';

export interface Location {
  district: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Contact {
  phone: string;
  email: string;
  website?: string;
  social?: {
    instagram?: string;
    whatsapp?: string;
  };
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  logo: string;
  rating: number;
  verified: boolean;
  categories: Category[];
  location: Location;
  contact: Contact;
}

export interface Schedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
}

export interface Review {
  id: string;
  parentId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Activity {
  id: string;
  providerId: string;
  title: string;
  description: string;
  category: Category;
  ageMin: number;
  ageMax: number;
  price: number;
  rating: number;
  reviews: Review[];
  schedule: Schedule[];
  location: Location;
  photos: string[];
  amenities: string[];
}

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  interests: Category[];
  currentActivities: Activity[];
}

export interface Subscription {
  id: string;
  type: '12' | '20' | '36' | '60';
  visitsRemaining: number;
  expiresAt: string;
  isActive: boolean;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  children: Child[];
  subscription: Subscription | null;
  favorites: string[];
}

export interface Booking {
  id: string;
  activityId: string;
  childId: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  qrCode?: string;
  createdAt: string;
}

export interface ActivityFilters {
  category?: Category;
  age?: number;
  district?: string;
  rating?: number;
  search?: string;
  priceMin?: number;
  priceMax?: number;
}

export interface Visit {
  id: string;
  activityId: string;
  childId: string;
  date: string;
  checkInTime?: string;
}

export interface District {
  id: string;
  name: string;
  nameKk: string;
}

export const CATEGORIES: Record<Category, { name: string; nameKk: string; icon: string }> = {
  sports: { name: 'Sports', nameKk: 'Спорт', icon: 'Trophy' },
  arts: { name: 'Arts & Creativity', nameKk: 'Өнер және шығармашылық', icon: 'Palette' },
  language: { name: 'Language Courses', nameKk: 'Тіл курстары', icon: 'Languages' },
  school: { name: 'School Preparation', nameKk: 'Мектепге дайындық', icon: 'GraduationCap' },
  it: { name: 'IT & Robotics', nameKk: 'АІ және робототехника', icon: 'Bot' },
};