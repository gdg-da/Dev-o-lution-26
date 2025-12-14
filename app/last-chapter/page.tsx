"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Mic, Calendar, TrendingUp, ExternalLink, Linkedin, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DesktopOnlyBackgrounds } from "@/components/desktop-only-backgrounds"

gsap.registerPlugin(ScrollTrigger)

const lastYearStats = [
  {
    icon: Users,
    value: 550,
    suffix: "+",
    label: "Developers Attended",
    color: "bg-cyan-400",
    glow: "shadow-cyan-400/50",
  },
  {
    icon: Mic,
    value: 16,
    suffix: "",
    label: "Expert Speakers",
    color: "bg-yellow-400",
    glow: "shadow-yellow-400/50",
  },
  {
    icon: Calendar,
    value: 2,
    suffix: "",
    label: "Tracks",
    color: "bg-violet-500",
    glow: "shadow-violet-500/50",
  },
]

const speakers2025 = [
  {
    name: "Rohan Hundia",
    photo: "/last-chapter/speaker-images/RohanHundia.jpg",
    linkedin: "https://www.linkedin.com/in/rohan-hundia-38a94692/",
    position: "CEO at Unada Labs",
    about: "Rohan is the Co-Founder and CEO of Unada Labs. As tech entrepreneur driving Unada Labs and as a serial entrepreneur, Rohan and team are poised to transform three major industries - real estate, finance and healthcare with disruptive tech.",
    link: "",
    linkText: "",
  },
  {
    name: "Hiren Dave",
    photo: "/last-chapter/speaker-images/HirenDave.jpg",
    linkedin: "https://www.linkedin.com/in/davehiren/",
    position: "Senior Principal Software Engineer at iBASEt",
    about: "CTO, Product Manager, Entrepreneur, Tech Author, Blogger and Speaker with more than 11 years of industry experience.",
    link: "",
    linkText: "",
  },
  {
    name: "Paresh Mayani",
    photo: "/last-chapter/speaker-images/PareshMayani.jpg",
    linkedin: "https://www.linkedin.com/in/pareshmayani/",
    position: "Founder & CEO at SolGuruz",
    about: "Tech Innovator | Crafting Pixel-Perfect Software Solutions | Expert in Offshore Development Teams | Bespoke Software Development Specialist | Organizer, Google Developers Group Ahmedabad",
    link: "https://solguruz.com/",
    linkText: "SolGuruz",
  },
  {
    name: "Abhinav Raj",
    photo: "/last-chapter/speaker-images/AbhinavRaj.jpg",
    linkedin: "https://www.linkedin.com/in/abhinav-raj-234497159/",
    position: "Senior Software Engineer at Headout",
    about: "Experienced Developer with a demonstrated history of working in the information technology and services industry.",
    link: "",
    linkText: "",
  },
  {
    name: "Jaydip Parikh",
    photo: "/last-chapter/speaker-images/JaydipParikh.jpg",
    linkedin: "https://www.linkedin.com/in/jaydipparikh/",
    position: "Founder at Tej SolPro",
    about: "Jaydip Parikh is a Digital Marketing Expert with over 20 years of experience in SEO, B2B Marketing, Digital Lead Generation, eCommerce, SaaS Marketing and other aspects.",
    link: "",
    linkText: "",
  },
  {
    name: "Ashish Patel",
    photo: "/last-chapter/speaker-images/AshishPatel.jpg",
    linkedin: "https://www.linkedin.com/in/ashishpatel2604",
    position: "Senior AWS AI/ML Solution Architect at IBM",
    about: "Ashish has over 12+ years, Author, Data Scientist and Researcher with 8+ Years of Experience of Data Science technology and Research experience in wide functions including predictive modelling, data preprocessing, feature engineering, machine learning and deep learning.",
    link: "",
    linkText: "",
  },
  {
    name: "Vrijraj Singh",
    photo: "/last-chapter/speaker-images/VrijrajSingh.jpg",
    linkedin: "https://www.linkedin.com/in/vrijrajsingh/",
    position: "GDE Firebase",
    about: "Vrijraj is a community champion by passion. He was an organizer for GDG Jalandhar for 7 years. He is a Google Developers Expert for Firebase and Web Technologies.",
    link: "",
    linkText: "",
  },
  {
    name: "Jaydip Biniwale",
    photo: "/last-chapter/speaker-images/JaydipBiniwale.jpg",
    linkedin: "https://www.linkedin.com/in/biniwale/",
    position: "Sr. Software Engineer - AI, TrackWizz",
    about: "NVIDIA Certified AI Engineer | IIM-A | Sr. Software Engineer- AI | TrackWizz | Data Scientist | Python | Ex-CTO at Downtown | Generative AI | Computer Vision | NLP | Pytorch",
    link: "",
    linkText: "",
  },
  {
    name: "Harsh Shah",
    photo: "/last-chapter/speaker-images/HarshShah.jpg",
    linkedin: "https://www.linkedin.com/in/harshcrop/",
    position: "CTO at Pedals Up",
    about: "Harsh Shah is a self-taught developer and the CTO at Pedals Up. With a passion for technology and a curiosity that knows no bounds, he has mastered various programming languages, including C, C++, HTML, CSS, JavaScript, Python, and SQL.",
    link: "",
    linkText: "",
  },
  {
    name: "Piyush Raj",
    photo: "/last-chapter/speaker-images/PiyushRaj.jpg",
    linkedin: "https://in.linkedin.com/in/piyushella",
    position: "Founder, CEO at Vedilink",
    about: "Product designer and programmer who enjoys solving real-life problems. Currently building a haven for students trying to improve our education system a little.",
    link: "",
    linkText: "",
  },
  {
    name: "Anirudh Khurana",
    photo: "/last-chapter/speaker-images/AnirudhK.jpg",
    linkedin: "https://www.linkedin.com/in/anirudh-khurana",
    position: "Founder at Code and Debug",
    about: "Founder at Code and Debug | Full Stack Developer | DSA Trainer | Educator with a Mission",
    link: "",
    linkText: "",
  },
  {
    name: "Kartik Derasari",
    photo: "/last-chapter/speaker-images/KartikD.jpg",
    linkedin: "https://www.linkedin.com/in/kartikderasari/",
    position: "Engineering Lead at Persistent Systems | Google Developer Expert",
    about: "Kartik Derasari is a highly skilled and passionate Solutions Engineer and a Developer Advocate with a proven track record of success in designing and implementing innovative technology solutions.",
    link: "",
    linkText: "",
  },
  {
    name: "Amit Chopra",
    photo: "/last-chapter/speaker-images/AmitChopra.jpg",
    linkedin: "https://www.linkedin.com/in/amitchopra/",
    position: "Product Management Consultant (Ex-Microsoft, Ex-Amazon, Ex-Google, Ex-Meta)",
    about: "Amit is a technology enthusiast who thrives on exploring the latest advancements. As an engaging speaker, he captivate audiences with his passion, expertise, and ability to translate complex concepts into compelling narratives.",
    link: "",
    linkText: "",
  },
  {
    name: "Harsh Manvar",
    photo: "/last-chapter/speaker-images/HarshM.jpg",
    linkedin: "https://www.linkedin.com/in/harsh-manvar-64a30aa3/",
    position: "GDE, Docker Captain, CNCF Ambassador",
    about: "Harsh is Seasoned Senior Software Engineer at Oracle. With over half decade of experience in the tech industry as Software & DevOps Engineer.",
    link: "",
    linkText: "",
  },
  {
    name: "Shubham Pachori",
    photo: "/last-chapter/speaker-images/ShubhamP.jpg",
    linkedin: "https://www.linkedin.com/in/shubham-pachori-b5703a86/",
    position: "Head of Product & Founding Member at Shipmnts",
    about: "Passionate about building products that solve real-world complex problems in the most simplified and user-centric way. Have successfully built, launched, and monetized over 5 enterprise B2B SaaS products in the domain of supply chain and fintech",
    link: "",
    linkText: "",
  },
  {
    name: "Saurabh Mishra",
    photo: "/last-chapter/speaker-images/Saurabh.png",
    linkedin: "https://www.linkedin.com/in/connectsaurabhmishra/",
    position: "DevOps Lead at TSYS | GDE Cloud",
    about: "IT Professional with 13 years + experience in DevOps, Cloud Infrastructure Architect, Automation and System Engineering.",
    link: "",
    linkText: "",
  },
]

