import React, { useState, useEffect } from 'react';
import styles from '@/styles/ImageSlider.module.css';

interface SlideProps {
  image: string;
  text: string;
  active: boolean;
}

const Slide: React.FC<SlideProps> = ({ image, text, active }) => {
  // 텍스트 애니메이션을 제어하기 위한 상태
  const [animateText, setAnimateText] = useState(false);

  const [scaleImage, setScaleImage] = useState(false); 
  useEffect(() => {
    if (active) {
      // 이미지가 활성화 되면 1초 후 텍스트 애니메이션을 활성화
      const timer = setTimeout(() => {
        setAnimateText(true);
      }, 2000);

      const imgTimer = setTimeout(() => {
        setScaleImage(true)
      }, 3000)

      // 컴포넌트가 언마운트 되거나 active 상태가 변경되면 타이머를 정리
      return () => {
        clearTimeout(timer);
        clearTimeout(imgTimer);
        setAnimateText(false);
        setScaleImage(false);
        // 애니메이션 상태 초기화
      };
    }
  }, [active]);

  return (
    <div
      className={`${styles.slide}`}
      style={{
        transform: active ? 'translateX(0)' : 'translateX(-100%)', // 이미지 슬라이드
        opacity: active ? 1 : 0, // 활성화 상태에 따른 투명도 조절
        transition: 'transform 2s ease-in-out, opacity 1s ease-in-out' // 부드러운 전환 효과
      }}
    >
      <img
        className={styles.image}
        src={image}
        alt="Image"
        style={{
            transform: scaleImage ? 'scale(1.1)' : 'scale(1)',  // 이미지 스케일 조정
            transition: 'transform 2s ease-in-out'  // 부드러운 확대/축소 효과
          }}
      />
       <div className={styles.overlay} 
       style={
        {
          transform: scaleImage ? 'scale(1.1)' : 'scale(1)',
        }
       }
       />
      <div
        className={`${styles.text}`}
        style={{
          transform: animateText ? 'translateY(-50%)' : 'translateY(50%)', // 텍스트 위치 조절
          opacity: animateText ? 1 : 0, // 텍스트 페이드 인/아웃
          transition: 'transform 1s ease-in-out, opacity 1s ease-in-out' // 텍스트 애니메이션
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Slide;
