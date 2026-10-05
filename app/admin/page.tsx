"use client";

import { useState, useEffect } from "react";

import { CardFooter,Card, CardBody, } from "@heroui/card";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import {  Select, SelectItem } from "@heroui/select";
import { Input, Textarea  } from "@heroui/input";
import { Modal, ModalContent,  ModalHeader, ModalBody, ModalFooter, } from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";


import { toast } from "react-toastify";
import artworksData from "@/data/artworks.json";

interface Artwork {
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

export default function AdminPage() {
  const [artworks, setArtworks] = useState<Artwork[]>(artworksData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "풍경화",
    year: new Date().getFullYear().toString(),
    medium: "유화",
    size: "",
    featured: false,
  });

  const categories = ["풍경화", "정물화", "추상화", "인물화"];
  const mediums = ["유화", "수채화", "아크릴", "색연필", "파스텔", "혼합재료"];

  const handleOpenModal = (artwork?: Artwork) => {
    if (artwork) {
      setEditingArtwork(artwork);
      setFormData({
        title: artwork.title,
        description: artwork.description,
        image: artwork.image,
        category: artwork.category,
        year: artwork.year,
        medium: artwork.medium,
        size: artwork.size,
        featured: artwork.featured,
      });
    } else {
      setEditingArtwork(null);
      setFormData({
        title: "",
        description: "",
        image: "",
        category: "풍경화",
        year: new Date().getFullYear().toString(),
        medium: "유화",
        size: "",
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.image) {
      toast.error("필수 항목을 모두 입력해주세요!");
      return;
    }

    if (editingArtwork) {
      // 수정
      const updatedArtworks = artworks.map(art =>
        art.id === editingArtwork.id ? { ...art, ...formData } : art
      );
      setArtworks(updatedArtworks);
      toast.success("작품이 수정되었습니다!");
    } else {
      // 추가 (ID 자동 생성)
      const newId = artworks.length > 0 ? Math.max(...artworks.map(a => a.id)) + 1 : 1;
      const newArtwork: Artwork = {
        id: newId,
        ...formData,
      };
      setArtworks([...artworks, newArtwork]);
      toast.success("작품이 추가되었습니다!");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setArtworks(artworks.filter(art => art.id !== id));
      toast.success("작품이 삭제되었습니다!");
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(artworks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'artworks.json';
    link.click();
    toast.success("작품 데이터를 다운로드했습니다!");
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">작품 관리</h1>
            <p className="text-gray-600">총 {artworks.length}개의 작품</p>
          </div>
          <div className="flex gap-3">
            <Button color="secondary" variant="flat" onPress={handleExport}>
              데이터 내보내기
            </Button>
            <Button color="primary" size="lg" onPress={() => handleOpenModal()}>
              + 새 작품 추가
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody className="text-center p-6">
              <p className="text-gray-600 mb-2">전체 작품</p>
              <p className="text-3xl font-bold text-blue-600">{artworks.length}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center p-6">
              <p className="text-gray-600 mb-2">Featured 작품</p>
              <p className="text-3xl font-bold text-purple-600">
                {artworks.filter(a => a.featured).length}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center p-6">
              <p className="text-gray-600 mb-2">풍경화</p>
              <p className="text-3xl font-bold text-green-600">
                {artworks.filter(a => a.category === "풍경화").length}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center p-6">
              <p className="text-gray-600 mb-2">올해 작품</p>
              <p className="text-3xl font-bold text-orange-600">
                {artworks.filter(a => a.year === new Date().getFullYear().toString()).length}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Artworks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="hover:shadow-xl transition-shadow">
              <CardBody className="p-0">
                <div className="relative">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover"
                    removeWrapper
                  />
                  {artwork.featured && (
                    <Chip
                      color="warning"
                      variant="shadow"
                      className="absolute top-4 right-4"
                    >
                      ⭐ Featured
                    </Chip>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{artwork.title}</h3>
                    <Chip size="sm" color="primary" variant="flat">
                      ID: {artwork.id}
                    </Chip>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {artwork.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Chip size="sm" variant="flat">{artwork.category}</Chip>
                    <Chip size="sm" variant="flat">{artwork.medium}</Chip>
                    <Chip size="sm" variant="flat">{artwork.year}</Chip>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      className="flex-1"
                      onPress={() => handleOpenModal(artwork)}
                    >
                      수정
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      className="flex-1"
                      onPress={() => handleDelete(artwork.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="3xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {editingArtwork ? "작품 수정" : "새 작품 추가"}
                </ModalHeader>
                <ModalBody>
                  <div className="space-y-4">
                    <Input
                      label="작품 제목"
                      placeholder="작품 제목을 입력하세요"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      isRequired
                    />
                    
                    <Textarea
                      label="작품 설명"
                      placeholder="작품에 대한 설명을 입력하세요"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      minRows={4}
                      isRequired
                    />

                    <Input
                      label="이미지 경로"
                      placeholder="/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      description="public 폴더의 이미지 경로를 입력하세요 (예: /artwork1.jpg)"
                      isRequired
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="카테고리"
                        selectedKeys={[formData.category]}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {categories.map((cat) => (
                          <SelectItem key={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="재료"
                        selectedKeys={[formData.medium]}
                        onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                      >
                        {mediums.map((med) => (
                          <SelectItem key={med}>
                            {med}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="제작 년도"
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      />

                      <Input
                        label="크기"
                        placeholder="예: 50x70cm"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      />
                    </div>

                    <Switch
                      isSelected={formData.featured}
                      onValueChange={(value) => setFormData({ ...formData, featured: value })}
                    >
                      메인 페이지에 Featured로 표시
                    </Switch>

                    {formData.image && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">미리보기:</p>
                        <Image
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    취소
                  </Button>
                  <Button color="primary" onPress={handleSave}>
                    {editingArtwork ? "수정" : "추가"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}