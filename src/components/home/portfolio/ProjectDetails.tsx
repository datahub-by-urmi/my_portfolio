"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface ProjectDetailsProps {
  id: number
  title: string
  image: string
  description: string
  link: string
}

export const ProjectDetails = ({ title, image, link }: ProjectDetailsProps) => {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="group block">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[480px] w-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]"
      >
        <div className="relative flex h-[70%] w-full shrink-0 items-center justify-center overflow-hidden bg-[#f0f0f0] p-4">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
          </div>
        </div>

        <div className="flex h-[30%] flex-col justify-between p-6">
          <div>
            <h3 className="text-3xl font-bold leading-tight text-white group-hover:underline decoration-4 underline-offset-4 decoration-primary">
              {title}
            </h3>
            <div className="h-1 w-12 bg-primary mt-2 rounded-full" />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-400 group-hover:text-primary transition-colors">
              View on GitHub
            </p>
            <span className="text-2xl text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
