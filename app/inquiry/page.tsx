"use client";

import { useState } from "react";
import { Input, Textarea, Button, Card, CardBody } from "@heroui/react";
import { toast } from "react-toastify";

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제 구현시에는 이메일 전송 API나 백엔드 연동
    setTimeout(() => {
      toast.success("문의가 성공적으로 전송되었습니다!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">문의하기</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            작품 구매나 전시 문의는 언제든지 환영합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold mb-6">연락처 정보</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">📧</div>
                    <div>
                      <h3 className="font-semibold mb-1">이메일</h3>
                      <p className="text-gray-600">example@email.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">📱</div>
                    <div>
                      <h3 className="font-semibold mb-1">전화번호</h3>
                      <p className="text-gray-600">010-0000-0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🕐</div>
                    <div>
                      <h3 className="font-semibold mb-1">운영시간</h3>
                      <p className="text-gray-600">평일 10:00 - 18:00</p>
                      <p className="text-gray-600 text-sm">(주말 및 공휴일 휴무)</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardBody className="p-8">
                <h3 className="text-xl font-bold mb-4">문의 안내</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>작품 구매 및 가격 문의</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>전시회 및 협업 제안</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>맞춤 주문 제작 문의</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>기타 문의사항</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6">문의 양식</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="이름"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  required
                  size="lg"
                />
                
                <Input
                  label="이메일"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                  size="lg"
                />
                
                <Input
                  label="연락처"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  required
                  size="lg"
                />
                
                <Input
                  label="제목"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="문의 제목을 입력하세요"
                  required
                  size="lg"
                />
                
                <Textarea
                  label="문의내용"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="문의하실 내용을 자세히 입력해주세요"
                  required
                  minRows={6}
                  size="lg"
                />
                
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "전송 중..." : "문의하기"}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">자주 묻는 질문</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardBody className="p-6">
                <h3 className="font-bold text-lg mb-2">작품 구매는 어떻게 하나요?</h3>
                <p className="text-gray-600">
                  원하시는 작품을 선택하신 후 문의하기를 통해 연락주시면 구매 절차를 안내해드립니다.
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="p-6">
                <h3 className="font-bold text-lg mb-2">맞춤 제작이 가능한가요?</h3>
                <p className="text-gray-600">
                  네, 가능합니다. 원하시는 크기와 주제를 말씀해주시면 상담 후 제작해드립니다.
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="p-6">
                <h3 className="font-bold text-lg mb-2">배송은 어떻게 되나요?</h3>
                <p className="text-gray-600">
                  안전한 포장 후 택배로 배송해드리며, 직접 수령도 가능합니다.
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="p-6">
                <h3 className="font-bold text-lg mb-2">작품 가격은 어떻게 되나요?</h3>
                <p className="text-gray-600">
                  작품의 크기와 재료에 따라 상이하며, 개별 문의를 통해 안내해드립니다.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}