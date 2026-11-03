import React, { useState } from 'react';
import { Post, ContentType, Board } from '../types';
import { 
  X, 
  Upload, 
  Music, 
  FileText, 
  Newspaper, 
  Feather, 
  Video, 
  HeartHandshake, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Plus, 
  Link as LinkIcon, 
  Eye,
  FileAudio
} from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newPost: Post) => void;
  boards: Board[];
  lang: 'ur' | 'en' | 'roman';
}

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
  boards,
  lang
}: UploadModalProps) {
  if (!isOpen) return null;

  const [type, setType] = useState<ContentType>('naat');
  const [titleUrdu, setTitleUrdu] = useState('');
  const [title, setTitle] = useState('');
  const [authorOrReciter, setAuthorOrReciter] = useState('');
  const [poet, setPoet] = useState('');
  const [category, setCategory] = useState('Naat Sharif');
  const [contentUrdu, setContentUrdu] = useState('');
  const [contentRoman, setContentRoman] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState(boards[0]?.id || '');
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [error, setError] = useState('');

  // Sample presets for quick testing
  const presets: Record<ContentType, Partial<Post>> = {
    naat: {
      titleUrdu: 'وہ میرا نبیﷺ ہے وہ میرا نبی ہے',
      title: 'Woh Mera Nabi Hai Woh Mera Nabi Hai',
      authorOrReciter: 'Qari Waheed Zafar / Owais Raza Qadri',
      poet: 'Muzaffar Warsi',
      category: 'Naat Sharif',
      imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=peaceful-islamic-ambient-110825.mp3',
      contentUrdu: `وہ میرا نبیﷺ ہے وہ میرا نبی ہے
جس کے دم سے یہ بزمِ جہاں روشنی ہے

غم کے ماروں کو سینے سے اپنے لگایا
بے سہاروں کا ہر آن سہارا بنا
جس کی رحمت سے جھولی ہماری بھری ہے
وہ میرا نبیﷺ ہے وہ میرا نبی ہے`,
      contentRoman: `Woh mera Nabi ﷺ hai woh mera Nabi hai,
Jis ke dam se yeh bazm-e-jahan roshni hai!
Gham ke maaron ko seene se apne lagaya,
Be-saharon ka har aan sahara bana!`,
      tags: ['Naat', 'Owais Raza Qadri', 'Madinah', 'Soulful']
    },
    lyrics: {
      titleUrdu: 'میری جھولی میں یہ انداز کہاں سے آیا',
      title: 'Meri Jholi Me Ye Andaaz Kahan Se Aaya',
      authorOrReciter: 'Nusrat Fateh Ali Khan',
      poet: 'Sufi Tabassum',
      category: 'Naat Lyrics',
      imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
      contentUrdu: `میری جھولی میں یہ انداز کہاں سے آیا
یہ تو سرکارﷺ کا دربار ہے مانگنے والے!

دستِ سائل کو کبھی خالی نہیں پلٹایا
جو بھی آیا ترے در پر وہ سدا شاد رہا
کون کہتا ہے کہ محروم رہا تیرا گدا
دیکھو فیضانِ محمدﷺ سے جہاں آباد رہا`,
      contentRoman: `Meri jholi me ye andaaz kahan se aaya,
Yeh to Sarkar ﷺ ka darbar hai mangne wale!
Dast-e-sa'il ko kabhi khaali nahi lautaya,
Jo bhi aaya tere dar par wo sada shaad raha.`,
      tags: ['Lyrics', 'Kalam', 'Nusrat', 'Urdu Kalaam']
    },
    news: {
      titleUrdu: 'مسجد نبویﷺ میں نمازیوں کے لیے مصنوعی ذہانت پر مبنی ترجمہ رومز کا آغاز',
      title: 'Madinah: AI Real-time Translation Hubs for Pilgrims at Masjid Nabawi',
      authorOrReciter: 'Madinah Media Center',
      category: 'Islamic News',
      imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
      contentUrdu: `مدینہ منورہ: مسجد نبویﷺ کی انتظامیہ نے دنیا بھر سے آنے والے زائرین کے لیے 50 سے زائد زبانوں میں خطبہ جمعہ اور دینی دروس کا فوری ترجمہ فراہم کرنے والے نئے ڈیجیٹل اسمارٹ بوتھس کا افتتاح کیا ہے۔

حکام کے مطابق اردو، انگریزی، انڈونیشین اور فرانسیسی زبانوں کے لیے خصوصی آڈیو چینلز لائیو سٹریم کیے جائیں گے تاکہ نمازی اپنے موبائل فونز پر براہ راست سن سکیں۔`,
      contentRoman: `Madinah Munawwarah: General Presidency for the Prophet's Mosque has unveiled high-tech smart audio booths offering instantaneous Friday sermon translations in 50+ languages including Urdu.`,
      tags: ['Madinah', 'Prophet Mosque', 'Islamic News', 'Hajj']
    },
    poetry: {
      titleUrdu: 'لب پہ آتی ہے دعا بن کے تمنا میری',
      title: 'Lab Pe Aati Hai Dua Ban Ke Tamanna Meri',
      authorOrReciter: 'Kalam-e-Iqbal',
      poet: 'Dr. Allama Muhammad Iqbal',
      category: 'Urdu Poetry',
      imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      contentUrdu: `لب پہ آتی ہے دُعا بن کے تمنّا میری
زندگی شمع کی صورت ہو خدایا میری!

دُور دنیا کا مرے دم سے اندھیرا ہو جائے
ہر جگہ میرے چمکنے سے اجالا ہو جائے
ہو مرے دم سے یونہی میرے وطن کی زینت
جس طرح پھول سے ہوتی ہے چمن کی زینت`,
      contentRoman: `Lab pe aati hai dua ban ke tamanna meri,
Zindagi shama ki soorat ho Khudaya meri!
Door duniya ka mere dam se andhera ho jaye,
Har jagah mere chamakne se ujala ho jaye.`,
      tags: ['Allama Iqbal', 'Urdu Poetry', 'Prayer', 'Children']
    },
    video: {
      titleUrdu: 'قرآن کریم کی تلاوت اور دلوں کا سکون',
      title: 'Soul Stirring Tilawat-e-Quran (Surah Yaseen)',
      authorOrReciter: 'Qari Abdul Basit',
      category: 'Quran & Bayan',
      videoUrl: 'https://www.youtube.com/embed/nU6b2p4_c6Y',
      imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
      contentUrdu: `يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ﴿٣﴾
یاسین، حکمت سے بھرپور قرآن کی قسم! بے شک آپﷺ یقیناً رسولوں میں سے ہیں۔

سنیں اور اپنے گھروں میں رحمت اور برکت کا نزول محسوس کریں۔`,
      contentRoman: `Ya-Sin. By the wise Quran, indeed you [O Muhammad] are from among the messengers.`,
      tags: ['Tilawat', 'Abdul Basit', 'Surah Yaseen', 'Quran Video']
    },
    dua_hadith: {
      titleUrdu: 'دعا برائے کشادگیٔ رزق اور قرض کی ادائیگی',
      title: 'Dua for Relief from Debt and Abundant Rizq',
      authorOrReciter: 'Tirmidhi 3563',
      category: 'Dua & Hadith',
      imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
      contentUrdu: `اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ

ترجمہ:
اے اللہ! مجھے اپنے حلال کے ساتھ اپنے حرام سے کفایت کر، اور اپنے فضل کے ساتھ اپنے سوا ہر ایک سے بے نیاز فرما دے۔`,
      contentRoman: `Allahumma-k-fini bi-halalika 'an haramika wa aghnini bi-fadlika 'amman siwak.
O Allah, suffice me with Your lawful against Your unlawful, and enrich me by Your grace from anyone besides You.`,
      tags: ['Dua', 'Rizq', 'Debt Relief', 'Sunnah']
    },
    calligraphy: {
      titleUrdu: 'ماشاءاللہ لا قوۃ الا باللہ - شاہکار خطاطی',
      title: 'MashaAllah La Quwwata Illa Billah Gold Calligraphy',
      authorOrReciter: 'Master Calligrapher',
      category: 'Islamic Calligraphy',
      imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
      contentUrdu: `مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ
جو اللہ چاہے، اللہ کی مدد کے بغیر کوئی قوت و طاقت نہیں۔

یہ کلمات پڑھنے اور گھر میں لگانے سے نظر بد اور حسد سے حفاظت رہتی ہے اور برکت حاصل ہوتی ہے۔`,
      contentRoman: `What Allah has willed [has occurred]; there is no power except in Allah. (Surah Al-Kahf: 39)`,
      tags: ['Calligraphy', 'Islamic Art', 'Wallpaper', 'Gold']
    }
  };

  const handleApplyPreset = () => {
    const p = presets[type];
    if (p) {
      if (p.titleUrdu) setTitleUrdu(p.titleUrdu);
      if (p.title) setTitle(p.title);
      if (p.authorOrReciter) setAuthorOrReciter(p.authorOrReciter);
      if (p.poet) setPoet(p.poet);
      if (p.category) setCategory(p.category);
      if (p.contentUrdu) setContentUrdu(p.contentUrdu);
      if (p.contentRoman) setContentRoman(p.contentRoman);
      if (p.imageUrl) setImageUrl(p.imageUrl);
      if (p.audioUrl) setAudioUrl(p.audioUrl);
      if (p.videoUrl) setVideoUrl(p.videoUrl);
      if (p.tags) setTagsInput(p.tags.join(', '));
    }
  };

  // Local File Upload Handler for image
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingFile(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setIsUploadingFile(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Local Audio File Upload Handler
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleUrdu.trim()) {
      setError('براہ کرم اردو عنوان ضرور درج کریں۔ (Please enter Urdu title)');
      return;
    }

    const defaultImages: Record<ContentType, string> = {
      naat: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
      lyrics: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
      news: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
      poetry: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      video: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
      dua_hadith: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
      calligraphy: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
    };

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newPost: Post = {
      id: 'upload-' + Date.now(),
      title: title.trim() || titleUrdu.trim(),
      titleUrdu: titleUrdu.trim(),
      type,
      category: category || (type === 'naat' ? 'Naat Sharif' : type === 'lyrics' ? 'Naat Lyrics' : type === 'news' ? 'Islamic News' : 'Poetry'),
      authorOrReciter: authorOrReciter.trim(),
      poet: poet.trim(),
      imageUrl: imageUrl.trim() || defaultImages[type],
      audioUrl: audioUrl.trim(),
      videoUrl: videoUrl.trim(),
      contentUrdu: contentUrdu.trim(),
      contentRoman: contentRoman.trim(),
      date: new Date().toISOString().split('T')[0],
      likes: 1,
      saves: 1,
      views: 12,
      tags: parsedTags.length > 0 ? parsedTags : ['Community', type],
      userUploaded: true
    };

    onUpload(newPost);
    onClose();
  };

  const typeTabs: { id: ContentType; ur: string; en: string; icon: any }[] = [
    { id: 'naat', ur: 'نعت شریف', en: 'Naat / Audio', icon: Music },
    { id: 'lyrics', ur: 'نعت کے بول', en: 'Naat Lyrics', icon: FileText },
    { id: 'news', ur: 'اسلامی خبریں', en: 'Islamic News', icon: Newspaper },
    { id: 'poetry', ur: 'اردو شاعری', en: 'Poetry & Kalam', icon: Feather },
    { id: 'video', ur: 'ویڈیو و بیان', en: 'Video & Bayan', icon: Video },
    { id: 'dua_hadith', ur: 'دعا و حدیث', en: 'Dua & Hadith', icon: HeartHandshake },
    { id: 'calligraphy', ur: 'اسلامی خطاطی', en: 'Calligraphy', icon: ImageIcon },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div 
        className="relative z-10 w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/90 backdrop-blur-sm">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'ur' ? 'نیا اسلامی مواد اپلوڈ کریں' : 'Upload Islamic Content / نیا پن'}</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              {lang === 'ur' 
                ? 'نعتیں، اشعار، خبریں، دعائیں، ویڈیوز اور کلام نور پوائنٹ پر شیئر کریں' 
                : 'Share Naats, lyrics, Islamic news, poetry, videos and calligraphy on NoorPoint'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* 1-Click Sample Button */}
            <button
              type="button"
              onClick={handleApplyPreset}
              className="text-xs px-3 py-1.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-800/60 hover:bg-amber-900/80 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Click to automatically fill with realistic Islamic sample data"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ur' ? 'نمونہ بھریں' : 'Fill Sample Template'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Type Selector Tabs */}
        <div className="px-6 py-2.5 bg-stone-950/60 border-b border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {typeTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = type === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setType(tab.id);
                  setError('');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md border border-emerald-500'
                    : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 border border-stone-700/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-stone-400'}`} />
                <span className={lang === 'ur' ? 'font-urdu text-sm' : ''}>
                  {lang === 'ur' ? tab.ur : tab.en}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Titles: Urdu (Required) & English / Roman */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5 text-right font-urdu">
                عنوان (اردو نستعلیق میں) <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={titleUrdu}
                onChange={(e) => setTitleUrdu(e.target.value)}
                placeholder="مثلاً: فاصلوں کو تکلف ہے ہم سے اگر..."
                className="w-full bg-stone-950 text-stone-100 placeholder-stone-600 rounded-xl px-4 py-2.5 border border-stone-800 focus:outline-none focus:border-emerald-500 text-right font-urdu text-base"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                English / Roman Urdu Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Faslon Ko Takalluf Hai Hum Se Agar"
                className="w-full bg-stone-950 text-stone-100 placeholder-stone-600 rounded-xl px-4 py-2.5 border border-stone-800 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Poet / Reciter / Speaker */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                {type === 'poetry' ? 'شاعر (Poet)' : type === 'news' ? 'ادارہ / رپورٹر' : 'نعت خواں / قاری (Reciter)'}
              </label>
              <input
                type="text"
                value={authorOrReciter}
                onChange={(e) => setAuthorOrReciter(e.target.value)}
                placeholder={type === 'naat' ? 'e.g. Qari Waheed Zafar Qasmi' : type === 'news' ? 'Makkah News Agency' : 'e.g. Allama Iqbal'}
                className="w-full bg-stone-950 text-stone-100 placeholder-stone-600 rounded-xl px-4 py-2 border border-stone-800 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                شاعر / مصنف (Poet / Author)
              </label>
              <input
                type="text"
                value={poet}
                onChange={(e) => setPoet(e.target.value)}
                placeholder="مثلاً: اقبال عظیم / پیر نصیر الدین نصیر"
                className="w-full bg-stone-950 text-stone-100 placeholder-stone-600 rounded-xl px-4 py-2 border border-stone-800 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                زمرہ (Category)
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Naat, Hamd, News, Manqabat..."
                className="w-full bg-stone-950 text-stone-100 placeholder-stone-600 rounded-xl px-4 py-2 border border-stone-800 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>

          {/* Main Content Area (Urdu Lyrics / Article / Poetry) */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center justify-between">
              <span>{lang === 'ur' ? 'مکمل کلام، خبر یا اشعار کا متن:' : 'Urdu Lyrics, News Story or Poetry Body:'}</span>
              <span className="text-[10px] text-emerald-400">نستعلیق فونٹ سپورٹ</span>
            </label>
            <textarea
              rows={5}
              value={contentUrdu}
              onChange={(e) => setContentUrdu(e.target.value)}
              placeholder="یہاں مکمل نعت کے بول، اردو اشعار، حدیث کا اردو ترجمہ، یا اسلامی خبر کی تفصیل درج کریں..."
              className="w-full bg-stone-950 text-stone-100 placeholder-stone-600 rounded-xl p-4 border border-stone-800 focus:outline-none focus:border-emerald-500 text-right font-urdu text-base leading-relaxed"
            />
          </div>

          {/* Roman Urdu or English Translation (Optional) */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Roman Urdu / English Translation (Optional)
            </label>
            <textarea
              rows={3}
              value={contentRoman}
              onChange={(e) => setContentRoman(e.target.value)}
              placeholder="Faslon ko takalluf hai hum se agar, hum bhi bebas nahi hain chale aayenge..."
              className="w-full bg-stone-950 text-stone-100 placeholder-stone-600 rounded-xl p-3 border border-stone-800 focus:outline-none focus:border-emerald-500 text-xs font-sans"
            />
          </div>

          {/* Media Attachments Section (Image, Audio, Video) */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Upload className="w-3.5 h-3.5" />
              <span>میڈیا اور فائلز (Media Attachments)</span>
            </h3>

            {/* Image attachment: File or URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">
                  تصویر اپلوڈ کریں یا لنک دیں (Image File / URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-stone-900 text-stone-200 placeholder-stone-600 rounded-lg px-3 py-1.5 border border-stone-800 text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <label className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg border border-stone-700 cursor-pointer flex items-center gap-1 shrink-0">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Browse</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Audio URL / File */}
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">
                  آڈیو لنک یا MP3 فائل (Audio / Naat Track)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    placeholder="https://example.com/naat.mp3"
                    className="flex-1 bg-stone-900 text-stone-200 placeholder-stone-600 rounded-lg px-3 py-1.5 border border-stone-800 text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <label className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg border border-stone-700 cursor-pointer flex items-center gap-1 shrink-0">
                    <FileAudio className="w-3.5 h-3.5 text-amber-400" />
                    <span>MP3</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Video URL (e.g. YouTube or MP4) */}
            {(type === 'video' || videoUrl) && (
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">
                  ویڈیو یوٹیوب ایمبیڈ یا ڈائریکٹ لنک (YouTube Embed or Video URL)
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full bg-stone-900 text-stone-200 placeholder-stone-600 rounded-lg px-3 py-1.5 border border-stone-800 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Tags & Board Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                ٹیگز (Tags - comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Naat, Owais Raza, Madinah, Urdupoint"
                className="w-full bg-stone-950 text-stone-100 placeholder-stone-600 rounded-xl px-4 py-2 border border-stone-800 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                کس بورڈ میں محفوظ کریں؟ (Save to Board)
              </label>
              <select
                value={selectedBoardId}
                onChange={(e) => setSelectedBoardId(e.target.value)}
                className="w-full bg-stone-950 text-stone-100 rounded-xl px-4 py-2 border border-stone-800 focus:outline-none focus:border-emerald-500 text-xs"
              >
                {boards.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.title} ({b.titleUrdu})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Preview Bar */}
          {titleUrdu && (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
              <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block mb-1">
                لائیو پیش منظر (Live Card Preview)
              </span>
              <p className="font-urdu text-base font-bold text-stone-100 text-right">{titleUrdu}</p>
              {authorOrReciter && <p className="text-xs text-amber-300 mt-1">{authorOrReciter}</p>}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-semibold cursor-pointer"
            >
              منسوخ کریں (Cancel)
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950 hover:shadow-emerald-900 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>شائع کریں (Publish to NoorPoint)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
