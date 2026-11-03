import { useState } from 'react';
import { Search, Plus, Bookmark, Sparkles, Globe, X, Compass, Music, BookOpen, Newspaper, Feather, Video, Heart } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenUpload: () => void;
  onOpenBoards: () => void;
  savedCount: number;
  lang: 'ur' | 'en' | 'roman';
  onLangChange: (lang: 'ur' | 'en' | 'roman') => void;
  onRandomKalam: () => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  onOpenUpload,
  onOpenBoards,
  savedCount,
  lang,
  onLangChange,
  onRandomKalam
}: NavbarProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = {
    ur: {
      brand: 'نور پوائنٹ',
      subtitle: 'اسلامی پنٹرسٹ اور اردو میڈیا پورٹل',
      searchPlaceholder: 'نعت، اشعار، خبریں، دعائیں یا شاعر تلاش کریں...',
      upload: 'نیا اپلوڈ',
      boards: 'محفوظ شدہ',
      random: 'اتفاقی کلام'
    },
    roman: {
      brand: 'NoorPoint',
      subtitle: 'Islamic Pinterest & Urdu Media',
      searchPlaceholder: 'Search Naats, lyrics, news, poetry, duas...',
      upload: 'Upload New',
      boards: 'Saved Pins',
      random: 'Random Kalam'
    },
    en: {
      brand: 'NoorPoint',
      subtitle: 'Islamic Media & Poetry Portal',
      searchPlaceholder: 'Search Naat, lyrics, news, reciters, duas...',
      upload: 'Upload Pin',
      boards: 'My Boards',
      random: 'Discover'
    }
  }[lang];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 md:gap-6">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer flex items-center gap-2.5" onClick={() => onSearchChange('')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-bold text-amber-400 font-urdu leading-none">ن</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  {t.brand}
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 hidden sm:inline">
                  UrduPoint × Pinterest
                </span>
              </div>
              <p className="text-[10px] text-stone-400 hidden sm:block truncate max-w-[200px]">
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar with quick chips */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-stone-800/90 text-stone-100 placeholder-stone-500 text-sm rounded-full pl-10 pr-9 py-2.5 border border-stone-700/70 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-stone-800 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-stone-400 hover:text-stone-200 p-0.5 rounded-full hover:bg-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons: Language, Random Kalam, Saved Boards, Upload Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Random discovery button */}
          <button
            onClick={onRandomKalam}
            title={t.random}
            className="p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700/60 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">{t.random}</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700/60 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="uppercase font-semibold text-[11px] hidden sm:inline">{lang}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-stone-800 border border-stone-700 rounded-xl shadow-2xl py-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => { onLangChange('ur'); setShowLangMenu(false); }}
                  className={`w-full text-right px-4 py-2 text-xs flex items-center justify-between hover:bg-stone-700 ${lang === 'ur' ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-stone-300'}`}
                >
                  <span className="font-urdu text-sm">اردو (نستعلیق)</span>
                  <span>{lang === 'ur' ? '✓' : ''}</span>
                </button>
                <button
                  onClick={() => { onLangChange('roman'); setShowLangMenu(false); }}
                  className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-stone-700 ${lang === 'roman' ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-stone-300'}`}
                >
                  <span>Roman Urdu</span>
                  <span>{lang === 'roman' ? '✓' : ''}</span>
                </button>
                <button
                  onClick={() => { onLangChange('en'); setShowLangMenu(false); }}
                  className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-stone-700 ${lang === 'en' ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-stone-300'}`}
                >
                  <span>English</span>
                  <span>{lang === 'en' ? '✓' : ''}</span>
                </button>
              </div>
            )}
          </div>

          {/* Boards / Saved Button with Counter */}
          <button
            onClick={onOpenBoards}
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700/60 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer relative"
            title={t.boards}
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{t.boards}</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Primary Upload Button (Pinterest style) */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium text-xs sm:text-sm px-3.5 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="font-semibold">{t.upload}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
