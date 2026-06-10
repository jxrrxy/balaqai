"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MapPin,
  CreditCard,
  Sparkles,
  Star,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

/* ─────────────── MOCK DATA ─────────────── */

const FEATURES = [
  {
    icon: Sparkles,
    title: "Все в одном месте",
    desc: "Спорт, творчество, языки, IT — 100+ секций на любой вкус и возраст. Больше не нужно искать по всему городу.",
    bg: "bg-sky-50",
    accent: "text-sky-400",
    illustration: "🎪",
  },
  {
    icon: CreditCard,
    title: "Удобная оплата",
    desc: "Платите раз в месяц и посещайте сколько хотите. Рассрочка 0% и заморозка абонемента на каникулы.",
    bg: "bg-amber-50",
    accent: "text-amber-400",
    illustration: "💳",
  },
  {
    icon: MapPin,
    title: "Рядом с домом",
    desc: "Секции в вашем районе — школы, садики, спортивные клубы. Среднее расстояние — 15 минут от дома.",
    bg: "bg-sky-50",
    accent: "text-sky-400",
    illustration: "📍",
  },
];

const CATEGORY_CARDS = [
  {
    title: "Спортивные секции",
    count: "42 секции",
    gradient: "from-blue-50 to-cyan-50",
    icon: "⚽",
    images: [
      "/спортивная лекция1.jpg",
      "/спортивная лекция2.jpg",
    ],
    color: "text-blue-500",
    bgIcon: "bg-blue-100",
  },
  {
    title: "Водные виды спорта",
    count: "18 секций",
    gradient: "from-teal-50 to-emerald-50",
    icon: "🏊",
    images: [
      "/водные виды спорта1.jpeg",
      "/водные виды спорта2.jpeg",
    ],
    color: "text-teal-500",
    bgIcon: "bg-teal-100",
  },
  {
    title: "Танцы и гимнастика",
    count: "36 секций",
    gradient: "from-sky-50 to-indigo-50",
    icon: "💃",
    images: [
      "/танцы и гимнастика1.jpg",
      "/танцы и гимнастика2.jpg",
    ],
    color: "text-sky-500",
    bgIcon: "bg-sky-100",
  },
];

const TESTIMONIALS = [
  {
    name: "Айгерим",
    child: "мама Данияра, 7 лет",
    text: "Сын ходит на плавание и робототехнику. Раньше возила в разные концы города, а теперь всё в одном абонементе и рядом с домом!",
    rating: 5,
    avatar: "👩",
  },
  {
    name: "Марат",
    child: "папа Алины, 5 лет",
    text: "Дочка попробовала гимнастику, танцы и рисование — остановилась на гимнастике. Спасибо, что не нужно покупать абонемент в каждый клуб отдельно.",
    rating: 5,
    avatar: "👨",
  },
  {
    name: "Алия",
    child: "мама двоих детей",
    text: "У меня двое, и каждый хочет своё. BalaQai спасает: оба ребёнка занимаются по одной карте, и я вижу расписание в приложении.",
    rating: 5,
    avatar: "👩‍🦰",
  },
];

const FAQ_ITEMS = [
  {
    q: "Как работает абонемент?",
    a: "Оплачиваете один раз в месяц и посещаете любые секции из каталога без ограничений. Можно ходить на плавание, гимнастику и танцы — всё включено.",
  },
  {
    q: "Можно ли заморозить абонемент?",
    a: "Конечно. Если уезжаете в отпуск или на каникулы — заморозьте абонемент на срок до 30 дней. Пропущенные дни не сгорают.",
  },
  {
    q: "С какого возраста принимают детей?",
    a: "Мы подбираем секции от 1 года (плавание с мамой) до 14 лет. У каждого занятия указан возраст, так что вы легко найдёте подходящее.",
  },
];

/* ─────────────── COMPONENTS ─────────────── */

