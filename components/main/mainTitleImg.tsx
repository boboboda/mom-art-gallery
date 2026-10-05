import React, { useState, useEffect } from 'react';
import Slide from './Slide';
import styles from '@/styles/ImageSlider.module.css';

interface SlideData {
  image: string;
  text: string;
}

const slides: SlideData[] = [
  { image: '/title_img_1.jpeg', text: '광명' },
  { image: '/title_img_2.jpeg', text: 'This is Slide 2' },
  { image: '/title_img_3.jpeg', text: 'Slide 3 is Here' },
  { image: '/title_img_4.jpeg', text: 'Enjoy Slide 4' },
  { image: '/title_img_5.jpeg', text: 'Last Slide 5' }
];

const ImageSlider: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 8000); // 6초 후 이미지 전환

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.sliderContainer}`}>
      {slides.map((slide, index) => (
        <Slide key={index} image={slide.image} text={slide.text} active={index === currentImageIndex} />
      ))}
    </div>
  );
};

export default ImageSlider;
