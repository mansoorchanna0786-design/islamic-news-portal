import { Post, Board } from '../types';

export const INITIAL_BOARDS: Board[] = [
  {
    id: 'fav-naats',
    title: 'Favorite Naats & Kalaam',
    titleUrdu: 'پسندیدہ نعتیں اور کلام',
    description: 'Beautiful recitations and soulful hamd-o-naat collections.',
    coverImage: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    postIds: ['post-1', 'post-2', 'post-3'],
    createdAt: '2026-01-15'
  },
  {
    id: 'kalam-lyrics',
    title: 'Ash\'aar & Lyrics Archive',
    titleUrdu: 'کلام اور اشعار کا خزانہ',
    description: 'Poetic verses and naat lyrics in pure Nastaliq script.',
    coverImage: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80',
    postIds: ['post-4', 'post-5', 'post-8'],
    createdAt: '2026-02-01'
  },
  {
    id: 'daily-duas',
    title: 'Daily Duas & Hadith',
    titleUrdu: 'روزمرہ مسنون دعائیں اور احادیث',
    description: 'Spiritual supplications and authentic prophetic guidance.',
    coverImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    postIds: ['post-6', 'post-10'],
    createdAt: '2026-02-10'
  },
  {
    id: 'islamic-news',
    title: 'Haramain & Islamic News',
    titleUrdu: 'حرمین شریفین اور اسلامی خبریں',
    description: 'Current updates from Makkah, Madinah and Islamic world.',
    coverImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    postIds: ['post-7', 'post-11'],
    createdAt: '2026-02-18'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Faslon Ko Takalluf Hai Hum Se Agar',
    titleUrdu: 'فاصلوں کو تکلف ہے ہم سے اگر ہم بھی بے بس نہیں ہیں چلے آئیں گے',
    type: 'naat',
    category: 'Naat Sharif',
    authorOrReciter: 'Qari Waheed Zafar Qasmi',
    poet: 'Prof. Iqbal Azim',
    imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=peaceful-islamic-ambient-110825.mp3',
    contentUrdu: `فاصلوں کو تکلف ہے ہم سے اگر
ہم بھی بے بس نہیں ہیں چلے آئیں گے
ان کی محفل میں بیٹھنا نصیب ہو
ہم دعا مانگ کر التجا لائیں گے

روشنی ہی روشنی ہے ان کے دربار میں
ذرہ ذرہ چمکتا ہے انوار میں
جالیوں کو پکڑ کر کہیں گے ادھر
یا نبی مصطفیٰﷺ آپ پر جان نثار

دل مدینے کی گلیوں میں گم ہو گیا
غم زمانہ محبت میں کم ہو گیا
جب بھی دربار شاہ امم دیکھیں گے
اشک بن کر در پاک پر جھک جائیں گے`,
    contentRoman: `Faslon ko takalluf hai hum se agar,
Hum bhi bebas nahi hain chale aayenge!
Unki mehfil me baithna naseeb ho,
Hum dua maang kar iltija layenge.

Roshni hi roshni hai unke darbar me,
Zarra zarra chamakta hai anwaar me,
Jaaliyon ko pakad kar kahenge udhar,
Ya Nabi Mustafa ﷺ aap par jaan nisaar.`,
    date: '2026-03-01',
    likes: 1420,
    saves: 890,
    views: 12500,
    tags: ['Naat', 'Qari Waheed Zafar', 'Madinah', 'Urdu Kalaam', 'Popular'],
    isFeatured: true
  },
  {
    id: 'post-2',
    title: 'Tajdar-e-Haram Ae Shehanshah-e-Deen',
    titleUrdu: 'تاجدارِ حرم اے شہنشاہِ دین تم پہ ہر دم کروڑوں درود و سلام',
    type: 'lyrics',
    category: 'Naat Lyrics',
    authorOrReciter: 'Sabri Brothers / Atif Aslam',
    poet: 'Purnam Allahabadi',
    imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=900&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=islamic-background-music-117277.mp3',
    contentUrdu: `قسمت میں میری چین سے جینا لکھ دے
ڈوبے نہ کبھی میرا سفینہ لکھ دے
جنت بھی گوارہ ہے مگر میرے رب
اے کاش مدینے میں پسینہ لکھ دے

تاجدارِ حرم اے شہنشاہِ دین
تم پہ ہر دم کروڑوں درود و سلام
ہو نگاہ کرم ہم پہ سلطان دیں
تم پہ ہر دم کروڑوں درود و سلام

کوئی اپنا نہیں غم کے مارے ہیں ہم
آپ کے در پہ فریاد لائے ہیں ہم
کشتیٔ دل بھنور میں ہے ڈگمگا رہی
ڈگمگاتی ہوئی نائو سنبھال لیجئے!`,
    contentRoman: `Qismat me meri chain se jeena likh de,
Doobe na kabhi mera safeena likh de!
Jannat bhi gawara hai magar mere Rabb,
Aye kaash Madine me paseena likh de.

Tajdar-e-Haram aye Shehanshah-e-Deen,
Tum pe har dam karoron Durood o Salaam!
Ho nigah-e-karam hum pe Sultaan-e-Deen,
Tum pe har dam karoron Durood o Salaam!`,
    date: '2026-03-02',
    likes: 2150,
    saves: 1430,
    views: 28400,
    tags: ['Tajdar-e-Haram', 'Lyrics', 'Durood', 'Sabri', 'Urdu Point'],
    isFeatured: true
  },
  {
    id: 'post-3',
    title: 'Haramain Update: Grand Expansion & New Pilgrim Facilities',
    titleUrdu: 'حرمین شریفین: مسجد الحرام میں زائرین کے لیے نئی سہولیات کا افتتاح',
    type: 'news',
    category: 'Islamic News',
    authorOrReciter: 'Makkah News Desk',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `مکہ مکرمہ: حرمین شریفین کی جنرل اتھارٹی نے مسجد الحرام کے صحن میں عمرہ زائرین اور نمازیوں کی سہولت کے لیے جدید ترین سمارٹ کولنگ سسٹم اور الیکٹرانک رہنمائی ٹاورز کا باضابطہ آغاز کر دیا ہے۔

انتظامیہ کے مطابق اس سال رمضان المبارک اور آنے والے حج سیزن میں ریکارڈ زائرین کی آمد متوقع ہے، جس کے پیش نظر مطاف کے تمام ٹریکس اور توسیع شدہ گیلریوں میں خودکار ای ٹرانسپورٹ گاڑیوں کی تعداد دوگنی کر دی گئی ہے۔

علاوہ ازیں مسجد نبویﷺ میں باب السلام کے اطراف نئی خصوصی الیکٹرک چھتریوں اور زمزم واٹر سپلائی سسٹمز کو اپ گریڈ کیا گیا ہے۔ دنیا بھر سے آئے معتمرین نے ان انتظامات کو سراہا ہے۔`,
    contentRoman: `Makkah Mukarrama: General Authority of Haramain has inaugurated smart cooling and digital guidance portals for pilgrims around Mataaf. Extended facilities are ready to welcome millions of worshippers for the upcoming season with enhanced electric shuttles and Zamzam fountains.`,
    date: '2026-03-03',
    likes: 870,
    saves: 410,
    views: 9200,
    tags: ['Makkah', 'Haramain', 'Islamic News', 'Umrah', 'Madinah'],
    isFeatured: true,
    source: 'Haramain Media Network'
  },
  {
    id: 'post-4',
    title: 'Allama Iqbal Poetry: Shikwa & Jawab-e-Shikwa',
    titleUrdu: 'شکوہ و جوابِ شکوہ - علامہ محمد اقبال کی لازوال کلام',
    type: 'poetry',
    category: 'Urdu Poetry',
    poet: 'Dr. Allama Muhammad Iqbal',
    authorOrReciter: 'Kalam-e-Iqbal',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `کیوں زیاں کار بنوں، سود فراموش رہوں؟
فکرِ فردا نہ کروں، محوِ غمِ دوش رہوں؟
نالہ بلبل کے سنوں اور ہمہ تن گوش رہوں؟
ہم نوا! میں بھی کوئی گل ہوں کہ خاموش رہوں؟

جرأت آموز مری تابِ سخن ہے مجھ کو
شکوہ اللہ سے خاکم بدہن ہے مجھ کو

جوابِ شکوہ:
کی محمدؐ سے وفا تُو نے تو ہم تیرے ہیں
یہ جہاں چیز ہے کیا لوح و قلم تیرے ہیں!`,
    contentRoman: `Kyun ziyan kaar banoon, sood faramosh rahoon?
Fikr-e-farda na karoon, mahv-e-gham-e-dosh rahoon?
Nala-e-bulbul ke sunoon aur hama tan gosh rahoon?
Ham-nawa! Main bhi koi gul hoon ke khamosh rahoon?

Ki Muhammad ﷺ se wafa tu ne to hum tere hain,
Yeh jahan cheez hai kya, Lauh-o-Qalam tere hain!`,
    date: '2026-02-28',
    likes: 3100,
    saves: 2200,
    views: 31000,
    tags: ['Allama Iqbal', 'Shikwa', 'Shayari', 'Philosophy', 'Urdu Kalam']
  },
  {
    id: 'post-5',
    title: 'Surah Ar-Rahman Soulful Recitation (تلاوت)',
    titleUrdu: 'سورۃ الرحمٰن کی روح پرور تلاوت مع اردو ترجمہ',
    type: 'video',
    category: 'Quran & Bayan',
    authorOrReciter: 'Qari Mishary Rashid Alafasy',
    videoUrl: 'https://www.youtube.com/embed/6WVMb8g25f4',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ ﴿١٣﴾
پس تم دونوں اپنے رب کی کون کون سی نعمتوں کو جھٹلاؤ گے؟

عظیم الشان آیات جو دل کو سکون، آنکھوں کو ٹھنڈک اور روح کو بالیدگی بخشتی ہیں۔ تلاوت سنیں اور قدرت کے انوار کا مشاہدہ کریں۔`,
    contentRoman: `Fa-bi-ayyi ala-i Rabbikuma tukadh-dhiban.
So which of the favors of your Lord will you deny?
Listen to the heartfelt recitation with Urdu translation.`,
    date: '2026-03-01',
    likes: 4500,
    saves: 3100,
    views: 45000,
    tags: ['Quran', 'Surah Rahman', 'Tilawat', 'Mishary', 'Peace']
  },
  {
    id: 'post-6',
    title: 'Masnoon Morning & Evening Duas (دعائیں)',
    titleUrdu: 'صبح اور شام کے مسنون اذکار اور حفاظت کی دعائیں',
    type: 'dua_hadith',
    category: 'Dua & Hadith',
    authorOrReciter: 'Hisn-ul-Muslim',
    reference: 'Abu Dawud 5088, Tirmidhi 3388',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ

ترجمہ:
اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہی سب کچھ سننے والا اور جاننے والا ہے۔

فضیلت:
جو شخص صبح و شام تین تین مرتبہ یہ دعا پڑھے، اسے کوئی ناگہانی آفت اور بیماری نقصان نہیں پہنچائے گی۔`,
    contentRoman: `Bismillahi-lladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.
"In the Name of Allah, with Whose Name nothing on the earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing."`,
    date: '2026-02-27',
    likes: 1850,
    saves: 1620,
    views: 18900,
    tags: ['Duas', 'Hisnul Muslim', 'Hifazat', 'Azkar', 'Urdu Tarjuma']
  },
  {
    id: 'post-7',
    title: 'Gold Embellished Kiswah Calligraphy Art',
    titleUrdu: 'غلافِ کعبہ کی طلائی خطاطی اور قرآنی نقوش',
    type: 'calligraphy',
    category: 'Islamic Calligraphy',
    authorOrReciter: 'Kiswa Al-Kaaba Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `غلافِ کعبہ (کسوہ) پر خالص چاندی اور سونے کے تاروں سے لکھی گئی قرآنی آیات کا شاہکار۔
ہر سال حج کے موقع پر کسوہ کو تبدیل کیا جاتا ہے، جس کی تیاری میں دنیا کے نامور ترین خطاط اور ماہر کاریگر حصہ لیتے ہیں۔

خطِ ثلث جلی میں کلمہ طیبہ اور آیات مبارکہ کی دلکش تصویر جو گھر یا موبائل وال پیپر کے لیے باعثِ برکت ہے۔`,
    contentRoman: `Exquisite gold and silver wire calligraphy on the holy Kiswah of the Kaaba, hand-crafted using Thuluth script. High definition wallpaper asset for believers worldwide.`,
    date: '2026-02-25',
    likes: 2900,
    saves: 1950,
    views: 24000,
    tags: ['Calligraphy', 'Kiswah', 'Kaaba', 'Wallpaper', 'Khat-e-Thuluth']
  },
  {
    id: 'post-8',
    title: 'Zahe Muqaddar Huzoor-e-Haq Se',
    titleUrdu: 'زہے مقدر حضورِ حق سے سلام آیا پیام آیا',
    type: 'naat',
    category: 'Naat Sharif',
    authorOrReciter: 'Khurshid Ahmad',
    poet: 'Allama Iqbal & Traditional',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=peaceful-islamic-ambient-110825.mp3',
    contentUrdu: `زہے مقدر حضورِ حق سے سلام آیا پیام آیا
جھکاؤ نظریں بچھاؤ پلکیں ادب کا موقع مقام آیا

صبا مدینے سے آئی تو خوشبوئیں بکھر گئیں
نوید رحمت سناتے ہر سو غلام در پر سلام لایا

وہ جس کا چرچا جہاں جہاں ہے
وہ جس کا سکہ رواں دواں ہے
وہی تو ہے فخرِ کائناتِ عالم
وہی شفیعِ انام آیا!`,
    contentRoman: `Zahe muqaddar Huzoor-e-Haq se salaam aaya payam aaya,
Jhukao nazrein bichhao palkein adab ka mauqa maqam aaya.
Saba Madine se aayi to khushbuyen bikhar gayin,
Naveed-e-rehmat sunate har soo ghulaam dar par salaam laaya.`,
    date: '2026-02-24',
    likes: 1720,
    saves: 1200,
    views: 16400,
    tags: ['Zahe Muqaddar', 'Khurshid Ahmad', 'Old Naat', 'Soulful']
  },
  {
    id: 'post-9',
    title: 'Pir Naseeruddin Naseer: Ya Nabi Nazre Karam Farmana',
    titleUrdu: 'یا نبیﷺ نظرِ کرم فرمانا اے حسنین کے نانا',
    type: 'lyrics',
    category: 'Naat Lyrics',
    authorOrReciter: 'Pir Sayyid Naseeruddin Naseer (Golra Sharif)',
    poet: 'Pir Naseeruddin Naseer',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `یا نبیﷺ نظرِ کرم فرمانا، اے حسنین کے نانا!
المدد زہرا کے بابا، دامنِ رحمت پھیلا دو

تیرے در سے کون خالی ہاتھ لوٹا ہے بتائو
ہم گناہ گاروں کو بھی جلوۂ جاناں دکھاؤ
دور غم کی رات کر دو، نور کی برسات کر دو
ڈال دو اک بار نظرِ التفاتِ مصطفیٰﷺ!`,
    contentRoman: `Ya Nabi nazr-e-karam farmana, aye Hasnain ke Nana!
Al-Madad Zehra ke Baba, daaman-e-rehmat phaila do.
Tere dar se kaun khaali haath lauta hai batao,
Hum gunahgaron ko bhi jalwa-e-jaana dikhao.`,
    date: '2026-02-20',
    likes: 3800,
    saves: 2650,
    views: 39000,
    tags: ['Pir Naseeruddin Naseer', 'Golra Sharif', 'Kalaam', 'Lyrics', 'Hasnain ke Nana']
  },
  {
    id: 'post-10',
    title: 'Daily Hadith: Prophet\'s Advice on Soft Speech & Character',
    titleUrdu: 'فرمانِ نبویﷺ: بہترین اخلاق اور نرم گفتاری کی فضیلت',
    type: 'dua_hadith',
    category: 'Dua & Hadith',
    authorOrReciter: 'Sahih Al-Bukhari',
    reference: 'Sahih Bukhari: 6029',
    imageUrl: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ:
"مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ"

ترجمہ:
حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے فرمایا:
"جو شخص اللہ اور یوم آخرت پر ایمان رکھتا ہو، اسے چاہیے کہ اچھی بات کہے یا پھر خاموش رہے۔"

پیغام:
زبان کی حفاظت اور تلخی سے پرہیز مؤمن کی سب سے بڑی زینت ہے۔`,
    contentRoman: `Abu Hurairah (R.A) narrated that the Messenger of Allah ﷺ said:
"Whoever believes in Allah and the Last Day, let him speak good or remain silent." (Sahih Bukhari)`,
    date: '2026-02-18',
    likes: 2100,
    saves: 1840,
    views: 19800,
    tags: ['Hadith', 'Bukhari', 'Akhlaq', 'Urdupoint Islam', 'Daily Reminder']
  },
  {
    id: 'post-11',
    title: 'International Islamic Calligraphy & Quranic Heritage Expo',
    titleUrdu: 'بین الاقوامی اسلامی خطاطی اور قرآنی مخطوطات نمائش کا انعقاد',
    type: 'news',
    category: 'Islamic News',
    authorOrReciter: 'Cultural Heritage Bureau',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `لاہور و استنبول: اسلامی دنیا کے معروف خطاطین اور ماہرین آثار قدیمہ کی جانب سے صدیوں پرانے نایاب قرآنی نسخوں کی عالمی نمائش کا آغاز ہو گیا ہے۔

اس نمائش میں عباسی، عثمانی اور مغلیہ دور کے طلائی قرآنی پارے، غلاف کعبہ کے تاریخی ٹکڑے اور نوجوان خطاطین کے نئے نمونے رکھے گئے ہیں۔

نمائش کے مہتمم نے بتایا کہ ڈیجیٹل دور میں خط کوفی، خط نستعلیق اور خط ثلث کے تحفظ کے لیے خصوصی ورکشاپس بھی منعقد کی جا رہی ہیں۔`,
    contentRoman: `International Islamic Calligraphy & Quranic Heritage exhibition showcases centuries-old rare Quranic manuscripts and modern Nastaliq & Thuluth masterworks.`,
    date: '2026-02-15',
    likes: 950,
    saves: 520,
    views: 11000,
    tags: ['Exhibition', 'Islamic News', 'Heritage', 'Lahore', 'Istanbul']
  },
  {
    id: 'post-12',
    title: 'Heart-Touching Bayan: Valuing Parents in Islam',
    titleUrdu: 'والدین کی قدر اور حسنِ سلوک - دل چھو لینے والا بیان',
    type: 'video',
    category: 'Quran & Bayan',
    authorOrReciter: 'Maulana Tariq Jameel',
    videoUrl: 'https://www.youtube.com/embed/Yp9dO-F85u8',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80',
    contentUrdu: `اللہ تعالیٰ نے قرآن مجید میں اپنی عبادت کے فوراً بعد والدین کے ساتھ حسنِ سلوک کا حکم دیا۔
ماں کی دعا تقدیریں بدل دیتی ہے اور باپ جنت کا بہترین دروازہ ہے۔

اس دل گداز بیان میں مولانا نے ان تمام جوانوں کو جھنجھوڑا ہے جو اپنے والدین کی خدمت میں غفلت برتتے ہیں۔ سنیں اور اپنے رویوں کا محاسبہ کریں۔`,
    contentRoman: `Heartfelt lecture on respecting and honoring parents in Islam. The Quran commands kindness to parents right after worship of Allah.`,
    date: '2026-02-12',
    likes: 5200,
    saves: 3900,
    views: 64000,
    tags: ['Tariq Jameel', 'Bayan', 'Parents', 'Islam', 'Urdu Video']
  }
];

export const CITY_PRAYER_TIMES = [
  { city: 'Karachi', country: 'Pakistan', fajr: '05:32', sunrise: '06:48', dhuhr: '12:38', asr: '16:02', maghrib: '18:29', isha: '19:44' },
  { city: 'Lahore', country: 'Pakistan', fajr: '05:14', sunrise: '06:33', dhuhr: '12:18', asr: '15:38', maghrib: '18:04', isha: '19:22' },
  { city: 'Islamabad', country: 'Pakistan', fajr: '05:18', sunrise: '06:39', dhuhr: '12:22', asr: '15:40', maghrib: '18:06', isha: '19:27' },
  { city: 'Makkah', country: 'Saudi Arabia', fajr: '05:22', sunrise: '06:38', dhuhr: '12:32', asr: '15:54', maghrib: '18:27', isha: '19:42' },
  { city: 'Madinah', country: 'Saudi Arabia', fajr: '05:25', sunrise: '06:42', dhuhr: '12:33', asr: '15:53', maghrib: '18:24', isha: '19:39' },
  { city: 'London', country: 'UK', fajr: '05:04', sunrise: '06:50', dhuhr: '12:12', asr: '15:05', maghrib: '17:34', isha: '19:18' }
];
