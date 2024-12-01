import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goToNext, 3000);
  }, [goToNext]);

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, startTimer]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] max-w-[1600px] max-h-[1000px] m-auto py-4 px-2 md:py-8 md:px-4 group mb-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative overflow-hidden"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 md:p-6 lg:p-8 text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{slides[currentIndex].title}</h2>
          <p className="text-sm md:text-base lg:text-lg">{slides[currentIndex].subtitle}</p>
        </div>
      </div>
      <div 
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 md:left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors"
        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
      >
        <ChevronLeft size={30} className="md:w-10 md:h-10" />
      </div>
      <div 
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 md:right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors"
        onClick={(e) => { e.stopPropagation(); goToNext(); }}
      >
        <ChevronRight size={30} className="md:w-10 md:h-10" />
      </div>
    </div>
  );
};

export default ImageSlider;

