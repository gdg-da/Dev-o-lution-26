"use client"

import { motion } from "framer-motion"
import { Rocket, Users, Calendar, Trophy } from "lucide-react"

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
  return (
    <section id="timeline" className="py-20 px-4 bg-black/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-black uppercase inline-block">
            <span className="bg-black text-white px-4 py-2 border-[3px] border-black brutal-shadow rotate-[1deg] inline-block">
              The Flow
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 border-l-4 border-dashed border-black/30 transform md:-translate-x-1/2" />

          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 last:mb-0 md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-black border-[3px] border-black rounded-full transform -translate-x-1/2 md:-translate-x-1/2 z-10" />

              <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <motion.div
                  whileHover={{ rotate: index % 2 === 0 ? 1 : -1, scale: 1.02 }}
                  className={`${step.color} ${step.textColor} border-[3px] border-black p-6 brutal-shadow`}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
