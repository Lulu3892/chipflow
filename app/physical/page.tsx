'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowLeft,
  LayoutGrid,
  Layers,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';

const kpiData = [
  { label: '利用率', value: '68', unit: '%', icon: LayoutGrid, color: 'text-warning', bg: 'bg-warning/10', target: '<70%' },
  { label: '金属层数', value: '12', unit: '层', icon: Layers, color: 'text-accent', bg: 'bg-accent/10', target: '' },
  { label: 'DRC违例', value: '23', unit: '个', icon: AlertTriangle, color: 'text-error', bg: 'bg-error/10', target: '0' },
  { label: 'LVS状态', value: '通过', unit: '', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', target: '' },
];

const drcViolations = [
  { name: '金属间距', value: 9, color: '#EF4444' },
  { name: '通孔', value: 6, color: '#F59E0B' },
  { name: '天线效应', value: 4, color: '#7C3AED' },
  { name: '密度', value: 2, color: '#10B981' },
  { name: '其他', value: 2, color: '#6B7280' },
];

const violationList = [
  { id: '1', type: '金属间距', location: 'M3/M4 交叉区域', count: 9, status: 'warning' },
  { id: '2', type: '通孔', location: 'VIA2 堆叠', count: 6, status: 'warning' },
  { id: '3', type: '天线效应', location: 'NMOS 栅极', count: 4, status: 'error' },
  { id: '4', type: '密度', location: 'CPU_Core 中心', count: 2, status: 'info' },
  { id: '5', type: '其他', location: 'IO_Interface', count: 2, status: 'info' },
];

const floorplanModules = [
  { id: 'cpu', name: 'CPU_Core', x: 50, y: 80, width: 200, height: 180, color: '#00D4FF' },
  { id: 'gpu', name: 'GPU_Cluster', x: 280, y: 80, width: 150, height: 180, color: '#7C3AED' },
  { id: 'mem', name: 'Memory', x: 50, y: 290, width: 200, height: 120, color: '#10B981' },
  { id: 'io', name: 'IO_Interface', x: 460, y: 80, width: 100, height: 330, color: '#F59E0B' },
  { id: 'ctrl', name: 'Controller', x: 280, y: 290, width: 150, height: 120, color: '#EC4899' },
];

function PhysicalContent() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/flow')}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-foreground transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">物理设计</h1>
            <p className="text-muted text-sm mt-1">Physical Design | ChipFlow SoC v1.0 | 7nm</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 text-warning rounded-lg text-sm">
            <AlertCircle className="w-4 h-4" />
            DRC违例待修复
          </div>
        </div>
      </motion.div>

      {/* KPI卡片 */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((stat, index) => (
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
              <div className="flex items-baseline gap-1">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                {stat.unit && <span className="text-sm text-muted">{stat.unit}</span>}
              </div>
              {stat.target && (
                <span className="text-xs text-muted mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  目标: {stat.target}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 布局布线可视化 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-2 bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">布局布线可视化</h2>
            <div className="flex items-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-accent" />
                <span>已布局</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-muted/30" />
                <span>未布局</span>
              </div>
            </div>
          </div>
          <div className="h-72 relative">
            <svg viewBox="0 0 600 450" className="w-full h-full">
              {/* 背景网格 */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272A" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0A0A0F" />
                  <stop offset="100%" stopColor="#111118" />
                </linearGradient>
              </defs>
              
              {/* 芯片边框 */}
              <rect x="20" y="20" width="560" height="410" rx="16" fill="url(#chipGradient)" stroke="#27272A" strokeWidth="2" />
              
              {/* 网格背景 */}
              <rect x="20" y="20" width="560" height="410" rx="16" fill="url(#grid)" />
              
              {/* 模块 */}
              {floorplanModules.map((module, index) => (
                <motion.g
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="cursor-pointer"
                >
                  <rect
                    x={module.x}
                    y={module.y}
                    width={module.width}
                    height={module.height}
                    rx="8"
                    fill={`${module.color}20`}
                    stroke={module.color}
                    strokeWidth="2"
                    className="hover:opacity-80 transition-opacity"
                  />
                  <text
                    x={module.x + module.width / 2}
                    y={module.y + module.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={module.color}
                    fontSize="14"
                    fontWeight="600"
                  >
                    {module.name}
                  </text>
                  {/* 模块阴影 */}
                  <rect
                    x={module.x}
                    y={module.y}
                    width={module.width}
                    height={module.height}
                    rx="8"
                    fill="none"
                    stroke={module.color}
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </motion.g>
              ))}
              
              {/* 芯片标签 */}
              <text x="300" y="430" textAnchor="middle" fill="#71717A" fontSize="12">
                ChipFlow SoC v1.0 | 7nm | 6.0mm x 4.5mm
              </text>
            </svg>
          </div>
        </motion.div>

        {/* DRC违例分布饼图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">DRC违例分类</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={drcViolations}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {drcViolations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {drcViolations.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 违例列表表格 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">DRC违例详情</h2>
          <span className="text-sm text-muted flex items-center gap-1">
            查看全部 <ChevronRight className="w-4 h-4" />
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">类型</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">位置</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">数量</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">状态</th>
              </tr>
            </thead>
            <tbody>
              {violationList.map((violation, index) => (
                <motion.tr
                  key={violation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="border-b border-border/50 hover:bg-card-hover transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground font-medium">{violation.type}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-mono text-muted">{violation.location}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`text-sm font-mono font-medium ${
                      violation.status === 'error' ? 'text-error' : 
                      violation.status === 'warning' ? 'text-warning' : 'text-muted'
                    }`}>
                      {violation.count}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      violation.status === 'error'
                        ? 'bg-error/10 text-error'
                        : violation.status === 'warning'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted/10 text-muted'
                    }`}>
                      {violation.status === 'error' ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : violation.status === 'warning' ? (
                        <AlertCircle className="w-3 h-3" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      {violation.status === 'error' ? '严重' : 
                       violation.status === 'warning' ? '警告' : '待处理'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 统计信息 */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted">
              总违例数: <span className="text-error font-medium">23</span>
            </span>
            <span className="text-sm text-muted">
              严重违例: <span className="text-error font-medium">4</span>
            </span>
            <span className="text-sm text-muted">
              待修复: <span className="text-warning font-medium">15</span>
            </span>
          </div>
          <div className="text-sm text-muted">
            LVS: <span className="text-success font-medium">通过</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PhysicalPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full">加载中...</div>}>
      <PhysicalContent />
    </Suspense>
  );
}