import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Share2, BookOpen } from 'lucide-react';

interface DailyDuaModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ur' | 'en' | 'roman';
}

export default function DailyDuaModal({ isOpen, onClose, lang }: DailyDuaModalProps) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const dua = {
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    urdu: 'اے ہمارے پروردگار! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما، اور ہمیں دوزخ کے عذاب سے محفوظ رکھ۔',
    roman: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar.',
    translation: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
    reference: 'سورة البقرة - 201 (Surah Al-Baqarah: 201)',
    virtue: 'یہ قرآن کریم کی جامع ترین دعا ہے جسے نبی اکرم صلی اللہ علیہ وسلم کثرت سے مانگا کرتے تھے۔'
  };

  const handleCopy = () => {
    const text = `${dua.arabic}\n\n${dua.urdu}\n\n(${dua.reference})`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative z-10 w-full max-w-lg bg-stone-900 border border-emerald-800/60 rounded-3xl shadow-2xl p-6 sm:p-8 text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-600/20 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-emerald-950 text-amber-400 border border-emerald-800/80">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {lang === 'ur' ? 'آج کی مسنون قرآنی دعا' : 'Daily Quranic Dua'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Arabic Calligraphy text */}
        <div className="my-6 p-6 rounded-2xl bg-stone-950/80 border border-emerald-900/40">
          <p className="font-arabic text-xl sm:text-2xl text-amber-300 leading-[2.6] dir-rtl font-medium">
            {dua.arabic}
          </p>
        </div>

        {/* Urdu Translation */}
        <div className="mb-5">
          <p className="font-urdu text-base sm:text-lg text-stone-200 leading-[2.4] text-right sm:text-center">
            {dua.urdu}
          </p>
          <p className="text-xs text-stone-400 font-sans mt-2">
            {dua.roman}
          </p>
        </div>

        {/* Reference & Virtue */}
        <div className="p-3 rounded-xl bg-stone-950/50 border border-stone-800 text-xs text-stone-400 mb-6">
          <p className="font-semibold text-emerald-400 mb-1">{dua.reference}</p>
          <p className="font-urdu leading-relaxed">{dua.virtue}</p>
        </div>

        {/* Copy & Share Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-950"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : (lang === 'ur' ? 'دعا کاپی کریں' : 'Copy Dua')}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
          >
            {lang === 'ur' ? 'بند کریں' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
