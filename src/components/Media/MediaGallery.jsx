"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, ImageIcon } from "lucide-react"

// Sample gallery data with real images
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
  },
]

const categories = [
  { id: "all", label: "All Projects" },
  { id: "bridges", label: "Bridges" },
  { id: "railways", label: "Railways" },
  { id: "buildings", label: "Buildings" },
  { id: "infrastructure", label: "Infrastructure" },
]

const MediaGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredItems, setFilteredItems] = useState(galleryItems)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading images
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setFilteredItems(
      selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory),
    )
  }, [selectedCategory])

  // Staggered animation for gallery items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold font-playfair text-white mb-2">Project Gallery</h2>
          <div className="w-16 h-1 bg-yellow-1 mx-auto mb-4" />
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
              whileHover={{ scale: 1.05, backgroundColor: "#D4AF37" }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-yellow-1 text-richblue-900 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  : "bg-richblue-700 text-white hover:bg-richblue-600"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-32">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-richblue-600 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-yellow-1 rounded-full animate-spin"></div>
            </div>
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
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                    transition: { duration: 0.3 },
                  }}
                  className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-richblue-700"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-richblue-900/90 via-richblue-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-blue-100 text-sm capitalize">{item.category}</p>
                    <div className="mt-4 flex justify-center">
                      <motion.span
                        className="w-10 h-10 rounded-full bg-yellow-1/80 flex items-center justify-center text-richblue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Search className="w-5 h-5" />
                      </motion.span>
                    </div>
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
            className="text-center py-20 bg-richblue-700/50 rounded-xl"
          >
            <ImageIcon className="w-16 h-16 mx-auto text-blue-300/50 mb-4" />
            <p className="text-blue-100 text-lg mb-4">No images found in this category</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("all")}
              className="px-6 py-2 bg-yellow-1 text-richblue-900 rounded-full hover:bg-yellow-1/90 transition-colors"
            >
              View All Projects
            </motion.button>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-richblue-900/95 backdrop-blur-sm flex items-center justify-center p-4"
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
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                />
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-richblue-800/70 text-white p-2 rounded-full hover:bg-yellow-1 hover:text-richblue-900 transition-colors"
                >
                  <X className="h-6 w-6" />
                </motion.button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-richblue-900/90 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-blue-100 text-lg capitalize">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 -right-20 w-80 h-80 bg-yellow-1/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-60 h-60 bg-blue-200/5 rounded-full blur-3xl"></div>
    </section>
  )
}

export default MediaGallery
