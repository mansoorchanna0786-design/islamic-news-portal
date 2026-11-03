import React, { useState } from 'react';
import { Post, Board, Comment } from '../types';
import { 
  X, 
  Bookmark, 
  Heart, 
  Share2, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Volume2, 
  Calendar, 
  Eye, 
  User, 
  Tag, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Download,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface PinDetailModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  isLiked: boolean;
  onToggleSave: (postId: string) => void;
  onToggleLike: (postId: string) => void;
  onPlayAudio?: (post: Post) => void;
  isPlaying?: boolean;
  boards: Board[];
  onSaveToBoard: (boardId: string, postId: string) => void;
  lang: 'ur' | 'en' | 'roman';
  allPosts: Post[];
  onSelectPost: (post: Post) => void;
}

export default function PinDetailModal({
  post,
  isOpen,
  onClose,
  isSaved,
  isLiked,
  onToggleSave,
  onToggleLike,
  onPlayAudio,
  isPlaying,
  boards,
  onSaveToBoard,
  lang,
  allPosts,
  onSelectPost
}: PinDetailModalProps) {
  if (!isOpen || !post) return null;

  const [activeTab, setActiveTab] = useState<'urdu' | 'roman' | 'info'>('urdu');
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<number>(20); // Nastaliq base size
  const [selectedBoardId, setSelectedBoardId] = useState<string>(boards[0]?.id || 'fav-naats');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      postId: post.id,
      author: 'Mansoor Channa',
      text: 'ماشاءاللہ! بہت ہی خوبصورت اور روح پرور کلام ہے۔ جزاک اللہ خیر۔',
      timestamp: '2 hours ago'
    },
    {
      id: 'c2',
      postId: post.id,
      author: 'Hafiz Muhammad',
      text: 'SubhanAllah, peaceful recitation and heart-touching lyrics.',
      timestamp: '1 day ago'
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleCopyText = () => {
    const textToCopy = `${post.titleUrdu}\n\n${post.contentUrdu || ''}\n\nNoorPoint - Islamic Media`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const commentObj: Comment = {
      id: 'c-' + Date.now(),
      postId: post.id,
      author: 'You (عاشقِ رسول)',
      text: newComment.trim(),
      timestamp: 'Just now'
    };
    setComments([commentObj, ...comments]);
    setNewComment('');
  };

  // Find related posts in same category
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.type === post.type))
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div 
        className="relative z-10 w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Top Bar: Close, Save To Board, Likes, Copy */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-800 bg-stone-900/90 backdrop-blur-sm z-20">
          
          {/* Left actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold uppercase tracking-wider">
              {post.category || post.type}
            </span>
          </div>

          {/* Right actions: Save to board & Like */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Board Selector */}
            <div className="hidden sm:flex items-center gap-1.5 bg-stone-800 rounded-full px-3 py-1 border border-stone-700">
              <span className="text-[11px] text-stone-400">Board:</span>
              <select
                value={selectedBoardId}
                onChange={(e) => setSelectedBoardId(e.target.value)}
                className="bg-transparent text-xs text-amber-300 font-medium focus:outline-none cursor-pointer pr-1"
              >
                {boards.map(b => (
                  <option key={b.id} value={b.id} className="bg-stone-900 text-stone-200">
                    {lang === 'ur' ? b.titleUrdu : b.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <button
              onClick={() => {
                onToggleSave(post.id);
                onSaveToBoard(selectedBoardId, post.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                isSaved
                  ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? (lang === 'ur' ? 'محفوظ ہے' : 'Saved') : (lang === 'ur' ? 'محفوظ کریں' : 'Save')}</span>
            </button>

            {/* Like */}
            <button
              onClick={() => onToggleLike(post.id)}
              className={`p-2 rounded-full border transition-colors ${
                isLiked 
                  ? 'bg-rose-950/60 border-rose-800 text-rose-400' 
                  : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-rose-400'
              }`}
              title="Like"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            {/* Share / Copy */}
            <button
              onClick={handleCopyText}
              className="p-2 rounded-full bg-stone-800 border border-stone-700 text-stone-300 hover:text-emerald-400 transition-colors"
              title="Copy Full Lyrics / Text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Modal Body - 2 Columns (Pinterest Layout) */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
            
            {/* Left Column: Media Presentation (Image / Video Player / Audio Visualizer) */}
            <div className="lg:col-span-5 bg-stone-950 p-4 sm:p-6 flex flex-col items-center justify-start border-b lg:border-b-0 lg:border-r border-stone-800">
              
              {/* If Video: Render responsive video player */}
              {post.videoUrl ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-black mb-4">
                  <iframe
                    src={post.videoUrl}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                /* High-Res Art / Visual */
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-800 mb-4 group bg-stone-900">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                  
                  {/* Floating badge for image download / wallpaper */}
                  <a
                    href={post.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-stone-900/80 backdrop-blur-md text-stone-300 hover:text-white border border-stone-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Open Full Image"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Audio Player if audio track exists */}
              {post.audioUrl && (
                <div className="w-full bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-lg mt-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-200">
                          {lang === 'ur' ? 'آڈیو کلام سنیں' : 'Listen Naat Sharif'}
                        </p>
                        <p className="text-[10px] text-stone-400">{post.authorOrReciter || 'Recorded'}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onPlayAudio && onPlayAudio(post)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isPlaying
                          ? 'bg-amber-500 text-stone-950 animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{isPlaying ? 'Playing' : 'Play'}</span>
                    </button>
                  </div>

                  {/* Audio visualizer wave mockup */}
                  <div className="flex items-center justify-center gap-1 h-8 px-2 bg-stone-950/60 rounded-xl">
                    {[12, 24, 18, 30, 16, 22, 28, 14, 20, 26, 12, 19, 25, 17, 30, 22, 15, 28].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-stone-700'
                        }`}
                        style={{ height: `${isPlaying ? Math.max(8, (h + (i % 3) * 4) % 32) : 6}px` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="w-full flex flex-wrap gap-1.5 mt-4">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-stone-900 text-stone-400 border border-stone-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats Footer */}
              <div className="w-full flex items-center justify-between text-xs text-stone-500 mt-4 pt-3 border-t border-stone-800">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{post.views.toLocaleString()} {lang === 'ur' ? 'مرتبہ دیکھا گیا' : 'views'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Urdu Lyrics / News / Text Reader & Interactions */}
            <div className="lg:col-span-7 p-4 sm:p-6 sm:px-8 flex flex-col justify-between">
              
              <div>
                {/* Header Info */}
                <div className="mb-4">
                  {/* Urdu Title */}
                  <h1 className="font-urdu text-2xl sm:text-3xl font-extrabold text-stone-100 leading-[2.4] text-right mb-2">
                    {post.titleUrdu}
                  </h1>

                  {/* Transliteration */}
                  <h2 className="text-sm sm:text-base text-stone-400 font-medium">
                    {post.title}
                  </h2>
                </div>

                {/* Reciter, Poet & Reference Metadata Bar */}
                <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 mb-5">
                  {post.authorOrReciter && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="text-[10px] text-stone-500 block">
                          {lang === 'ur' ? 'نعت خواں / قاری' : 'Reciter / Speaker'}
                        </span>
                        <span className="text-xs font-semibold text-emerald-300">
                          {post.authorOrReciter}
                        </span>
                      </div>
                    </div>
                  )}

                  {post.poet && (
                    <div className="flex items-center gap-2 border-l border-stone-800 pl-4">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-[10px] text-stone-500 block">
                          {lang === 'ur' ? 'شاعر / کلام' : 'Poet / Shair'}
                        </span>
                        <span className="text-xs font-semibold text-amber-300">
                          {post.poet}
                        </span>
                      </div>
                    </div>
                  )}

                  {post.reference && (
                    <div className="flex items-center gap-2 border-l border-stone-800 pl-4">
                      <span className="text-xs text-stone-400">
                        {post.reference}
                      </span>
                    </div>
                  )}

                  {/* Font Size Adjuster for Urdu text */}
                  <div className="ml-auto flex items-center gap-1 text-stone-400 bg-stone-900 rounded-lg p-1 border border-stone-800">
                    <button
                      onClick={() => setFontSize(Math.max(16, fontSize - 2))}
                      className="p-1 hover:text-white"
                      title="Decrease font size"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono px-1">{fontSize}px</span>
                    <button
                      onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                      className="p-1 hover:text-white"
                      title="Increase font size"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Reader Tabs */}
                <div className="flex items-center gap-2 border-b border-stone-800 mb-4">
                  <button
                    onClick={() => setActiveTab('urdu')}
                    className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors relative ${
                      activeTab === 'urdu' ? 'text-emerald-400' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="font-urdu text-base">{lang === 'ur' ? 'اصل متن (اردو نستعلیق)' : 'Urdu Nastaliq'}</span>
                    {activeTab === 'urdu' && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-500 rounded-full" />
                    )}
                  </button>

                  {post.contentRoman && (
                    <button
                      onClick={() => setActiveTab('roman')}
                      className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors relative ${
                        activeTab === 'roman' ? 'text-emerald-400' : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <span>Roman Urdu / English</span>
                      {activeTab === 'roman' && (
                        <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-500 rounded-full" />
                      )}
                    </button>
                  )}
                </div>

                {/* Reader Content Body */}
                <div className="p-4 sm:p-6 rounded-2xl bg-stone-950/40 border border-stone-800/80 mb-6">
                  {activeTab === 'urdu' ? (
                    <div 
                      className="font-urdu text-stone-100 text-right whitespace-pre-line leading-[2.5] tracking-wide select-text"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {post.contentUrdu || 'کوئی اضافی متن دستیاب نہیں ہے۔'}
                    </div>
                  ) : (
                    <div className="text-stone-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line select-text">
                      {post.contentRoman}
                    </div>
                  )}

                  {/* Copy stanza button */}
                  <div className="mt-4 pt-3 border-t border-stone-800/60 flex justify-end">
                    <button
                      onClick={handleCopyText}
                      className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied to clipboard' : 'Copy Lyrics / Text'}</span>
                    </button>
                  </div>
                </div>

                {/* Community Comments Section */}
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ur' ? 'نظریات و تبصرے' : 'Comments & Supplications'} ({comments.length})</span>
                  </h3>

                  {/* New Comment Input */}
                  <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={lang === 'ur' ? 'اپنا تبصرہ یا درود و سلام لکھیے...' : 'Write a comment or prayer...'}
                      className="flex-1 bg-stone-950 text-stone-100 placeholder-stone-500 text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-stone-800 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {lang === 'ur' ? 'بھیجیں' : 'Post'}
                    </button>
                  </form>

                  {/* Comments list */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {comments.map((c) => (
                      <div key={c.id} className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60 text-xs">
                        <div className="flex items-center justify-between text-stone-400 mb-1">
                          <span className="font-semibold text-emerald-400">{c.author}</span>
                          <span className="text-[10px] text-stone-500">{c.timestamp}</span>
                        </div>
                        <p className="text-stone-200">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Related Pins Section */}
              {relatedPosts.length > 0 && (
                <div className="mt-8 pt-5 border-t border-stone-800">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                    {lang === 'ur' ? 'مزید متعلقہ کلام و خبریں' : 'Related Posts & Kalaam'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {relatedPosts.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onSelectPost(rel)}
                        className="group/rel rounded-xl overflow-hidden bg-stone-950 border border-stone-800 hover:border-emerald-700/60 cursor-pointer p-1.5 transition-all"
                      >
                        <img
                          src={rel.imageUrl}
                          alt={rel.title}
                          className="w-full h-20 object-cover rounded-lg mb-1.5 group-hover/rel:scale-105 transition-transform"
                        />
                        <p className="font-urdu text-xs text-stone-200 truncate text-right">
                          {rel.titleUrdu}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate">
                          {rel.authorOrReciter || rel.category}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
