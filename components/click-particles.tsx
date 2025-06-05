"use client"

import { useEffect } from "react"

interface ClickParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  element: HTMLDivElement
}

let particles: ClickParticle[] = []
let particleId = 0

const createClickParticles = (x: number, y: number) => {
  // Create 8-12 particles in all directions
  const particleCount = Math.floor(Math.random() * 5) + 8

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "click-particle"

    // Calculate angle for even distribution
    const baseAngle = (Math.PI * 2 * i) / particleCount
    // Add some randomness to the angle
    const angle = baseAngle + (Math.random() - 0.5) * 0.5

    // Random velocity with some variation
    const velocity = Math.random() * 60 + 40 // 40-100px travel distance
    const dx = Math.cos(angle) * velocity
    const dy = Math.sin(angle) * velocity

    // Set CSS custom properties for animation
    particle.style.setProperty("--dx", `${dx}px`)
    particle.style.setProperty("--dy", `${dy}px`)

    // Set initial position
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`

    // Add some randomness to size and animation duration
    const size = Math.random() * 3 + 2 // 2-5px
    const duration = Math.random() * 200 + 600 // 600-800ms

    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.animationDuration = `${duration}ms`

    // Add slight delay for staggered effect
    const delay = Math.random() * 100
    particle.style.animationDelay = `${delay}ms`

    document.body.appendChild(particle)

    const particleObj: ClickParticle = {
      id: particleId++,
      x,
      y,
      vx: dx,
      vy: dy,
      element: particle,
    }

    particles.push(particleObj)

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle.element)
      }
      particles = particles.filter((p) => p.id !== particleObj.id)
    }, duration + delay)
  }
}

export const ClickParticles = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createClickParticles(e.clientX, e.clientY)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return <></>
}

export default ClickParticles
