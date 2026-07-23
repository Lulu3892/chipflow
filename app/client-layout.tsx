'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import Sidebar from '@/components/sidebar';
import SearchBox from '@/components/search-box';
import LoadingIndicator from '@/components/loading-indicator';
import ErrorBoundary from '@/components/error-boundary';
import AiAssistant from '@/components/ai-assistant';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <body className="antialiased">
      <div className="flex h-screen bg-background overflow-hidden">
        {/* 左侧导航栏 */}
        <Sidebar />

        {/* 主内容区 */}
        <div className="flex-1 flex flex-col h-full lg:ml-[200px] transition-all duration-300">
          {/* 顶部 Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-[60px] bg-card border-b border-border px-6 flex items-center justify-between lg:px-6 px-4"
          >
            {/* 左侧搜索 */}
            <div className="hidden md:block">
              <SearchBox />
            </div>

            {/* 右侧操作 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success text-xs font-medium rounded-full">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                系统正常
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-card-hover transition-colors"
              >
                <Bell className="w-5 h-5 text-muted" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
              </motion.button>
            </div>
          </motion.header>

          {/* 内容区域 */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 overflow-y-auto p-6 lg:p-6 p-4"
          >
            <ErrorBoundary>
              <Suspense fallback={<LoadingIndicator />}>
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <LoadingIndicator />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {children}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Suspense>
            </ErrorBoundary>
          </motion.main>
        </div>
      </div>

      {/* AI 助手 */}
      <AiAssistant />
    </body>
  );
}