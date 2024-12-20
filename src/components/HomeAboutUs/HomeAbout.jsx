import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import img1 from "../../Assests/Bridge_1.jpg"
import img2 from "../../Assests/Machine_1.jpg"
import img3 from "../../Assests/Pillar_3.jpg"

const sections = [
  {
    id: 'welcome',
    title: 'Welcome to S Raj Infra Projects',
    content: 'We are dedicated to providing world-class engineering solutions, innovating and constructing bridges and other engineering marvels using cutting-edge technology and cost-efficient practices.',
    image: img1
  },
  {
    id: 'vision',
    title: 'Our Vision',
    content: 'To innovate and construct world-class bridges and engineering marvels using cutting-edge technology and cost-efficient practices, aiming to become a leader in construction engineering.',
    image: img2
  },
  {
    id: 'mission',
    title: 'Our Mission',
    content: 'To be a premier engineering organization, delivering signature bridges and engineering marvels both domestically and internationally, fostering innovation, creating value, and setting global benchmarks.',
    image: img3
  }
];

export default function HomeAbout() {
  const [activeSection, setActiveSection] = useState('welcome');

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-7xl font-extrabold font-playfair text-richblack-900 mb-5">
            Building Tomorrow's Infrastructure
          </h2>
          <p className="text-2xl text-zinc-700 font-playfair italic max-w-3xl mx-auto mb-2">
            Discover how S Raj Infra Projects is shaping the future of engineering and construction
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                layout
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
                  className="w-full flex justify-between items-center p-6"
                  aria-expanded={activeSection === section.id}
                  aria-controls={`content-${section.id}`}
                >
                  <span className="text-2xl font-semibold font-body text-richblack-900">{section.title}</span>
                  <ChevronRight
                    className={`w-6 h-6 text-blue-500 transform transition-transform ${
                      activeSection === section.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeSection === section.id && (
                    <motion.div
                      id={`content-${section.id}`}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-zinc-800 text-justify font-playfair italic text-lg">{section.content}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={sections.find(s => s.id === activeSection)?.image || sections[0].image}
                  alt={`S Raj Infra Projects - ${activeSection}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

