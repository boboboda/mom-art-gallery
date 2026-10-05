"use client";

import { useState } from "react";

import {Card,CardFooter,} from "@heroui/card"
import { Image } from "@heroui/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";

import artworksData from "@/data/artworks.json";
import type { Artwork, Category } from "@/types/artwork";

const categories: Category[] = ['전체', '풍경화', '정물화', '추상화', '인물화'];

export default function ArtGallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredArtworks = selectedCategory === '전체'
    ? artworksData
    : artworksData.filter(art => art.category === selectedCategory);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen py-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">작품 갤러리</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            마음을 담아 그린 작품들을 감상해보세요
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              size="lg"
              color={selectedCategory === category ? "primary" : "default"}
              variant={selectedCategory === category ? "solid" : "flat"}
              onClick={() => setSelectedCategory(category)}
              className="px-6"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-center text-gray-600 mb-8">
          총 <span className="font-bold text-blue-600">{filteredArtworks.length}</span>개의 작품
        </p>
      </div>

      {/* Gallery Grid - Masonry Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredArtworks.map((artwork) => (
            <Card
              key={artwork.id}
              className="break-inside-avoid group overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <div 
                className="relative"
                onClick={() => handleArtworkClick(artwork)}
              >
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  removeWrapper
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
                    자세히 보기
                  </div>
                </div>
              </div>
              <CardFooter className="flex-col items-start p-4">
                <div className="w-full flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{artwork.title}</h3>
                  <Chip size="sm" color="primary" variant="flat">
                    {artwork.category}
                  </Chip>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {artwork.description}
                </p>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>{artwork.medium}</span>
                  <span>•</span>
                  <span>{artwork.year}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">{selectedArtwork?.title}</h2>
                <Chip size="sm" color="primary" variant="flat">
                  {selectedArtwork?.category}
                </Chip>
              </ModalHeader>
              <ModalBody>
                <Image
                  src={selectedArtwork?.image}
                  alt={selectedArtwork?.title}
                  className="w-full rounded-lg"
                />
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">작품 설명</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedArtwork?.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-600">재료</h4>
                      <p className="text-gray-800">{selectedArtwork?.medium}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600">크기</h4>
                      <p className="text-gray-800">{selectedArtwork?.size}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600">제작년도</h4>
                      <p className="text-gray-800">{selectedArtwork?.year}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600">카테고리</h4>
                      <p className="text-gray-800">{selectedArtwork?.category}</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button color="primary" onPress={onClose}>
                  문의하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}