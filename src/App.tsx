import React, { useState, useEffect, useMemo } from 'react';
import { Post, Board, ContentType } from './types';
import { INITIAL_POSTS, INITIAL_BOARDS } from './data/seedData';
import Navbar from './components/Navbar';
import PrayerHeader from './components/PrayerHeader';
import CategoryBar from './components/CategoryBar';
import PinCard from './components/PinCard';
import PinDetailModal from './components/PinDetailModal';
import UploadModal from './components/UploadModal';
import BoardsModal from './components/BoardsModal';
import AudioPlayerBar from './components/AudioPlayerBar';
import DailyDuaModal from './components/DailyDuaModal';
import { 
  Sparkles, 
  Upload, 
  Plus, 
  Bookmark, 
  Compass, 
  Search, 
  X, 
  Heart, 
  CheckCircle,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

const STORAGE_KEY_POSTS = 'noorpoint_posts_v1';
const STORAGE_KEY_BOARDS = 'noorpoint_boards_v1';
const STORAGE_KEY_SAVED = 'noorpoint_saved_v1';
const STORAGE_KEY_LIKED = 'noorpoint_liked_v1';
const STORAGE_KEY_LANG = 'noorpoint_lang_v1';

export default function App() {
  // Persistence state
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POSTS);
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [boards, setBoards] = useState<Board[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOARDS);
      return saved ? JSON.parse(saved) : INITIAL_BOARDS;
    } catch {
      return INITIAL_BOARDS;
    }
  });

  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAVED);
      return saved ? JSON.parse(saved) : ['post-1', 'post-2', 'post-6'];
    } catch {
      return ['post-1', 'post-2', 'post-6'];
    }
  });

  const [likedPostIds, setLikedPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIKED);
      return saved ? JSON.parse(saved) : ['post-1'];
    } catch {
      return ['post-1'];
    }
  });

  const [lang, setLang] = useState<'ur' | 'en' | 'roman'>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY_LANG) as any) || 'ur';
    } catch {
      return 'ur';
    }
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeBoardFilter, setActiveBoardFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'saved'>('popular');

  // Modals & player
  const [selectedPostDetail, setSelectedPostDetail] = useState<Post | null>(null);
  const [activeTrack, setActiveTrack] = useState<Post | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isBoardsOpen, setIsBoardsOpen] = useState(false);
  const [isDailyDuaOpen, setIsDailyDuaOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOARDS, JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedPostIds));
  }, [savedPostIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LIKED, JSON.stringify(likedPostIds));
  }, [likedPostIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  }, [lang]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle Save Pin
  const handleToggleSave = (postId: string) => {
    if (savedPostIds.includes(postId)) {
      setSavedPostIds(prev => prev.filter(id => id !== postId));
      showToast(lang === 'ur' ? 'پن محفوظ فہرست سے ہٹا دیا گیا' : 'Removed from saved pins');
    } else {
      setSavedPostIds(prev => [...prev, postId]);
      // Also add to default board
      setBoards(prev => prev.map(b => {
        if (b.id === 'fav-naats' && !b.postIds.includes(postId)) {
          return { ...b, postIds: [...b.postIds, postId] };
        }
        return b;
      }));
      showToast(lang === 'ur' ? 'ماشاءاللہ! پن آپ کے بورڈ میں محفوظ ہو گیا' : 'Saved to your board!');
    }
  };

  // Toggle Like Pin
  const handleToggleLike = (postId: string) => {
    if (likedPostIds.includes(postId)) {
      setLikedPostIds(prev => prev.filter(id => id !== postId));
    } else {
      setLikedPostIds(prev => [...prev, postId]);
    }
  };

  // Save to specific board
  const handleSaveToBoard = (boardId: string, postId: string) => {
    if (!savedPostIds.includes(postId)) {
      setSavedPostIds(prev => [...prev, postId]);
    }
    setBoards(prev => prev.map(b => {
      if (b.id === boardId && !b.postIds.includes(postId)) {
        return { ...b, postIds: [...b.postIds, postId] };
      }
      return b;
    }));
    const targetBoard = boards.find(b => b.id === boardId);
    showToast(`${lang === 'ur' ? 'بورڈ میں محفوظ ہو گیا: ' : 'Saved to '}${targetBoard?.titleUrdu || targetBoard?.title}`);
  };

  // Create new board
  const handleCreateBoard = (title: string, titleUrdu: string, description: string) => {
    const newBoard: Board = {
      id: 'board-' + Date.now(),
      title,
      titleUrdu,
      description,
      postIds: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBoards(prev => [newBoard, ...prev]);
    showToast(lang === 'ur' ? 'نیا بورڈ کامیابی سے بن گیا!' : 'New board created!');
  };

  // Handle new upload from user
  const handleUploadNewPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    // Also save to user pins
    setSavedPostIds(prev => [...prev, newPost.id]);
    showToast(lang === 'ur' ? 'ماشاءاللہ! آپ کا نیا مواد کامیابی سے شائع ہو گیا' : 'Uploaded successfully to NoorPoint!');
  };

  // Play audio
  const handlePlayAudio = (post: Post) => {
    if (activeTrack?.id === post.id) {
      // Toggle
      setActiveTrack(null);
    } else {
      setActiveTrack(post);
    }
  };

  // Discover random kalam
  const handleRandomKalam = () => {
    const randomIndex = Math.floor(Math.random() * posts.length);
    setSelectedPostDetail(posts[randomIndex]);
  };

  // Reset to default seed
  const handleResetDefaults = () => {
    if (window.confirm('کیا آپ ڈیفالٹ اسلامی مواد ری سیٹ کرنا چاہتے ہیں؟ (Reset to default content?)')) {
      setPosts(INITIAL_POSTS);
      setBoards(INITIAL_BOARDS);
      setSavedPostIds(['post-1', 'post-2', 'post-6']);
      showToast('ڈیفالٹ مواد بحال کر دیا گیا (Restored to default)');
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length };
    posts.forEach(p => {
      counts[p.type] = (counts[p.type] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // Filtered & Sorted Posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Board filter if selected
      if (activeBoardFilter) {
        const board = boards.find(b => b.id === activeBoardFilter);
        if (board && !board.postIds.includes(post.id)) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && post.type !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesUrdu = post.titleUrdu.toLowerCase().includes(q);
        const matchesAuthor = (post.authorOrReciter || '').toLowerCase().includes(q);
        const matchesPoet = (post.poet || '').toLowerCase().includes(q);
        const matchesTags = (post.tags || []).some(t => t.toLowerCase().includes(q));
        const matchesContent = (post.contentUrdu || '').toLowerCase().includes(q) || (post.contentRoman || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesUrdu && !matchesAuthor && !matchesPoet && !matchesTags && !matchesContent) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'saved') {
        return b.saves - a.saves;
      }
      // default 'popular'
      return (b.likes + b.views / 10) - (a.likes + a.views / 10);
    });
  }, [posts, activeBoardFilter, selectedCategory, searchQuery, sortBy, boards]);

  const activeBoardObj = activeBoardFilter ? boards.find(b => b.id === activeBoardFilter) : null;

  return (
    <div className="min-h-screen bg-[#0c100e] text-stone-100 islamic-pattern flex flex-col font-sans selection:bg-emerald-600 selection:text-white pb-28">
      
      {/* 1. UrduPoint-Style Islamic Header Bar (Prayer times, Hijri date, City Selector) */}
      <PrayerHeader
        onOpenQuickDua={() => setIsDailyDuaOpen(true)}
        lang={lang}
      />

      {/* 2. Top Navigation Bar (Pinterest & UrduPoint Hybrid) */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenBoards={() => setIsBoardsOpen(true)}
        savedCount={savedPostIds.length}
        lang={lang}
        onLangChange={setLang}
        onRandomKalam={handleRandomKalam}
      />

      {/* 3. Category Filter Tabs */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveBoardFilter(null);
        }}
        lang={lang}
        categoryCounts={categoryCounts}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* 4. Active Board Banner (if filtered by a collection) */}
      {activeBoardObj && (
        <div className="bg-gradient-to-r from-amber-950/60 via-stone-900 to-emerald-950/60 border-b border-amber-800/40 py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40">
                <Bookmark className="w-4 h-4 fill-current" />
              </span>
              <div>
                <h3 className="font-urdu text-base font-bold text-amber-200">
                  {lang === 'ur' ? activeBoardObj.titleUrdu : activeBoardObj.title}
                </h3>
                <p className="text-xs text-stone-400">{activeBoardObj.description || 'Saved collection'}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveBoardFilter(null)}
              className="text-xs px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'تمام مواد دیکھیں' : 'Clear Board Filter'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Hero Banner / UrduPoint Features Highlights */}
      {!searchQuery && !activeBoardFilter && selectedCategory === 'all' && (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-2 w-full">
          <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-emerald-950/90 via-stone-900/90 to-emerald-950/90 border border-emerald-800/40 shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="space-y-3 text-center md:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{lang === 'ur' ? 'اردو پوائنٹ اور پنٹرسٹ کا انوکھا سنگم' : 'The Islamic Pinterest & Urdu Media Hub'}</span>
                </div>

                <h2 className="font-urdu text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-100 leading-[2.3] text-right md:text-left">
                  {lang === 'ur'
                    ? 'نعتیں، اشعار، اسلامی خبریں اور ویڈیوز - سب کچھ ایک جگہ'
                    : 'Discover & Share Naats, Lyrics, Islamic News, Videos & Poetry'}
                </h2>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {lang === 'ur'
                    ? 'آپ بھی اپنی پسندیدہ نعتیں، آڈیو، ویڈیوز، اشعار اور کلام نور پوائنٹ پر اپلوڈ اور محفوظ کر سکتے ہیں۔'
                    : 'Pin and stream beautiful Urdu Kalaam, read full Nastaliq lyrics, watch Islamic bayanaat, and upload your own content.'}
                </p>

                {/* Quick trending search tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1 justify-center md:justify-start">
                  <span className="text-[11px] text-stone-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-amber-400" />
                    <span>{lang === 'ur' ? 'مقبول ترین:' : 'Trending:'}</span>
                  </span>
                  {['فاصلوں کو تکلف', 'تاجدارِ حرم', 'علامہ اقبال', 'مسجد نبوی', 'دعائیں', 'سورۃ الرحمٰن'].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(chip)}
                      className="text-xs font-urdu px-3 py-1 rounded-full bg-stone-800/80 hover:bg-emerald-900/50 text-stone-200 border border-stone-700/60 transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload CTA Button in Hero */}
              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 stroke-[2.5]" />
                  <span>{lang === 'ur' ? 'اپنا مواد اپلوڈ کریں' : 'Upload Your Content'}</span>
                </button>

                <button
                  onClick={() => setIsBoardsOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 font-semibold text-sm border border-stone-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ur' ? 'محفوظ کردہ پن دیکھیں' : 'View Saved Pins'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 6. Main Masonry Feed (Pinterest-style columns) */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
        
        {/* Results Info Bar if filtering */}
        {(searchQuery || activeBoardFilter || selectedCategory !== 'all') && (
          <div className="flex items-center justify-between mb-5 px-1 text-xs text-stone-400">
            <div>
              <span>
                {lang === 'ur' ? 'مجموعی نتائج:' : 'Total Results:'} <strong className="text-emerald-400">{filteredPosts.length}</strong>
              </span>
              {searchQuery && (
                <span className="ml-2">
                  for "<span className="text-stone-200">{searchQuery}</span>"
                </span>
              )}
            </div>

            {(searchQuery || activeBoardFilter || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setActiveBoardFilter(null);
                }}
                className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ur' ? 'فلٹرز ختم کریں' : 'Clear all filters'}</span>
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-stone-900/50 border border-stone-800/80 my-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-urdu text-xl font-bold text-stone-200 mb-2">
              {lang === 'ur' ? 'کوئی کلام یا خبر نہیں ملی' : 'No posts matched your search'}
            </h3>
            <p className="text-xs text-stone-400 max-w-md mx-auto mb-6">
              {lang === 'ur'
                ? 'آپ نیا کلام، نعت یا خبر خود اپلوڈ کر سکتے ہیں تاکہ دوسرے لوگ بھی مستفید ہوں۔'
                : 'Try searching with different keywords or be the first to upload this Kalaam!'}
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold shadow-lg cursor-pointer"
            >
              {lang === 'ur' ? 'ابھی نیا مواد اپلوڈ کریں' : 'Upload This Pin'}
            </button>
          </div>
        ) : (
          /* Masonry Grid */
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredPosts.map((post) => (
              <PinCard
                key={post.id}
                post={post}
                isSaved={savedPostIds.includes(post.id)}
                isLiked={likedPostIds.includes(post.id)}
                onOpenDetail={(p) => setSelectedPostDetail(p)}
                onToggleSave={handleToggleSave}
                onToggleLike={handleToggleLike}
                onPlayAudio={handlePlayAudio}
                isPlaying={activeTrack?.id === post.id}
                lang={lang}
              />
            ))}
          </div>
        )}
      </main>

      {/* 7. Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950/80 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-urdu text-base font-bold text-amber-400">نور پوائنٹ</span>
            <span>•</span>
            <span>Islamic Pinterest & UrduPoint Multimedia Portal</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetDefaults}
              className="text-stone-500 hover:text-stone-300 flex items-center gap-1 text-[11px]"
              title="Reset default seed posts"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Samples</span>
            </button>
            <span>•</span>
            <span className="text-emerald-500 font-urdu">صلّی اللہ علیٰ حبیبہٖ محمّدٍ وّآلہٖ وسلّم</span>
          </div>
        </div>
      </footer>

      {/* 8. Sticky Audio Player Bar */}
      <AudioPlayerBar
        currentTrack={activeTrack}
        onClose={() => setActiveTrack(null)}
        onOpenLyrics={(p) => setSelectedPostDetail(p)}
        lang={lang}
      />

      {/* 9. Modals */}
      {selectedPostDetail && (
        <PinDetailModal
          post={selectedPostDetail}
          isOpen={!!selectedPostDetail}
          onClose={() => setSelectedPostDetail(null)}
          isSaved={savedPostIds.includes(selectedPostDetail.id)}
          isLiked={likedPostIds.includes(selectedPostDetail.id)}
          onToggleSave={handleToggleSave}
          onToggleLike={handleToggleLike}
          onPlayAudio={handlePlayAudio}
          isPlaying={activeTrack?.id === selectedPostDetail.id}
          boards={boards}
          onSaveToBoard={handleSaveToBoard}
          lang={lang}
          allPosts={posts}
          onSelectPost={(p) => setSelectedPostDetail(p)}
        />
      )}

      {isUploadOpen && (
        <UploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUpload={handleUploadNewPost}
          boards={boards}
          lang={lang}
        />
      )}

      {isBoardsOpen && (
        <BoardsModal
          isOpen={isBoardsOpen}
          onClose={() => setIsBoardsOpen(false)}
          boards={boards}
          posts={posts}
          onCreateBoard={handleCreateBoard}
          onSelectBoardFilter={(bId) => {
            setActiveBoardFilter(bId);
            setSelectedCategory('all');
          }}
          lang={lang}
        />
      )}

      {isDailyDuaOpen && (
        <DailyDuaModal
          isOpen={isDailyDuaOpen}
          onClose={() => setIsDailyDuaOpen(false)}
          lang={lang}
        />
      )}

      {/* 10. Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-950/95 border border-emerald-700 text-stone-100 text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
