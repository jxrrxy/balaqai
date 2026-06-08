"use client";

import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Heart, User, CreditCard, History, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  const menuItems = [
    { href: '/dashboard/profile', icon: User, title: 'Профиль', desc: 'Личные данные' },
    { href: '/dashboard/children', icon: User, title: 'Дети', desc: 'Профили детей' },
    { href: '/dashboard/bookings', icon: Calendar, title: 'Записи', desc: 'Активные и будущие' },
    { href: '/dashboard/subscription', icon: CreditCard, title: 'Подписка', desc: 'Баланс визитов' },
    { href: '/dashboard/favorites', icon: Heart, title: 'Избранное', desc: 'Сохраненные занятия' },
    { href: '/dashboard/attendance', icon: History, title: 'Посещения', desc: 'История записей' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-balaqai-secondary mb-2">
          Добро пожаловать, {user?.name?.split(' ')[0] || 'Родитель'}!
        </h1>
        <p className="text-slate-600">Управляйте занятиями и подпиской</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-balaqai-primary/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-balaqai-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-balaqai-secondary">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t">
        <Button variant="outline" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
}