export default function LastChapterPage() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const speakersHeadingRef = useRef<HTMLHeadingElement>(null)
  const speakersGridRef = useRef<HTMLDivElement>(null)
  const [animatedValues, setAnimatedValues] = useState(lastYearStats.map(() => 0))

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const isLowEndDevice = window.innerWidth < 768 || navigator.hardwareConcurrency <= 4

    const ctx = gsap.context(() => {
      // Hero title animation with sophisticated reveal
      if (titleRef.current) {
        const tl = gsap.timeline()
        
        tl.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: isMobile ? 30 : 60,
            rotateX: isMobile ? 0 : -15,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: isMobile ? 0.6 : 1.2,
            ease: "power3.out",
          }
        )
        
        // Glitch flicker effect (skip on mobile/low-end)
        if (!isMobile && !isLowEndDevice) {
          tl.to(titleRef.current, {
            x: 3,
            duration: 0.05,
            repeat: 3,
            yoyo: true,
          }, "-=0.3")
        }
      }

      // Stats animation with dramatic entrance
      const statCards = statsRef.current?.children
      if (statCards) {
        const fromState = isMobile || isLowEndDevice
          ? { opacity: 0, y: 50, scale: 0.9 }
          : { opacity: 0, y: 80, rotateX: 10, scale: 0.85 }
        
        const toState = isMobile || isLowEndDevice
          ? { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
          : { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" }

        gsap.fromTo(
          statCards,
          fromState,
          {
            ...toState,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              onEnter: () => {
                // Animate counter values
                lastYearStats.forEach((stat, index) => {
                  gsap.to(
                    {},
                    {
                      duration: 2,
                      ease: "power2.out",
                      onUpdate: function () {
                        const progress = this.progress()
                        const currentValue = Math.floor(stat.value * progress)
                        setAnimatedValues((prev) => {
                          const newValues = [...prev]
                          newValues[index] = currentValue
                          return newValues
                        })
                      },
                    }
                  )
                })
              },
            },
          }
        )
      }

      // Speakers heading with clip-path reveal
      if (speakersHeadingRef.current) {
        if (isMobile) {
          gsap.fromTo(
            speakersHeadingRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: speakersHeadingRef.current,
                start: "top 85%",
              },
            }
          )
        } else {
          gsap.fromTo(
            speakersHeadingRef.current,
            {
              clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              x: -30,
            },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              x: 0,
              duration: 0.8,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: speakersHeadingRef.current,
                start: "top 80%",
              },
            }
          )
        }
      }

      // Speakers grid stagger animation with 3D effect
      const speakerCards = speakersGridRef.current?.children
      if (speakerCards) {
        const fromState = isMobile || isLowEndDevice
          ? { opacity: 0, y: 40, scale: 0.95 }
          : { opacity: 0, y: 60, rotateX: 15, scale: 0.9 }
        
        const toState = isMobile || isLowEndDevice
          ? { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
          : { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7, ease: "back.out(1.2)" }

        gsap.fromTo(
          speakerCards,
          fromState,
          {
            ...toState,
            stagger: {
              each: 0.05,
              from: "start",
            },
            scrollTrigger: {
              trigger: speakersGridRef.current,
              start: "top 85%",
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      {/* Animated background elements - desktop only for performance */}
      <DesktopOnlyBackgrounds />

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors mb-12 group font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wide">Back to Home</span>
          </Link>

          <div className="text-center">
            {/* Badge */}
            <div className="inline-block mb-8">
              <div className="bg-yellow-400 border-[3px] border-black px-6 py-2 brutal-shadow -rotate-2">
                <span className="font-(--font-display) text-sm md:text-base text-black tracking-wider uppercase">
                  Dev-o-lution 2025
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-(--font-display) text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase mb-8 leading-none"
            >
              <span className="inline-block bg-cyan-400 text-black px-3 md:px-4 border-[3px] border-black brutal-shadow rotate-1 mb-2">THE </span>
              <span className="inline-block bg-yellow-400 text-black px-3 md:px-4 border-[3px] border-black brutal-shadow -rotate-1 mb-2">LAST </span>
              <span className="inline-block bg-violet-500 text-white px-3 md:px-4 border-[3px] border-black brutal-shadow rotate-1">CHAPTER</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-black/70 max-w-3xl mx-auto">
              A spectacular journey of innovation, learning, and collaboration that brought together
              the brightest minds in tech
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 px-4 relative overflow-hidden" style={{ perspective: "1200px" }}>
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl uppercase inline-block">
              <span className="bg-linear-to-r from-yellow-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent relative">
                By The Numbers
                {/* Decorative underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6C50 0 150 12 200 6"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-black"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6"
          >
            {lastYearStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className={`${stat.color} border-[3px] border-black p-6 md:p-8 brutal-shadow-lg relative overflow-hidden group cursor-default`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (index % 3)}deg)`,
                  }}
                >
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent" />
                  
                  {/* Icon */}
                  <div className="mb-4 inline-block p-2 bg-black/10 border-2 border-black/20">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
                  </div>

                  {/* Number */}
                  <div className="font-(--font-display) text-4xl md:text-5xl lg:text-6xl text-black flex items-baseline gap-1">
                    <span>{animatedValues[index]}</span>
                    <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <p className="mt-2 font-bold text-sm md:text-base uppercase text-black/70">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="mb-16 md:mb-20 text-center">
            <h2
              ref={speakersHeadingRef}
              className="font-(--font-display) text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase inline-block mb-4"
            >
              <span className="bg-lime-400 text-black px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block">
                OUR INSPIRING
              </span>
              {" "}
              <span className="bg-orange-400 text-black px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow rotate-1 inline-block">
                SPEAKERS
              </span>
            </h2>
            <p className="text-base md:text-xl font-bold text-black/70 mt-6">
              Industry leaders who shared their knowledge and experience
            </p>
          </div>

          <div
            ref={speakersGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {speakers2025.map((speaker, index) => (
              <div
                key={index}
                className="bg-white border-[3px] border-black p-6 brutal-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] group relative overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 0.5}deg)`,
                }}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-cyan-400/20 to-transparent" />

                <div className="relative">
                  {/* Photo */}
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-5 overflow-hidden border-[3px] border-black group-hover:shadow-lg transition-all duration-300">
                    <Image
                      src={speaker.photo}
                      alt={speaker.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder-user.jpg"
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h4 className="font-(--font-display) text-base md:text-lg uppercase text-center mb-2 text-black group-hover:text-violet-600 transition-colors">
                    {speaker.name}
                  </h4>

                  {/* Position */}
                  <p className="text-xs md:text-sm text-black/70 font-bold text-center mb-4 min-h-10">
                    {speaker.position}
                  </p>

                  {/* Links */}
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 bg-cyan-400 border-2 border-black hover:bg-black hover:text-cyan-400 transition-all duration-300 brutal-shadow hover:shadow-[4px_4px_0px_0px_#000] hover:scale-110"
                      aria-label={`${speaker.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    {speaker.link && (
                      <a
                        href={speaker.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-violet-500 text-white border-2 border-black text-xs font-bold uppercase transition-all duration-300 brutal-shadow hover:bg-black hover:text-violet-500 hover:shadow-[4px_4px_0px_0px_#000] hover:scale-105"
                        aria-label={`${speaker.name} website`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{speaker.linkText}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Thank you message */}
          <div className="mt-20 md:mt-32 text-center">
            <div className="inline-block relative">
              <div className="bg-cyan-400 border-[3px] border-black px-8 py-5 brutal-shadow-lg rotate-1">
                <p className="font-(--font-display) text-base md:text-xl uppercase text-black">
                  <span>🎉</span>{" "}
                  <span>Thank you to all who made</span>{" "}
                  <span className="text-white">Dev-o-lution 2025</span>{" "}
                  <span>unforgettable!</span>{" "}
                  <span>🚀</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
