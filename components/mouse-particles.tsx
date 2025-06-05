"use client"

import { useEffect } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  element: HTMLElement
}

export function MouseParticles() {
  useEffect(() => {
    let particles: Particle[] = []
    let particleId = 0
    let lastMouseX = 0
    let lastMouseY = 0
    let mouseMoveThrottle = false

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Random direction and velocity
      const angle = Math.random() * Math.PI * 2
      const velocity = Math.random() * 3 + 1
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity - 2 // Slight upward bias

      particle.style.left = `${x}px`
      particle.style.top = `${y}px`

      // Add some randomness to the animation
      const duration = Math.random() * 400 + 600 // 600-1000ms
      particle.style.animationDuration = `${duration}ms`

      document.body.appendChild(particle)

      const particleObj: Particle = {
        id: particleId++,
        x,
        y,
        vx,
        vy,
        element: particle,
      }

      particles.push(particleObj)

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
        particles = particles.filter((p) => p.id !== particleObj.id)
      }, duration)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      if (mouseMoveThrottle) return

      mouseMoveThrottle = true
      setTimeout(() => {
        mouseMoveThrottle = false
      }, 20) // Throttle to every 50ms

      // Only create particles if mouse has moved significantly
      const distance = Math.sqrt(Math.pow(clientX - lastMouseX, 2) + Math.pow(clientY - lastMouseY, 2))

      if (distance > 10) {
        // Create 1-3 particles
        const particleCount = Math.floor(Math.random() * 3) + 1

        for (let i = 0; i < particleCount; i++) {
          // Add some randomness to position
          const offsetX = (Math.random() - 0.5) * 10
          const offsetY = (Math.random() - 0.5) * 10

          createParticle(clientX + offsetX, clientY + offsetY)
        }

        lastMouseX = clientX
        lastMouseY = clientY
      }
    }

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove)

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)

      // Clean up any remaining particles
      particles.forEach((particle) => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element)
        }
      })
      particles = []
    }
  }, [])

  return null // This component doesn't render anything visible
}
