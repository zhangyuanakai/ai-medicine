// api/chatService.ts
export const chatService = {
  // 流式聊天
  async streamChat(
    message: string,
    onChunk: (chunk: string) => void,
    signal?: AbortSignal,
  ) {
    // 模拟流式响应
    const mockResponses = [
      "您好！",
      "我是AI助手，",
      "很高兴为您服务。",
      "您的问题是：",
      message,
      "\n\n让我来帮您解答...",
      "\n\n## 药物信息",
      "\n\n以下是一些常用药物的信息：",
      "\n\n| 药物名称 | 用途 | 剂量 | 注意事项 |\n",
      "|---------|------|------|----------|\n",
      "| 阿司匹林 | 解热镇痛 | 100mg/次 | 饭后服用 |\n",
      "| 布洛芬 | 抗炎镇痛 | 200mg/次 | 不宜长期使用 |\n",
      "| 对乙酰氨基酚 | 退烧止痛 | 500mg/次 | 肝功能不全者慎用 |",
      "\n\n## 药物结构图",
      "\n\n![药物结构](https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=200&fit=crop)",
      "\n\n## 使用建议",
      "\n\n1. 严格按照医嘱用药",
      "2. 注意药物相互作用",
      "3. 定期复查身体指标",
      "4. 出现不良反应及时就医",
      "\n\n希望这对您有帮助！",
    ];

    try {
      for (const chunk of mockResponses) {
        // 检查是否被中断
        if (signal?.aborted) {
          throw new Error("AbortError");
        }

        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, 100));

        onChunk(chunk);
      }
    } catch (error) {
      if (error instanceof Error && error.message === "AbortError") {
        throw new Error("AbortError");
      }
      throw error;
    }
  },

  // 普通聊天（非流式）
  async chat(message: string) {
    // 模拟响应
    return {
      message: `这是对"${message}"的模拟回复`,
      timestamp: new Date().toISOString(),
    };
  },
};
