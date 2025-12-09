"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { HelpCircle, Lock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const speakers = [1, 2, 3, 4]

export function SpeakersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide in animation
      gsap.fromTo(
        headingRef.current,
        {
          x: -100,
          opacity: 0,
          rotation: -5,
        },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Top secret badge pop in
      gsap.fromTo(
        badgeRef.current,
        {
          scale: 0,
          rotation: -40,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: -12,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )

      // Speaker cards with scatter animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            scale: 0.5,
            y: 100,
            rotation: (i) => (i - 1.5) * 15,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: (i) => (i - 1.5) * 2,
            duration: 0.8,
            stagger: {
              each: 0.15,
              from: "center",
            },
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        )

        // Hover-like floating animation on scroll
        Array.from(cards).forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -15 : 15,
            rotation: (i - 1.5) * 2 + (i % 2 === 0 ? 3 : -3),
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

      // Bottom text fade in
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="speakers" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-black uppercase inline-block">
            <span className="bg-orange-400 text-black px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block">
              The Lineup
            </span>
          </h2>
        </div>

        <div
          ref={badgeRef}
          className="absolute top-32 right-4 md:right-20 z-20"
        >
          <div className="bg-red-600 text-white border-[4px] border-red-800 px-6 py-3 brutal-shadow transform">
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6" />
              <span className="font-[var(--font-display)] text-xl md:text-2xl font-black uppercase">Top Secret</span>
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">TBA</span>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {speakers.map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ rotate: index % 2 === 0 ? 3 : -3, scale: 1.05 }}
              className="bg-white border-[3px] border-black p-3 brutal-shadow-lg will-change-transform"
              style={{ transform: `rotate(${(index - 1.5) * 2}deg)` }}
            >
              <div className="aspect-square bg-black/10 border-2 border-black flex flex-col items-center justify-center mb-3">
                <HelpCircle className="w-16 h-16 md:w-20 md:h-20 text-black/30 mb-2" />
                <span className="font-bold text-black/40 text-sm uppercase">???</span>
              </div>

              <div className="text-center py-2">
                <p className="font-[var(--font-display)] text-sm md:text-base font-black uppercase text-black/60">
                  Speaker Reveal
                </p>
                <p className="text-xs md:text-sm font-bold uppercase text-violet-600">Coming Soon</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p
          ref={textRef}
          className="text-center mt-12 text-lg md:text-xl font-bold text-black/60"
        >
          🎤 Industry experts & community legends incoming... Stay tuned!
        </p>
      </div>
    </section>
  )
}
