import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";
import img1 from "../../Assests/Base_1.jpg";
import img2 from "../../Assests/Bridge_7.jpg";
import img3 from "../../Assests/Machine_1.jpg";
import img4 from "../../Assests/Machine_3.jpg";
import img5 from "../../Assests/Machine_5.jpg";
import img6 from "../../Assests/Base_3.jpg";
import img7 from "../../Assests/Pillar_4.jpg";
import img8 from "../../Assests/Pillar_2.jpg";
import { Link } from 'react-router-dom';


const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden rounded-2xl shadow-lg bg-neutral-200 hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
      />
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
    </div>
  );
};


const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(["0%", "-70%"]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], scrollRange);

  useLayoutEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const totalWidth = scrollContainer.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDiff = totalWidth - viewportWidth;

      // Clamp the scroll to ensure it doesn't overshoot
      const scrollPercentage =
        scrollDiff > 0 ? `-${(scrollDiff / totalWidth) * 100}%` : "0%";

      setScrollRange(["0%", scrollPercentage]);
    }
  }, []);

  return (
    <section
      ref={targetRef}
      className="relative min-h-[210vh] sm:min-h-[260vh] md:min-h-[280vh] lg:min-h-[180vh] bg-transparent"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden -mt-10">
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex gap-7 px-5 pr-12 sm:pr-20"
        >
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>

      <>
        <div className="absolute bottom-20 right-[25%] sm:hidden">
          <motion.a
            href="/media"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-white px-4 py-2 font-semibold text-lg font-playfair text-neutral-700 shadow-md hover:bg-neutral-100 hover:text-black"
          >
            Visit Our Gallery
          </motion.a>
        </div>

        <div className="absolute bottom-20 right-10 hidden sm:block md:hidden">
          <motion.a
            href="/media"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-white px-5 py-2.5 font-semibold text-xl font-playfair text-neutral-700 shadow-lg hover:bg-neutral-100 hover:text-black"
          >
            Visit Our Gallery
          </motion.a>
        </div>

        <div className="absolute bottom-20 right-[45%] hidden md:block">
          <motion.a
            href="/media"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-2xl font-playfair text-[#294C60] shadow-xl hover:bg-neutral-100 hover:text-[#2A2F36]"
          >
            Visit Our Gallery
          </motion.a>
        </div>
      </>
    </section>
  );
};

const HomeGallerySection = () => {
  return (
    <div className="bg-[#F5F7FA] px-4 py-5 mt-16">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto px-4">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-semibold font-[Rubik] text-[#2A2F36] leading-tight">
          Welcome to our
        </h1>

        {/* Gallery Highlight Text */}
        <h2 className="mt-1 text-5xl sm:text-7xl font-bold font-[Playfair Display] italic text-[#294C60]">
          Project Gallery
        </h2>

        {/* Optional Subtitle */}
        <p className="mt-4 text-base sm:text-xl font-[Inter] text-[#5F6B7A] max-w-2xl">
          Explore some of our landmark projects in railway bridges, stations, and core infrastructure.
        </p>

        {/* Decorative underline (optional) */}
        <div className="w-20 h-1 bg-[#F4C430] mt-6 rounded-full -mb-8" />
      </div>

      {/* Carousel Component */}
      <div className="mt-1">
        <HorizontalScrollCarousel />
      </div>
    </div>
  );
};


export default HomeGallerySection;

const cards = [
  {
    url: img1,
    id: 1,
  },
  {
    url: img2,
    id: 2,
  },
  {
    url: img3,
    id: 3,
  },
  {
    url: img4,
    id: 4,
  },
  {
    url: img5,
    id: 5,
  },
  {
    url: img6,
    id: 6,
  },
  {
    url: img7,
    id: 7,
  },
  {
    url: img8,
    id: 8,
  },
];
