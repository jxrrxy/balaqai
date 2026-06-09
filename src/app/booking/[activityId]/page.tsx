"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBookingStore } from '@/lib/stores/useBookingStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Activity } from '@/types';
import { api } from '@/data/mock-api';
import { ChevronLeft, ChevronRight, QrCode, Calendar, Clock, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function BookingPage({ params }: { params: { activityId: string } }) {
  const router = useRouter();
  const {
    step,
    selectedActivity,
    selectedDate,
    selectedTime,
    setActivity,
    setDate,
    setTime,
    nextStep,
    prevStep,
    confirmBooking,
  } = useBookingStore();
  const [activity, setActivityState] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await api.activities.getById(params.activityId);
      if (data) {
        setActivityState(data);
        setActivity(data);
      }
      setLoading(false);
    };
    load();
  }, [params.activityId, setActivity]);

  const steps = [
    { title: 'Выбор занятия', desc: 'Выберите деятельность' },
    { title: 'Выбор даты', desc: 'Выберите подходящий день' },
    { title: 'Выбор времени', desc: 'Выберите время' },
    { title: 'Подтверждение', desc: 'Проверьте данные' },
    { title: 'QR код', desc: 'Получите код' },
  ];

  const handleNext = async () => {
    if (step === 4) {
      setSubmitting(true);
      try {
        await confirmBooking();
        nextStep();
      } finally {
        setSubmitting(false);
      }
    } else if (step === 5) {
      router.push('/dashboard');
    } else {
      nextStep();
    }
  };

  const canProceed = () => {
    if (step === 1) return !!selectedActivity;
    if (step === 2) return !!selectedDate;
    if (step === 3) return !!selectedTime;
    if (step === 4) return !!selectedActivity && !!selectedDate && !!selectedTime;
    return true;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6" />
          <div className="h-64 bg-white rounded-xl animate-pulse shadow-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Link href={`/activity/${params.activityId}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-balaqai-secondary">
            Запись на занятие
          </h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 px-1">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors text-xs sm:text-sm ${
                  i + 1 <= step ? 'bg-balaqai-primary text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {i + 1 < step ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : i + 1}
              </div>
              <span className="text-[10px] sm:text-xs mt-1 hidden sm:block">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <StepContent
            step={step}
            activity={activity}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={setDate}
            onSelectTime={setTime}
          />
        </Card>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep} className="flex-shrink-0">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Назад</span>
            </Button>
          )}
          <Button
            className="flex-1"
            onClick={handleNext}
            disabled={!canProceed() || submitting}
          >
            {submitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                <span className="hidden sm:inline">Сохранение...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : step === 5 ? (
              'Готово'
            ) : step === 4 ? (
              <>
                <span className="hidden sm:inline">Подтвердить запись</span>
                <span className="sm:hidden">Подтвердить</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Далее</span>
                <span className="sm:hidden">Далее</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StepContent({
  step,
  activity,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: {
  step: number;
  activity: Activity | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
}) {
  switch (step) {
    case 1:
      if (!activity) {
        return <div className="text-center py-8 text-slate-500">Занятие не найдено</div>;
      }
      return (
        <div>
          <h3 className="font-semibold text-lg mb-4">Выбранное занятие</h3>
          <img
            src={activity.photos[0]}
            alt={activity.title}
            className="w-full h-32 sm:h-40 object-cover rounded-xl mb-4"
          />
          <h4 className="font-bold text-balaqai-secondary text-lg mb-2">{activity.title}</h4>
          <p className="text-slate-500 text-sm mb-3">{activity.location.district}</p>
          <div className="flex items-center justify-between">
            <span className="text-balaqai-primary font-semibold">
              {formatPrice(activity.price * 1000)} / месяц
            </span>
            <span className="text-sm text-slate-500">
              {activity.ageMin}–{activity.ageMax} лет
            </span>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-balaqai-primary" />
            Выберите дату
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
            {Array.from({ length: 14 }).map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={i}
                  onClick={() => onSelectDate(date)}
                  className={`p-1.5 sm:p-2 border rounded-lg text-center transition-colors ${
                    isSelected
                      ? 'bg-balaqai-primary text-white border-balaqai-primary'
                      : 'hover:bg-balaqai-primary/10 border-slate-200'
                  }`}
                >
                  <div className="text-[10px] sm:text-xs">
                    {date.toLocaleDateString('ru', { weekday: 'short' })}
                  </div>
                  <div className="font-medium text-sm sm:text-base">{date.getDate()}</div>
                </button>
              );
            })}
          </div>
          {selectedDate && (
            <p className="text-sm text-slate-500 mt-3">
              Выбрано: {selectedDate.toLocaleDateString('ru', { day: 'numeric', month: 'long', weekday: 'long' })}
            </p>
          )}
        </div>
      );
    case 3:
      return (
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-balaqai-primary" />
            Выберите время
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {['10:00', '11:30', '14:00', '15:30', '17:00', '18:30'].map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`p-3 border rounded-lg transition-colors text-sm sm:text-base ${
                    isSelected
                      ? 'bg-balaqai-primary text-white border-balaqai-primary'
                      : 'hover:bg-balaqai-primary/10 border-slate-200'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
          {selectedTime && (
            <p className="text-sm text-slate-500 mt-3">
              Выбрано: {selectedTime}
            </p>
          )}
        </div>
      );
    case 4:
      return (
        <div>
          <h3 className="font-semibold text-lg mb-4">Подтверждение записи</h3>
          {activity && (
            <div className="space-y-3 bg-slate-50 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-slate-500 text-sm">Занятие:</span>
                <span className="font-medium text-right text-sm">{activity.title}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-slate-500 text-sm">Дата:</span>
                <span className="font-medium text-sm">
                  {selectedDate
                    ? selectedDate.toLocaleDateString('ru', { day: 'numeric', month: 'long', weekday: 'long' })
                    : '—'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-slate-500 text-sm">Время:</span>
                <span className="font-medium text-sm">{selectedTime || '—'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-slate-500 text-sm">Цена:</span>
                <span className="font-medium text-balaqai-primary text-sm">
                  {formatPrice(activity.price * 1000)} / месяц
                </span>
              </div>
            </div>
          )}
        </div>
      );
    case 5:
      return (
        <div className="text-center py-8">
          <QrCode className="w-24 h-24 mx-auto mb-4 text-balaqai-primary" />
          <h3 className="font-semibold text-lg mb-2">QR код готов!</h3>
          <p className="text-slate-600 mb-2">Запись подтверждена</p>
          {selectedDate && selectedTime && (
            <p className="text-sm text-slate-500">
              {selectedDate.toLocaleDateString('ru', { day: 'numeric', month: 'long' })} в {selectedTime}
            </p>
          )}
        </div>
      );
    default:
      return null;
  }
}
