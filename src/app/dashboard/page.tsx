"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AvatarUploader } from '@/components/PhotoUploader';
import { Calendar, Heart, User, CreditCard, History, LogOut, Camera } from 'lucide-react';

const AVATAR_STORAGE_KEY = 'balaqai-avatar';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  // Load saved avatar from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (saved) setAvatar(saved);
  }, []);

  const handleAvatarChange = (dataUrl: string) => {
    setAvatar(dataUrl || undefined);
    if (dataUrl) {
      localStorage.setItem(AVATAR_STORAGE_KEY, dataUrl);
    } else {
      localStorage.removeItem(AVATAR_STORAGE_KEY);
    }
  };

  const menuItems = [
    { href: '/dashboard/profile', icon: User, title: 'Профиль', desc: 'Личные данные' },
    { href: '/dashboard/children', icon: User, title: 'Дети', desc: 'Профили детей' },
    { href: '/dashboard/bookings', icon: Calendar, title: 'Записи', desc: 'Активные и будущие' },
    { href: '/dashboard/subscription', icon: CreditCard, title: 'Подписка', desc: 'Баланс визитов' },
    { href: '/dashboard/favorites', icon: Heart, title: 'Избранное', desc: 'Сохраненные занятий' },
    { href: '/dashboard/attendance', icon: History, title: 'Посещения', desc: 'История записей' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* User greeting with avatar */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
        <AvatarUploader
          currentAvatar={avatar}
          onChange={handleAvatarChange}
          size={80}
        />
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-balaqai-secondary mb-1">
            Добро пожаловать, {user?.name?.split(' ')[0] || 'Родитель'}!
          </h1>
          <p className="text-sm sm:text-base text-slate-600">Управляйте занятиями и подпиской</p>
          {user?.email && (
            <p className="text-xs text-slate-400 mt-1">{user.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-balaqai-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-balaqai-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-balaqai-secondary text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 truncate">{item.desc}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
        <Button variant="outline" onClick={logout} className="w-full sm:w-auto">
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
}
