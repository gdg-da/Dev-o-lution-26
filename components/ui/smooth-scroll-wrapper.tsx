"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollWrapperProps {
  children: ReactNode
}

export function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check for reduced motion preference (accessibility)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    
    if (prefersReducedMotion) {
      return // Skip animations for users who prefer reduced motion
    }

    // Initialize Lenis with refined settings for premium feel
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Create a master timeline context for better performance
    const ctx = gsap.context(() => {
      // ========================================
      // PARALLAX SYSTEM - Multi-layer depth
      // ========================================
      
      // Speed-based parallax (data-parallax-speed)
      const parallaxElements = document.querySelectorAll("[data-parallax]")
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax") || "0.5")
        const direction = el.getAttribute("data-parallax-direction") || "y"
        
        gsap.to(el, {
          [direction]: () => -ScrollTrigger.maxScroll(window) * speed * 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
      })

      // Section-scoped parallax backgrounds
      const parallaxBgs = document.querySelectorAll(".parallax-bg")
      parallaxBgs.forEach((bg) => {
        const parent = bg.closest("section") || bg.parentElement
        const speed = parseFloat(bg.getAttribute("data-speed") || "0.3")
        
        gsap.fromTo(
          bg,
          { y: -50 * speed },
          {
            y: 50 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      })

      // ========================================
      // SCROLL-TRIGGERED SECTION REVEALS
      // ========================================
      
      const sections = gsap.utils.toArray<HTMLElement>("section")
      
      sections.forEach((section, index) => {
        // Skip hero section (first section) from fade-in
        if (index === 0) return
        
        // Create staggered reveal for section content
        const heading = section.querySelector("h2, h3")
        const content = section.querySelectorAll("p, .card, [data-animate]")
        
        // Section entrance with 3D perspective
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )

        // Heading reveal with mask effect
        if (heading) {
          gsap.fromTo(
            heading,
            {
              opacity: 0,
              y: 40,
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 80%",
              },
            }
          )
        }
      })

      // ========================================
      // TEXT SPLIT & CHARACTER ANIMATIONS
      // ========================================
      
      const splitTexts = document.querySelectorAll("[data-split-text]")
      splitTexts.forEach((text) => {
        const chars = text.textContent?.split("") || []
        text.textContent = ""
        chars.forEach((char) => {
          const span = document.createElement("span")
          span.textContent = char === " " ? "\u00A0" : char
          span.style.display = "inline-block"
          text.appendChild(span)
        })

        gsap.fromTo(
          text.children,
          {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
            },
          }
        )
      })

      // ========================================
      // STAGGERED GRID ANIMATIONS
      // ========================================
      
      const staggerContainers = document.querySelectorAll("[data-stagger]")
      staggerContainers.forEach((container) => {
        const items = container.children
        const staggerAmount = parseFloat(container.getAttribute("data-stagger") || "0.1")
        const direction = container.getAttribute("data-stagger-from") || "start"
        
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotateY: -5,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.7,
            stagger: {
              each: staggerAmount,
              from: direction,
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
            },
          }
        )
      })

      // ========================================
      // SCALE ON SCROLL (Zoom Effect)
      // ========================================
      
      const scaleElements = document.querySelectorAll("[data-scale-scroll]")
      scaleElements.forEach((el) => {
        const scaleFrom = parseFloat(el.getAttribute("data-scale-from") || "0.8")
        const scaleTo = parseFloat(el.getAttribute("data-scale-to") || "1")
        
        gsap.fromTo(
          el,
          { scale: scaleFrom, opacity: 0.6 },
          {
            scale: scaleTo,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 30%",
              scrub: 1.5,
            },
          }
        )
      })

      // ========================================
      // ROTATION ON SCROLL
      // ========================================
      
      const rotateElements = document.querySelectorAll("[data-rotate-scroll]")
      rotateElements.forEach((el) => {
        const rotation = parseFloat(el.getAttribute("data-rotate-scroll") || "360")
        
        gsap.to(el, {
          rotation: rotation,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        })
      })

      // ========================================
      // HORIZONTAL SCROLL SECTIONS
      // ========================================
      
      const horizontalSections = document.querySelectorAll("[data-horizontal]")
      horizontalSections.forEach((section) => {
        const content = section.querySelector("[data-horizontal-content]") as HTMLElement
        if (!content) return
        
        const totalWidth = content.scrollWidth
        const viewportWidth = window.innerWidth
        
        gsap.to(content, {
          x: -(totalWidth - viewportWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
      })

      // ========================================
      // REVEAL ON SCROLL (Clip-path animations)
      // ========================================
      
      const revealElements = document.querySelectorAll("[data-reveal]")
      revealElements.forEach((el) => {
        const direction = el.getAttribute("data-reveal") || "up"
        
        const clipPaths: Record<string, { from: string; to: string }> = {
          up: {
            from: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            to: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          },
          down: {
            from: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            to: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          },
          left: {
            from: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            to: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          },
          right: {
            from: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            to: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          },
        }
        
        gsap.fromTo(
          el,
          { clipPath: clipPaths[direction].from, opacity: 0 },
          {
            clipPath: clipPaths[direction].to,
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      })

      // ========================================
      // PROGRESS-BASED ANIMATIONS
      // ========================================
      
      const progressElements = document.querySelectorAll("[data-scroll-progress]")
      progressElements.forEach((el) => {
        const property = el.getAttribute("data-scroll-progress") || "width"
        
        gsap.fromTo(
          el,
          { [property]: "0%" },
          {
            [property]: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            },
          }
        )
      })

      // ========================================
      // FLOATING ELEMENTS (Continuous parallax)
      // ========================================
      
      const floatingElements = document.querySelectorAll("[data-float]")
      floatingElements.forEach((el) => {
        const intensity = parseFloat(el.getAttribute("data-float") || "20")
        const speed = parseFloat(el.getAttribute("data-float-speed") || "1")
        
        // Scroll-based floating
        gsap.to(el, {
          y: -intensity,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: speed,
          },
        })
      })

      // ========================================
      // MAGNETIC CURSOR EFFECT FOR BUTTONS
      // ========================================
      
      const magneticElements = document.querySelectorAll("[data-magnetic]")
      magneticElements.forEach((el) => {
        const strength = parseFloat(el.getAttribute("data-magnetic") || "0.3")
        
        el.addEventListener("mousemove", (e: Event) => {
          const mouseEvent = e as MouseEvent
          const rect = (el as HTMLElement).getBoundingClientRect()
          const x = mouseEvent.clientX - rect.left - rect.width / 2
          const y = mouseEvent.clientY - rect.top - rect.height / 2
          
          gsap.to(el, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: "power2.out",
          })
        })
        
        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          })
        })
      })

      // ========================================
      // STICKY ELEMENTS WITH PROGRESS
      // ========================================
      
      const stickyElements = document.querySelectorAll("[data-sticky]")
      stickyElements.forEach((el) => {
        const parent = el.closest("[data-sticky-container]") || el.parentElement
        
        ScrollTrigger.create({
          trigger: parent,
          start: "top top",
          end: "bottom bottom",
          pin: el,
          pinSpacing: false,
        })
      })

    }, wrapperRef)

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      ctx.revert()
      lenis.destroy()
      lenisRef.current = null
      window.removeEventListener("resize", handleResize)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={wrapperRef} className="smooth-scroll-wrapper">
      {children}
    </div>
  )
}
