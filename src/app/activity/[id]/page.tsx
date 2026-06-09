"use client";

import { useEffect, useState, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { Activity, Provider, Review } from '@/types';
import { api } from '@/data/mock-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PhotoUploader } from '@/components/PhotoUploader';
import { Star, MapPin, Users, Calendar, Pencil, X } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

const PHOTOS_STORAGE_KEY_PREFIX = 'balaqai-activity-photos-';

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPhotos, setEditPhotos] = useState(false);

  // Load custom photos from localStorage
  const getStoredPhotos = useCallback((id: string) => {
    try {
      const stored = localStorage.getItem(`${PHOTOS_STORAGE_KEY_PREFIX}${id}`);
      return stored ? JSON.parse(stored) as string[] : null;
    } catch {
      return null;
    }
  }, []);

  const savePhotos = useCallback((id: string, photos: string[]) => {
    localStorage.setItem(`${PHOTOS_STORAGE_KEY_PREFIX}${id}`, JSON.stringify(photos));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      const activityData = await api.activities.getById(params.id);
      if (!activityData) return;

      const providerData = await api.providers.getById(activityData.providerId);

      if (!cancelled) {
        // Override photos if user has uploaded custom ones
        const customPhotos = getStoredPhotos(params.id);
        if (customPhotos && customPhotos.length > 0) {
          activityData.photos = customPhotos;
        }

        setActivity(activityData);
        setProvider(providerData);
        setReviews(
          Array.from({ length: 5 }).map((_, i) => ({
            id: `rev-${i}`,
            parentId: `parent-${i}`,
            rating: Number((4 + Math.random()).toFixed(1)),
            comment: "Отличные занятия! Ребёнок рад потому что может заниматься любимым делом.",
            date: new Date().toISOString().split('T')[0],
          }))
        );
        setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [params.id, getStoredPhotos]);

  const handlePhotosChange = useCallback(
    (photos: string[]) => {
      if (!activity) return;
      setActivity({ ...activity, photos });
      savePhotos(params.id, photos);
    },
    [activity, params.id, savePhotos]
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-96 bg-slate-200 rounded-xl" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!activity) return notFound();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Photo gallery + main info */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* Photo section */}
        <div>
          {/* Main photo */}
          <div className="relative rounded-xl overflow-hidden mb-3">
            <img
              src={activity.photos[0]}
              alt={activity.title}
              className="w-full h-48 sm:h-64 lg:h-80 object-cover"
            />
            <button
              onClick={() => setEditPhotos(!editPhotos)}
              className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
            >
              {editPhotos ? (
                <X className="w-4 h-4 text-slate-600" />
              ) : (
                <Pencil className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>

          {/* Photo uploader (when editing) */}
          {editPhotos && (
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Управление фотографиями
              </h3>
              <PhotoUploader
                photos={activity.photos}
                onChange={handlePhotosChange}
                maxPhotos={6}
                variant="grid"
                size={100}
              />
              <p className="text-xs text-slate-400 mt-2">
                Перетащите фото или нажмите для загрузки. Максимум 6 фото.
              </p>
            </div>
          )}

          {/* Thumbnail strip (when not editing) */}
          {!editPhotos && activity.photos.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {activity.photos.slice(1, 4).map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`${activity.title} ${i + 2}`}
                  className="w-full h-20 sm:h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-balaqai-secondary mb-3 sm:mb-4">
            {activity.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-balaqai-accent text-balaqai-accent" />
              <span className="font-medium">{activity.rating}</span>
              <span className="text-slate-500">({reviews.length} отзывов)</span>
            </div>
            {provider && (
              <Badge variant="secondary">{provider.name}</Badge>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>{activity.location.district}, {activity.location.address}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Users className="w-5 h-5 shrink-0" />
              <span>{activity.ageMin}-{activity.ageMax} лет</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-5 h-5 shrink-0" />
              <span>{activity.schedule.length} занятий в неделю</span>
            </div>
          </div>

          <p className="text-slate-600 mb-6">{activity.description}</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
            <span className="text-2xl font-bold text-balaqai-primary">
              {formatPrice(activity.price * 1000)} / месяц
            </span>
            <Badge className="bg-green-100 text-green-800">В наличии</Badge>
          </div>

          <Link href={`/booking/${activity.id}`}>
            <Button size="lg" className="w-full sm:w-auto">
              Записаться
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
