"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Activity, ActivityFilters, Category } from '@/types';
import { api } from '@/data/mock-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/types';
import { Grid, List, Map, Search, Filter, X, Star } from 'lucide-react';
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

const RATING_OPTIONS = [
  { label: 'Любой рейтинг', value: '' },
  { label: '4.5+ ⭐', value: '4.5' },
  { label: '4.0+ ⭐', value: '4.0' },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState<ActivityFilters>({
    category: searchParams.get('category') as Category | undefined,
  });

  // Fetch when filters change
  useEffect(() => {
    let cancelled = false;
    const fetchActivities = async () => {
      setLoading(true);
      const data = await api.activities.getAll(filters);
      if (!cancelled) {
        setActivities(data);
        setLoading(false);
      }
    };
    fetchActivities();
    return () => { cancelled = true; };
  }, [filters]);

  // Debounced search: update filters.search 400ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput.trim() || undefined,
      }));
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const activeFilterCount = [
    filters.category,
    filters.rating,
    filters.priceMin?.toString(),
    filters.priceMax?.toString(),
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchInput('');
    setFilters({ category: undefined });
  };

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
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Search + filter toggle row */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Поиск занятий..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="relative shrink-0"
          >
            <Filter className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-balaqai-primary text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
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

      {/* Expanded filters: rating + price */}
      {showFilters && (
        <div className="mb-4 sm:mb-6 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="flex flex-wrap items-end gap-3 sm:gap-4">
            {/* Rating filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500">Рейтинг</label>
              <Select
                value={filters.rating?.toString() || ''}
                onValueChange={(v) =>
                  setFilters({ ...filters, rating: v ? Number(v) : undefined })
                }
              >
                <SelectTrigger className="w-36 sm:w-40">
                  <SelectValue placeholder="Любой" />
                </SelectTrigger>
                <SelectContent>
                  {RATING_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price min */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500">Цена от (тыс. ₸)</label>
              <Input
                type="number"
                min={0}
                placeholder="5"
                value={filters.priceMin?.toString() || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceMin: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-28 sm:w-32"
              />
            </div>

            {/* Price max */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500">Цена до (тыс. ₸)</label>
              <Input
                type="number"
                min={0}
                placeholder="20"
                value={filters.priceMax?.toString() || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceMax: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-28 sm:w-32"
              />
            </div>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-slate-500 hover:text-red-500"
              >
                <X className="w-4 h-4 mr-1" />
                Сбросить
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">
        {activities.length} {activities.length === 1 ? 'занятие' : activities.length >= 2 && activities.length <= 4 ? 'занятия' : 'занятий'}
        {(searchInput || activeFilterCount > 0) && ' найдено'}
      </p>

      {viewMode === 'grid' && (
        <>
          {activities.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Ничего не найдено</h3>
              <p className="text-slate-500 mb-6">Попробуйте изменить параметры поиска или сбросьте фильтры</p>
              <Button variant="outline" onClick={clearAllFilters}>
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {activities.map((activity) => (
                <Link key={activity.id} href={`/activity/${activity.id}`}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={activity.photos[0]}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {/* Rating badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-amber-500 shadow-sm">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {activity.rating}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-balaqai-secondary mb-1 line-clamp-2 text-sm sm:text-base">
                        {activity.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mb-2">{activity.location.district}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-balaqai-primary font-medium text-sm sm:text-base">
                          {formatPrice(activity.price * 1000)} / месяц
                        </span>
                        <span className="text-xs sm:text-sm text-slate-500">{activity.ageMin}-{activity.ageMax} лет</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {viewMode === 'list' && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">Список — скоро</h3>
          <p className="text-slate-500">Режим списка будет добавлен позже</p>
        </div>
      )}

      {viewMode === 'map' && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">Карта — скоро</h3>
          <p className="text-slate-500">Карта с занятиями будет добавлена позже</p>
        </div>
      )}
    </div>
  );
}
