"use client";

import { useState, useEffect, useMemo } from "react";
import { Activity, Category } from "@/types";
import { CATEGORIES } from "@/types";
import { api } from "@/data/mock-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MapPin,
  Users,
  Search,
  SlidersHorizontal,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";

/* ─────────────── AGE RANGES ─────────────── */

const AGE_RANGES = [
  { label: "Все возраста", value: "" },
  { label: "3–5 лет", value: "3-5" },
  { label: "5–7 лет", value: "5-7" },
  { label: "7–10 лет", value: "7-10" },
  { label: "10+ лет", value: "10+" },
];

function parseAgeRange(value: string): { min?: number; max?: number } | null {
  if (!value) return null;
  if (value === "10+") return { min: 10 };
  const [min, max] = value.split("-").map(Number);
  return { min, max };
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function SectionsPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [districts, setDistricts] = useState<{ id: string; nameKk: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  /* Filters */
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [ageFilter, setAgeFilter] = useState<string>("");
  const [districtFilter, setDistrictFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const [acts, dists] = await Promise.all([
        api.activities.getAll(),
        api.districts.getAll(),
      ]);
      setActivities(acts);
      setDistricts(dists);
      setLoading(false);
    };
    fetch();
  }, []);

  /* ─── Filtered results ─── */

  const filteredActivities = useMemo(() => {
    let result = [...activities];

    // Category filter
    if (categoryFilter) {
      result = result.filter((a) => a.category === categoryFilter);
    }

    // Search by name
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((a) => a.title.toLowerCase().includes(q));
    }

    // Age range filter
    const ageRange = parseAgeRange(ageFilter);
    if (ageRange) {
      result = result.filter((a) => {
        if (ageRange.min !== undefined && a.ageMax < ageRange.min) return false;
        if (ageRange.max !== undefined && a.ageMin > ageRange.max) return false;
        return true;
      });
    }

    // District filter
    if (districtFilter) {
      result = result.filter((a) => a.location.district === districtFilter);
    }

    return result;
  }, [activities, searchQuery, categoryFilter, ageFilter, districtFilter]);

  /* ─── Active filter count ─── */

  const activeFilterCount = [
    categoryFilter,
    ageFilter,
    districtFilter,
  ].filter(Boolean).length;

  /* ─── Render ─── */

  return (
    <div className="flex flex-col">
      {/* ════════════════════════════════════════════════ */}
      {/* PAGE HEADER */}
      {/* ════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
            Все секции
          </h1>
          <p className="text-base text-slate-500 max-w-2xl">
            {loading
              ? "Загружаем занятия..."
              : `${filteredActivities.length} ${
                  filteredActivities.length === 1
                    ? "занятие"
                    : filteredActivities.length >= 2 &&
                      filteredActivities.length <= 4
                    ? "занятия"
                    : "занятий"
                } для вашего ребенка`}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* FILTERS BAR */}
      {/* ════════════════════════════════════════════════ */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          {/* Search + filter toggle row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-2xl bg-slate-50 border-slate-200 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`rounded-2xl h-10 gap-2 text-sm ${
                activeFilterCount > 0
                  ? "border-sky-300 text-sky-500 bg-sky-50"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Фильтры
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-3">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px] rounded-2xl bg-slate-50 border-slate-200 h-10 text-sm">
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

              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="w-full sm:w-[160px] rounded-2xl bg-slate-50 border-slate-200 h-10 text-sm">
                  <SelectValue placeholder="Возраст" />
                </SelectTrigger>
                <SelectContent>
                  {AGE_RANGES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={districtFilter}
                onValueChange={setDistrictFilter}
              >
                <SelectTrigger className="w-full sm:w-[200px] rounded-2xl bg-slate-50 border-slate-200 h-10 text-sm">
                  <SelectValue placeholder="Район" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все районы</SelectItem>
                  {districts.map((d) => (
                    <SelectItem key={d.id} value={d.nameKk}>
                      {d.nameKk}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* ACTIVITY GRID */}
      {/* ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 animate-pulse"
              >
                <div className="h-48 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-slate-200 rounded-full w-24" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-10 bg-slate-200 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-slate-500 mb-6">
              Попробуйте изменить параметры поиска или сбросьте фильтры
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("");
                setAgeFilter("");
                setDistrictFilter("");
              }}
              className="rounded-2xl"
            >
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredActivities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activity/${activity.id}`}
                className="group"
              >
                <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.photos[0]}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm">
                        {CATEGORIES[activity.category]?.nameKk || activity.category}
                      </span>
                    </div>
                    {/* Rating pill */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-amber-500 shadow-sm">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {activity.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-800 mb-3 line-clamp-2 leading-snug min-h-[2.5rem]">
                      {activity.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{activity.location.district}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>
                          {activity.ageMin}–{activity.ageMax} лет
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "KZT",
                          minimumFractionDigits: 0,
                        }).format(activity.price * 1000)}{" "}
                        / мес
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky-500 group-hover:gap-2 transition-all">
                        Подробнее
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Count info */}
        {!loading && filteredActivities.length > 0 && (
          <div className="text-center mt-10 text-sm text-slate-400">
            Показано {filteredActivities.length} из {activities.length} занятий
          </div>
        )}
      </section>
    </div>
  );
}