"use client";

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-balaqai-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-balaqai-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">BQ</span>
              </div>
              <span className="font-bold text-xl">BalaQai</span>
            </div>
            <p className="text-slate-300 text-sm">
              Единая платформа для детских занятий и семейного досуга в Казахстане
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Для родителей</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sections" className="text-slate-300 hover:text-white transition-colors">Каталог занятий</Link></li>
              <li><Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Тарифы</Link></li>
              <li><Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">Личный кабинет</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Для партнеров</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/partner" className="text-slate-300 hover:text-white transition-colors">Войти как партнер</Link></li>
              <li><Link href="/partner/dashboard" className="text-slate-300 hover:text-white transition-colors">Панель управления</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-300">+7 (777) 123-45-67</li>
              <li className="text-slate-300">info@balaqai.kz</li>
              <div className="flex gap-3 pt-2">
                <a href="#" className="text-slate-300 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
          © 2026 BalaQai. Все права защищены.
        </div>
      </div>
    </footer>
  );
}