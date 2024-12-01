import React, { useRef, useState, useEffect } from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "../../../lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"], // Changed to end end to fix last section spacing
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map(
      (_, index) => index / (cardLength - 1)
    ); // Adjusted calculation
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "bg-[url('https://c4.wallpaperflare.com/wallpaper/246/45/172/road-highway-sky-nature-wallpaper-preview.jpg')]",
    "bg-[url('https://srajinfra.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-08-19-at-5.06.41-PM.jpeg')]",
    "bg-[url('https://srajinfra.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-29-at-8.10.02-PM.jpeg')]",
    "bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9aG9Y-VTjgipQWvhoq6rJfNPjOojzo9XKYQ&s')]",
  ];

  return (
    <motion.div
      ref={ref}
      className="h-[27rem] overflow-y-auto flex justify-center relative bg-gradient-to-b from-richblack-5 to-white space-x-10 rounded-lg shadow-xl mb-5"
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              className={cn(
                "min-h-[50vh] flex flex-col justify-center m-auto",
                index !== content.length - 1 ? "mb-[2rem]" : "mb-[17rem]" // Reduced margin for last item
              )}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 50,
                scale: activeCard === index ? 1.02 : 0.9,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.h2
                className="text-5xl font-bold font-playfair text-richblack-900 mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {item.title}
              </motion.h2>
              <motion.div
                className="text-xl text-richblack-800  text-justify font-semibold font-playfair max-w-sm"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {item.description}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block w-1/2 sticky top-14 h-[calc(100vh-10rem)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: 30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "h-[58%] w-[78%] rounded-lg shadow-xl overflow-hidden bg-cover bg-center",
              backgroundColors[activeCard % backgroundColors.length],
              contentClassName
            )}
          >
            {content[activeCard].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
