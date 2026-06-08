# BalaQai - Product Architecture

## Phase 1: Architecture Only

---

## 1. Product Architecture

### Vision Statement
BalaQai creates a unified digital ecosystem where Kazakhstani families can effortlessly discover, book, and manage all children's activities through a single subscription, eliminating schedule conflicts and scattered information.

### Core Value Proposition
- **One App, One Subscription** - All activities in one place
- **No More Scattered Information** - Centralized discovery
- **Smart Scheduling** - Conflict-free booking system
- **Family-Centric Design** - Manage multiple children easily

### Technical Architecture
```
Frontend Only (Next.js 15 App Router)
├── Presentation Layer (React Components)
├── State Layer (Zustand)
├── Data Layer (Mock API + localStorage)
└── UI Layer (TailwindCSS + Shadcn UI)
```

---

## 2. User Journey

### Primary User Flow (Parent)
```
Discovery → Browse Category → View Activity → Book Class → Confirm → QR Code → Attend
```

### Detailed Journey Map

**Step 1: Discovery**
- Landing page showcases value proposition
- Parent understands benefits immediately
- Redirects to catalog or auth

**Step 2: Onboarding**
- Create parent profile
- Add child(ren) profiles
- Set preferences/interests

**Step 3: Exploration**
- Browse by category (Sports, Arts, etc.)
- Filter by age, district, rating
- Save favorites

**Step 4: Booking**
- Select activity
- Choose date/time
- Confirm with subscription
- Receive QR code

**Step 5: Attendance**
- Show QR at venue
- Visit recorded
- Activity history updated

**Step 6: Management**
- View visit balance
- Manage bookings
- Track child progress

---

## 3. Sitemap

```
/ (Landing)
├── /catalog
│   ├── /catalog/[category]
│   └── /activity/[id]
├── /dashboard (Protected)
│   ├── /dashboard/profile
│   ├── /dashboard/children
│   ├── /dashboard/bookings
│   ├── /dashboard/favorites
│   ├── /dashboard/attendance
│   └── /dashboard/subscription
├── /booking (Protected)
│   ├── /booking/[activityId]
│   ├── /booking/[activityId]/date
│   ├── /booking/[activityId]/time
│   ├── /booking/[activityId]/confirm
│   └── /booking/[activityId]/qr
├── /partner (Protected)
│   ├── /partner/activities
│   ├── /partner/bookings
│   ├── /partner/attendance
│   ├── /partner/schedule
│   └── /partner/analytics
└── /auth
    ├── /auth/login
    └── /auth/register
```

---

## 4. Information Architecture

### User Schema
```
Parent {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  children: Child[]
  subscription: Subscription
  favorites: string[] (activityIds)
}

Child {
  id: string
  name: string
  age: number
  birthDate: Date
  interests: string[]
  bookedActivities: string[]
  visitHistory: Visit[]
}

Subscription {
  id: string
  type: '12' | '20' | '36' | '60'
  visitsRemaining: number
  expiresAt: Date
  isActive: boolean
}
```

### Activity Schema
```
Activity {
  id: string
  providerId: string
  title: string
  description: string
  category: Category
  ageMin: number
  ageMax: number
  price: number
  rating: number
  reviews: Review[]
  schedule: Schedule[]
  location: Location
  photos: string[]
  amenities: string[]
}

Provider {
  id: string
  name: string
  description: string
  logo: string
  rating: number
  verified: boolean
  categories: Category[]
  location: Location
  contact: Contact
}
```

### Booking Schema
```
Booking {
  id: string
  activityId: string
  childId: string
  parentId: string
  date: Date
  timeSlot: string
  status: 'confirmed' | 'completed' | 'cancelled'
  qrCode: string
  createdAt: Date
}
```

---

## 5. Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Landing)
│   ├── catalog/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── components/
│   ├── activity/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── profile/
│   │   ├── children/
│   │   ├── bookings/
│   │   └── attendance/
│   ├── booking/
│   │   └── [activityId]/
│   ├── partner/
│   │   └── dashboard/
│   └── auth/
├── components/
│   ├── ui/ (Shadcn)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── activity/
│   ├── booking/
│   └── common/
├── lib/
│   ├── api/
│   │   ├── activities.ts
│   │   ├── providers.ts
│   │   ├── bookings.ts
│   │   └── auth.ts
│   ├── stores/
│   │   ├── useAuthStore.ts
│   │   ├── useBookingStore.ts
│   │   └── useUIStore.ts
│   ├── utils/
│   └── constants/
├── types/
│   ├── index.ts
│   └── api.ts
└── public/
    ├── images/
    └── icons/
