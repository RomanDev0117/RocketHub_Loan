import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/pro-solid-svg-icons';
import { register } from 'swiper/element/bundle';
import styles from './HomePageSlider.module.scss';
import clsx from 'clsx';
import { UserLevelDetails } from '../../../components/UserLevelDetails/UserLevelDetails';
import { selectIsLoggedIn } from '@/store/slices/userSlice';
import { getAppState } from '@/store';
import { useSm } from '@/hooks/useMediaHooks';
register();

export const HomePageSlider = () => {
  let slides = [];
  const [slideIndex, setSlideIndex] = useState(0);

  const state = getAppState();
  const isLoggedIn = selectIsLoggedIn(state);
  if (isLoggedIn) slides = [
    { id: 1, bg: '/images/home-page-banner2.png', content: true },
    { id: 2, bg: '/images/home-page/banner2.webp' },
    { id: 3, bg: '/images/home-page/banner3.webp' },
  ];
  else slides = [
    { id: 1, bg: '/images/home-page/banner2.webp' },
    { id: 2, bg: '/images/home-page/banner3.webp' },
  ];

  const swiperElRef = useRef<any>(null);

  useEffect(() => {
    if (!swiperElRef.current) return;

    swiperElRef.current.addEventListener('slidechange', (e: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setSlideIndex(e.detail[0].realIndex);
    });
  }, []);

  const handleDotClick = (idx: number) => {
    swiperElRef.current?.swiper.slideTo(idx);
  };

  const handleNextClick = () => {
    swiperElRef.current?.swiper.slideNext();
  };

  const handlePrevClick = () => {
    swiperElRef.current?.swiper.slidePrev();
  };

  return (
    <div className={styles.slider}>
      {slides.length > 1 && (
        <>
          <div role="button" className={styles.prev} onClick={handlePrevClick}>
            <FontAwesomeIcon icon={faArrowCircleLeft} fontSize={22} />
          </div>
          <div role="button" className={styles.next} onClick={handleNextClick}>
            <FontAwesomeIcon icon={faArrowCircleRight} fontSize={22} />
          </div>
        </>
      )}
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        loop
        autoplay-delay="3000"
        autoplay-disable-on-interaction="false"
        effect="fade"
        speed={700}
      >
        {slides.map((slide) => {
          return (
            <swiper-slide key={slide.id}>
              <Slide slide={slide} />
            </swiper-slide>
          );
        })}
      </swiper-container>
      <div className={styles.pagination}>
        {slides.map((_, idx) => {
          return (
            <div
              className={clsx(styles.dot, slideIndex === idx && styles.active)}
              key={idx}
              onClick={() => handleDotClick(idx)}
            />
          );
        })}
      </div>
    </div>
  );
};

const Slide = ({ slide }: { slide: { bg: string, content?: boolean } }) => {
  const isSm = useSm();

  return (
    <div className={clsx(styles.slideItem, {
      [styles.withContent]: slide.content,
    })}>
      <div
        className={styles.slideBg}
        style={{ backgroundImage: `url(${slide.bg})` }}
      />

      {slide.content && <div className={styles.slideContent}>
        <div className={styles.slideInnerContent}>
          <UserLevelDetails showLevelIcon={false} type={isSm ? "minimal" : "default"}/>
        </div>
      </div>}
    </div>
  );
};
