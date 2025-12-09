"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Twitter, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function JoinTheConversation() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLParagraphElement>(null)
  const hashtagRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation with 3D perspective
      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.85,
          opacity: 0,
          rotateX: 15,
          y: 100,
        },
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Heading reveal with dramatic clip-path
      gsap.fromTo(
        headingRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          opacity: 0,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 70%",
          },
        }
      )

      // CTA text bounce in with overshoot
      gsap.fromTo(
        ctaRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 65%",
          },
        }
      )

      // Hashtag pop with elastic bounce
      gsap.fromTo(
        hashtagRef.current,
        {
          scale: 0,
          rotation: -15,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1.2, 0.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 55%",
          },
        }
      )

      // Description fade up
      gsap.fromTo(
        descRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 45%",
          },
        }
      )

      // Sparkles animation
      const sparkles = sparklesRef.current?.children
      if (sparkles) {
        gsap.fromTo(
          sparkles,
          {
            scale: 0,
            opacity: 0,
            rotation: -30,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: {
              each: 0.1,
              from: "random",
            },
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 60%",
            },
          }
        )

        // Continuous floating animation for sparkles
        Array.from(sparkles).forEach((sparkle, index) => {
          gsap.to(sparkle, {
            y: index % 2 === 0 ? -10 : 10,
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        })
      }

      // Card parallax float on scroll
      gsap.to(cardRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })

      // Subtle 3D tilt on scroll
      gsap.to(cardRef.current, {
        rotateY: 3,
        rotateX: -2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 2,
        },
      })

      // Background pattern parallax
      const bgPattern = sectionRef.current?.querySelector(".bg-pattern")
      if (bgPattern) {
        gsap.to(bgPattern, {
          y: -80,
          rotation: 5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="join-the-conversation" className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Decorative background removed */}
        {/* Main content card */}
        <div className="relative bg-linear-to-br from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600 rounded-2xl p-6 md:p-8 lg:p-10 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          {/* Mac-style window buttons (positioned outside like other sections) */}
          <div className="absolute -top-6 left-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
          </div>

          {/* Heading */}
          <h2 className="font-(--font-display) text-2xl md:text-3xl lg:text-4xl uppercase mb-6 text-black text-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
          }}>
            Join the Conversation
          </h2>

          {/* CTA Text */}
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-4 text-center">
            Use our hashtag and win prizes!
          </p>

          {/* Hashtag with Twitter Icon */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Twitter className="w-6 h-6 md:w-8 md:h-8 text-black" fill="currentColor" />
            <span className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-black">
              #dev_o_lution
            </span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base lg:text-lg text-black text-center max-w-3xl mx-auto">
            Share your excitement, ideas, or projects on Twitter using our hashtag for a chance to win amazing prizes!
          </p>

          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 w-20 h-20 border-t-4 border-r-4 border-black/10 rounded-tr-xl" />
          <div className="absolute bottom-4 left-4 w-20 h-20 border-b-4 border-l-4 border-black/10 rounded-bl-xl" />
        </div>
      </div>
    </section>
  )
}
