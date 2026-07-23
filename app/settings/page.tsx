'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Monitor,
  Database,
  Save,
  Moon,
  Sun,
  ChevronRight,
} from 'lucide-react';

const settingsSections = [
  { id: 'profile', label: '用户资料', icon: User },
  { id: 'notifications', label: '通知设置', icon: Bell },
  { id: 'theme', label: '主题外观', icon: Palette },
  { id: 'display', label: '显示设置', icon: Monitor },
  { id: 'security', label: '安全设置', icon: Shield },
  { id: 'data', label: '数据管理', icon: Database },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    daily: true,
    weekly: false,
  });
  const [language, setLanguage] = useState('zh-CN');

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">系统设置</h1>
          <p className="text-muted text-sm mt-1">管理您的账户和系统配置</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          <Save className="w-4 h-4" />
          保存设置
        </motion.button>
      </motion.div>

      {/* 设置面板 */}
      <div className="flex gap-6">
        {/* 左侧菜单 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-64 flex-shrink-0"
        >
          <div className="bg-card rounded-xl border border-border p-2">
            <ul className="space-y-1">
              {settingsSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-card-active text-accent'
                        : 'text-muted hover:text-foreground hover:bg-card-hover'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{section.label}</span>
                    {activeSection === section.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 右侧内容 */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          {/* 用户资料 */}
          {activeSection === 'profile' && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">用户资料</h2>
              <div className="flex gap-8">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center flex-shrink-0">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm text-muted mb-1">用户名</label>
                    <input
                      type="text"
                      defaultValue="工程师"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-1">邮箱地址</label>
                    <input
                      type="email"
                      defaultValue="chipflow@semicon.com"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-card-hover text-foreground rounded-lg text-sm font-medium hover:bg-border transition-colors">
                      更换头像
                    </button>
                    <button className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors">
                      修改密码
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 通知设置 */}
          {activeSection === 'notifications' && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">通知设置</h2>
              <div className="space-y-4">
                {[
                  { key: 'email', label: '邮件通知', desc: '接收重要更新和报告邮件' },
                  { key: 'push', label: '推送通知', desc: '浏览器推送实时更新' },
                  { key: 'daily', label: '每日摘要', desc: '每天发送项目进度摘要' },
                  { key: 'weekly', label: '周报', desc: '每周发送综合报告' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-card-hover transition-colors"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{item.label}</h3>
                      <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-accent'
                          : 'bg-border'
                      }`}
                    >
                      <motion.div
                        animate={{ x: notifications[item.key as keyof typeof notifications] ? 24 : 0 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 主题外观 */}
          {activeSection === 'theme' && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">主题外观</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-accent bg-card-active'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                    <Moon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground text-center">暗黑主题</h3>
                  <p className="text-xs text-muted text-center mt-1">深色背景，护眼模式</p>
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    theme === 'light'
                      ? 'border-accent bg-card-active'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                    <Sun className="w-6 h-6 text-warning" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground text-center">浅色主题</h3>
                  <p className="text-xs text-muted text-center mt-1">浅色背景，清晰明亮</p>
                </button>
              </div>
            </div>
          )}

          {/* 显示设置 */}
          {activeSection === 'display' && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">显示设置</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-muted mb-2">语言</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                  >
                    <option value="zh-CN">中文 (简体)</option>
                    <option value="zh-TW">中文 (繁体)</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-2">字体大小</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="12"
                      max="18"
                      defaultValue="14"
                      className="flex-1 accent-accent"
                    />
                    <span className="text-sm font-mono text-accent">14px</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 安全设置 */}
          {activeSection === 'security' && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">安全设置</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">双因素认证</h3>
                    <p className="text-xs text-muted mt-0.5">增强账户安全性</p>
                  </div>
                  <span className="px-3 py-1 bg-error/10 text-error text-xs font-medium rounded-full">
                    未启用
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">登录提醒</h3>
                    <p className="text-xs text-muted mt-0.5">异地登录时发送提醒</p>
                  </div>
                  <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                    已启用
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">会话超时</h3>
                    <p className="text-xs text-muted mt-0.5">闲置后自动登出</p>
                  </div>
                  <span className="text-sm text-foreground">30分钟</span>
                </div>
              </div>
            </div>
          )}

          {/* 数据管理 */}
          {activeSection === 'data' && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">数据管理</h2>
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">存储空间使用</span>
                    <span className="text-sm text-accent font-mono">2.4 GB / 10 GB</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[24%] bg-gradient-to-r from-accent to-accent-purple rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-warning/10 text-warning rounded-lg text-sm font-medium hover:bg-warning/20 transition-colors">
                    导出数据
                  </button>
                  <button className="p-4 bg-error/10 text-error rounded-lg text-sm font-medium hover:bg-error/20 transition-colors">
                    删除所有数据
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}