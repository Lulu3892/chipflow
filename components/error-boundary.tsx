'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}



export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const error = event.error || new Error('Unknown error');
      console.error('Error Boundary caught:', error);
      setError(error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-error/10 flex items-center justify-center"
          >
            <AlertTriangle className="w-10 h-10 text-error" />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">页面出错了</h2>
          <p className="text-muted mb-6">
            {error?.message || '发生了未知错误，请尝试刷新页面'}
          </p>
          <div className="flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              刷新页面
            </motion.button>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-card-hover transition-colors"
            >
              <Home className="w-4 h-4" />
              返回首页
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}