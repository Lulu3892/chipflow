'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Database,
  Monitor,
  Wifi,
  Clock,
  ArrowRight,
  X,
  Zap,
  HardDrive,
} from 'lucide-react';

interface ModuleData {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  area: string;
  power: string;
  interfaces: string[];
  description: string;
}

const modules: ModuleData[] = [
  {
    id: 'cpu',
    name: 'CPU_Core',
    icon: Cpu,
    x: 180,
    y: 80,
    width: 220,
    height: 160,
    color: '#00D4FF',
    area: '0.85 mm²',
    power: '4.2 W',
    interfaces: ['AXI4', 'AHB', 'Clock', 'Reset'],
    description: '四核RISC-V处理器，支持RV64GC指令集，最高主频1.2GHz。',
  },
  {
    id: 'memory',
    name: 'Memory_Controller',
    icon: Database,
    x: 420,
    y: 80,
    width: 180,
    height: 160,
    color: '#7C3AED',
    area: '0.42 mm²',
    power: '1.8 W',
    interfaces: ['DDR4', 'AXI4', 'APB'],
    description: '双通道DDR4内存控制器，支持最高3200MHz数据速率。',
  },
  {
    id: 'gpu',
    name: 'GPU_Cluster',
    icon: Monitor,
    x: 180,
    y: 260,
    width: 220,
    height: 160,
    color: '#10B981',
    area: '0.95 mm²',
    power: '3.5 W',
    interfaces: ['AXI4-Stream', 'PCIe', 'DisplayPort'],
    description: '嵌入式GPU集群，支持OpenGL ES 3.2和Vulkan 1.1。',
  },
  {
    id: 'io',
    name: 'IO_Interface',
    icon: Wifi,
    x: 40,
    y: 80,
    width: 120,
    height: 340,
    color: '#F59E0B',
    area: '0.38 mm²',
    power: '0.8 W',
    interfaces: ['USB3.0', 'Ethernet', 'UART', 'SPI', 'I2C'],
    description: '多功能IO接口模块，支持多种标准通信协议。',
  },
  {
    id: 'clock',
    name: 'Clock_Gen',
    icon: Clock,
    x: 420,
    y: 260,
    width: 180,
    height: 160,
    color: '#EC4899',
    area: '0.15 mm²',
    power: '0.5 W',
    interfaces: ['PLL', 'Clock Distribution', 'Power Management'],
    description: '高精度时钟生成模块，支持多时钟域和动态电压调节。',
  },
];

const connections = [
  { from: 'io', to: 'cpu', label: 'AXI4' },
  { from: 'cpu', to: 'memory', label: 'AXI4' },
  { from: 'cpu', to: 'gpu', label: 'AXI4-Stream' },
  { from: 'memory', to: 'gpu', label: 'Direct' },
  { from: 'clock', to: 'cpu', label: 'Clock' },
  { from: 'clock', to: 'memory', label: 'Clock' },
  { from: 'clock', to: 'gpu', label: 'Clock' },
  { from: 'clock', to: 'io', label: 'Clock' },
];

