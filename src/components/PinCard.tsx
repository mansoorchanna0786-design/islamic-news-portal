import React, { useState } from 'react';
import { Post } from '../types';
import { 
  Heart, 
  Bookmark, 
  Play, 
  Share2, 
  FileText, 
  Music, 
  Newspaper, 
  Feather, 
  Video, 
  HeartHandshake, 
  Image, 
  Check, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';

interface PinCardProps {
  post: Post;
  isSaved: boolean;
  isLiked: boolean;
  onOpenDetail: (post: Post) => void;
  onToggleSave: (postId: string) => void;
  onToggleLike: (postId: string) => void;
  onPlayAudio?: (post: Post) => void;
  isPlaying?: boolean;
  lang: 'ur' | 'en' | 'roman';
}

export default function PinCard({
  post,
  isSaved,
  isLiked,
  onOpenDetail,
  onToggleSave,
  onToggleLike,
  onPlayAudio,
  isPlaying,
  lang
}: PinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  // Type metadata
  const typeConfig: Record<string, { labelUr: string; labelEn: string; icon: any; color: string; border: string }> = {
    naat: { labelUr: 'نعت شریف', labelEn: 'Naat Sharif', icon: Music, color: 'bg-emerald-950/80 text-emerald-300', border: 'border-emerald-700/50' },
    lyrics: { labelUr: 'نعت کے بول', labelEn: 'Lyrics', icon: FileText, color: 'bg-amber-950/80 text-amber-300', border: 'border-amber-700/50' },
    news: { labelUr: 'اسلامی خبر', labelEn: 'Islamic News', icon: Newspaper, color: 'bg-sky-950/80 text-sky-300', border: 'border-sky-700/50' },
    poetry: { labelUr: 'شاعری و کلام', labelEn: 'Urdu Poetry', icon: Feather, color: 'bg-rose-950/80 text-rose-300', border: 'border-rose-700/50' },
    video: { labelUr: 'ویڈیو و بیان', labelEn: 'Video Bayan', icon: Video, color: 'bg-purple-950/80 text-purple-300', border: 'border-purple-700/50' },
    dua_hadith: { labelUr: 'دعا و حدیث', labelEn: 'Dua & Hadith', icon: HeartHandshake, color: 'bg-teal-950/80 text-teal-300', border: 'border-teal-700/50' },
    calligraphy: { labelUr: 'اسلامی خطاطی', labelEn: 'Calligraphy', icon: Image, color: 'bg-amber-900/80 text-amber-200', border: 'border-amber-600/50' },
  };

  const currentType = typeConfig[post.type] || typeConfig.naat;
  const TypeIcon = currentType.icon;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(post.id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike(post.id);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlayAudio) {
      onPlayAudio(post);
    } else {
      onOpenDetail(post);
    }
  };

  return (
    <div
      onClick={() => onOpenDetail(post)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative mb-4 break-inside-avoid rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-emerald-700/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/40 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Visual Image / Thumbnail Area */}
      <div className="relative w-full overflow-hidden bg-stone-950 aspect-[4/3] sm:aspect-auto">
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 min-h-[180px] max-h-[380px]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Type Badge - Top Left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <div className={`px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border flex items-center gap-1.5 shadow-md ${currentType.color} ${currentType.border}`}>
            <TypeIcon className="w-3 h-3" />
            <span className={lang === 'ur' ? 'font-urdu' : ''}>
              {lang === 'ur' ? currentType.labelUr : currentType.labelEn}
            </span>
          </div>

          {post.isFeatured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{lang === 'ur' ? 'خاص' : 'Featured'}</span>
            </span>
          )}
        </div>

        {/* Top Right: Pinterest-style Save Button (appears on hover or if already saved) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button
            onClick={handleSave}
            title={isSaved ? "Saved to Board" : "Save to Board"}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-lg ${
              isSaved
                ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                : 'bg-emerald-600/90 hover:bg-emerald-500 text-white opacity-0 group-hover:opacity-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? (lang === 'ur' ? 'محفوظ' : 'Saved') : (lang === 'ur' ? 'محفوظ کریں' : 'Save')}</span>
          </button>
        </div>

        {/* Audio / Video Play Overlay button in center for multimedia */}
        {(post.type === 'naat' || post.type === 'video' || post.audioUrl) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={handlePlay}
              className={`pointer-events-auto p-3.5 rounded-full shadow-2xl transition-all duration-300 transform ${
                isPlaying
                  ? 'bg-amber-500 text-stone-950 scale-110 ring-4 ring-amber-400/30 animate-pulse'
                  : 'bg-emerald-600/90 text-white hover:bg-emerald-500 hover:scale-110 opacity-90 group-hover:opacity-100 ring-2 ring-white/20'
              }`}
              title={isPlaying ? "Playing" : "Play"}
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </button>
          </div>
        )}

        {/* Quick Urdu Snippet Preview over image if lyrics or poetry */}
        {post.contentUrdu && (post.type === 'lyrics' || post.type === 'poetry' || post.type === 'dua_hadith') && (
          <div className="absolute bottom-2 inset-x-3 text-right pointer-events-none">
            <p className="font-urdu text-amber-200/95 text-sm sm:text-base leading-relaxed line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {post.contentUrdu.split('\n')[0]}
            </p>
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        
        {/* Title area */}
        <div>
          {/* Urdu Title in Nastaliq font */}
          <h2 className="font-urdu text-stone-100 text-base sm:text-lg font-bold leading-[2.1] text-right hover:text-amber-300 transition-colors line-clamp-2">
            {post.titleUrdu}
          </h2>

          {/* Transliteration / Roman or English */}
          <h3 className="text-stone-400 text-xs font-medium line-clamp-1 mt-0.5">
            {post.title}
          </h3>
        </div>

        {/* Reciter / Shair / Speaker badge */}
        {(post.authorOrReciter || post.poet) && (
          <div className="flex items-center justify-between text-xs text-stone-400 pt-1 border-t border-stone-800/80">
            <span className="text-emerald-400 font-medium truncate max-w-[180px]">
              {post.authorOrReciter || post.poet}
            </span>
            {post.category && (
              <span className="text-[10px] text-stone-500 bg-stone-800/80 px-2 py-0.5 rounded-md">
                {post.category}
              </span>
            )}
          </div>
        )}

        {/* Bottom Bar: Likes, Views, Share */}
        <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800/60 mt-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 hover:text-rose-400 transition-colors ${
                isLiked ? 'text-rose-500' : 'text-stone-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-[11px] font-medium">{post.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <span className="text-stone-600">•</span>

            <span className="text-[11px] text-stone-500">
              {post.views.toLocaleString()} {lang === 'ur' ? 'مشاہدات' : 'views'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              title="Copy Link to Share"
              className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-400 hover:bg-stone-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
