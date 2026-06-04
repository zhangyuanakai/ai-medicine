import React, { useEffect, useState, useRef } from "react";
import {
  FiSend,
  FiSun,
  FiMoon,
  FiPlus,
  FiTrash2,
  FiSettings,
} from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./AiMedicine.scss";
import { chatService } from "@/api/chatService";

const FiSendIcon = FiSend as unknown as React.FC;
const SettingsIcon = FiSettings as unknown as React.FC;
const FiMoonIcon = FiMoon as unknown as React.FC;
const FiSunIcon = FiSun as unknown as React.FC;
const FiTrash2Icon = FiTrash2 as unknown as React.FC;
const FiPlusIcon = FiPlus as unknown as React.FC;
interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

const AiMedicine = () => {
  const [inputValue, setInputValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const markdownBufferRef = useRef<string>("");
  const isInTableRef = useRef<boolean>(false);
  console.log(streamingMessageId);
  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const startNewChat = () => {
    // 取消当前正在进行的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setInputValue("");
    setStreamingMessageId(null);
    setIsLoading(false);
    markdownBufferRef.current = "";
    isInTableRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    const userMessage = inputValue.trim();
    if (!userMessage || isLoading) return;

    // 创建用户消息
    const userMessageObj: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    // 创建助手消息占位符
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessageObj: Message = {
      id: assistantMessageId,
      sender: "assistant",
      text: "",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessageObj, assistantMessageObj]);
    setInputValue("");
    setIsLoading(true);
    setStreamingMessageId(assistantMessageId);

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController();

    let accumulatedText = "";

    try {
      // 调用真实 API，传入 AbortController 的 signal
      await chatService.streamChat(
        userMessage,
        (chunk) => {
          const lines = chunk.split('\n');
          const hasTableMarker = lines.some(line => line.trim().startsWith('|'));
          const hasEmptyLine = chunk.includes('\n\n');

          // 如果不在表格中，且chunk包含表格标记，开始缓冲表格
          if (!isInTableRef.current && hasTableMarker) {
            isInTableRef.current = true;
            markdownBufferRef.current += chunk;
          }
          // 如果在表格中，且chunk仍包含表格标记，继续缓冲
          else if (isInTableRef.current && hasTableMarker && !hasEmptyLine) {
            markdownBufferRef.current += chunk;
          }
          // 如果在表格中，但chunk不包含表格标记或有空行，表格结束
          else if (isInTableRef.current) {
            accumulatedText += markdownBufferRef.current;
            markdownBufferRef.current = "";
            isInTableRef.current = false;
            accumulatedText += chunk;
          }
          // 不在表格中，直接添加
          else {
            accumulatedText += chunk;
          }

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, text: accumulatedText + markdownBufferRef.current }
                : msg,
            ),
          );
        },
        abortControllerRef.current?.signal, // 支持中断
      );

      // 流式完成，输出剩余缓冲内容
      if (markdownBufferRef.current) {
        accumulatedText += markdownBufferRef.current;
        markdownBufferRef.current = "";
        isInTableRef.current = false;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, text: accumulatedText }
              : msg,
          ),
        );
      }

      setStreamingMessageId(null);
      setIsLoading(false);
    } catch (error) {
      // 处理中断错误
      if (error instanceof Error && error.name === "AbortError") {
        console.log("请求已取消");
        return;
      }
      console.error("流式请求失败:", error);
      // 更新错误消息
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, text: "抱歉，发生了错误，请重试。" }
            : msg,
        ),
      );
      setStreamingMessageId(null);
      setIsLoading(false);
      markdownBufferRef.current = "";
      isInTableRef.current = false;
    }
  };
  return (
    <div className={`app${isDarkMode ? "dark" : "light"}`}>
      {/* 侧边栏*/}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-circle"></div>
            <span>DeepSeek</span>
          </div>
          <button className="new-chat-btn" onClick={startNewChat}>
            <FiPlusIcon /> 新建对话
          </button>
        </div>

        <div className="chat-history">
          <div className="history-item active">
            <div className="history-title">新对话</div>
            <div className="history-time">今天</div>
          </div>
          <div className="history-item">
            <div className="history-title">关于React组件的问题</div>
            <div className="history-time">昨天</div>
          </div>
          <div className="history-item">
            <div className="history-title">前端开发最佳实践</div>
            <div className="history-time">2023-11-15</div>
          </div>
          <div className="history-item">
            <div className="history-title">CSS布局问题</div>
            <div className="history-time">2023-11-10</div>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="footer-btn">
            <FiTrash2Icon /> 清除对话
          </button>
          <button className="footer-btn">
            <SettingsIcon /> 设置
          </button>
        </div>
      </div>
      {/*  主聊天区域*/}
      <div className="main-content">
        <div className="chat-header">
          <div className="header-info">
            <h2>DeepSeek助手</h2>
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>在线</span>
            </div>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <FiSunIcon /> : <FiMoonIcon />}
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="avatar">
                {message.sender === "user" ? (
                  <div className="user-avatar">U</div>
                ) : (
                  <div className="assistant-avatar">
                    <div className="ai-icon">AI</div>
                  </div>
                )}
              </div>
              <div className="message-content">
                {message.sender === "assistant" ? (
                  <div className="message-text markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        img: ({ node, ...props }) => (
                          <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
                        ),
                        table: ({ node, ...props }) => (
                          <div style={{ overflowX: 'auto' }}>
                            <table {...props} />
                          </div>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="message-text">{message.text}</div>
                )}
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant">
              <div className="avatar">
                <div className="assistant-avatar">
                  <div className="ai-icon">AI</div>
                </div>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息..."
            rows={1}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
          >
            <FiSendIcon />
          </button>
        </div>

        <div className="chat-footer">
          <p>
            DeepSeek-R1 · 由深度求索公司开发 · {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiMedicine;
