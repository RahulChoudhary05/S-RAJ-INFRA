import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export function HeroVideo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.addEventListener('canplay', () => setIsVideoLoaded(true));
    }
    return () => {
      if (video) {
        video.removeEventListener('canplay', () => setIsVideoLoaded(true));
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[50vh]">
      {!isVideoLoaded && (
        <Image
          src="/placeholder-image.jpg"
          alt="Video placeholder"
          layout="fill"
          objectFit="cover"
          priority
        />
      )}
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

