'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatWidgetProps {
  isVisible: boolean;
  onExit: () => void;
}

export function ChatWidget({ isVisible, onExit }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsMounted(true);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(false);
    }
  }, [isVisible]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversation = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversation,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        let done = false;
        
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          
          if (value) {
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n'); // Corrected: Changed from \\n to \n
            buffer = lines.pop() || '';
            
            for (const line of lines) {
              if (line.trim().startsWith('data: ')) {
                const data = line.slice(6).trim();
                if (data === '[DONE]') {
                  done = true;
                  break;
                }
                if (data) {
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.content) {
                      setMessages(prevMessages =>
                        prevMessages.map((msg, index) => {
                          if (index === prevMessages.length - 1 && msg.role === 'assistant') {
                            return { ...msg, content: msg.content + parsed.content };
                          }
                          return msg;
                        })
                      );
                    }
                  } catch (e) {
                    console.warn('Failed to parse chunk:', data, e);
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Sorry, I encountered an error. Please try again.',
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      if (isVisible && inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isVisible && !isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center p-4 bg-black/70 z-[100]",
        "transition-opacity duration-300 ease-out",
        isMounted && isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "rounded-2xl bg-background backdrop-blur-lg shadow-2xl w-full sm:max-w-2xl lg:max-w-[60vw] h-full max-h-[90vh] sm:max-h-96 lg:max-h-[70vh] overflow-hidden ring-4 dark:ring-neutral-700 ring-black dark:hover:ring-neutral-600 hover:ring-black transition-all duration-1000 flex flex-col",
          "font-mono text-sm",
          "transition-all duration-300 ease-out",
          isMounted && isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Header */}
        <div className="bg-muted/50 p-2 pr-3 flex justify-between items-center border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2 px-1">
            <div className="size-3 rounded-full bg-red-500"></div>
            <div className="size-3 rounded-full bg-yellow-500"></div>
            <div className="size-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-muted-foreground">Chat with David's AI</span>
          </div>
          <Button
            variant="ghost"
            onClick={onExit}
            className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 h-auto"
          >
            Exit to Website
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 text-foreground">
          {messages.length === 0 && !isLoading && (
            <div className="text-muted-foreground">
              <p><span className="text-green-400 font-semibold">david-ai:</span> Hi! I'm David's AI assistant.</p>
              <p><span className="text-green-400 font-semibold">david-ai:</span> Ask me anything about his projects, experience, or skills!</p>
              <p><span className="text-green-400 font-semibold">david-ai:</span> Type your message below and press Enter.</p>
            </div>
          )}
          {messages.map((message) => (
            <div key={message.id} className="whitespace-pre-wrap leading-relaxed">
              <span
                className={cn(
                  "font-semibold",
                  message.role === 'user' ? "text-blue-400" : "text-green-400"
                )}
              >
                {message.role === 'user' ? 'you:' : 'david-ai:'}
              </span>
              <span className="ml-1">{message.content}</span>
            </div>
          ))}
          {isLoading && messages[messages.length -1]?.role !== 'assistant' && (
             <div className="whitespace-pre-wrap leading-relaxed">
              <span className="text-green-400 font-semibold">david-ai:</span>
              <span className="text-muted-foreground ml-1">typing</span>
              <span className="animate-pulse">...</span>
            </div>
          )}
           {isLoading && messages[messages.length -1]?.role === 'assistant' && messages[messages.length-1].content === '' && (
             <div className="whitespace-pre-wrap leading-relaxed">
              <span className="text-green-400 font-semibold">david-ai:</span>
              <span className="text-muted-foreground ml-1">typing</span>
              <span className="animate-pulse">...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2.5 border-t border-border flex items-center gap-2 flex-shrink-0 bg-muted/20">
          <span className="text-blue-400 font-semibold pl-1">you@prompt:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type here..."
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
