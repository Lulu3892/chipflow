'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  Clock,
  AlertTriangle,
  AlertCircle,
  TrendingDown,
  Activity,
  ChevronRight,
  ArrowLeft,
  Cpu,
  Code,
  CheckCircle2,
  LayoutGrid,
  Shield,
} from 'lucide-react';

const stageConfig: Record<string, { name: string; icon: React.ComponentType<{ className?: string }> }> = {
  rtl: { name: 'RTL设计', icon: Code },
  synthesis: { name: '逻辑综合', icon: Cpu },
  verification: { name: '功能验证', icon: CheckCircle2 },
  physical: { name: '物理设计', icon: LayoutGrid },
  signoff: { name: '签核分析', icon: Shield },
};

const setupViolations = [12, 8, 15, 6, 4, 3, 2, 1, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const holdViolations = [5, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const days = Array.from({ length: 30 }, (_, i) => `D${i + 1}`);

const trendData = days.map((day, index) => ({
  day,
  setup: setupViolations[index],
  hold: holdViolations[index],
}));

const violationDistribution = [
  { name: 'CPU_Core', value: 45, color: '#00D4FF' },
  { name: 'Memory_Controller', value: 30, color: '#7C3AED' },
  { name: 'IO_Interface', value: 15, color: '#10B981' },
  { name: 'Clock_Gen', value: 10, color: '#F59E0B' },
];

const worstPaths = [
  { id: '1', path: 'cpu_core/alu_add[0]/.../reg[31]', delay: 2.84, required: 2.72, violation: -0.12, status: 'violation' },
  { id: '2', path: 'cpu_core/fpu_mul/.../reg[15]', delay: 2.78, required: 2.72, violation: -0.06, status: 'violation' },
  { id: '3', path: 'mem_ctrl/write_addr/.../bank_sel', delay: 2.76, required: 2.72, violation: -0.04, status: 'violation' },
  { id: '4', path: 'io_intf/tx_fifo/.../data_out', delay: 2.74, required: 2.72, violation: -0.02, status: 'violation' },
  { id: '5', path: 'cpu_core/branch_pred/.../pc_next', delay: 2.71, required: 2.72, violation: 0.01, status: 'clean' },
];

const kpiData = [
  { label: 'Setup违例', value: '0', unit: '个', icon: AlertTriangle, color: 'text-error', bg: 'bg-error/10', trend: '0' },
  { label: 'Hold违例', value: '0', unit: '个', icon: AlertCircle, color: 'text-warning', bg: 'bg-warning/10', trend: '0' },
  { label: 'WNS', value: '-0.12', unit: 'ns', icon: TrendingDown, color: 'text-accent', bg: 'bg-accent/10', trend: '0.08' },
  { label: 'TNS', value: '-2.4', unit: 'ns', icon: Activity, color: 'text-accent-purple', bg: 'bg-accent-purple/10', trend: '1.2' },
];

function TimingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stageId = searchParams.get('stage');
  const stage = stageId ? stageConfig[stageId] : null;

  const formatXAxis = (value: string) => {
    const num = parseInt(value.replace('D', ''));
    return num % 5 === 0 ? value : '';
  };

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
            <h1 className="text-2xl font-bold text-foreground">时序分析</h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-muted text-sm">STA Report | ChipFlow SoC v1.0 | 1.2GHz</p>
              {stage && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400"
                >
                  📍 {stage.name}阶段
                </motion.span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-lg text-sm">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            最新更新: 今天 11:30
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
                <span className="text-sm text-muted">{stat.unit}</span>
              </div>
              <span className={`text-xs ${stat.label.includes('违例') ? 'text-success' : 'text-success'} mb-1 flex items-center gap-1`}>
                <TrendingDown className="w-3 h-3" />
                -{stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 违例趋势图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-2 bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">违例趋势（近30天）</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error" />
                <span className="text-xs text-muted">Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-xs text-muted">Hold</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid stroke="#27272A" strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#71717A', fontSize: 11 }}
                  tickFormatter={formatXAxis}
                />
                <YAxis
                  yAxisId="left"
                  domain={[0, 20]}
                  tick={{ fill: '#71717A', fontSize: 11 }}
                  label={{ value: 'Setup', position: 'insideLeft', fill: '#EF4444', fontSize: 12 }}
                />
                <YAxis
                  yAxisId="right"
                  domain={[0, 6]}
                  tick={{ fill: '#71717A', fontSize: 11 }}
                  orientation="right"
                  label={{ value: 'Hold', position: 'insideRight', fill: '#F59E0B', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111118',
                    borderColor: '#27272A',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#E4E4E7' }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="setup"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
                  activeDot={{ fill: '#EF4444', strokeWidth: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="hold"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                  activeDot={{ fill: '#F59E0B', strokeWidth: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 违例分布饼图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">违例分布（按模块）</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={violationDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {violationDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111118',
                    borderColor: '#27272A',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#E4E4E7' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {violationDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 最差路径表格 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">最差路径 Top 5</h2>
          <span className="text-sm text-muted flex items-center gap-1">
            查看全部路径 <ChevronRight className="w-4 h-4" />
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">路径名称</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">实际延迟</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">要求延迟</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">违例量</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted uppercase tracking-wider">状态</th>
              </tr>
            </thead>
            <tbody>
              {worstPaths.map((path, index) => (
                <motion.tr
                  key={path.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="border-b border-border/50 hover:bg-card-hover transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted font-mono">#{index + 1}</span>
                      <span className="text-sm text-foreground font-mono truncate max-w-md">{path.path}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-mono text-foreground">{path.delay}ns</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-mono text-muted">{path.required}ns</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`text-sm font-mono font-medium ${path.violation < 0 ? 'text-error' : 'text-success'}`}>
                      {path.violation >= 0 ? '+' : ''}{path.violation}ns
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      path.status === 'violation'
                        ? 'bg-error/10 text-error'
                        : 'bg-success/10 text-success'
                    }`}>
                      {path.status === 'violation' ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {path.status === 'violation' ? '有违例' : '干净'}
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
              总路径数: <span className="text-foreground font-medium">12,847</span>
            </span>
            <span className="text-sm text-muted">
              违例路径: <span className="text-error font-medium">4</span>
            </span>
            <span className="text-sm text-muted">
              干净路径: <span className="text-success font-medium">12,843</span>
            </span>
          </div>
          <div className="text-sm text-muted">
            覆盖率: <span className="text-accent font-medium">99.97%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TimingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full">加载中...</div>}>
      <TimingContent />
    </Suspense>
  );
}