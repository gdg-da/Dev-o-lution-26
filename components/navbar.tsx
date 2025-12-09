"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Speakers", href: "#speakers" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white border-[3px] border-black brutal-shadow px-4 py-3 flex items-center justify-between"
      >
        <motion.div
          whileHover={{ rotate: -3, scale: 1.05 }}
          className="bg-yellow-400 border-[3px] border-black px-3 py-1 brutal-shadow cursor-pointer"
        >
          <span className="font-[var(--font-display)] text-lg md:text-xl font-black tracking-tight text-black">
            GDG DAU
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -2 }}
              className="px-3 py-2 font-semibold text-sm uppercase tracking-wide text-black hover:bg-black hover:text-white transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2 bg-fuchsia-500 text-white border-[3px] border-black px-4 py-2 font-bold text-sm uppercase tracking-wide brutal-shadow hover:brutal-shadow-lg transition-all"
          >
            Join Waitlist
          </motion.a>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-black text-white p-2 border-[3px] border-black"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 bg-white border-[3px] border-black brutal-shadow p-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 font-semibold uppercase tracking-wide text-black hover:bg-yellow-400 transition-colors border-b-2 border-black last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="block mt-4 bg-fuchsia-500 text-white text-center border-[3px] border-black px-4 py-3 font-bold uppercase tracking-wide brutal-shadow"
          >
            Join Waitlist
          </a>
        </motion.div>
      )}
    </nav>
  )
}