```

---

## 6. Design System

### Color System
```
Primary: #00C896 (Turquoise - Energy, Growth)
Secondary: #0F172A (Dark Slate - Trust, Professionalism)
Accent: #F59E0B (Amber - Warmth, Energy)
Success: #22C55E (Green - Positive, Growth)
Warning: #F97316 (Orange - Attention, Caution)
Background: #F8FAFC (Light Gray - Clean, Friendly)
```

### Typography
- **Display**: Inter Bold - Page titles, hero text
- **Heading**: Inter SemiBold - Section headers
- **Body**: Inter Regular - Paragraph text
- **Label**: Inter Medium - Form labels, captions

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

### Elevation
- Cards: shadow-sm (1px blur)
- Floating: shadow-md (8px blur)
- Modals: shadow-xl (24px blur)

### Motion
- Page transitions: 300ms ease-out
- Micro-interactions: 150ms ease-out
- Layout animations: framer-motion

---

## 7. State Management Architecture

### Zustand Stores

**Auth Store**
```typescript
- user: Parent | null
- isAuthenticated: boolean
- login: (credentials) => Promise<void>
- logout: () => void
- loadUser: () => Promise<void>
```

**Booking Store**
```typescript
- selectedActivity: Activity | null
- selectedDate: Date | null
- selectedTime: string | null
- step: 1-5
- reset: () => void
- setActivity: (activity) => void
- setDate: (date) => void
- setTime: (time) => void
- confirmBooking: () => Promise<Booking>
```

**UI Store**
```typescript
- theme: 'light' | 'dark'
- loadingStates: Record<string, boolean>
- filters: ActivityFilters
- viewMode: 'grid' | 'list' | 'map'
- toggleTheme: () => void
- setLoading: (key, value) => void
```

---

## 8. Mock Data Architecture

### Data Structure
```
/data/
├── generators/
│   ├── generateActivities.ts
│   ├── generateProviders.ts
│   ├── generateReviews.ts
│   └── generateDistricts.ts
├── fixtures/
│   ├── activities.json
│   ├── providers.json
│   ├── reviews.json
│   └── districts.json
└── mock-api.ts
```

### Kazakhstan-Specific Data
- **Districts**: 10 districts of Astana (administrative divisions)
- **Providers**: Realistic Kazakh names and branding
- **Activities**: Local sports clubs, art studios, language centers
- **Schedules**: Weekend-heavy scheduling common in Kazakhstan
- **Reviews**: Kazakh/Russian language content

### Mock API Layer
```typescript
- api.activities.getAll(filters)
- api.activities.getById(id)
- api.providers.getById(id)
- api.bookings.create(booking)
- api.bookings.cancel(id)
- api.auth.login(credentials)
- api.auth.register(data)
```

---

## Phases 2-7: Completed ✓

### Created Files
**Types:** `src/types/index.ts` - Full TypeScript schema
**Stores:** `src/lib/stores/useAuthStore.ts`, `useBookingStore.ts`, `useUIStore.ts`
**Mock Data:** `src/data/generators/` - 50 providers, 100 activities, reviews
**UI Components:** `src/components/ui/` - button, card, badge, input, select, label
**Layout:** `src/components/layout/` - Header, Footer
**Pages:** 
- `/` - Landing page with hero, categories, benefits, pricing
- `/catalog` - Activity catalog with filters
- `/activity/[id]` - Activity detail page
- `/auth/login`, `/auth/register` - Authentication
- `/dashboard` - Parent dashboard
- `/booking/[activityId]` - 5-step booking flow
- `/pricing` - Subscription plans
- `/partner` - Partner portal

### Brand Colors
- Primary: `#00C896` (Turquoise)
- Secondary: `#0F172A` (Dark Slate)
- Accent: `#F59E0B` (Amber)
- Success: `#22C55E` (Green)
- Warning: `#F97316` (Orange)