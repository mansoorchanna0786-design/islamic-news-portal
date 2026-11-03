import React, { useState } from 'react';
import { Board, Post } from '../types';
import { 
  X, 
  Plus, 
  Bookmark, 
  Sparkles, 
  FolderPlus, 
  ArrowRight,
  Trash2
} from 'lucide-react';

interface BoardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  boards: Board[];
  posts: Post[];
  onCreateBoard: (title: string, titleUrdu: string, description: string) => void;
  onSelectBoardFilter: (boardId: string) => void;
  lang: 'ur' | 'en' | 'roman';
}

export default function BoardsModal({
  isOpen,
  onClose,
  boards,
  posts,
  onCreateBoard,
  onSelectBoardFilter,
  lang
}: BoardsModalProps) {
  if (!isOpen) return null;

  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleUrdu, setNewTitleUrdu] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() && !newTitleUrdu.trim()) return;
    onCreateBoard(
      newTitle.trim() || newTitleUrdu.trim(),
      newTitleUrdu.trim() || newTitle.trim(),
      newDesc.trim()
    );
    setNewTitle('');
    setNewTitleUrdu('');
    setNewDesc('');
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative z-10 w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-stone-100">
              {lang === 'ur' ? 'میرے محفوظ کردہ بورڈز' : 'My Saved Boards & Collections'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="text-xs px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'نیا بورڈ' : 'New Board'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Create Board Inline Panel */}
        {isCreating && (
          <form onSubmit={handleCreate} className="p-4 bg-stone-950/80 border-b border-stone-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-stone-300 font-urdu text-right mb-1">
                  بورڈ کا اردو نام (Urdu Name)
                </label>
                <input
                  type="text"
                  value={newTitleUrdu}
                  onChange={(e) => setNewTitleUrdu(e.target.value)}
                  placeholder="مثلاً: رمضان المبارک کے کلام"
                  className="w-full bg-stone-900 text-stone-100 rounded-lg px-3 py-1.5 border border-stone-700 text-right font-urdu text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-300 mb-1">
                  English / Roman Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Ramadan Special Naats"
                  className="w-full bg-stone-900 text-stone-100 rounded-lg px-3 py-1.5 border border-stone-700 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1 text-xs text-stone-400 hover:text-stone-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
              >
                محفوظ کریں (Create Board)
              </button>
            </div>
          </form>
        )}

        {/* Boards Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map((board) => {
              const boardPins = posts.filter(p => board.postIds.includes(p.id));
              const coverImg = board.coverImage || boardPins[0]?.imageUrl || 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={board.id}
                  onClick={() => {
                    onSelectBoardFilter(board.id);
                    onClose();
                  }}
                  className="group rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/60 p-3 flex flex-col justify-between cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01]"
                >
                  {/* Visual Preview */}
                  <div className="w-full h-36 rounded-xl overflow-hidden relative mb-3 bg-stone-900">
                    <img
                      src={coverImg}
                      alt={board.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute bottom-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-600/40">
                      {boardPins.length} {lang === 'ur' ? 'پنز' : 'Pins'}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="font-urdu text-base font-bold text-stone-100 text-right group-hover:text-amber-300 transition-colors">
                      {board.titleUrdu}
                    </h3>
                    <h4 className="text-xs text-stone-400 font-medium">
                      {board.title}
                    </h4>
                    {board.description && (
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
                        {board.description}
                      </p>
                    )}
                  </div>

                  {/* Footer link */}
                  <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs text-emerald-400 group-hover:text-emerald-300">
                    <span>{lang === 'ur' ? 'بورڈ کا مواد دیکھیں' : 'View Collection'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
