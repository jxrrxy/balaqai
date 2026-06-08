"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Activity, ActivityFilters, Category } from '@/types';
import { api } from '@/data/mock-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/types';
import { Grid, List, Map, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function CatalogPage() {
  return (
    <Suspense fallback={(
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-64 animate-pulse shadow-sm" />
          ))}
        </div>
      </div>
    )}>
      <CatalogContent />
    </Suspense>
  );
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [filters, setFilters] = useState<ActivityFilters>({
    category: searchParams.get('category') as Category | undefined,
  });

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const data = await api.activities.getAll(filters);
      setActivities(data);
      setLoading(false);
    };
    fetchActivities();
  }, [filters]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-64 animate-pulse shadow-sm" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input placeholder="Поиск занятий..." className="pl-10" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Select
            value={filters.category || ''}
            onValueChange={(v) => setFilters({ ...filters, category: v as Category || undefined })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все категории</SelectItem>
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <SelectItem key={key} value={key}>
                  {cat.nameKk}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex rounded-lg border border-slate-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-balaqai-primary text-white' : ''}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-balaqai-primary text-white' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded ${viewMode === 'map' ? 'bg-balaqai-primary text-white' : ''}`}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Link key={activity.id} href={`/activity/${activity.id}`}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                <img
                  src={activity.photos[0]}
                  alt={activity.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-balaqai-secondary mb-1 line-clamp-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-2">{activity.location.district}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-balaqai-primary font-medium">
                      {formatPrice(activity.price * 1000)} / месяц
                    </span>
                    <span className="text-sm text-slate-500">{activity.ageMin}-{activity.ageMax} лет</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}