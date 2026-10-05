import fs from 'fs';
import path from 'path';

const ARTWORKS_FILE = path.join(process.cwd(), 'data', 'artworks.json');

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
  createdAt: string;
}

// 모든 작품 가져오기
export function getAllArtworks(): Artwork[] {
  const fileContent = fs.readFileSync(ARTWORKS_FILE, 'utf-8');
  return JSON.parse(fileContent);
}

// 작품 추가 (ID 자동 생성)
export function addArtwork(artworkData: Omit<Artwork, 'id' | 'createdAt'>): Artwork {
  const artworks = getAllArtworks();
  
  // 새로운 ID는 가장 큰 ID + 1
  const newId = artworks.length > 0 
    ? Math.max(...artworks.map(a => a.id)) + 1 
    : 1;
  
  const newArtwork: Artwork = {
    ...artworkData,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  
  artworks.push(newArtwork);
  fs.writeFileSync(ARTWORKS_FILE, JSON.stringify(artworks, null, 2));
  
  return newArtwork;
}

// 작품 삭제
export function deleteArtwork(id: number): boolean {
  const artworks = getAllArtworks();
  const filteredArtworks = artworks.filter(a => a.id !== id);
  
  if (filteredArtworks.length === artworks.length) {
    return false; // 삭제할 작품 없음
  }
  
  fs.writeFileSync(ARTWORKS_FILE, JSON.stringify(filteredArtworks, null, 2));
  return true;
}

// 작품 수정
export function updateArtwork(id: number, artworkData: Partial<Artwork>): Artwork | null {
  const artworks = getAllArtworks();
  const index = artworks.findIndex(a => a.id === id);
  
  if (index === -1) {
    return null;
  }
  
  artworks[index] = { ...artworks[index], ...artworkData };
  fs.writeFileSync(ARTWORKS_FILE, JSON.stringify(artworks, null, 2));
  
  return artworks[index];
}