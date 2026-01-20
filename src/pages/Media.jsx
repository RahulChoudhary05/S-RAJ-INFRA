"use client"

import { useEffect } from "react"
import Layout from "../components/layout/layout"
import VideoShowcase from "../components/Media/VideoShowcase"
import MediaGallery from "../components/Media/MediaGallery"
import { motion } from "framer-motion"

const Media = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[25vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background with parallax effect */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-100/90 via-zinc-200/70 to-zinc-100/90" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold font-playfair text-black mb-6"
            >
              Media <span className="text-yellow-1 inline-block">Gallery</span>
            </motion.h1>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-24 h-1 bg-yellow-1 mx-auto mb-6"
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <MediaGallery />
        <VideoShowcase />
      </div>
    </Layout>
  )
}

export default Media