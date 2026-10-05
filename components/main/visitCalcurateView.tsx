import React, { useState, useEffect } from 'react';
import CircularProgress from './CircularProgress';
import { updateVisitCounts, getTotalVisitCount } from './visitCounter';


const VisitCalcurateView: React.FC = () => {
  const [firstProgress, setFirstProgress] = useState<number>(0);
  const [secondProgress, setSecondProgress] = useState<number>(0);
  const [thirdProgress, setThirdProgress] = useState<number>(0);

  const [dailyVisitCount, setDailyVisitCount] = useState<number>(0);
  const [totalVisitCount, setTotalVisitCount] = useState<number>(0);
  const [operatingDays, setOperatingDays] = useState<number>(0);

  useEffect(() => {
    // Simulate an async progress update with a delay
    const timer = setTimeout(() => {
      setFirstProgress(75);
      setSecondProgress(50);
      setThirdProgress(30);
      const { dailyVisitCount, totalVisitCount, operatingDays } = updateVisitCounts();
    setDailyVisitCount(dailyVisitCount);
    setTotalVisitCount(totalVisitCount);
    setOperatingDays(operatingDays)


    }, 1000); // 1초 딜레이
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='w-full flex flex-col md:flex-row gap-16 items-center justify-center pt-5'>
      <CircularProgress
        size={120} // 원형 크기
        progress={firstProgress}
        strokeWidth={12} // 원형 두께
        color="#FFFAB7"
        trackColor="#F6F5F2"
        visitors={`${dailyVisitCount}` } // 방문자 수
        label={'오늘 방문자 수'}
        type={'명'}
        shadowColor='#686D76' // 텍스트 라벨
      />

      <CircularProgress
        size={120} // 원형 크기
        progress={secondProgress}
        strokeWidth={12} // 원형 두께
        color="#FFD1E3"
        trackColor="#F6F5F2"
        visitors={`${totalVisitCount}` } // 방문자 수
        label={'총방문자 수'}
        type={'명'} // 텍스트 라벨
        shadowColor='#686D76'
      />

<CircularProgress
        size={120} // 원형 크기
        progress={thirdProgress}
        strokeWidth={12} // 원형 두께
        color="#7EA1FF"
        trackColor="#F6F5F2"
        visitors={`${operatingDays}` } // 방문자 수
        label={'홈페이지 운영중'}
        type={'일째'} // 텍스트 라벨
        shadowColor='#686D76'
      />
    </div>
  );
};

export default VisitCalcurateView;