"use client"

import { useEffect } from "react"
import Layout from "../components/layout/layout"
import VideoShowcase from "../components/Media/VideoShowcase"
import MediaGallery from "../components/Media/MediaGallery"

const Media = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
      <MediaGallery />
      <VideoShowcase />
    </div>
    </Layout>
  )
}

export default Media
