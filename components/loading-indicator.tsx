'use client';

import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-full border-4 border-border" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-accent border-t-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-accent" />
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="ml-4 text-muted text-lg"
      >
        加载中...
      </motion.p>
    </div>
  );
}