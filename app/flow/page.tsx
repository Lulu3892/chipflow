'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Cpu,
  CheckCircle2,
  LayoutGrid,
  Shield,
  Rocket,
  X,
  Clock,
  Target,
  Activity,
  AlertTriangle,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';

type FlowStatus = 'completed' | 'in-progress' | 'pending';

interface FlowNode {
  id: string;
  name: string;
  status: FlowStatus;
  icon: React.ComponentType<{ className?: string }>;
  metrics: { label: string; value: string; unit?: string }[];
  details: {
    description: string;
    progress: number;
    tasks: { name: string; status: FlowStatus }[];
    timeline: { phase: string; date: string; status: FlowStatus }[];
  };
}

const flowData: FlowNode[] = [
  {
    id: 'rtl',
    name: 'RTL设计',
    status: 'completed',
    icon: Code,
    metrics: [
      { label: '代码行数', value: '125,000', unit: '行' },
      { label: '模块数', value: '48', unit: '个' },
    ],
    details: {
      description: '完成寄存器传输级(RTL)设计，包括所有功能模块的Verilog/VHDL代码编写和模块间接口定义。',
      progress: 100,
      tasks: [
        { name: '顶层模块设计', status: 'completed' },
        { name: '数据通路实现', status: 'completed' },
        { name: '控制逻辑设计', status: 'completed' },
        { name: '接口协议定义', status: 'completed' },
      ],
      timeline: [
        { phase: '设计启动', date: '2024-01-15', status: 'completed' },
        { phase: '模块评审', date: '2024-02-20', status: 'completed' },
        { phase: '代码冻结', date: '2024-03-10', status: 'completed' },
      ],
    },
  },
  {
    id: 'synthesis',
    name: '逻辑综合',
    status: 'in-progress',
    icon: Cpu,
    metrics: [
      { label: '面积', value: '2.4', unit: 'mm²' },
      { label: '频率', value: '1.2', unit: 'GHz' },
      { label: '违例', value: '12', unit: '个' },
    ],
    details: {
      description: '将RTL代码转换为门级网表，进行面积优化、时序优化和功耗优化。',
      progress: 65,
      tasks: [
        { name: 'DC综合', status: 'completed' },
        { name: '时序约束', status: 'completed' },
        { name: '面积优化', status: 'in-progress' },
        { name: '时序修复', status: 'pending' },
      ],
      timeline: [
        { phase: '综合启动', date: '2024-03-11', status: 'completed' },
        { phase: '约束验证', date: '2024-03-20', status: 'completed' },
        { phase: '优化迭代', date: '2024-04-05', status: 'in-progress' },
        { phase: '综合完成', date: '2024-04-20', status: 'pending' },
      ],
    },
  },
  {
    id: 'verification',
    name: '功能验证',
    status: 'in-progress',
    icon: CheckCircle2,
    metrics: [
      { label: '覆盖率', value: '87', unit: '%' },
      { label: '测试用例', value: '2,400', unit: '个' },
      { label: '失败', value: '3', unit: '个' },
    ],
    details: {
      description: '通过仿真和形式验证确保设计功能正确性，达到目标覆盖率要求。',
      progress: 87,
      tasks: [
        { name: 'UVM环境搭建', status: 'completed' },
        { name: '功能仿真', status: 'completed' },
        { name: '覆盖率分析', status: 'in-progress' },
        { name: '回归测试', status: 'pending' },
      ],
      timeline: [
        { phase: '验证启动', date: '2024-02-01', status: 'completed' },
        { phase: '环境验证', date: '2024-02-15', status: 'completed' },
        { phase: '全面仿真', date: '2024-03-01', status: 'in-progress' },
        { phase: '验证完成', date: '2024-04-15', status: 'pending' },
      ],
    },
  },
  {
    id: 'physical',
    name: '物理设计',
    status: 'pending',
    icon: LayoutGrid,
    metrics: [
      { label: '预计面积', value: '—' },
      { label: '预计功耗', value: '—' },
    ],
    details: {
      description: '进行芯片物理实现，包括布局规划、时钟树综合、布线和物理验证。',
      progress: 0,
      tasks: [
        { name: 'Floorplan规划', status: 'pending' },
        { name: '电源规划', status: 'pending' },
        { name: '时钟树综合', status: 'pending' },
        { name: '详细布线', status: 'pending' },
      ],
      timeline: [
        { phase: '物理设计启动', date: '2024-04-21', status: 'pending' },
        { phase: '布局完成', date: '2024-05-15', status: 'pending' },
        { phase: '布线完成', date: '2024-06-15', status: 'pending' },
      ],
    },
  },
  {
    id: 'signoff',
    name: '签核分析',
    status: 'pending',
    icon: Shield,
    metrics: [],
    details: {
      description: '进行最终的时序签核、物理验证和可靠性分析，确保设计满足所有指标。',
      progress: 0,
      tasks: [
        { name: '时序签核', status: 'pending' },
        { name: 'DRC检查', status: 'pending' },
        { name: 'LVS验证', status: 'pending' },
        { name: '可靠性分析', status: 'pending' },
      ],
      timeline: [
        { phase: '签核启动', date: '2024-06-16', status: 'pending' },
        { phase: '问题修复', date: '2024-07-01', status: 'pending' },
        { phase: '签核完成', date: '2024-07-15', status: 'pending' },
      ],
    },
  },
  {
    id: 'tapeout',
    name: '流片Tape-out',
    status: 'pending',
    icon: Rocket,
    metrics: [],
    details: {
      description: '生成最终的GDSII文件并提交给代工厂进行芯片制造。',
      progress: 0,
      tasks: [
        { name: 'GDSII生成', status: 'pending' },
        { name: '掩膜版准备', status: 'pending' },
        { name: '代工厂提交', status: 'pending' },
        { name: '制造跟踪', status: 'pending' },
      ],
      timeline: [
        { phase: '数据准备', date: '2024-07-16', status: 'pending' },
        { phase: '提交流片', date: '2024-07-20', status: 'pending' },
        { phase: '芯片交付', date: '2024-10-20', status: 'pending' },
      ],
    },
  },
];

