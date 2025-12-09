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
    <section
      ref={sectionRef}
      id="join-the-conversation"
      className="py-24 px-4 relative overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Decorative background pattern with parallax */}
        <div className="bg-pattern absolute inset-0 -z-10 opacity-10 scale-150">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              currentColor 35px,
              currentColor 70px
            )`,
          }} />
        </div>

        {/* Floating sparkles decoration */}
        <div ref={sparklesRef} className="absolute inset-0 pointer-events-none -z-5">
          <Sparkles className="absolute top-10 left-[10%] w-8 h-8 text-yellow-500/60" />
          <Sparkles className="absolute top-20 right-[15%] w-6 h-6 text-cyan-500/60" />
          <Sparkles className="absolute bottom-20 left-[20%] w-10 h-10 text-pink-500/50" />
          <Sparkles className="absolute bottom-10 right-[10%] w-7 h-7 text-lime-500/60" />
        </div>

        {/* Main content card */}
        <div
          ref={cardRef}
          className="relative bg-gradient-to-br from-teal-400 via-teal-450 to-teal-500 rounded-2xl p-8 md:p-12 lg:p-16 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glossy overlay effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)"
              }}
            />
          </div>

          {/* Mac-style window buttons */}
          <div className="flex gap-2 mb-8 relative z-10">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black shadow-inner" />
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black shadow-inner" />
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black shadow-inner" />
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-[var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-8 text-black relative z-10"
            style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.15)' }}
          >
            Join the Conversation
          </h2>

          {/* CTA Text */}
          <p
            ref={ctaRef}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-8 text-center relative z-10"
          >
            Use our hashtag and win prizes!
          </p>

          {/* Hashtag with Twitter Icon */}
          <div 
            ref={hashtagRef} 
            className="flex items-center justify-center gap-4 mb-8 relative z-10"
            data-magnetic="0.2"
          >
            <div className="bg-black p-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              <Twitter className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" />
            </div>
            <span className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-black bg-white/30 px-4 py-2 rounded-lg border-2 border-black/20">
              #dev_o_lution
            </span>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base md:text-lg lg:text-xl text-black/90 text-center max-w-4xl mx-auto relative z-10 leading-relaxed"
          >
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