export default function ArchitecturePage() {
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);

  const getModuleCenter = (module: ModuleData) => ({
    x: module.x + module.width / 2,
    y: module.y + module.height / 2,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">芯片架构</h1>
          <p className="text-muted text-sm mt-1">Chip Architecture | ChipFlow SoC v1.0</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-lg text-sm">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            架构已锁定
          </div>
        </div>
      </motion.div>

      <div className="flex gap-6">
        {/* 架构图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">模块架构图</h2>
            <div className="flex items-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-accent" />
                <span>计算单元</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-accent-purple" />
                <span>存储单元</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-success" />
                <span>加速单元</span>
              </div>
            </div>
          </div>
          <div className="h-[500px] relative">
            <svg viewBox="0 0 650 460" className="w-full h-full">
              {/* 背景网格 */}
              <defs>
                <pattern id="archGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#27272A" strokeWidth="0.5" />
                </pattern>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#71717A" />
                </marker>
              </defs>
              
              {/* 网格背景 */}
              <rect x="0" y="0" width="650" height="460" fill="url(#archGrid)" />
              
              {/* 连接线 */}
              {connections.map((conn, index) => {
                const fromModule = modules.find(m => m.id === conn.from)!;
                const toModule = modules.find(m => m.id === conn.to)!;
                const fromCenter = getModuleCenter(fromModule);
                const toCenter = getModuleCenter(toModule);
                
                return (
                  <g key={index}>
                    <motion.line
                      x1={fromCenter.x}
                      y1={fromCenter.y}
                      x2={toCenter.x}
                      y2={toCenter.y}
                      stroke="#71717A"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      markerEnd="url(#arrowhead)"
                    />
                    <text
                      x={(fromCenter.x + toCenter.x) / 2}
                      y={(fromCenter.y + toCenter.y) / 2 - 8}
                      textAnchor="middle"
                      fill="#71717A"
                      fontSize="10"
                    >
                      {conn.label}
                    </text>
                  </g>
                );
              })}
              
              {/* 模块 */}
              {modules.map((module, index) => (
                <motion.g
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => setSelectedModule(module)}
                  className="cursor-pointer"
                >
                  {/* 模块背景 */}
                  <rect
                    x={module.x}
                    y={module.y}
                    width={module.width}
                    height={module.height}
                    rx="12"
                    fill={`${module.color}15`}
                    stroke={selectedModule?.id === module.id ? module.color : `${module.color}60`}
                    strokeWidth={selectedModule?.id === module.id ? 2 : 1}
                    className="hover:opacity-80 transition-all"
                  />
                  
                  {/* 模块内容 */}
                  <g>
                    {/* 图标 */}
                    <rect
                      x={module.x + 16}
                      y={module.y + 16}
                      width={40}
                      height={40}
                      rx="8"
                      fill={`${module.color}20`}
                    />
                    <foreignObject
                      x={module.x + 24}
                      y={module.y + 24}
                      width={24}
                      height={24}
                    >
                      <div style={{ color: module.color }}>
                        <module.icon className="w-6 h-6" />
                      </div>
                    </foreignObject>
                    
                    {/* 名称 */}
                    <text
                      x={module.x + module.width / 2}
                      y={module.y + 75}
                      textAnchor="middle"
                      fill="#E4E4E7"
                      fontSize="14"
                      fontWeight="600"
                    >
                      {module.name}
                    </text>
                    
                    {/* 面积 */}
                    <text
                      x={module.x + module.width / 2}
                      y={module.y + 98}
                      textAnchor="middle"
                      fill="#71717A"
                      fontSize="11"
                    >
                      {module.area}
                    </text>
                    
                    {/* 功耗 */}
                    <text
                      x={module.x + module.width / 2}
                      y={module.y + 115}
                      textAnchor="middle"
                      fill="#71717A"
                      fontSize="11"
                    >
                      {module.power}
                    </text>
                  </g>
                  
                  {/* 选中效果 */}
                  {selectedModule?.id === module.id && (
                    <motion.rect
                      x={module.x - 4}
                      y={module.y - 4}
                      width={module.width + 8}
                      height={module.height + 8}
                      rx="16"
                      fill="none"
                      stroke={module.color}
                      strokeWidth="2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.g>
              ))}
              
              {/* 芯片标签 */}
              <text x="325" y="445" textAnchor="middle" fill="#71717A" fontSize="12">
                ChipFlow SoC v1.0 | 5模块架构
              </text>
            </svg>
          </div>
        </motion.div>

        {/* 详情面板 */}
        <AnimatePresence>
          {selectedModule ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="w-80 bg-card rounded-xl border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${selectedModule.color}20`, color: selectedModule.color }}
                  >
                    <selectedModule.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{selectedModule.name}</h3>
                    <p className="text-xs text-muted">模块详情</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="p-2 hover:bg-card-hover rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                {/* 描述 */}
                <div>
                  <p className="text-xs text-muted mb-2">描述</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {selectedModule.description}
                  </p>
                </div>

                {/* 指标 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <HardDrive className="w-4 h-4 text-accent" />
                      <span className="text-xs text-muted">面积</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{selectedModule.area}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-warning" />
                      <span className="text-xs text-muted">功耗</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{selectedModule.power}</p>
                  </div>
                </div>

                {/* 接口 */}
                <div>
                  <p className="text-xs text-muted mb-2">接口</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedModule.interfaces.map((iface) => (
                      <span
                        key={iface}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent"
                      >
                        {iface}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-card-hover hover:bg-border rounded-lg text-sm text-foreground transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    查看详情
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-80 bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted/10 flex items-center justify-center mb-4">
                <Cpu className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">选择模块</h3>
              <p className="text-sm text-muted">点击架构图中的模块查看详细信息</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 模块列表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">模块概览</h2>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={() => setSelectedModule(module)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedModule?.id === module.id
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50 bg-background'
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${module.color}20`, color: module.color }}
              >
                <module.icon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">{module.name}</h4>
              <p className="text-xs text-muted">{module.area}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}