const statusConfig = {
  completed: {
    dot: 'bg-success',
    border: 'border-success/30',
    bg: 'bg-success/5',
    text: 'text-success',
    glow: 'shadow-glow-blue',
    label: '已完成',
  },
  'in-progress': {
    dot: 'bg-warning',
    border: 'border-warning/30',
    bg: 'bg-warning/5',
    text: 'text-warning',
    glow: '',
    label: '进行中',
  },
  pending: {
    dot: 'bg-muted',
    border: 'border-muted/30',
    bg: 'bg-background',
    text: 'text-muted',
    glow: '',
    label: '未开始',
  },
};

export default function FlowPage() {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleNodeClick = (node: FlowNode) => {
    // 未开始的节点不可点击
    if (node.status === 'pending') {
      return;
    }

    // 流片阶段显示 Toast
    if (node.id === 'tapeout') {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // 功能验证跳转到首页
    if (node.id === 'verification') {
      router.push('/');
      return;
    }

    // 物理设计跳转到物理设计页面
    if (node.id === 'physical') {
      router.push('/physical');
      return;
    }

    // 其他阶段跳转到时序分析页面
    router.push(`/timing?stage=${node.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toast 提示 */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -50, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-success/10 border border-success/30 rounded-xl shadow-lg">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
              >
                <CheckCircle className="w-5 h-5 text-success" />
              </motion.div>
              <span className="text-success font-medium">项目已完成</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowToast(false)}
                className="ml-2 p-1 hover:bg-success/20 rounded"
              >
                <X className="w-4 h-4 text-success" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">芯片设计流程</h1>
          <p className="text-muted text-sm mt-1">当前项目: ChipFlow SoC v1.0 | 工艺节点: 7nm</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm">
            <Activity className="w-4 h-4" />
            <span>运行中</span>
          </div>
        </div>
      </motion.div>

      {/* 流程图 */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-0 relative w-full overflow-x-auto pb-4">
          {/* 连接线背景 */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          {/* 流动动画线 */}
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-accent via-accent-purple to-accent -translate-y-1/2 z-0"
            initial={{ width: 0 }}
            animate={{ width: '45%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* 节点 */}
          {flowData.map((node, index) => {
            const config = statusConfig[node.status];
            const isLast = index === flowData.length - 1;
            const isClickable = node.status !== 'pending';
            
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center relative z-10 w-44 flex-shrink-0"
              >
                {/* 节点卡片 */}
                <motion.div
                  whileHover={isClickable ? { scale: 1.02, y: -2 } : {}}
                  whileTap={isClickable ? { scale: 0.98 } : {}}
                  onClick={() => handleNodeClick(node)}
                  className={`w-full p-4 rounded-xl border ${config.border} ${config.bg} ${
                    isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  } transition-all duration-300 ${
                    node.status === 'completed' ? config.glow : ''
                  } ${isClickable ? 'hover:border-accent hover:shadow-glow-blue' : ''}`}
                >
                  {/* 图标和状态 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
                      <node.icon className={`w-5 h-5 ${config.text}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${config.dot} ${node.status === 'in-progress' ? 'animate-pulse' : ''}`} />
                      <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
                    </div>
                  </div>

                  {/* 节点名称 */}
                  <h3 className="text-sm font-semibold text-foreground mb-3">{node.name}</h3>

                  {/* 指标 */}
                  {node.metrics.length > 0 && (
                    <div className="space-y-2">
                      {node.metrics.map((metric, mIndex) => (
                        <div key={mIndex} className="flex items-center justify-between text-xs">
                          <span className="text-muted">{metric.label}</span>
                          <span className={`font-mono font-medium ${config.text}`}>
                            {metric.value}
                            {metric.unit && <span className="text-muted ml-1">{metric.unit}</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 点击提示 */}
                  {isClickable && (
                    <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted text-center">
                      点击查看详情
                    </div>
                  )}
                </motion.div>

                {/* 连接线箭头 */}
                {!isLast && (
                  <div className="absolute right-[-25%] top-1/2 -translate-y-1/2 z-20">
                    <div className={`flex items-center gap-0.5 ${
                      node.status === 'completed' ? 'text-accent' : 'text-muted'
                    }`}>
                      <div className={`w-16 h-px ${
                        node.status === 'completed' ? 'bg-accent' : 'bg-muted/30'
                      } ${node.status !== 'completed' ? 'border-t border-dashed border-muted/30' : ''}`} />
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 统计概览 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-4 gap-4"
      >
        {[
          { label: '整体进度', value: '44%', icon: Activity, color: 'text-accent', bg: 'bg-accent/10' },
          { label: '已完成阶段', value: '1/6', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
          { label: '进行中阶段', value: '2/6', icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
          { label: '待处理阶段', value: '3/6', icon: Target, color: 'text-muted', bg: 'bg-muted/10' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}