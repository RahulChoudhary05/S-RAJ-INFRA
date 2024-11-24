"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

const content = [
  {
    title: "Welcome!",
    description:
      "To S Raj Infra Projects Pvt Ltd, the company dedicated to provide the world class Engineering to innovate, design and construct Bridges and other Engineering marvels utilizing the most modern construction equipment and technology and cost efficient.",
    content: (
      <div className="h-full w-full bg-[#0BB8AF] flex items-center justify-center text-white text-5xl font-inter font-bold">
        Welcome!
      </div>
    ),
  },
  {
    title: "Our Vision",
    description: (
      <>
        <p>
          To innovate and construct world-class bridges and engineering marvels
          using cutting-edge technology and cost-efficient practices, aiming to
          become a leader in construction engineering.
        </p>
        <p>
          To remain a profitable, creative, and compliant leader in the
          industry, while ensuring care and concern for all stakeholders.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full bg-[#293695] flex items-center justify-center text-white text-4xl font-inter font-bold">
        Our Vision
      </div>
    ),
  },
  {
    title: "Our Mission",
    description: (
      <>
        <p>
          To be a premier engineering organization, delivering signature bridges
          and engineering marvels both domestically and internationally.
        </p>
        <p>
          To foster innovation, create value, and set global benchmarks while
          ensuring total customer satisfaction and continuous growth through
          skill enhancement.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full bg-[#F1950F] flex items-center justify-center text-white text-4xl font-inter font-bold">
        Our Mission
      </div>
    ),
  },
  {
    title: "Investor Corner",
    description:
      "Utilizing the most modern construction equipment and technology, with high degree of expertise and substantial in-house resources, employing 50 peoples in its permanent cadre, while at any time engaging more than 150 locally employed staff and workers at various project sites.",
    content: (
      <div className="h-full w-full bg-[#07B6C5] flex items-center justify-center text-white text-4xl font-inter font-bold">
        Investor Corner
      </div>
    ),
  },
];

export function HomeAbout() {
  return (
    <div className="mt-2">
      <StickyScroll content={content} />
    </div>
  );
}
