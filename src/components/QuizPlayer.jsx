import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock } from "lucide-react";

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

const LETTERS = ["A", "B", "C", "D"];

export default function QuizPlayer({ questions, title, subtitle, onComplete, onQuit }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());
  const scoreRef = useRef(0);
  const answerTimeoutRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => () => {
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
  }, []);

  if (!questions?.length) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#0b1020] text-white px-4">
        <div className="text-center"><h1 className="text-2xl font-bold mb-2">Nema dostupnih pitanja</h1><p className="text-white/50">Pokušaj ponovno kasnije.</p></div>
      </div>
    );
  }

  const q = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const handleAnswer = (i) => {
    if (answered || !q) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correctIndex) scoreRef.current += 1;

    answerTimeoutRef.current = setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((current) => current + 1);
        setSelected(null);
        setAnswered(false);
      } else {
        onComplete?.({
          score: scoreRef.current,
          total: questions.length,
          timeSeconds: Math.floor((Date.now() - startRef.current) / 1000),
        });
      }
    }, 1100);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b1020] text-white px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <div>
            {subtitle && <div className="text-xs tracking-[0.2em] uppercase text-amber-400/80">{subtitle}</div>}
            <h1 className="font-display text-2xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-white/60 bg-white/5 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" />{fmtTime(elapsed)}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-amber-400 to-red-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
          <div className="text-sm font-medium text-white/70 whitespace-nowrap">{index + 1} / {questions.length}</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <h2 className="font-display text-xl sm:text-2xl font-semibold leading-snug mb-6 min-h-[3.5rem]">{q.question}</h2>
            <div className="grid gap-3">
              {q.answers.map((ans, i) => {
                const isCorrect = i === q.correctIndex;
                const isSelected = i === selected;
                let cls = "border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30";
                if (answered) {
                  if (isCorrect) cls = "border-green-400 bg-green-400/15 text-white";
                  else if (isSelected) cls = "border-red-500 bg-red-500/15 text-white";
                  else cls = "border-white/10 bg-white/5 opacity-50";
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={answered} className={`flex items-center gap-3 w-full text-left px-4 py-4 rounded-xl border-2 transition-all ${cls} ${!answered ? "active:scale-[0.99]" : ""}`}>
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-sm font-bold shrink-0">{LETTERS[i]}</span>
                    <span className="flex-1 font-medium">{ans}</span>
                    {answered && isCorrect && <Check className="w-5 h-5 text-green-400" />}
                    {answered && isSelected && !isCorrect && <X className="w-5 h-5 text-red-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {onQuit && <button onClick={onQuit} className="mt-8 text-sm text-white/40 hover:text-white/70 transition-colors">Odustani</button>}
      </div>
    </div>
  );
}
