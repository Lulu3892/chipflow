'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, LayoutDashboard, GitBranch, Activity, Box, Network } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const suggestions = [
  { id: '1', label: '总览', description: '仪表盘首页', href: '/', icon: LayoutDashboard },
  { id: '2', label: '设计流程', description: '芯片设计流程可视化', href: '/flow', icon: GitBranch },
  { id: '3', label: '性能监控', description: '时序分析', href: '/timing', icon: Activity },
  { id: '4', label: '物理设计', description: '布局布线与DRC分析', href: '/physical', icon: Box },
  { id: '5', label: '芯片架构', description: '模块架构图', href: '/architecture', icon: Network },
];

export default function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = query
    ? suggestions.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredSuggestions[selectedIndex]) {
          setQuery('');
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="搜索页面、阶段、指标..."
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
        />
      </div>

      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="max-h-80 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <Link
                  key={suggestion.id}
                  href={suggestion.href}
                  onClick={handleSelect}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition-colors ${
                    index === selectedIndex ? 'bg-accent/10' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <suggestion.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{suggestion.label}</p>
                    <p className="text-xs text-muted">{suggestion.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted" />
                </Link>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-border bg-background/50">
              <p className="text-xs text-muted">
                <kbd className="px-1.5 py-0.5 bg-card rounded text-accent">↑↓</kbd> 导航{' '}
                <kbd className="px-1.5 py-0.5 bg-card rounded text-accent">Enter</kbd> 选择{' '}
                <kbd className="px-1.5 py-0.5 bg-card rounded text-accent">Esc</kbd> 关闭
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}