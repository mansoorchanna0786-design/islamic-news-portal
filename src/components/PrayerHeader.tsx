import { useState, useEffect } from 'react';
import { CITY_PRAYER_TIMES } from '../data/seedData';
import { MapPin, Clock, Moon, Volume2, Sparkles, ChevronRight } from 'lucide-react';

interface PrayerHeaderProps {
  onOpenQuickDua: () => void;
  lang: 'ur' | 'en' | 'roman';
}

export default function PrayerHeader({ onOpenQuickDua, lang }: PrayerHeaderProps) {
  const [selectedCity, setSelectedCity] = useState(CITY_PRAYER_TIMES[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Islamic Hijri estimation for display
  const hijriDate = lang === 'ur' 
    ? '۱۵ شعبان المعظم ۱۴۴۷ھ' 
    : lang === 'roman'
    ? '15 Shaban-ul-Moazzam 1447 AH'
    : '15 Sha\'ban 1447 AH';

  const gregorianDate = currentTime.toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-b border-emerald-900/50 text-xs text-stone-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Islamic Dates & Ticker */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-900/40 rounded-full border border-emerald-700/40 text-emerald-300 font-medium">
            <Moon className="w-3.5 h-3.5 text-amber-400" />
            <span className={lang === 'ur' ? 'font-urdu' : ''}>{hijriDate}</span>
          </div>
          <span className="text-stone-500 hidden sm:inline">|</span>
          <span className="text-stone-400 hidden md:inline">{gregorianDate}</span>
          
          <button 
            onClick={onOpenQuickDua}
            className="hidden lg:flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors bg-amber-950/30 px-2 py-0.5 rounded border border-amber-800/40 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{lang === 'ur' ? 'آج کی مسنون دعا دیکھیں' : 'Today\'s Dua'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right: Prayer Times & City Selector (UrduPoint signature feature) */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1 bg-stone-800/80 rounded px-2 py-1 border border-stone-700/50">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <select
              value={selectedCity.city}
              onChange={(e) => {
                const found = CITY_PRAYER_TIMES.find(c => c.city === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="bg-transparent text-emerald-300 focus:outline-none cursor-pointer pr-1"
            >
              {CITY_PRAYER_TIMES.map(c => (
                <option key={c.city} value={c.city} className="bg-stone-900 text-stone-200">
                  {c.city} ({c.country})
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-stone-300">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Clock className="w-3 h-3" />
              <span>{lang === 'ur' ? 'اوقاتِ نماز:' : 'Prayer Times:'}</span>
            </span>
            <div className="flex items-center gap-2 font-mono">
              <span className="hover:text-emerald-300 transition-colors" title="Fajr">
                <span className="text-stone-500 mr-0.5">F:</span>{selectedCity.fajr}
              </span>
              <span className="text-stone-700">•</span>
              <span className="hover:text-emerald-300 transition-colors" title="Dhuhr">
                <span className="text-stone-500 mr-0.5">D:</span>{selectedCity.dhuhr}
              </span>
              <span className="text-stone-700">•</span>
              <span className="hover:text-emerald-300 transition-colors" title="Asr">
                <span className="text-stone-500 mr-0.5">A:</span>{selectedCity.asr}
              </span>
              <span className="text-stone-700">•</span>
              <span className="hover:text-emerald-300 transition-colors text-amber-300" title="Maghrib">
                <span className="text-amber-500/70 mr-0.5">M:</span>{selectedCity.maghrib}
              </span>
              <span className="text-stone-700">•</span>
              <span className="hover:text-emerald-300 transition-colors" title="Isha">
                <span className="text-stone-500 mr-0.5">I:</span>{selectedCity.isha}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
