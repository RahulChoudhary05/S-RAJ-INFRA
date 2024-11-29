import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import base1 from "../../Assests/Workers_4.jpg";
import base2 from "../../Assests/Bridge_2.jpg";
import base3 from "../../Assests/Machine_5.jpg";

const images = [
    base1,
    base2,
    base3,
];

const AnimatedHeader = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`Header image ${currentImageIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-white text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          S RAJ INFRA PROJECTS
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-white text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Building Tomorrow's Infrastructure Today
        </motion.p>
        <div
          className="mt-4 sm:mt-6 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 cursor-pointer transition-colors"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Career
        </div>
      </div>
    </header>
  );
};

export default AnimatedHeader;

