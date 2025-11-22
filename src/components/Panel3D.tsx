'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Panel3DProps = {
  children: ReactNode;
  className?: string;
};

export function Panel3D({ children, className = '' }: Panel3DProps) {
  return (
    <motion.div
      className={
        'relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-900/40 shadow-[0_22px_60px_rgba(0,0,0,0.75)] backdrop-blur-xl ' +
        'dark:from-slate-950/90 dark:via-slate-900/85 dark:to-slate-900/40 ' +
        'light:bg-white/80 light:border-slate-200 light:shadow-[0_18px_45px_rgba(15,23,42,0.18)] ' +
        className
      }
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <div className="p-5 sm:p-6 lg:p-7">{children}</div>
    </motion.div>
  );
}