function FloatingBadge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute animate-float bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 px-4 py-3 flex items-center gap-3 ${className || ""}`}
    >
      {children}
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Floating badges around the phone */}
      <FloatingBadge className="-top-4 -right-8 hidden md:flex">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center text-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=80&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-xs text-slate-400">Ребёнок счастлив</div>
          <div className="text-sm font-bold text-slate-700">98%</div>
        </div>
      </FloatingBadge>

      <FloatingBadge className="top-1/4 -left-20 hidden lg:flex">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=80&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left">
          <div className="text-xs text-slate-400">Секций в каталоге</div>
          <div className="text-sm font-bold text-slate-700">100+</div>
        </div>
      </FloatingBadge>

      <FloatingBadge className="-bottom-4 -right-10 hidden md:flex">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center text-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=80&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-xs text-slate-400">Занятий сегодня</div>
          <div className="text-sm font-bold text-slate-700">324</div>
        </div>
      </FloatingBadge>

      {/* Phone body */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl border-[4px] border-slate-800 overflow-hidden aspect-[9/18]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-2xl z-10" />

        {/* Status bar */}
        <div className="pt-6 px-4 pb-2 flex justify-between items-center text-[10px] text-slate-500 font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-2 border border-slate-400 rounded-sm relative">
              <div className="absolute inset-0.5 right-0.5 bg-slate-400 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Phone screen content */}
        <div className="px-3 py-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800">Мои занятия</h3>
            <span className="text-[10px] text-sky-500 font-semibold">Сегодня</span>
          </div>

          {/* Activity card */}
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-3 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-sky-500 bg-white/70 px-2 py-0.5 rounded-full">
                Гимнастика
              </span>
              <Heart className="w-3 h-3 text-sky-300" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1">
              <MapPin className="w-2.5 h-2.5" />
              <span>Дворец спорта, 3 этаж</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Clock className="w-2.5 h-2.5" />
              <span>15:00 — 16:00</span>
            </div>
          </div>

          {/* Timeline items */}
          {[
            { time: "14:30", label: "Сбор в холле", done: true },
            { time: "15:00", label: "Гимнастика", done: true, active: true },
            { time: "16:00", label: "Растяжка", done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5">
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    item.done
                      ? "bg-sky-500 border-sky-500"
                      : "border-slate-300"
                  } ${item.active ? "ring-2 ring-sky-200" : ""}`}
                >
                  {item.done && (
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                  )}
                </div>
                {i < 2 && <div className="w-0.5 h-5 bg-slate-200" />}
              </div>
              <div>
                <div
                  className={`text-[10px] font-semibold ${
                    item.done ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-[9px] text-slate-400">{item.time}</div>
              </div>
            </div>
          ))}

          {/* Bottom tabs */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-around py-1.5 bg-slate-50 rounded-2xl">
            {[
              { icon: "🏠", active: true },
              { icon: "🔍" },
              { icon: "📅" },
              { icon: "👤" },
            ].map((tab, i) => (
              <div
                key={i}
                className={`text-sm ${tab.active ? "scale-110" : "opacity-40"}`}
              >
                {tab.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmojiMarquee() {
  const emojis = ["🏊", "⚽", "💃", "🎨", "🧸", "🤸", "🎭", "📚", "🤖", "🎵", "🥋", "🧘"];

  return (
    <div className="flex gap-2 overflow-hidden py-2 flex-wrap justify-center">
      {emojis.map((emoji, i) => (
        <span
          key={i}
          className="text-2xl md:text-3xl hover:scale-125 transition-transform duration-200 cursor-default"
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        {question}
        <ChevronRight
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-4 text-sm text-slate-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {/* ════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION */}
      {/* ════════════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto mt-4 md:mt-6 px-6 md:px-12 py-8 md:py-16 rounded-[2.5rem] bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          {/* Left: Text + CTAs — шире */}
          <div className="flex-[1.5] lg:max-w-[640px] text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 mb-6 shadow-lg border border-white/60"
                 style={{boxShadow: "0 4px 20px rgba(14,165,233,0.15)"}}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                   style={{background: "linear-gradient(135deg, #38BDF8, #0EA5E9)"}}>
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
              <span className="text-sm font-bold" style={{color: "#0EA5E9"}}>
                Выбор родителей №1 в Казахстане
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-800 leading-tight mb-5">
              Абонемент на все{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #38BDF8, #0EA5E9, #6366F1, #8B5CF6)",
                }}
              >
                детские секции
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Плавание, гимнастика, танцы, единоборства и еще десятки занятий для
              вашего ребенка в одной карте.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Button
                className="rounded-2xl px-8 py-4 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
                  color: "white",
                  border: "none",
                }}
              >
                Получить скидку
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Link href="/sections">
                <Button
                  variant="outline"
                  className="rounded-2xl px-8 py-4 text-base font-semibold border-2 border-white bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  Смотреть секции
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-slate-800">
                  100+
                </div>
                <div className="text-xs text-slate-500">секций</div>
              </div>
              <div className="w-px h-8 bg-slate-300" />
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-slate-800">
                  50+
                </div>
                <div className="text-xs text-slate-500">партнёров</div>
              </div>
              <div className="w-px h-8 bg-slate-300" />
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-slate-800">
                  5000+
                </div>
                <div className="text-xs text-slate-500">семей</div>
              </div>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex-[0.7] flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* 2. FEATURES — "Новый способ развивать ребенка" */}
      {/* ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
            Новый способ развивать ребенка
          </h2>
          <p className="text-base text-slate-500 leading-relaxed">
            Мы собрали лучшие детские секции города в одном абонементе, чтобы вы
            тратили меньше времени на поиск и больше — на радость от успехов ребенка.
          </p>
        </div>

        {/* Emoji row */}
        <div className="mb-10">
          <EmojiMarquee />
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className={`${feature.bg} rounded-[32px] p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
            >
              {/* Illustration area */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${feature.bg} shadow-sm border border-white/50`}
                  >
                    {feature.illustration}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Visual content per card */}
              {i === 0 && (
                <div className="flex -space-x-3 justify-center">
                  {["🏊", "⚽", "💃", "🎨", "🤖"].map((emoji, j) => (
                    <div
                      key={j}
                      className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-white/60 flex items-center justify-center text-xl hover:scale-110 transition-transform"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              )}
              {i === 1 && (
                <div className="bg-white/60 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Абонемент
                    </span>
                    <span className="text-xs text-slate-400">в месяц</span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-800 mb-1">
                    80 000 ₸
                  </div>
                  <div className="flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Рассрочка 0% на 3 месяца
                  </div>
                </div>
              )}
              {i === 2 && (
                <div className="bg-white/60 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="space-y-2">
                    {[
                      { dist: "Район Сарыарка", mins: "12 мин" },
                      { dist: "Район Алматы", mins: "15 мин" },
                      { dist: "Район Есиль", mins: "10 мин" },
                    ].map((item, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-sky-400" />
                          <span className="text-slate-600">{item.dist}</span>
                        </div>
                        <span className="font-semibold text-slate-700">
                          {item.mins}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* 3. CATEGORIES — "Собрали все направления" */}
      {/* ════════════════════════════════════════════════ */}
      <section className="bg-slate-50/80 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
              Собрали все направления для детей
            </h2>
            <p className="text-base text-slate-500">
              От грудничкового плавания до IT-курсов — выбирайте то, что нравится
              вашему ребенку
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORY_CARDS.map((cat, i) => (
              <Link key={i} href="/sections" className="group">
                <div
                  className={`bg-gradient-to-br ${cat.gradient} rounded-[32px] p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  {/* Images */}
                  <div className="flex -space-x-3 mb-5">
                    {cat.images.map((src, j) => (
                      <div
                        key={j}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-white/60 shadow-sm"
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {cat.images.length === 1 && (
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/40 border-2 border-white/60 flex items-center justify-center text-2xl shadow-sm">
                        {cat.icon}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-sm font-bold text-slate-600 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Смотреть все <ArrowRight className="w-3.5 h-3.5" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* 4. TESTIMONIALS / ОТЗЫВЫ */}
      {/* ════════════════════════════════════════════════ */}
      <section
        id="testimonials"
        className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24"
      >
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
            Родители нас любят ❤️
          </h2>
          <p className="text-base text-slate-500">
            Уже 5 000+ семей открыли для себя удобный способ детских занятий
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <div className="text-sm font-bold text-slate-700">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.child}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* 5. FAQ */}
      {/* ════════════════════════════════════════════════ */}
      <section
        id="faq"
        className="bg-gradient-to-br from-violet-50/50 via-white to-pink-50/50 py-16 md:py-24"
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3">
              Частые вопросы
            </h2>
            <p className="text-base text-slate-500">
              Всё, что вы хотели узнать о BalaQai
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

          </div>
  );
}