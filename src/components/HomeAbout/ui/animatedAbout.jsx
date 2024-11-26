"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StickyScroll } from "./sticky-scroll-reveal";

const content = [
  {
    title: "Welcome to S Raj Infra Projects",
    description:
      "We are dedicated to providing world-class engineering solutions, innovating and constructing bridges and other engineering marvels using cutting-edge technology and cost-efficient practices.",
    content: (
      <div className="h-full w-full flex flex-col items-center justify-center text-white p-4">
        <motion.img
          src="https://srajinfra.com/wp-content/themes/sraj_wp/custom-assets/img/logo.svg?height=100&width=100"
          alt="S Raj Infra Projects Logo"
          className="w-24 h-24 mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 260, damping: 20 }}
        />
        <motion.h3 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Welcome!
        </motion.h3>
        <motion.p 
          className="text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Building the future, one project at a time.
        </motion.p>
      </div>
    ),
  },
  {
    title: "Our Vision",
    description: (
      <>
        <p className="mb-4">
          To innovate and construct world-class bridges and engineering marvels using cutting-edge technology and cost-efficient practices, aiming to become a leader in construction engineering.
        </p>
        <p>
          To remain a profitable, creative, and compliant leader in the industry, while ensuring care and concern for all stakeholders.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full flex flex-col items-center justify-center text-white p-4">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-24 h-24 mb-4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </motion.svg>
        <motion.h3 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Our Vision
        </motion.h3>
        <motion.p 
          className="text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Shaping the future of infrastructure
        </motion.p>
      </div>
    ),
  },
  {
    title: "Our Mission",
    description: (
      <>
        <p className="mb-4">
          To be a premier engineering organization, delivering signature bridges and engineering marvels both domestically and internationally.
        </p>
        <p>
          To foster innovation, create value, and set global benchmarks while ensuring total customer satisfaction and continuous growth through skill enhancement.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full flex flex-col items-center justify-center text-white p-4">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-24 h-24 mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="m4.93 4.93 2.83 2.83" />
          <path d="m16.24 16.24 2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="m4.93 19.07 2.83-2.83" />
          <path d="m16.24 7.76 2.83-2.83" />
        </motion.svg>
        <motion.h3 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Our Mission
        </motion.h3>
        <motion.p 
          className="text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Excellence in every project
        </motion.p>
      </div>
    ),
  },
  {
    title: "Investor Corner",
    description:
      "We utilize the most modern construction equipment and technology, with a high degree of expertise and substantial in-house resources. Our team comprises 50 permanent staff members, and we engage more than 150 locally employed staff and workers at various project sites at any given time.",
    content: (
      <div className="h-full w-full flex flex-col items-center justify-center text-white p-4">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-24 h-24 mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
          <path d="M12 2v20" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </motion.svg>
        <motion.h3 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Investor Corner
        </motion.h3>
        <motion.p 
          className="text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Building value for our stakeholders
        </motion.p>
      </div>
    ),
  },
];

const AnimatedTitle = ({ text }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1,
          },
        },
      }}
      className="text-5xl font-bold text-center mb-12 text-gray-800"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export function HomeAbout() {
  return (
    <section className="py-5 bg-gray-100">
      <div className="container mx-auto px-1">
        <AnimatedTitle text="About S Raj Infra Projects" />
        <StickyScroll content={content} />
      </div>
    </section>
  );
}