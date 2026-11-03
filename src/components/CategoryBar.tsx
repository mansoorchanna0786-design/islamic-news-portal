import { ContentType } from '../types';
import { 
  Sparkles, 
  Music, 
  FileText, 
  Newspaper, 
  Feather, 
  Video, 
  HeartHandshake, 
  Image, 
  SlidersHorizontal 
} from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  lang: 'ur' | 'en' | 'roman';
  categoryCounts: Record<string, number>;
  sortBy: 'popular' | 'newest' | 'saved';
  onSortChange: (sort: 'popular' | 'newest' | 'saved') => void;
}

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
  lang,
  categoryCounts,
  sortBy,
  onSortChange
}: CategoryBarProps) {
  const categories = [
    { id: 'all', icon: Sparkles, en: 'All Posts', ur: 'سب کچھ', roman: 'All Content' },
    { id: 'naat', icon: Music, en: 'Naat & Kalaam', ur: 'نعت و کلام', roman: 'Naat Sharif' },
    { id: 'lyrics', icon: FileText, en: 'Naat Lyrics', ur: 'نعت کے بول', roman: 'Naat Lyrics' },
    { id: 'news', icon: Newspaper, en: 'Islamic News', ur: 'اسلامی خبریں', roman: 'Islamic News' },
    { id: 'poetry', icon: Feather, en: 'Urdu Poetry', ur: 'اردو شاعری', roman: 'Shayari & Kalam' },
    { id: 'video', icon: Video, en: 'Videos & Bayan', ur: 'ویڈیوز و بیانات', roman: 'Videos & Bayan' },
    { id: 'dua_hadith', icon: HeartHandshake, en: 'Duas & Hadith', ur: 'دعائیں و احادیث', roman: 'Dua & Hadith' },
    { id: 'calligraphy', icon: Image, en: 'Calligraphy & Art', ur: 'اسلامی خطاطی', roman: 'Calligraphy & Art' }
  ];

  return (
    <div className="border-b border-stone-800/80 bg-stone-900/60 backdrop-blur-sm sticky top-[61px] z-30 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Horizontal Scrollable Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const label = lang === 'ur' ? cat.ur : lang === 'roman' ? cat.roman : cat.en;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 border border-emerald-500 scale-[1.02]'
                    : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700/80 hover:text-white border border-stone-700/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-stone-400'}`} />
                <span className={lang === 'ur' ? 'font-urdu text-sm' : ''}>{label}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-700/70 text-stone-400'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sort Filter Selector */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400 border-l border-stone-800 pl-3 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-stone-800/80 text-stone-300 rounded-lg px-2.5 py-1 border border-stone-700/60 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="popular">
              {lang === 'ur' ? 'مقبول ترین' : lang === 'roman' ? 'Most Popular' : 'Most Popular'}
            </option>
            <option value="newest">
              {lang === 'ur' ? 'تازہ ترین' : lang === 'roman' ? 'Newest' : 'Newest'}
            </option>
            <option value="saved">
              {lang === 'ur' ? 'سب سے زیادہ محفوظ' : lang === 'roman' ? 'Most Saved' : 'Most Saved'}
            </option>
          </select>
        </div>

      </div>
    </div>
  );
}
