"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Activity, Review, Provider } from '@/types';
import { api } from '@/data/mock-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const activityData = await api.activities.getById(params.id);
      if (!activityData) return;

      const providerData = await api.providers.getById(activityData.providerId);
      const reviews = await Promise.resolve(
        Array.from({ length: 5 }).map((_, i) => ({
          id: `rev-${i}`,
          parentId: `parent-${i}`,
          rating: 4 + Math.random(),
          comment: "Отличные занятия! Ребенок рад потому что может заниматься любимым делом.",
          date: new Date().toISOString().split('T')[0],
        }))
      );

      setActivity({ ...activityData, reviews });
      setProvider(providerData);
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <img
            src={activity.photos[0]}
            alt={activity.title}
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-balaqai-secondary mb-4">
            {activity.title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-balaqai-accent text-balaqai-accent" />
              <span className="font-medium">{activity.rating}</span>
              <span className="text-slate-500">({activity.reviews.length} отзывов)</span>
            </div>
            <Badge variant="secondary">{provider?.name}</Badge>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-5 h-5" />
              <span>{activity.location.district}, {activity.location.address}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Users className="w-5 h-5" />
              <span>{activity.ageMin}-{activity.ageMax} лет</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-5 h-5" />
              <span>{activity.schedule.length} занятий в неделю</span>
            </div>
          </div>

          <p className="text-slate-600 mb-6">{activity.description}</p>

          <div className="flex items-center gap-4 mb-6">
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