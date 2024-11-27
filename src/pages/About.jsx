import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "../components/layout/layout";
import Bridge5 from "../Assests/Bridge_5.jpg";
import OverVision from "../assets/OverVision.webp";
import OverMission from "../assets/OverMission.jpg";
import Loader from "../components/Loader/Loader";

export const About = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      {loading && <Loader />}
      <div className="bg-white">
        <TextParallaxContent
          id="history"
          imgUrl={Bridge5}
          subheading="Our"
          heading="History"
          headingText="Our Company's History"
          descriptionText={[
            "The engineering of S Raj Infra Projects Pvt Ltd is eminent in installation of bridges in the railway projects where the concern of sustainability must be fulfilled. We respect the environmental value of nature and we plant two trees in place of each and every tree ripped off due to our job. S Raj infra has also undertaken maintenance and restoration work of damaged bridges, creation of fabricated industrial structures and civil construction of major commercial and administrative buildings.",
            "From a tiny acorn, S Raj Infra Pvt Ltd has grown into a giant oak with an annual turnover of INR. 50.00 Crores during the year 2022-2023, serving both Private and Public Sectors in Indian market.",
            "Utilizing the most modern construction equipment and technology, with high degree of expertise and substantial in-house resources, employing 50 people in its permanent cadre, while at any time engaging more than 150 locally employed staff and workers at various project sites."
          ]}
        />
        <TextParallaxContent
          id="vision"
          imgUrl={OverVision}
          subheading="Our"
          heading="Vision"
          headingText="Our Vision"
          descriptionText={[
            "To innovate, design and construct Bridges and other Engineering marvels with world class Engineering standards through state of art technology and cost efficient practices and to become Engineering Giant and Pioneer in this field of Construction Engineering.",
            "To become and remain leader in construction engineering, remain profitable, productive, creative, compliant and financially sound with care and concern to all stakeholders."
          ]}
        />
        <TextParallaxContent
          id="mission"
          imgUrl={OverMission}
          subheading="Our"
          heading="Mission"
          headingText="Our Mission"
          descriptionText={[
            "To become a world-class premier Engineering Project implementing organization.",
            "To construct signature Bridges and Engineering marvels within and outside the country.",
            "To be innovative, entrepreneurial, constantly creating value and attaining global benchmarks.",
            "Committed to total customer satisfaction and continuously enhancing capabilities of the organization and employees through innovation and skill upgradation.",
          ]}
        />
      </div>
    </Layout>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ id, imgUrl, subheading, heading, headingText, descriptionText, buttonText }) => {
  return (
    <div
      id={id}
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[100vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      <div className="mx-auto grid md:grid-cols-12 max-w-5xl py-7 px-4 gap-6">
        <h2 className="col-span-1 text-5xl font-bold md:col-span-4 mb-4">{headingText}</h2>
        <div className="col-span-1 md:col-span-8 text-xl text-neutral-600 mb-14">
          {Array.isArray(descriptionText)
            ? descriptionText.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))
            : <p>{descriptionText}</p>
          }
        </div>
      </div>
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};
