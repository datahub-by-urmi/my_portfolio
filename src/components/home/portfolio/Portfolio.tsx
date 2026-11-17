"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio.data"
import { ProjectDetails } from "./ProjectDetails"

export const Portfolio = () => {
  return (
    <section id="projects" className="w-full bg-[#0a0a0a] scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-[36px] font-semibold leading-[1.15] text-white sm:text-[58px] md:text-[66px]">
            Projects that
            <br />
            turn Data into impactful
            <br />
            <span className="text-primary">Conversation</span>
          </h2>

          <p className="mt-6 text-[13px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-gray-300">
            Open a project to view it on GitHub.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {portfolioData.map((p) => (
            <ProjectDetails
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              description={p.description}
              link={p.link}
            />
          ))}

          <div className="mt-6 flex justify-start lg:col-span-2">
            <Link
              href="https://github.com/datahub-by-urmi?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              View All Projects
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
