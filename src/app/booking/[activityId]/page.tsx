"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBookingStore } from '@/lib/stores/useBookingStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, QrCode } from 'lucide-react';

export default function BookingPage({ params }: { params: { activityId: string } }) {
  const router = useRouter();
  const { step, setActivity, nextStep, prevStep } = useBookingStore();

  const steps = [
    { title: 'Выбор занятия', desc: 'Выберите деятельность' },
    { title: 'Выбор даты', desc: 'Выберите подходящий день' },
    { title: 'Выбор времени', desc: 'Выберите время' },
    { title: 'Подтверждение', desc: 'Проверьте данные' },
    { title: 'QR код', desc: 'Получите код' },
  ];

  const handleNext = () => {
    if (step === 5) {
      router.push('/dashboard/bookings');
    } else {
      nextStep();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/catalog">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-balaqai-secondary">
            Запись на занятие
          </h1>
        </div>

        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i + 1 <= step ? 'bg-balaqai-primary text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {i + 1}
              </div>
              <span className="text-xs mt-1 hidden sm:block">{s.title}</span>
            </div>
          ))}
        </div>

        <Card className="p-6 mb-6">
          <StepContent step={step} activityId={params.activityId} />
        </Card>

        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Назад
            </Button>
          )}
          <Button className="flex-1" onClick={handleNext}>
            {step === 5 ? 'Готово' : 'Далее'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StepContent({ step, activityId }: { step: number; activityId: string }) {
  switch (step) {
    case 1:
      return <div className="text-center py-8">Загрузка занятия...</div>;
    case 2:
      return (
        <div>
          <h3 className="font-semibold mb-4">Выберите дату</h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 14 }).map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              return (
                <button
                  key={i}
                  className="p-2 border rounded-lg hover:bg-balaqai-primary/10 text-center"
                >
                  <div className="text-xs">{date.toLocaleDateString('ru', { weekday: 'short' })}</div>
                  <div className="font-medium">{date.getDate()}</div>
                </button>
              );
            })}
          </div>
        </div>
      );
    case 3:
      return (
        <div>
          <h3 className="font-semibold mb-4">Выберите время</h3>
          <div className="grid grid-cols-3 gap-2">
            {['10:00', '11:30', '14:00', '15:30', '17:00', '18:30'].map((time) => (
              <button
                key={time}
                className="p-3 border rounded-lg hover:bg-balaqai-primary/10"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="text-center py-8">
          <h3 className="font-semibold mb-2">Подтверждение записи</h3>
          <p className="text-slate-600">Проверьте данные и подтвердите запись</p>
        </div>
      );
    case 5:
      return (
        <div className="text-center py-8">
          <QrCode className="w-24 h-24 mx-auto mb-4 text-balaqai-primary" />
          <h3 className="font-semibold mb-2">QR код готов!</h3>
          <p className="text-slate-600">Покажите код на входе</p>
        </div>
      );
    default:
      return null;
  }
}