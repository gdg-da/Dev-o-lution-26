"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Brain, Link, Cloud, Smartphone, Database, Shield } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const tracks = [
  {
    title: "AI/ML & GenAI",
    description: "Explore the future of artificial intelligence",
    icon: Brain,
    color: "bg-cyan-400",
    textColor: "text-black",
  },
  {
    title: "Web3 & Blockchain",
    description: "Build the web3 future and explore blockchain technology",
    icon: Link,
    color: "bg-yellow-400",
    textColor: "text-black",
  },
  {
    title: "Cloud & DevOps",
    description: "Scale your infrastructure",
    icon: Cloud,
    color: "bg-violet-500",
    textColor: "text-white",
  },
  {
    title: "Mobile & Web",
    description: "Create amazing user experiences",
    icon: Smartphone,
    color: "bg-lime-400",
    textColor: "text-black",
  },
  {
    title: "Data Engineering",
    description: "Power insights with data",
    icon: Database,
    color: "bg-orange-400",
    textColor: "text-black",
  },
  {
    title: "Cyber Security",
    description: "Protect and secure systems and data",
    icon: Shield,
    color: "bg-pink-400",
    textColor: "text-black",
  },
]

export function TracksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading pop animation
      gsap.fromTo(
        headingRef.current,
        {
          scale: 0.5,
          opacity: 0,
          rotation: -5,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Cards stagger animation with 3D effect
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            rotateY: -15,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            stagger: {
              each: 0.1,
              from: "start",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        )

        // Subtle floating effect on scroll for each card
        Array.from(cards).forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -20 : 20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tracks" className="py-20 px-4" style={{ perspective: "1000px" }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl uppercase inline-block">
            <span className="bg-fuchsia-500 text-white px-4 py-2 border-[3px] border-black brutal-shadow rotate-[-1deg] inline-block">
              Event Tracks
            </span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              whileHover={{ rotate: index % 2 === 0 ? 2 : -2, scale: 1.02 }}
              className={`${track.color} ${track.textColor} border-[3px] border-black p-6 brutal-shadow-lg cursor-pointer transition-all hover:brutal-shadow will-change-transform`}
            >
              <track.icon className="w-12 h-12 mb-4" strokeWidth={2.5} />
              <h3 className="font-[var(--font-display)] text-2xl font-black uppercase mb-2">{track.title}</h3>
              <p className="font-medium opacity-80">{track.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
