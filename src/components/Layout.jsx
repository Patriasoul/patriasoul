import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Shield, MapPin, CalendarDays, Trophy, Flame, User, Menu, X } from "lucide-react";

const NAV = [
  { label: "Hrvatski kviz", to: "/kviz", icon: Shield },
  { label: "Brani svoj grad", to: "/brani-svoj-grad", icon: MapPin },
  { label: "Dnevni kviz", to: "/dnevni-kviz", icon: CalendarDays },
  { label: "Rang-lista", to: "/rang-lista", icon: Trophy },
  { label: "Moj profil", to: "/profil", icon: User },
  { label: "PatriaSoul", to: "/patriasoul", icon: Flame },
];

function Shahovnica({ className = "" }) {
  return (
    <div className={`grid grid-cols-4 grid-rows-4 aspect-square overflow-hidden ${className}`}>
      {Array.from({ length: 16 }).map((_, i) => {
        const r = Math.floor(i / 4);
        const c = i % 4;
        return <div key={i} className={(r + c) % 2 === 0 ? "bg-white" : "bg-red-700"} />;
      })}
    </div>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0b1020] text-white flex flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1020]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0b1020]/70">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <Shahovnica className="w-7 h-7 rounded-sm shadow ring-1 ring-white/20" />
            <div className="leading-none">
              <div className="font-display text-lg font-bold tracking-wide text-white">PATRIASOUL</div>
              <div className="text-[10px] tracking-[0.25em] text-amber-400/80 uppercase">Hrvatski kviz</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = location.pathname === item.to;
              const Icon = item.icon;
              return <Link key={item.to} to={item.to} className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm transition-colors ${active ? "bg-amber-400 text-[#0b1020] font-semibold" : "text-white/70 hover:text-white hover:bg-white/10"}`}><Icon className="w-4 h-4" />{item.label}</Link>;
            })}
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setOpen((v) => !v)} aria-label="Izbornik">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && <div className="md:hidden border-t border-white/10 bg-[#0b1020] px-4 py-3 space-y-1">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${active ? "bg-amber-400 text-[#0b1020] font-semibold" : "text-white/80 hover:bg-white/10"}`}><Icon className="w-4 h-4" />{item.label}</Link>;
          })}
        </div>}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        <div className="flex items-center justify-center gap-2 mb-1"><Shahovnica className="w-4 h-4 rounded-sm" /><span>PATRIASOUL · Hrvatski kviz · Znanje. Ponos. Nasljeđe.</span></div>
      </footer>
    </div>
  );
}
