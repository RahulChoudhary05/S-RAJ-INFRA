"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon } from "lucide-react";
import { galleryItems } from "./galleryItems";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "bridges", label: "Bridges" },
  { id: "railways", label: "Railways" },
  { id: "plant", label: "Water Treatment Plant" },
];

const MediaGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const items = selectedCategory === "all" 
      ? [...galleryItems].sort(() => Math.random() - 0.5) // Shuffle items
      : galleryItems.filter((item) => item.category === selectedCategory);
    
    setFilteredItems(items);
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <section className="px-4 py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-black mb-2">Project Gallery</h2>
          <div className="w-16 h-1 bg-gray-300 mx-auto mb-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05, backgroundColor: "#D4D4D4" }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State with Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-300 rounded-xl animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3 },
                  }}
                  className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-gray-100 border border-gray-200"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      onError={(e) => (e.target.src = "/placeholder.svg")}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-100 text-sm capitalize">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {!isLoading && filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-gray-100 rounded-xl border border-gray-200"
          >
            <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-4">No images found in this category</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("all")}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              View All Projects
            </motion.button>
          </motion.div>
        )}

        {/* Lightbox with Zoom */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-[0_0_30px rgba(0,0,0,0.5)]"
                />
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#D4D4D4" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="h-6 w-6" />
                </motion.button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/90 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-100 text-lg capitalize">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 -right-20 w-80 h-80 bg-gray-100 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-60 h-60 bg-gray-200 rounded-full blur-3xl"></div>
    </section>
  );
};

export default MediaGallery;
