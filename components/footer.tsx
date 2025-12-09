"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: Twitter, label: "Twitter/X", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contactCardRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer reveal from bottom
      gsap.fromTo(
        footerRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      )

      // Title slide in
      gsap.fromTo(
        titleRef.current,
        {
          x: -60,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      )

      // Contact card pop in with rotation
      gsap.fromTo(
        contactCardRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotation: 10,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 2,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%",
          },
        }
      )

      // Social icons stagger
      const socialIcons = socialRef.current?.children
      if (socialIcons) {
        gsap.fromTo(
          socialIcons,
          {
            y: 30,
            opacity: 0,
            scale: 0,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 90%",
            },
          }
        )
      }

      // Parallax for contact card on scroll
      gsap.to(contactCardRef.current, {
        y: -20,
        rotation: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      })

    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer 
      ref={footerRef}
      id="contact" 
      className="bg-black text-white border-t-[4px] border-black pt-16 pb-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div ref={titleRef} className="mb-6">
              <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-black uppercase mb-4">
                <span className="text-yellow-400">DEVOLUTION</span> 2026
              </h3>
              <p className="text-white/80 text-lg">by GDG DAU</p>
            </div>

            <p className="text-white/60 text-lg flex items-center gap-2">
              Built with <span className="text-xl">💻</span> and <span className="text-xl">☕</span> at DAU
            </p>

            <div ref={socialRef} className="flex gap-4 mt-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black border-[3px] border-white p-3 brutal-shadow hover:bg-yellow-400 transition-colors"
                  aria-label={social.label}
                  data-magnetic="0.3"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          <div
            ref={contactCardRef}
            className="relative bg-yellow-400 text-black border-[3px] border-black p-6 brutal-shadow-lg max-w-sm ml-auto will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            <h4 className="font-[var(--font-display)] text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
              📌 Contact Us
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span className="font-medium">hello@gdgdau-dummy.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="font-medium">+91 999-000-DUMMY</span>
              </div>
            </div>

            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-red-700 shadow-lg" />
          </div>
        </div>

        <div className="border-t-2 border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm uppercase tracking-wide">© 2026 GDG DAU. All rights reserved.</p>
          <p className="text-white/50 text-sm">Made with chaos & creativity</p>
        </div>
      </div>
    </footer>
  )
}
