"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Все секции", href: "/sections" },
  { label: "Цены", href: "/pricing" },
  { label: "Отзывы", href: "/#testimonials" },
  { label: "Для партнеров", href: "/partner" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Астана");

  const cities = ["Астана", "Алматы"];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)" }}>
            <span className="text-white font-extrabold text-sm md:text-base">BQ</span>
          </div>
          <span
            className="font-bold text-xl md:text-2xl tracking-tight"
            style={{ color: "#0EA5E9" }}
          >
            BalaQai
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-sky-400 rounded-2xl hover:bg-sky-50/60 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* City selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setCityOpen(!cityOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200"
            >
              <span className="text-base">📍</span>
              {selectedCity}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  cityOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {cityOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCityOpen(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 overflow-hidden">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                        selectedCity === city
                          ? "text-sky-400 bg-sky-50"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Language toggle */}
          <button className="px-3 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 hidden sm:block">
            RU
          </button>

          {/* Personal account button */}
          <Link href="/auth/login" className="hidden sm:block">
            <Button
              className="rounded-2xl px-5 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
                color: "white",
                border: "none",
              }}
            >
              Личный кабинет
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg rounded-b-3xl">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-sky-400 hover:bg-sky-50 rounded-2xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 my-2 pt-3 space-y-2">
              <div className="flex items-center gap-2 px-4">
                <span className="text-base">📍</span>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                      selectedCity === city
                        ? "bg-sky-50 text-sky-400"
                        : "text-slate-500"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                <Button
                  className="w-full rounded-2xl py-3 justify-center text-base font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
                    color: "white",
                    border: "none",
                  }}
                >
                  Личный кабинет
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}