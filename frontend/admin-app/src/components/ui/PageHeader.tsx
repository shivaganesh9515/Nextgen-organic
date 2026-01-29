"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  isDark?: boolean;
}

export function PageHeader({ title, subtitle, isDark = false }: PageHeaderProps) {
  return (
    <section className={`pt-32 pb-16 px-6 ${isDark ? 'bg-[#262A2B] text-[#F5F5F0]' : 'bg-[#F5F5F0] text-[#262A2B]'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading font-bold text-4xl md:text-6xl mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-white/60' : 'text-[#262A2B]/60'}`}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
