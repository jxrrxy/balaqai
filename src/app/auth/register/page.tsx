"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { CATEGORIES, Category, Activity } from '@/types';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: `${formData.get('parentName')} ${formData.get('parentSurname')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
      child: {
        name: formData.get('childName') as string,
        birthDate: formData.get('birthDate') as string,
        interests: ['sports' as Category],
        currentActivities: [] as Activity[],
      },
    };

    await register(data);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-balaqai-secondary mb-2">
            Создать аккаунт
          </h1>
          <p className="text-slate-600">Начните с первого бесплатного месяца</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parentName">Имя</Label>
              <Input id="parentName" name="parentName" required disabled={isLoading} />
            </div>
            <div>
              <Label htmlFor="parentSurname">Фамилия</Label>
              <Input id="parentSurname" name="parentSurname" required disabled={isLoading} />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required disabled={isLoading} />
          </div>

          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" name="phone" type="tel" required disabled={isLoading} />
          </div>

          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" name="password" type="password" required disabled={isLoading} />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Данные ребенка</h3>
            <div>
              <Label htmlFor="childName">Имя ребенка</Label>
              <Input id="childName" name="childName" required disabled={isLoading} />
            </div>
            <div className="mt-4">
              <Label htmlFor="birthDate">Дата рождения</Label>
              <Input id="birthDate" name="birthDate" type="date" required disabled={isLoading} />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Создать аккаунт'}
          </Button>

          <p className="text-center text-sm text-slate-600">
            Есть аккаунт?{' '}
            <Link href="/auth/login" className="text-balaqai-primary hover:underline">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}