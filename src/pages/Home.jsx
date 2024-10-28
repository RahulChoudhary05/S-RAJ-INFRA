import React, { useState, useEffect } from 'react';

const FuzzyOverlayExample = () => {
  return (
    <div className="relative overflow-hidden">
      <ExampleContent />
      <FuzzyOverlay />
    </div>
  );
};

const FuzzyOverlay = () => {
  const [position, setPosition] = useState(-10);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev >= 10) {
          setDirection(-1);
          return 10;
        }
        if (prev <= -10) {
          setDirection(1);
          return -10;
        }
        return prev + direction;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      style={{
        transform: `translateX(${position}%) translateY(${position}%)`,
        transition: 'transform 0.05s linear'
      }}
      className="pointer-events-none absolute -inset-[100%] bg-[#101725] opacity-[0.15]"
    />
  );
};

const ExampleContent = () => {
  return (
    <div 
      className="relative grid h-screen place-content-center space-y-6 p-8"
      style={{ backgroundColor: '#101725' }}  // Using the specific color
    >
      <p className="text-center text-5xl font-black text-neutral-50">
      S RAJ INFRA PROJECTS PRIVATE LIMITED
      </p>
      <p className="text-center text-neutral-400">
        This is a basic example of using a lo-fi fuzzy overlay 📺
      </p>
      <div className="flex items-center justify-center gap-3">
        <button className="w-fit bg-neutral-200 px-4 py-2 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
          Try it free
        </button>
      </div>
    </div>
  );
};

export default FuzzyOverlayExample;