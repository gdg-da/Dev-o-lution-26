"use client"

import { motion } from "framer-motion"
import { Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react"

const socialLinks = [
  { icon: Twitter, label: "Twitter/X", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white border-t-[4px] border-black pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-black uppercase mb-4">
                <span className="text-yellow-400">DEVOLUTION</span> 2026
              </h3>
              <p className="text-white/80 text-lg">by GDG DAU</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg flex items-center gap-2"
            >
              Built with <span className="text-xl">💻</span> and <span className="text-xl">☕</span> at DAU
            </motion.p>

            <div className="flex gap-4 mt-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black border-[3px] border-white p-3 brutal-shadow hover:bg-yellow-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: 3 }}
            whileInView={{ opacity: 1, rotate: 2 }}
            viewport={{ once: true }}
            className="relative bg-yellow-400 text-black border-[3px] border-black p-6 brutal-shadow-lg transform rotate-2 max-w-sm ml-auto"
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
          </motion.div>
        </div>

        <div className="border-t-2 border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm uppercase tracking-wide">© 2026 GDG DAU. All rights reserved.</p>
          <p className="text-white/50 text-sm">Made with chaos & creativity</p>
        </div>
      </div>
    </footer>
  )
}
