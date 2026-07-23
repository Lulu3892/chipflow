'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Cpu,
  Activity,
  Clock,
  Zap,
  TrendingUp,
  FolderOpen,
  ArrowRight,
  ChevronRight,
  Server,
  ExternalLink,
} from 'lucide-react';

const projects = [
  { id: '1', name: 'ChipFlow SoC v1.0', status: 'active', progress: 44, process: '7nm', deadline: '2024-10-20' },
  { id: '2', name: 'AI Accelerator', status: 'active', progress: 23, process: '5nm', deadline: '2025-03-15' },
  { id: '3', name: 'IoT Controller', status: 'completed', progress: 100, process: '14nm', deadline: '2024-06-30' },
  { id: '4', name: 'High-Speed SerDes', status: 'pending', progress: 0, process: '3nm', deadline: '2025-06-01' },
];

const recentTasks = [
  { id: '1', name: '修复时序违例 - 逻辑综合', project: 'ChipFlow SoC v1.0', status: 'in-progress', priority: 'high' },
  { id: '2', name: '覆盖率分析报告', project: 'ChipFlow SoC v1.0', status: 'pending', priority: 'medium' },
  { id: '3', name: '物理设计 Floorplan', project: 'AI Accelerator', status: 'pending', priority: 'high' },
  { id: '4', name: 'DRC 检查修复', project: 'IoT Controller', status: 'completed', priority: 'medium' },
];

const metricsData = [
  { name: '周一', cpu: 45, memory: 38, jobs: 12 },
  { name: '周二', cpu: 62, memory: 45, jobs: 18 },
  { name: '周三', cpu: 55, memory: 52, jobs: 15 },
  { name: '周四', cpu: 78, memory: 68, jobs: 22 },
  { name: '周五', cpu: 85, memory: 72, jobs: 25 },
  { name: '周六', cpu: 35, memory: 30, jobs: 8 },
  { name: '周日', cpu: 42, memory: 35, jobs: 10 },
];

const yieldData = [
  { name: 'W1', yield: 82 },
  { name: 'W2', yield: 85 },
  { name: 'W3', yield: 88 },
  { name: 'W4', yield: 86 },
  { name: 'W5', yield: 91 },
  { name: 'W6', yield: 93 },
  { name: 'W7', yield: 90 },
];

const statusColors = {
  active: { bg: 'bg-accent/10', text: 'text-accent', dot: 'bg-accent' },
  completed: { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' },
  pending: { bg: 'bg-muted/10', text: 'text-muted', dot: 'bg-muted' },
};

const priorityColors = {
  high: { bg: 'bg-error/10', text: 'text-error' },
  medium: { bg: 'bg-warning/10', text: 'text-warning' },
  low: { bg: 'bg-muted/10', text: 'text-muted' },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">仪表盘</h1>
          <p className="text-muted text-sm mt-1">欢迎回来，工程师 | 上次登录: 今天 09:30</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">当前时间:</span>
          <span className="text-sm font-mono text-accent">{new Date().toLocaleString('zh-CN')}</span>
        </div>
      </motion.div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '活跃项目', value: '2', icon: FolderOpen, color: 'text-accent', bg: 'bg-accent/10', trend: '+12%' },
          { label: '运行任务', value: '45', icon: Activity, color: 'text-success', bg: 'bg-success/10', trend: '+8%' },
          { label: '平均良率', value: '90.5%', icon: TrendingUp, color: 'text-accent-purple', bg: 'bg-accent-purple/10', trend: '+2.3%' },
          { label: '资源利用率', value: '68%', icon: Server, color: 'text-warning', bg: 'bg-warning/10', trend: '-5%' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted">{stat.label}</span>
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <span className="text-xs text-success mb-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-3 gap-6">
        {/* CPU/内存使用率 - 可点击跳转 */}
        <Link href="/physical" className="col-span-2 group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl border border-border p-6 cursor-pointer transition-all duration-300 group-hover:border-accent group-hover:shadow-glow-blue"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">资源监控</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs text-muted">CPU</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent-purple" />
                  <span className="text-xs text-muted">内存</span>
                </div>
                <span className="text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  查看详情 <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricsData}>
                  <defs>
                    <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#27272A" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: '#71717A', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#71717A', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111118',
                      borderColor: '#27272A',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#E4E4E7' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    stroke="#00D4FF"
                    fillOpacity={1}
                    fill="url(#cpuGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    stroke="#7C3AED"
                    fillOpacity={1}
                    fill="url(#memoryGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </Link>

        {/* 良率趋势 - 可点击跳转 */}
        <Link href="/timing" className="group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-xl border border-border p-6 cursor-pointer transition-all duration-300 group-hover:border-accent-purple group-hover:shadow-glow-purple h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">良率趋势</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-success">↑ 2.3%</span>
                <span className="text-sm text-accent-purple opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  查看详情 <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yieldData}>
                  <defs>
                    <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#27272A" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: '#71717A', fontSize: 12 }} />
                  <YAxis domain={[70, 100]} tick={{ fill: '#71717A', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111118',
                      borderColor: '#27272A',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#E4E4E7' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="yield"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2 }}
                    activeDot={{ fill: '#10B981', strokeWidth: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* 项目列表和任务列表 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 项目列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-2 bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">项目概览</h2>
            <Link href="/flow" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-card-hover transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{project.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[project.status as keyof typeof statusColors].bg} ${statusColors[project.status as keyof typeof statusColors].text}`}>
                      {project.status === 'active' ? '进行中' : project.status === 'completed' ? '已完成' : '待开始'}
                    </span>
                    <span className="text-xs text-muted">{project.process}</span>
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.deadline}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${project.status === 'completed' ? 'text-success' : 'text-accent'}`}>
                    {project.progress}%
                  </span>
                  <div className="w-32 h-2 bg-border rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                      className={`h-full ${project.status === 'completed' ? 'bg-success' : 'bg-gradient-to-r from-accent to-accent-purple'}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 任务列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">近期任务</h2>
            <Link href="/flow" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-3 bg-background rounded-lg hover:bg-card-hover transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${priorityColors[task.priority as keyof typeof priorityColors].bg} ${priorityColors[task.priority as keyof typeof priorityColors].text}`}>
                        {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                      </span>
                      <span className={`text-xs ${task.status === 'completed' ? 'text-success' : task.status === 'in-progress' ? 'text-warning' : 'text-muted'}`}>
                        {task.status === 'completed' ? '已完成' : task.status === 'in-progress' ? '进行中' : '待处理'}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground mt-1">{task.name}</h3>
                    <p className="text-xs text-muted mt-0.5">{task.project}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* 快捷操作 */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">快捷操作</h3>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm hover:bg-accent/20 transition-colors"
              >
                <Zap className="w-4 h-4" />
                新建任务
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-3 py-2 bg-accent-purple/10 text-accent-purple rounded-lg text-sm hover:bg-accent-purple/20 transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                新建项目
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}