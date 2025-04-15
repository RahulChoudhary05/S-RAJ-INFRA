import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    category: "bridges",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800",
    title: "Golden Gate Bridge Project",
  },
  {
    id: 2,
    category: "railways",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800",
    title: "Modern Railway Construction",
  },
  {
    id: 3,
    category: "buildings",
    image: "https://images.unsplash.com/photo-1590372648787-251794c07c49?auto=format&fit=crop&q=80&w=800",
    title: "Luxury Residential Complex",
  },
  {
    id: 4,
    category: "infrastructure",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    title: "Highway Infrastructure",
  },
  {
    id: 5,
    category: "bridges",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&q=80&w=800",
    title: "Suspension Bridge Development",
  },
  {
    id: 6,
    category: "railways",
    image: "https://images.unsplash.com/photo-1527490087278-9c75be0b8052?auto=format&fit=crop&q=80&w=800",
    title: "Metro Rail System",
  }
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "bridges", label: "Bridges" },
  { id: "railways", label: "Railways" },
  { id: "buildings", label: "Buildings" },
  { id: "infrastructure", label: "Infrastructure" },
];

const MediaGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setFilteredItems(
      selectedCategory === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary-300 mb-4">Project Gallery</h2>
          <p className="text-lg text-primary-200/80 max-w-2xl mx-auto">
            Explore our portfolio of completed projects and ongoing developments
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-accent-500 text-white shadow-glow"
                  : "bg-dark-700 text-primary-200 hover:bg-dark-600 hover:text-primary-100"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-glow-lg transition-shadow duration-300"
                onClick={() => setSelectedImage(item)}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-primary-200 mb-2">{item.title}</h3>
                    <p className="text-primary-300/80">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg shadow-glow"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-primary-200 hover:text-primary-400 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-900/90 to-transparent">
                  <h3 className="text-2xl font-bold text-primary-200 mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-primary-300/80">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MediaGallery;
