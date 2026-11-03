export type ContentType = 
  | 'naat'
  | 'lyrics'
  | 'news'
  | 'poetry'
  | 'video'
  | 'dua_hadith'
  | 'calligraphy';

export interface Post {
  id: string;
  title: string;
  titleUrdu: string;
  type: ContentType;
  category: string;
  authorOrReciter?: string;
  poet?: string;
  imageUrl: string;
  audioUrl?: string;
  videoUrl?: string; // e.g. YouTube embed or mp4
  contentUrdu?: string; // Full text / lyrics in Urdu Nastaliq
  contentRoman?: string; // English / Roman Urdu translation or transliteration
  date: string;
  likes: number;
  saves: number;
  views: number;
  tags: string[];
  isFeatured?: boolean;
  source?: string;
  reference?: string; // for Hadith / Ayat
  userUploaded?: boolean;
}

export interface Board {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  coverImage?: string;
  postIds: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  timestamp: string;
  avatar?: string;
}
