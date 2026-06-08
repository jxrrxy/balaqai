import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    { visits: 12, price: 12000, popular: false, color: 'border-slate-200' },
    { visits: 20, price: 18000, popular: true, color: 'border-balaqai-primary' },
    { visits: 36, price: 32000, popular: false, color: 'border-slate-200' },
    { visits: 60, price: 49000, popular: false, color: 'border-slate-200' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-balaqai-secondary mb-4">
          Тарифы на подписку
        </h1>
        <p className="text-slate-600 max-w-md mx-auto">
          Одна подписка на все занятия. Выбирайте подходящий тариф
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.visits}
            className={`p-6 ${plan.color} ${plan.popular ? 'ring-2 ring-balaqai-primary' : ''}`}
          >
            {plan.popular && (
              <div className="bg-balaqai-primary text-white text-xs font-medium px-2 py-1 rounded-full w-fit mb-2">
                Популярный
              </div>
            )}
            <h3 className="text-3xl font-bold text-balaqai-secondary mb-2">
              {plan.visits} визитов
            </h3>
            <div className="text-3xl font-bold text-balaqai-primary mb-4">
              {plan.price.toLocaleString()} ₸
            </div>
            <ul className="space-y-2 mb-6">
              {['Неограниченное количество занятий', 'Запись онлайн', 'QR-код для входа', 'Семейный аккаунт'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-balaqai-success" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth/register">
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                Выбрать тариф
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}