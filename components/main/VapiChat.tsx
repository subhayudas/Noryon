"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MessageCircle, 
  X,
  Send,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import Vapi from "@vapi-ai/web";
import PulsatingDots from "@/components/ui/PulsatingDots";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isTranscribing?: boolean;
}

const VapiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callConnected, setCallConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [publicApiKey, setPublicApiKey] = useState<string | null>(null);
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [voiceTime, setVoiceTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  // Load API keys on mount
  useEffect(() => {
    setIsClient(true);
    fetch("/api/vapi")
      .then((res) => res.json())
      .then((data) => {
        setPublicApiKey(data.publicApiKey);
        setAssistantId(data.assistantId);
        
        // Initialize Vapi SDK if keys are available
        if (data.publicApiKey && data.assistantId) {
          try {
            const vapi = new Vapi(data.publicApiKey);
            vapiRef.current = vapi;
            
            // Set up event listeners
            vapi.on("call-start", () => {
              setCallActive(true);
              setCallConnected(true);
              setVoiceTime(0);
            });
            
            vapi.on("call-end", () => {
              setCallActive(false);
              setCallConnected(false);
              setVoiceTime(0);
            });
            
            vapi.on("speech-start", () => {
              const message: Message = {
                id: `speech-${Date.now()}`,
                text: "Assistant is speaking...",
                sender: "assistant",
                timestamp: new Date(),
                isTranscribing: true,
              };
              setMessages((prev) => [...prev, message]);
            });
            
            vapi.on("speech-end", () => {
              setMessages((prev) => 
                prev.map((msg) => 
                  msg.isTranscribing 
                    ? { ...msg, isTranscribing: false }
                    : msg
                )
              );
            });
            
            vapi.on("message", (data: any) => {
              const message: Message = {
                id: Date.now().toString(),
                text: data.content || data.message || data.text || "Received message",
                sender: "assistant",
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, message]);
            });
            
            vapi.on("error", (error: any) => {
              console.error("Vapi error:", error);
              const errorMessage: Message = {
                id: Date.now().toString(),
                text: "An error occurred. Please try again.",
                sender: "assistant",
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, errorMessage]);
            });
          } catch (error) {
            console.error("Failed to initialize Vapi:", error);
          }
        }
      })
      .catch((err) => console.error("Failed to load Vapi config:", err));
    
    // Initialize Web Speech API for voice recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        
        if (event.results[event.results.length - 1].isFinal) {
          setInputMessage(transcript);
          recognition.stop();
          setIsRecording(false);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis;
    }
    
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Voice timer effect - only start when call is actually connected
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (callConnected) {
      intervalId = setInterval(() => {
        setVoiceTime((t) => t + 1);
      }, 1000);
    } else {
      setVoiceTime(0);
    }
    return () => clearInterval(intervalId);
  }, [callConnected]);

  // Prevent body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Store scroll position for restoration
      return () => {
        const body = document.body;
        const top = body.style.top;
        
        // Restore body scroll
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        
        // Restore scroll position
        if (top) {
          window.scrollTo(0, parseInt(top || '0') * -1);
        }
      };
    } else {
      // Cleanup when closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive or when streaming
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputMessage;
    setInputMessage("");
    adjustHeight(true);
    setIsLoading(true);

    // Create a placeholder message for the assistant's streaming response
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      text: "",
      sender: "assistant",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // Build conversation history for OpenAI (last 10 messages to keep context)
      const recentMessages = messages.slice(-10).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      // Send message to OpenAI API with streaming
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          messages: recentMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.error) {
                throw new Error(parsed.error);
              }

              if (parsed.content) {
                fullText += parsed.content;
                // Update the message with streaming content
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, text: fullText }
                      : msg
                  )
                );
                // Scroll to bottom during streaming
                setTimeout(() => {
                  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 0);
              }
            } catch (e) {
              // Skip invalid JSON or parsing errors
              if (e instanceof Error && e.message.includes('error')) {
                throw e;
              }
            }
          }
        }
      }

      // Final update to ensure the message is complete
      if (fullText.trim() === "") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, text: "Thank you for your message! I'm processing your request." }
              : msg
          )
        );
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                text: error.message?.includes('Failed') 
                  ? "I apologize, but I'm having trouble connecting right now. Please try again."
                  : `I apologize, but an error occurred: ${error.message || 'Unknown error'}. Please try again.`,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    handleSendMessage();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleContainerClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const startVoiceCall = async () => {
    if (!publicApiKey || !assistantId) {
      alert("Vapi configuration not loaded. Please refresh the page.");
      return;
    }

    if (!vapiRef.current) {
      alert("Vapi SDK not initialized. Please refresh the page.");
      return;
    }

      try {
        setIsLoading(true);
        // Reset connection state
        setCallConnected(false);
        setVoiceTime(0);
        
        const result = await vapiRef.current.start(assistantId);
        
        if (result) {
          // Call started, but wait for call-start event to set callConnected
          setCallActive(true);
        } else {
          throw new Error("Failed to start call - no result returned");
        }
      } catch (error: any) {
        console.error("Error starting voice call:", error);
        alert("Failed to start voice call: " + (error.message || "Unknown error"));
        setCallActive(false);
        setCallConnected(false);
        setVoiceTime(0);
      } finally {
        setIsLoading(false);
      }
  };

  const stopVoiceCall = async () => {
    if (vapiRef.current) {
      try {
        await vapiRef.current.stop();
      } catch (error) {
        console.error("Error ending call:", error);
      }
    }
    setCallActive(false);
    setCallConnected(false);
    setVoiceTime(0);
  };

  const handleVoiceClick = () => {
    if (callActive) {
      stopVoiceCall();
    } else {
      startVoiceCall();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      )}

      {/* Chat Window with Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />
            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed bottom-6 right-6 z-50 h-[600px] w-[500px] max-w-[calc(100vw-2rem)] rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col overflow-hidden"
            >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-3 w-3 rounded-full",
                  callActive ? "bg-green-500 animate-pulse" : "bg-gray-400"
                )} />
                <h3 className="text-gray-900 dark:text-white font-semibold">AI Assistant</h3>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin text-sky-500" />}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages - Hidden during voice chat */}
            {!callActive && (
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain"
                style={{ 
                  maxHeight: 'calc(600px - 180px)',
                  WebkitOverflowScrolling: 'touch',
                  touchAction: 'pan-y'
                }}
                onWheel={(e) => {
                  // Prevent wheel events from propagating to body
                  e.stopPropagation();
                }}
                onTouchMove={(e) => {
                  // Prevent touch events from propagating to body
                  e.stopPropagation();
                }}
              >
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                    <MessageCircle className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-center">
                      Start a conversation with our AI assistant.
                      <br />
                      You can chat via text or voice!
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2",
                          message.sender === "user"
                            ? "bg-sky-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                          message.isTranscribing && "opacity-70"
                        )}
                      >
                        {message.text ? (
                          message.sender === "assistant" ? (
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                  ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 ml-2">{children}</ul>,
                                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 ml-2">{children}</ol>,
                                  li: ({ children }) => <li className="ml-4 leading-relaxed">{children}</li>,
                                  strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>,
                                  em: ({ children }) => <em className="italic">{children}</em>,
                                  code: ({ inline, children }) => {
                                    return inline ? (
                                      <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono text-gray-900 dark:text-gray-100">
                                        {children}
                                      </code>
                                    ) : (
                                      <pre className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto my-2 border border-gray-300 dark:border-gray-600">
                                        <code className="text-xs font-mono text-gray-900 dark:text-gray-100 block">
                                          {children}
                                        </code>
                                      </pre>
                                    );
                                  },
                                  pre: ({ children }) => <div className="my-2">{children}</div>,
                                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0 text-gray-900 dark:text-gray-100">{children}</h1>,
                                  h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0 text-gray-900 dark:text-gray-100">{children}</h2>,
                                  h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-2 first:mt-0 text-gray-900 dark:text-gray-100">{children}</h3>,
                                  h4: ({ children }) => <h4 className="text-sm font-semibold mb-1 mt-2 first:mt-0 text-gray-900 dark:text-gray-100">{children}</h4>,
                                  blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-2 text-gray-700 dark:text-gray-300">{children}</blockquote>,
                                  a: ({ href, children }) => <a href={href} className="text-sky-600 dark:text-sky-400 underline hover:text-sky-700 dark:hover:text-sky-300" target="_blank" rel="noopener noreferrer">{children}</a>,
                                  hr: () => <hr className="my-3 border-gray-300 dark:border-gray-600" />,
                                  table: ({ children }) => <div className="overflow-x-auto my-2"><table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">{children}</table></div>,
                                  thead: ({ children }) => <thead className="bg-gray-100 dark:bg-gray-700">{children}</thead>,
                                  tbody: ({ children }) => <tbody>{children}</tbody>,
                                  tr: ({ children }) => <tr className="border-b border-gray-200 dark:border-gray-600">{children}</tr>,
                                  th: ({ children }) => <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">{children}</th>,
                                  td: ({ children }) => <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100">{children}</td>,
                                }}
                              >
                                {message.text}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          )
                        ) : (
                          <div className="py-2">
                            <PulsatingDots />
                          </div>
                        )}
                        {message.isTranscribing && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="h-1 w-1 bg-sky-400 rounded-full animate-bounce" />
                            <div className="h-1 w-1 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            <div className="h-1 w-1 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                          </div>
                        )}
                        {message.text && (
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Area - Switch between Text and Voice UI */}
            {!callActive ? (
              /* AI Input Search Design */
              <div className="w-full py-4 px-4 border-t border-gray-200 dark:border-gray-700">
                <div className="relative max-w-xl w-full mx-auto">
                  <div
                    role="textbox"
                    tabIndex={0}
                    aria-label="Search input container"
                    className={cn(
                      "relative flex flex-col rounded-xl transition-all duration-200 w-full text-left cursor-text",
                      "ring-1 ring-black/10 dark:ring-white/10",
                      isFocused && "ring-black/20 dark:ring-white/20"
                    )}
                    onClick={handleContainerClick}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleContainerClick();
                      }
                    }}
                  >
                    <div className="overflow-y-auto max-h-[200px]">
                      <Textarea
                        id="ai-input-04"
                        value={inputMessage}
                        placeholder="Search the web..."
                        className="w-full rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]"
                        ref={textareaRef}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                        onChange={(e) => {
                          setInputMessage(e.target.value);
                          adjustHeight();
                        }}
                      />
                    </div>
                    <div className="h-12 bg-black/5 dark:bg-white/5 rounded-b-xl">
                      <div className="absolute left-3 bottom-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleVoiceClick}
                          disabled={isLoading || !publicApiKey || !assistantId}
                          className={cn(
                            "rounded-full transition-all flex items-center gap-2 px-1.5 py-1 border h-8 cursor-pointer",
                            "bg-black/5 dark:bg-white/5 border-transparent text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white",
                            (isLoading || !publicApiKey || !assistantId) && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <Mic className="w-4 h-4" />
                          <span className="text-sm">Voice</span>
                        </button>
                      </div>
                      <div className="absolute right-3 bottom-3">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className={cn(
                            "rounded-lg p-2 transition-colors",
                            inputMessage
                              ? "bg-sky-500/15 text-sky-500"
                              : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white cursor-pointer"
                          )}
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* AI Voice Design */
              <div className="w-full py-4 px-4 border-t border-gray-200 dark:border-gray-700">
                <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
                  <button
                    className={cn(
                      "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
                      callActive
                        ? "bg-none"
                        : "bg-none hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                    type="button"
                    onClick={handleVoiceClick}
                    disabled={isLoading}
                  >
                    {callActive ? (
                      <div
                        className="w-6 h-6 rounded-sm animate-spin bg-black dark:bg-white cursor-pointer pointer-events-auto"
                        style={{ animationDuration: "3s" }}
                      />
                    ) : (
                      <Mic className="w-6 h-6 text-black/90 dark:text-white/90" />
                    )}
                  </button>

                  <span
                    className={cn(
                      "font-mono text-sm transition-opacity duration-300",
                      callActive
                        ? "text-black/70 dark:text-white/70"
                        : "text-black/30 dark:text-white/30"
                    )}
                  >
                    {formatTime(voiceTime)}
                  </span>

                  <div className="h-4 w-64 flex items-center justify-center gap-0.5">
                    {[...Array(48)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-0.5 rounded-full transition-all duration-300",
                          callActive
                            ? "bg-black/50 dark:bg-white/50 animate-pulse"
                            : "bg-black/10 dark:bg-white/10 h-1"
                        )}
                        style={
                          callActive && isClient
                            ? {
                                height: `${20 + Math.random() * 80}%`,
                                animationDelay: `${i * 0.05}s`,
                              }
                            : undefined
                        }
                      />
                    ))}
                  </div>

                  <p className="h-4 text-xs text-black/70 dark:text-white/70">
                    {callActive ? "Listening..." : "Click to speak"}
                  </p>
                </div>
              </div>
            )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VapiChat;
