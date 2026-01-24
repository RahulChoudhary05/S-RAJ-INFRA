import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Bridge_6 from "../../Assests/Bridge_6.jpg";
import Machine_4 from "../../Assests/Machine_4.jpg";
import Machine_7 from "../../Assests/Machine_7.jpg";
import Inspection_1 from "../../Assests/Inspection_1.jpg";
import Base_1 from "../../Assests/Base_1.jpg";

export const ProjectHero = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-transparent">
      <h2 className="relative z-0 text-[20vw] font-black text-neutral-500 md:text-[200px]">
        PROJECTS<span className="text-neutral-500">.</span>
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src={Bridge_6}
        alt="Example image"
        rotate="-16deg" 
        top="20%"      
        left="15%"     
        className="w-36 md:w-56"
      />
      <Card
        containerRef={containerRef}
        src={Machine_4}
        alt="Example image"
        rotate="12deg"
        top="45%"
        left="20%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src={Machine_7}
        alt="Example image"
        rotate="15deg"
        top="55%"
        left="70%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src={Inspection_1}
        alt="Example image"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src={Base_1}
        alt="Example image"
        rotate="8deg"
        top="50%"
        left="40%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://srajinfra.com/wp-content/themes/sraj_wp/custom-assets/img/new_gal_4.jpeg"
        alt="Example image"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="https://srajinfra.com/wp-content/themes/sraj_wp/custom-assets/img/new_gal_3.jpeg"
        alt="Example image"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="https://srajinfra.com/wp-content/themes/sraj_wp/custom-assets/img/new_gal_2.jpeg"
        alt="Example image"
        rotate="15deg"
        top="60%"
        left="55%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="https://srajinfra.com/wp-content/themes/sraj_wp/custom-assets/img/new_gal_1.jpeg"
        alt="Example image"
        rotate="-4deg"
        top="20%"
        left="30%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="https://srajinfra.com/wp-content/themes/sraj_wp/custom-assets/img/new_gal_5.jpeg"
        alt="Example image"
        rotate="-10deg"
        top="80%"
        left="30%"
        className="w-24 md:w-48"
      />
    </div>
  );

};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};