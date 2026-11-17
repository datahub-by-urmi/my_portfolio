"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { experienceData } from "@/data/services.data"

const cardsPerPage = 2
const pageCount = Math.ceil(experienceData.length / cardsPerPage)
const finalDesktopIndex = experienceData.length - cardsPerPage

export const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const pointerStart = useRef<{ pointerId: number; x: number } | null>(null)
  const suppressFlipRef = useRef(false)
  const prefersReducedMotion = useReducedMotion() ?? false

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)")
    const updateViewport = () => setIsMobile(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener("change", updateViewport)
    return () => mediaQuery.removeEventListener("change", updateViewport)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setActiveIndex((index) => Math.floor(index / cardsPerPage) * cardsPerPage)
    }
  }, [isMobile])

  useEffect(() => {
    const handlePointerUp = (event: globalThis.PointerEvent) => {
      const start = pointerStart.current
      if (!start || start.pointerId !== event.pointerId) return

      pointerStart.current = null
      const distance = event.clientX - start.x
      if (Math.abs(distance) < 50) return

      suppressFlipRef.current = true
      window.setTimeout(() => {
        suppressFlipRef.current = false
      }, 0)

      const step = isMobile ? 1 : cardsPerPage
      const max = isMobile ? experienceData.length - 1 : finalDesktopIndex
      setActiveIndex((index) =>
        Math.max(0, Math.min(index + (distance < 0 ? step : -step), max)),
      )
    }

    const handlePointerCancel = (event: globalThis.PointerEvent) => {
      if (pointerStart.current?.pointerId === event.pointerId) {
        pointerStart.current = null
      }
    }

    window.addEventListener("pointerup", handlePointerUp)
    window.addEventListener("pointercancel", handlePointerCancel)
    return () => {
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("pointercancel", handlePointerCancel)
    }
  }, [isMobile])

  const maxIndex = isMobile ? experienceData.length - 1 : finalDesktopIndex
  const activePage = Math.floor(activeIndex / cardsPerPage)
  const slideOffset = isMobile ? activeIndex * 100 : activePage * 100

  const goToSlide = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)))
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
      return
    }
    pointerStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
    }
  }

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    toggle: () => void,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    toggle()
  }

  return (
    <section
      id="experience"
      className="w-full scroll-mt-32 overflow-hidden border-t border-white/5 bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={
            prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: "easeOut",
          }}
          className="mb-6 max-w-3xl sm:mb-8"
        >
          <h2 className="mt-6 text-[54px] font-semibold leading-[0.9] text-white sm:text-[88px] md:text-[112px]">
            Experience
            <br />
            <span className="text-primary/90">Delivered</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-gray-400 sm:text-[18px] sm:tracking-[0.18em]">
            Building analytics-ready data models, ETL pipelines, and dashboards.
          </p>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div
            className="overflow-hidden touch-pan-y"
            aria-roledescription="carousel"
            aria-label="Work experience"
            onPointerDown={handlePointerDown}
          >
            <div
              className="flex items-stretch transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${slideOffset}%)` }}
            >
              {experienceData.map((experience, index) => {
                const isVisible = isMobile
                  ? index === activeIndex
                  : index >= activeIndex &&
                    index < activeIndex + cardsPerPage

                return (
                  <div
                    key={experience.id}
                    className="w-full shrink-0 lg:w-1/2 lg:pr-6"
                    aria-hidden={!isVisible}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${experienceData.length}: ${experience.company}`}
                  >
                    <ExperienceCard
                      key={`${experience.id}-${activeIndex}`}
                      experience={experience}
                      prefersReducedMotion={prefersReducedMotion}
                      suppressFlipRef={suppressFlipRef}
                      onKeyDown={handleCardKeyDown}
                      tabIndex={isVisible ? 0 : -1}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative mx-auto mt-4 flex max-w-5xl items-center justify-between">
            <button
              type="button"
              onClick={() =>
                goToSlide(activeIndex - (isMobile ? 1 : cardsPerPage))
              }
              disabled={activeIndex === 0}
              aria-label="Previous experience"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:text-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
              role="group"
              aria-label="Choose an experience group"
            >
              {Array.from({ length: pageCount }, (_, page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToSlide(page * cardsPerPage)}
                  aria-label={`Go to experience group ${page + 1}`}
                  aria-current={page === activePage ? "true" : undefined}
                  className="group flex h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    className={`h-2.5 rounded-full transition-all ${
                      page === activePage
                        ? "w-7 bg-primary"
                        : "w-2.5 bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                goToSlide(activeIndex + (isMobile ? 1 : cardsPerPage))
              }
              disabled={activeIndex >= maxIndex}
              aria-label="Next experience"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:text-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const ExperienceCard = ({
  experience,
  prefersReducedMotion,
  suppressFlipRef,
  onKeyDown,
  tabIndex,
}: {
  experience: (typeof experienceData)[number]
  prefersReducedMotion: boolean
  suppressFlipRef: { current: boolean }
  onKeyDown: (
    event: KeyboardEvent<HTMLDivElement>,
    toggle: () => void,
  ) => void
  tabIndex: number
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const toggle = () => setIsFlipped((flipped) => !flipped)

  const handleClick = () => {
    if (suppressFlipRef.current) {
      suppressFlipRef.current = false
      return
    }
    toggle()
  }

  return (
    <div
      role="button"
      tabIndex={tabIndex}
      aria-pressed={isFlipped}
      aria-label={`${experience.company}, ${experience.title}, ${experience.duration}. Flip card`}
      onClick={handleClick}
      onKeyDown={(event) => onKeyDown(event, toggle)}
      className="group relative h-[480px] w-full cursor-pointer [perspective:1200px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.7,
          ease: "easeInOut",
        }}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
          aria-hidden={isFlipped}
        >
          <div className="relative aspect-video max-h-[70%] w-full shrink-0 overflow-hidden rounded-t-[28px]">
            <Image
              src={experience.image}
              alt={`${experience.company} experience`}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain"
              draggable={false}
            />
          </div>
          <div className="flex min-h-0 flex-1 flex-col text-white">
            <div className="flex min-h-0 flex-1 flex-col justify-center px-5 py-3 sm:px-6">
              <h3 className="break-words text-2xl font-bold leading-tight sm:text-3xl">
                {experience.company}
              </h3>
              <p className="mt-1 text-sm font-semibold leading-tight text-primary sm:text-base">
                {experience.title}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase leading-tight tracking-[0.12em] text-gray-400 sm:text-sm">
                {experience.duration}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 border-t border-white/10 px-5 py-3 text-xs font-semibold text-primary sm:px-6">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M20 7v5h-5M4.93 19a8 8 0 1 0-.2-11.1L3 10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Click to flip
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-[28px] border border-primary/20 bg-[#111111] text-white shadow-2xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
          aria-hidden={!isFlipped}
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-3 pt-5 sm:px-6">
            <div className="flex min-h-full flex-col justify-center gap-5">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                  {experience.company}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">
                  {experience.title}
                </p>
                <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                  {experience.duration}
                  {experience.location ? ` · ${experience.location}` : ""}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-primary sm:text-sm">
                  Experience
                </h4>
                <ul className="mt-2 space-y-2">
                  {experience.description.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-xs leading-relaxed text-gray-300 sm:text-sm"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-primary sm:text-sm">
                  Key Work
                </h4>
                <ul className="mt-2 space-y-2">
                  {experience.keyWork.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-xs leading-relaxed text-gray-300 sm:text-sm"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 border-t border-white/10 px-5 py-3 text-xs font-semibold text-primary sm:px-6">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
            >
              <path
                d="M20 7v5h-5M4.93 19a8 8 0 1 0-.2-11.1L3 10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Click to return
          </div>
        </div>
      </motion.div>
    </div>
  )
}
