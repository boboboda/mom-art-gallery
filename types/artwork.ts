export interface Artwork {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  medium: string;
  size: string;
  featured: boolean;
}

export type Category = '전체' | '풍경화' | '정물화' | '추상화' | '인물화';