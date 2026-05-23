"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { blogPosts } from "@/data";

export const Blog = () => {
  return (
    <section id="blog" className="py-20">
      <h1 className="heading">
        LinkedIn Updates & <span className="text-purple">Certifications</span>
      </h1>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {blogPosts.map((post, index) => (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            key={post.id}
            className="block cursor-pointer"
          >
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-gold/50 transition-all duration-300 dark:border-white/[0.1] dark:from-[#04071d] dark:to-[#0c0e23]"
            >
              {/* Blog post image */}
              {(post as any).img && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={(post as any).img}
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#04071d]" />
                </div>
              )}

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10 p-6">
                <div className="flex items-center gap-2 text-slate-400 dark:text-white/40 text-xs mb-3">
                  <FaCalendarAlt size={10} />
                  <time>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-white-200 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] font-semibold rounded-full bg-purple/10 text-purple border border-purple/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-purple text-sm font-semibold group-hover:gap-2 transition-all group-hover:text-gold">
                    Read
                    <FaArrowRight
                      size={10}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          </a>
        ))}
      </div>
    </section>
  );
};
