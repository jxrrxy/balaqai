import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3, Calendar, Users, QrCode } from 'lucide-react';

export default function PartnerPage() {
  const features = [
    { icon: BarChart3, title: 'Аналитика', href: '/partner/analytics', desc: 'Статистика и доходы' },
    { icon: Calendar, title: 'Расписание', href: '/partner/schedule', desc: 'Управление занятиями' },
    { icon: Users, title: 'Записи', href: '/partner/bookings', desc: 'Записавшиеся дети' },
    { icon: QrCode, title: 'Посещения', href: '/partner/attendance', desc: 'Отметки входа' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-balaqai-secondary mb-4">
            Партнерский кабинет
          </h1>
          <p className="text-slate-600">Для организаторов детских занятий</p>
        </div>

        <Card className="p-6 mb-6">
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="partner@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Пароль</label>
              <input type="password" className="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="••••••••" />
            </div>
            <Button className="w-full">Войти как партнер</Button>
          </form>
        </Card>

        <Link href="/dashboard">
          <Button variant="outline" className="w-full">
            Войти как родитель
          </Button>
        </Link>
      </div>
    </div>
  );
}