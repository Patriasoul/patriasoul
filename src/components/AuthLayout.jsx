import React from "react";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090d18] text-white px-4 py-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-white to-blue-700" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: `linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)`, backgroundSize: "32px 32px", backgroundPosition: "0 0, 0 16px, 16px -16px, -16px 0" }} />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-5 flex justify-center"><div className="w-16 h-16 rounded-2xl bg-[#b8860b]/15 border border-[#d4af37]/40 flex items-center justify-center shadow-lg">{Icon ? <Icon className="w-8 h-8 text-[#d4af37]" aria-hidden="true" /> : null}</div></div>
          <div className="text-[#d4af37] text-xs font-semibold tracking-[0.25em] uppercase mb-2">PATRIA<span className="text-white/50">SOUL</span></div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
          {subtitle && <p className="text-white/55 mt-2 leading-relaxed">{subtitle}</p>}
        </div>
        <div className="bg-[#111827]/95 rounded-2xl border border-white/10 p-7 shadow-2xl backdrop-blur-sm">{children}</div>
        {footer && <p className="text-center text-sm text-white/45 mt-5">{footer}</p>}
        <div className="text-center mt-6 text-[11px] tracking-[0.2em] uppercase text-white/25">Znanje · Ponos · Nasljeđe</div>
      </div>
    </div>
  );
}
