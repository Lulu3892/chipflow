'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  GitBranch,
  Activity,
  Settings,
  Cpu,
  ChevronRight,
  User,
  Menu,
  X,
  Box,
  Network,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '总览', href: '/' },
  { icon: GitBranch, label: '设计流程', href: '/flow' },
  { icon: Activity, label: '性能监控', href: '/timing' },
  { icon: Box, label: '物理设计', href: '/physical' },
  { icon: Network, label: '芯片架构', href: '/architecture' },
];

const bottomNavItems = [
  { icon: Settings, label: '设置', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* 桌面端侧边栏 - 始终展开 */}
      <motion.aside
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 200, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex fixed left-0 top-0 h-full w-[200px] flex-col bg-card border-r border-border z-50"
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
              <Cpu className="w-5 h-5 text-background" />
            </div>
            <span className="font-bold text-lg tracking-tight">ChipFlow</span>
          </Link>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-card-active text-accent shadow-glow-blue'
                        : 'text-muted hover:text-foreground hover:bg-card-hover'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {active && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* 底部菜单 */}
        <div className="p-3 border-t border-border">
          <ul className="space-y-1">
            {bottomNavItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-card-active text-accent'
                      : 'text-muted hover:text-foreground hover:bg-card-hover'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* 用户信息 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-card-hover cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">工程师</p>
              <p className="text-xs text-muted truncate">chipflow@semicon.com</p>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* 移动端侧边栏触发器 */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg hover:bg-card-hover transition-colors"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* 移动端侧边栏 */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* 侧边栏内容 */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-64 flex flex-col bg-card border-r border-border z-50 lg:hidden"
            >
              {/* Logo */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                <Link
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-background" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">ChipFlow</span>
                </Link>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-card-hover rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted" />
                </button>
              </div>

              {/* 导航菜单 */}
              <nav className="flex-1 py-4 overflow-y-auto">
                <ul className="space-y-1 px-3">
                  {navItems.map((item, index) => {
                    const active = isActive(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            active
                              ? 'bg-card-active text-accent shadow-glow-blue'
                              : 'text-muted hover:text-foreground hover:bg-card-hover'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {active && <ChevronRight className="w-4 h-4" />}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* 底部菜单 */}
              <div className="p-3 border-t border-border">
                <ul className="space-y-1">
                  {bottomNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? 'bg-card-active text-accent'
                            : 'text-muted hover:text-foreground hover:bg-card-hover'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* 用户信息 */}
                <div className="mt-4 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-card-hover cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">工程师</p>
                    <p className="text-xs text-muted truncate">chipflow@semicon.com</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}