import React from "react";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home, Clock, Target, X } from "lucide-react";

function fmtTime(s = 0) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function QuizResultScreen({ result, title, message, onReplay, onHome, replayLabel = "Igraj ponovno", homeLabel = "Početna" }) {
  const total = Number(result?.total) || 0;
  const score = Number(result?.score) || 0;
  const pct = total ? Math.round((score / total) * 100) : 0;
  const passed = pct >= 60;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b1020] text-white flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 200 }} className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${passed ? "bg-amber-400/15 ring-2 ring-amber-400" : "bg-white/10 ring-2 ring-white/20"}`}>
          <Trophy className={`w-12 h-12 ${passed ? "text-amber-400" : "text-white/60"}`} />
        </motion.div>
        <h1 className="font-display text-3xl font-bold mb-2">{title}</h1>
        <p className="text-white/60 mb-8">{message}</p>
        <div className="mb-8"><div className="font-display text-6xl font-bold tracking-tight">{score}<span className="text-white/30 text-4xl"> / {total}</span></div><div className="mt-2 text-amber-400 font-semibold text-lg">{pct} %</div></div>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4"><Target className="w-5 h-5 text-green-400 mx-auto mb-1" /><div className="text-2xl font-bold">{score}</div><div className="text-[11px] uppercase tracking-wide text-white/40">Točno</div></div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4"><X className="w-5 h-5 text-red-400 mx-auto mb-1" /><div className="text-2xl font-bold">{Math.max(0, total - score)}</div><div className="text-[11px] uppercase tracking-wide text-white/40">Netočno</div></div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4"><Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" /><div className="text-2xl font-bold">{fmtTime(result?.timeSeconds)}</div><div className="text-[11px] uppercase tracking-wide text-white/40">Vrijeme</div></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onReplay} className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-amber-400 text-[#0b1020] font-semibold hover:bg-amber-300 transition-colors"><RotateCcw className="w-5 h-5" />{replayLabel}</button>
          <button onClick={onHome} className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/15 transition-colors"><Home className="w-5 h-5" />{homeLabel}</button>
        </div>
      </motion.div>
    </div>
  );
}
