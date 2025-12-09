"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Rocket, Users, Calendar, Trophy } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const timelineSteps = [
  {
    title: "Registration Kicks Off",
    date: "TBA",
    description: "Be the first to secure your spot",
    icon: Rocket,
    color: "bg-yellow-400",
    textColor: "text-black",
  },
  {
    title: "Speaker Reveal Phase 1",
    date: "TBA",
    description: "Meet the industry experts",
    icon: Users,
    color: "bg-cyan-400",
    textColor: "text-black",
  },
  {
    title: "DEVOLUTION DAY 1",
    date: "TBA",
    description: "Workshops & Keynotes",
    icon: Calendar,
    color: "bg-violet-500",
    textColor: "text-white",
  },
  {
    title: "DEVOLUTION DAY 2",
    date: "TBA",
    description: "Hackathons & Closing Ceremony",
    icon: Trophy,
    color: "bg-lime-400",
    textColor: "text-black",
  },
]

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Animate the timeline line drawing
      gsap.fromTo(
        lineRef.current,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      )

      // Timeline items with alternating slide animations
      const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item")
      timelineItems?.forEach((item, index) => {
        const isEven = index % 2 === 0
        
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: isEven ? -100 : 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )

        // Dot pulse animation
        const dot = item.querySelector(".timeline-dot")
        if (dot) {
          gsap.fromTo(
            dot,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="timeline" className="py-20 px-4 bg-black/5">
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-black uppercase inline-block">
            <span className="bg-black text-white px-4 py-2 border-[3px] border-black brutal-shadow rotate-[1deg] inline-block">
              The Flow
            </span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          <div
            ref={lineRef}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 border-l-4 border-dashed border-black/30 transform md:-translate-x-1/2"
          />

          {timelineSteps.map((step, index) => (
            <div
              key={step.title}
              className={`timeline-item relative mb-12 last:mb-0 md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="timeline-dot absolute left-8 md:left-1/2 w-6 h-6 bg-black border-[3px] border-black rounded-full transform -translate-x-1/2 md:-translate-x-1/2 z-10" />

              <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <motion.div
                  whileHover={{ rotate: index % 2 === 0 ? 1 : -1, scale: 1.02 }}
                  className={`${step.color} ${step.textColor} border-[3px] border-black p-6 brutal-shadow will-change-transform`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-8 h-8" strokeWidth={2.5} />
                    <span className="bg-white text-black border-[2px] border-black px-3 py-1 font-bold text-sm uppercase">
                      {step.date}
                    </span>
                  </div>
                  <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-black uppercase mb-2">
                    {step.title}
                  </h3>
                  <p className="font-medium opacity-80">{step.description}</p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
