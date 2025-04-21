"use client"

import { cn } from "../../../lib/utils"
import { useEffect, useRef, useState } from "react"
import { createNoise3D } from "simplex-noise"

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 12,
  speed = "fast",
  waveOpacity = 0.4,
  ...props
}) => {
  const noise = createNoise3D()
  let w, h, nt, i, x, ctx, canvas
  const canvasRef = useRef(null)

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.0005
      case "fast":
        return 0.001
      default:
        return 0.0008
    }
  }

  const init = () => {
    canvas = canvasRef.current
    if (!canvas) return

    ctx = canvas.getContext("2d")
    w = ctx.canvas.width = window.innerWidth
    h = ctx.canvas.height = window.innerHeight * 1.5 // Make canvas taller for better coverage
    ctx.filter = `blur(${blur}px)`
    nt = 0

    const handleResize = () => {
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = window.innerHeight * 1.5
      ctx.filter = `blur(${blur}px)`
    }

    window.addEventListener("resize", handleResize)
    render()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }

  // Enhanced color palette that complements the form's design
  const waveColors = colors ?? [
    "#F1C40F", // primaryYellow
    "#3498db", // blue
    "#2980b9", // darker blue
    "#e67e22", // orange
    "#d35400", // darker orange
  ]

  const drawWave = (n) => {
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.lineWidth = waveWidth || 60 // Slightly thicker waves
      ctx.strokeStyle = waveColors[i % waveColors.length]

      // Create more natural wave patterns
      for (x = 0; x < w; x += 5) {
        const frequency = 0.8 - i * 0.1 // Varying frequencies for each wave
        const amplitude = 100 + i * 10 // Varying amplitudes
        const y = noise(x / 800, 0.3 * i, nt) * amplitude
        ctx.lineTo(x, y + h * 0.45) // Position waves more toward the center
      }

      ctx.stroke()
      ctx.closePath()
    }
  }

  let animationId
  const render = () => {
    if (!ctx) return

    ctx.fillStyle = backgroundFill || "rgba(44, 62, 80, 0.8)" // Darker blue background (Midnight Blue)
    ctx.globalAlpha = waveOpacity || 0.4
    ctx.fillRect(0, 0, w, h)
    drawWave(5)
    animationId = requestAnimationFrame(render)
  }

  useEffect(() => {
    const cleanup = init()
    return () => {
      if (cleanup) cleanup()
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    )
  }, [])

  return (
    <div className={cn("w-full min-h-screen", containerClassName)}>
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  )
}
