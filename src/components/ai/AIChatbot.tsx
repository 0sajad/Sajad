
import React, { useState, useRef, useEffect } from "react";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send, Mic, MoreHorizontal, Download, Copy } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { useTranslation } from "react-i18next";
import { toast } from "../ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatbotProps {
  className?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ className }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('networkTools.networkTroubleshooting'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        t('networkTools.performanceTips'),
        t('networkTools.autoSupport'),
        t('securityStatus.title')
      ];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    setIsListening(!isListening);
    
    if (!isListening) {
      // This is a simulated voice input since we can't actually implement speech recognition here
      setTimeout(() => {
        setInput("My network connection is slow");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessageToClipboard = (message: string) => {
    navigator.clipboard.writeText(message);
    toast({
      title: "Copied to clipboard",
      description: "Message has been copied to clipboard.",
    });
  };

  return (
    <GlassCard className={`overflow-hidden p-0 h-[500px] flex flex-col ${className}`}>
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold">{t('networkTools.aiChatbot')}</h3>
        <p className="text-sm text-muted-foreground">{t('networkTools.networkTroubleshooting')}</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                <Avatar className={`h-8 w-8 ${message.sender === 'bot' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>
                  {message.sender === 'bot' ? 'AI' : 'U'}
                </Avatar>
                <div className="relative group">
                  <div className={`rounded-xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white ml-auto' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={`absolute ${message.sender === 'user' ? 'left-0' : 'right-0'} -top-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <Button size="icon" variant="ghost" onClick={() => copyMessageToClipboard(message.content)}>
                      <Copy size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 items-end max-w-[80%]">
                <Avatar className="h-8 w-8 bg-blue-100 text-blue-600">AI</Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef}></div>
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleVoiceInput}>
            <Mic className={isListening ? 'text-red-500' : ''} size={18} />
          </Button>
          <Input 
            placeholder={t('networkTools.networkTroubleshooting')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
