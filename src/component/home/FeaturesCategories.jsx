"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "New Arrivals",
    image: "/placeholder.svg?height=600&width=400",
    link: "/category/new-arrivals",
  },
  {
    title: "Trending Now",
    image: "/placeholder.svg?height=600&width=400",
    link: "/category/trending",
  },
  {
    title: "Accessories",
    image: "/placeholder.svg?height=600&width=400",
    link: "/category/accessories",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Categories</h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Explore our curated collection of premium fashion pieces.
          </p>
        </div>
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <Link href={category.link} className="block aspect-[3/4]">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <p className="mt-2 flex items-center text-white">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

