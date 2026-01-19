import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';

export const Hero = ({
  images = [],
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 === images.length ? 0 : prevIndex + 1));
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  useEffect(() => {
    const loadImages = () => {
      const loadPromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.onload = () => resolve(image);
          img.onerror = reject;
        });
      });

      Promise.all(loadPromises)
        .then(setLoadedImages)
        .catch((error) => console.error("Failed to load images", error));
    };
    
    loadImages();
  }, [images]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrevious();
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval;
    if (autoplay) interval = setInterval(handleNext, 5000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  const slideVariants = {
    initial: { scale: 0, opacity: 0, rotateX: 45 },
    visible: { scale: 1, rotateX: 0, opacity: 1, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1.0] } },
    upExit: { opacity: 1, y: "-150%", transition: { duration: 1 } },
    downExit: { opacity: 1, y: "150%", transition: { duration: 1 } },
  };

  return (
    <div
      className={`h-screen w-full relative flex items-center justify-center ${className}`}
      style={{ perspective: "1000px" }}
    >
      {loadedImages.length > 0 && (
        <>
          {children}
          {overlay && <div className={`absolute inset-0 bg-black/60 z-40 ${overlayClassName}`} />}
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              src={loadedImages[currentIndex]}
              initial="initial"
              animate="visible"
              exit={direction === "up" ? "upExit" : "downExit"}
              variants={slideVariants}
              className="h-full w-full absolute inset-0 object-cover object-center"
            />
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

Hero.propTypes = {
  images: PropTypes.array.isRequired,
  children: PropTypes.node,
  overlay: PropTypes.bool,
  overlayClassName: PropTypes.string,
  className: PropTypes.string,
  autoplay: PropTypes.bool,
  direction: PropTypes.oneOf(["up", "down"]),
};
