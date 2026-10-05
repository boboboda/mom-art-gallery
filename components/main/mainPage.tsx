"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Card, CardFooter } from "@heroui/card";
import Link from "next/link";
import artworksData from "@/data/artworks.json";

export default function MainPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredArtworks = artworksData.filter(art => art.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArtworks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArtworks.length]);

  return (
    <div className="w-full">
      {/* Hero Section - 풀스크린 슬라이더 */}
      <section className="relative w-full h-screen overflow-hidden">
        {featuredArtworks.map((artwork, index) => (
          <div
            key={artwork.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
                removeWrapper
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center animate-fade-in">
                  {artwork.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
                  마음으로 그려내는 세상
                </p>
                <Link href="/artPiece">
                  <Button
                    size="lg"
                    color="primary"
                    variant="shadow"
                    className="text-lg px-8 py-6"
                  >
                    작품 둘러보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {featuredArtworks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">작가 소개</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/backgroundImg.jpeg"
                alt="작가"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">
                그림으로 꿈을 그리는 요양보호사
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                저는 65세 요양보호사 일을 하며 틈틈히 그림 그리는 걸 좋아하는 사람입니다.
                어릴 때부터 그림을 좋아했지만 형편상 시기를 놓치고 생활이 바쁘다보니
                못 그렸던 것을 이제라도 즐거운 마음으로 그려보려 합니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                그림은 그냥 그리고 싶은 사물이든지 상상이든지 그림이 주는 신비로움이 있다고 생각합니다.
                무엇이든 하얀 종이 위에 그려낼 수 있다는 것이 너무나 황홀하고 희열이 느껴집니다.
              </p>
              <Link href="/artist">
                <Button size="lg" color="primary" variant="flat">
                  더 알아보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">최근 작품</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">
              마음을 담아 그린 작품들을 감상해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworksData.slice(0, 6).map((artwork) => (
              <Card
                key={artwork.id}
                isPressable
                className="group relative overflow-hidden"
              >
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  removeWrapper
                />
                <CardFooter className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="w-full">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {artwork.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {artwork.category} | {artwork.year}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/artPiece">
              <Button size="lg" color="primary" variant="shadow">
                모든 작품 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            그림 문의가 있으신가요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            작품 구매나 전시 문의는 언제든지 환영합니다
          </p>
          <Link href="/inquiry">
            <Button
              size="lg"
              className="bg-white text-blue-600 font-bold text-lg px-8 py-6"
            >
              문의하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}