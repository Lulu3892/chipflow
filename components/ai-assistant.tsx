'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isTyping?: boolean;
}

const quickQuestions = [
  {
    id: 'timing',
    label: '分析时序瓶颈',
    response: '根据当前STA数据，逻辑综合阶段存在12个Setup违例，主要集中在CPU_Core模块。建议：1)优化ALU关键路径 2)插入缓冲器 3)调整时钟树。最差路径WNS为-0.12ns，需重点关注。',
  },
  {
    id: 'schedule',
    label: '预测流片时间',
    response: '基于当前44%进度，预计还需86个工作日。风险：物理设计DRC违例较多，可能延期2周。建议：增加DRC修复资源，并行进行布局优化。',
  },
  {
    id: 'power',
    label: '优化功耗建议',
    response: '当前芯片总功耗约12.5W，其中动态功耗占65%。优化建议：1)门控时钟覆盖率提升至90% 2)降低非关键路径电压 3)优化SRAM读写策略。预计可降低功耗15-20%。',
  },
  {
    id: 'coverage',
    label: '覆盖率分析报告',
    response: '功能验证覆盖率87%，主要缺口在：1)边界条件测试(72%) 2)异常路径测试(68%) 3)低功耗模式测试(75%)。建议补充约300个测试用例，重点覆盖上述领域。',
  },
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是ChipFlow AI助手，可以帮你分析芯片设计数据、预测进度、提供优化建议。',
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    const typingMessageId = `typing-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: typingMessageId, content: '', isUser: false, isTyping: true },
    ]);

    let currentText = '';
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId ? { ...msg, content: currentText } : msg
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === typingMessageId ? { ...msg, isTyping: false } : msg
      )
    );
    setIsTyping(false);
  };

  const handleQuickQuestion = async (question: typeof quickQuestions[0]) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, content: question.label, isUser: true },
    ]);
    await simulateTyping(question.response);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, content: inputValue.trim(), isUser: true },
    ]);
    setInputValue('');

    const responses = [
      '收到！让我分析一下你的问题...',
      '正在查询相关数据，请稍候...',
      '好的，基于当前项目数据，我来为你分析。',
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await simulateTyping(randomResponse);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 浮动按钮 */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center shadow-glow-blue hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-shadow z-40"
      >
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
      </motion.button>

      {/* AI面板 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* 面板内容 */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-10 right-4 bottom-4 w-[420px] max-w-[90vw] bg-card border border-border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* 头部 */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">ChipFlow AI</h2>
                    <p className="text-xs text-muted">智能芯片设计助手</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-card-hover transition-colors"
                >
                  <X className="w-5 h-5 text-muted" />
                </motion.button>
              </div>

              {/* 快捷问题 */}
              <div className="px-4 py-4 border-b border-border">
                <p className="text-xs text-muted mb-3">快捷问题</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={question.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickQuestion(question)}
                      className="p-3 bg-background border border-border rounded-lg text-left hover:border-accent hover:bg-accent/5 transition-colors"
                    >
                      <p className="text-sm font-medium text-foreground">{question.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] ${
                          message.isUser
                            ? 'bg-accent/10 text-foreground rounded-2xl rounded-tr-sm'
                            : 'bg-background border-l-2 border-accent text-foreground rounded-2xl rounded-tl-sm'
                        } px-4 py-3`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                          {message.isTyping && (
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              ...
                            </motion.span>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* 输入框 */}
              <div className="px-4 py-4 border-t border-border">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <MessageSquare className="absolute left-3 bottom-3 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="输入问题..."
                      disabled={isTyping}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 disabled:opacity-50 transition-all"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-3 bg-gradient-to-br from-accent to-accent-purple rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow-blue transition-shadow"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}