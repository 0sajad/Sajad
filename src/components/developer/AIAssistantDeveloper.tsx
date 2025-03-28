
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Send, 
  Upload, 
  Code, 
  FileCode, 
  Settings, 
  PanelLeft, 
  PanelRight,
  Sparkles,
  Zap,
  RefreshCw,
  Download,
  Globe,
  Coffee
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export function AIAssistantDeveloper() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to the Developer AI Assistant. I can help you with development tasks, tool creation, and system optimization. What would you like to do today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [activeTool, setActiveTool] = useState("chat");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const tools = [
    { id: "chat", name: "Chat", icon: <Brain className="h-4 w-4" /> },
    { id: "code", name: "Code Generator", icon: <Code className="h-4 w-4" /> },
    { id: "tools", name: "Tool Creator", icon: <Settings className="h-4 w-4" /> },
    { id: "files", name: "File Analysis", icon: <FileCode className="h-4 w-4" /> }
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsThinking(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      let responseContent = "";
      
      if (activeTool === "chat") {
        responseContent = "I've processed your request and I'm here to help with any development needs. Would you like me to create a new network tool, optimize existing features, or assist with code generation?";
      } else if (activeTool === "code") {
        responseContent = "Here's a code snippet based on your request:\n\n```typescript\nconst optimizeNetwork = async () => {\n  // Analyze current network state\n  const networkStatus = await getNetworkStatus();\n  \n  // Apply optimizations\n  if (networkStatus.latency > 100) {\n    await applyLatencyOptimizations();\n  }\n  \n  // Return results\n  return {\n    optimized: true,\n    improvements: {\n      latency: '-35%',\n      throughput: '+22%'\n    }\n  };\n};\n```";
      } else if (activeTool === "tools") {
        responseContent = "I've created a new network analysis tool based on your specifications. It's now available in the Tools section. The tool provides real-time analysis of network traffic patterns and can automatically identify potential bottlenecks.";
      } else if (activeTool === "files") {
        responseContent = "I've analyzed the uploaded files and found several opportunities for optimization:\n\n1. Network configuration can be improved to reduce latency by 15%\n2. Security protocols can be enhanced with minimal performance impact\n3. Data compression algorithms can be updated to the latest standards";
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    // Simulate file upload and processing
    setTimeout(() => {
      const fileNames = Array.from(files).map(file => file.name).join(", ");
      
      const uploadMessage: Message = {
        id: Date.now().toString(),
        role: "system",
        content: `Files uploaded: ${fileNames}`,
        timestamp: new Date()
      };
      
      setMessages([...messages, uploadMessage]);
      setUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      toast({
        title: "Files Uploaded",
        description: `Successfully uploaded ${files.length} file(s)`,
      });
    }, 1000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat cleared. How can I assist you with development today?",
        timestamp: new Date()
      }
    ]);
  };

  // Scroll to bottom whenever messages change
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            <span className="text-blue-800">Developer AI Assistant</span>
            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
              v2.5
            </Badge>
          </CardTitle>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={clearChat}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-12 h-[600px]">
          {/* Left sidebar with tools */}
          <div className="col-span-3 border-r">
            <div className="p-4">
              <h3 className="font-medium text-sm mb-3 text-gray-500 uppercase">Tools</h3>
              <div className="space-y-1">
                {tools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant={activeTool === tool.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTool(tool.id)}
                  >
                    {tool.icon}
                    <span className="ml-2">{tool.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="p-4">
              <h3 className="font-medium text-sm mb-3 text-gray-500 uppercase">AI Models</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm">OctaGPT-4</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm">Network Specialist</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Available</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm">Multi-language</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Available</Badge>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="p-4">
              <h3 className="font-medium text-sm mb-3 text-gray-500 uppercase">Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Conversation
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleFileUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelected}
                    className="hidden"
                    multiple
                  />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main chat area */}
          <div className="col-span-9 flex flex-col h-full">
            <div className="flex-1 overflow-auto p-4">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === "user"
                            ? "bg-blue-500 text-white"
                            : msg.role === "system"
                            ? "bg-gray-200 text-gray-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        <div
                          className={`text-xs mt-1 ${
                            msg.role === "user" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>
            </div>
            
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder={`${activeTool === 'chat' ? 'Message the AI Assistant...' : 
                    activeTool === 'code' ? 'Describe the code you need...' : 
                    activeTool === 'tools' ? 'Describe a new tool to create...' : 
                    'Ask about the uploaded files...'}`}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isThinking || uploading}
                  className="flex-1"
                />
                
                <Button onClick={sendMessage} disabled={isThinking || !inputMessage.trim() || uploading}>
                  <Send className="h-4 w-4" />
                </Button>
                
                {activeTool === "files" && (
                  <Button variant="outline" onClick={handleFileUpload} disabled={uploading}>
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-500 flex items-center">
                  <Coffee className="h-3 w-3 mr-1" />
                  <span>AI is continuously learning and improving</span>
                </div>
                
                <div>
                  <Badge variant="outline" className="text-xs">
                    {activeTool === 'chat' ? 'Chat Mode' : 
                     activeTool === 'code' ? 'Code Generation' : 
                     activeTool === 'tools' ? 'Tool Creation' : 
                     'File Analysis'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
