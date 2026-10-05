"use client";
import {Card,CardBody } from "@heroui/card"
import{ Image } from "@heroui/image";


export default function ArtistView() {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-96 overflow-hidden">
        <Image
          src="/backgroundImg.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
          removeWrapper
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">작가 소개</h1>
          <p className="text-xl md:text-2xl">그림으로 꿈을 그리는 요양보호사</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-blue-100 rounded-2xl -z-10"></div>
              <Image
                src="/backgroundImg.jpeg"
                alt="작가"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-2">안녕하세요</h2>
                <p className="text-xl text-gray-600">65세, 그림을 사랑하는 요양보호사입니다</p>
              </div>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  저는 65세 요양보호사 일을 하며 틈틈히 그림 그리는 걸 좋아하는 사람입니다.
                </p>
                
                <p>
                  어릴 때부터 그림을 좋아했지만 형편상 시기를 놓치고 생활이 바쁘다보니
                  못 그렸던 것을 이제라도 즐거운 마음으로 그려보려 합니다.
                </p>
                
                <p>
                  그림은 그냥 그리고 싶은 사물이든지 상상이든지 그림이 주는 신비로움이 있다고 생각합니다.
                  무엇이든 하얀 종이 위에 그려낼 수 있다는 것이 너무나 황홀하고 희열이 느껴지는
                  그런 것이 저의 그림에 대한 생각입니다.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">작가의 철학</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/80 backdrop-blur">
                <CardBody className="text-center p-6">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold mb-3">열정</h3>
                  <p className="text-gray-600">
                    나이는 숫자에 불과합니다. 열정만 있다면 언제든 시작할 수 있습니다.
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardBody className="text-center p-6">
                  <div className="text-4xl mb-4">❤️</div>
                  <h3 className="text-xl font-bold mb-3">진정성</h3>
                  <p className="text-gray-600">
                    완벽함보다 진심을 담은 그림을 그립니다.
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardBody className="text-center p-6">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-xl font-bold mb-3">영감</h3>
                  <p className="text-gray-600">
                    제 그림이 다른 분들에게도 용기를 주었으면 합니다.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Message Section */}
          <div className="max-w-3xl mx-auto">
            <Card className="border-l-4 border-blue-500">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold mb-4">저의 다짐</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    너무 잘 그리겠다는 욕심을 버리고 그릴 것입니다.
                    그래도 열심히 그릴 것입니다.
                  </p>
                  
                  <p>
                    제 그림이 독학이라서 많이 부족하지만 세상에서 단 하나뿐인 저의 그림이라고 생각하고
                    제 그림을 보고 그림을 그리고 싶어도 쉽게 시작 못하고 망설이는 분들이
                    힘을 얻어서 그릴 수 있는 그런 그림,
                  </p>
                  
                  <p className="font-bold text-blue-600 text-lg">
                    세상에서 하나뿐인 저의 그림을 그릴 때까지 노력할 것입니다.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">작품 둘러보기</h2>
          <p className="text-xl text-gray-600 mb-8">
            마음을 담아 그린 작품들을 감상해보세요
          </p>
          <a
            href="/artPiece"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            갤러리 보기
          </a>
        </div>
      </section>
    </div>
  );
}