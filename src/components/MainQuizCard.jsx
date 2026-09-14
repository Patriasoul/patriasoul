import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ACCENTS = {
  red: { ring: "ring-red-500/30", glow: "from-red-600/20", chip: "bg-red-500/15 text-red-300 border-red-500/30", btn: "bg-red-600 hover:bg-red-500" },
  blue: { ring: "ring-blue-500/30", glow: "from-blue-600/20", chip: "bg-blue-500/15 text-blue-300 border-blue-500/30", btn: "bg-blue-600 hover:bg-blue-500" },
  gold: { ring: "ring-amber-400/30", glow: "from-amber-500/20", chip: "bg-amber-400/15 text-amber-300 border-amber-400/30", btn: "bg-amber-400 hover:bg-amber-300 text-[#0b1020]" },
};

export default function MainQuizCard({ quiz, index = 0 }) {
  const accent = ACCENTS[quiz.accent] || ACCENTS.red;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.4 }}>
      <Link to={quiz.to} className={`group relative block overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 ring-1 ${accent.ring} p-6 sm:p-7 transition-all duration-300 hover:border-white/25 hover:-translate-y-1`}>
        <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${accent.glow} to-transparent blur-2xl`} />
        <div className="relative">
          {quiz.tagline && <div className={`inline-block mb-4 text-[11px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border ${accent.chip}`}>{quiz.tagline}</div>}
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2">{quiz.title}</h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6 min-h-[3rem]">{quiz.description}</p>
          <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${accent.btn} group-hover:gap-3`}>
            {quiz.cta || "Igraj kviz"}<ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
