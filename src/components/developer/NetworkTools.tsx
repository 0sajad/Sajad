
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NetworkTool } from "@/components/network/NetworkTools";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Download, 
  Upload,
  EyeOff,
  Eye
} from "lucide-react";

// Import toolkits for AI assistant
import { useAIToolkit } from "@/hooks/useAIToolkit";

// أدوات الشبكة الحالية
const initialTools: NetworkTool[] = [
  {
    id: "wifi-analyzer",
    name: "WiFi Analyzer",
    description: "Analyze WiFi signals and channels to optimize wireless networks",
    icon: () => null,
    category: "diagnostic",
    isActive: true,
    isPremium: false
  },
  {
    id: "packet-sniffer",
    name: "Packet Sniffer",
    description: "Capture and analyze network packets for troubleshooting",
    icon: () => null,
    category: "diagnostic",
    isActive: true,
    isPremium: true
  },
  // صتضيف المزيد من الأدوات هنا...
];

export function NetworkToolsManager() {
  const { t } = useTranslation();
  const [tools, setTools] = useState<NetworkTool[]>(initialTools);
  const [editingTool, setEditingTool] = useState<NetworkTool | null>(null);
  const [newToolName, setNewToolName] = useState("");
  const [newToolDescription, setNewToolDescription] = useState("");
  const [newToolCategory, setNewToolCategory] = useState<"diagnostic" | "security" | "optimization" | "monitoring">("diagnostic");
  const [newToolIsPremium, setNewToolIsPremium] = useState(false);
  
  // استخدام أدوات الذكاء الاصطناعي
  const { generateToolIdea, generateToolDescription } = useAIToolkit();
  
  // إضافة أداة جديدة
  const handleAddTool = () => {
    if (!newToolName || !newToolDescription) return;
    
    const newTool: NetworkTool = {
      id: `tool-${Date.now()}`,
      name: newToolName,
      description: newToolDescription,
      icon: () => null,
      category: newToolCategory,
      isActive: true,
      isPremium: newToolIsPremium
    };
    
    setTools([...tools, newTool]);
    
    // إعادة تعيين الحقول
    setNewToolName("");
    setNewToolDescription("");
    setNewToolCategory("diagnostic");
    setNewToolIsPremium(false);
  };
  
  // حذف أداة
  const handleDeleteTool = (id: string) => {
    setTools(tools.filter(tool => tool.id !== id));
  };
  
  // بدء تحرير أداة
  const handleEditTool = (tool: NetworkTool) => {
    setEditingTool(tool);
  };
  
  // حفظ الأداة بعد التحرير
  const handleSaveTool = () => {
    if (!editingTool) return;
    
    setTools(tools.map(tool => 
      tool.id === editingTool.id ? editingTool : tool
    ));
    
    setEditingTool(null);
  };
  
  // إلغاء التحرير
  const handleCancelEdit = () => {
    setEditingTool(null);
  };
  
  // تبديل حالة تنشيط الأداة
  const handleToggleActive = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, isActive: !tool.isActive } : tool
    ));
  };
  
  // تبديل حالة أداة Premium
  const handleTogglePremium = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, isPremium: !tool.isPremium } : tool
    ));
  };
  
  // توليد فكرة أداة باستخدام الذكاء الاصطناعي
  const handleGenerateToolIdea = async () => {
    const idea = await generateToolIdea();
    setNewToolName(idea.name);
    setNewToolDescription(idea.description);
    setNewToolCategory(idea.category as any);
  };
  
  // تصدير أدوات الشبكة
  const handleExportTools = () => {
    const dataStr = JSON.stringify(tools, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `network-tools-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // استيراد أدوات الشبكة
  const handleImportTools = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTools = JSON.parse(e.target?.result as string);
        setTools(importedTools);
      } catch (error) {
        console.error("Error importing tools:", error);
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Tools Manager</CardTitle>
        <CardDescription>
          Manage network tools for client mode
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* إضافة أداة جديدة */}
        <div className="space-y-4 p-4 border rounded-md">
          <h3 className="text-md font-medium">Add New Tool</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tool-name">Tool Name</Label>
              <Input 
                id="tool-name" 
                placeholder="Enter tool name" 
                value={newToolName}
                onChange={(e) => setNewToolName(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tool-description">Description</Label>
              <Input 
                id="tool-description" 
                placeholder="Enter tool description" 
                value={newToolDescription}
                onChange={(e) => setNewToolDescription(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tool-category">Category</Label>
              <Select 
                value={newToolCategory} 
                onValueChange={(value: any) => setNewToolCategory(value)}
              >
                <SelectTrigger id="tool-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="optimization">Optimization</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="tool-premium">Premium Tool</Label>
              <Switch 
                id="tool-premium" 
                checked={newToolIsPremium} 
                onCheckedChange={setNewToolIsPremium} 
              />
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleGenerateToolIdea}>
                Generate with AI
              </Button>
              <Button onClick={handleAddTool}>
                <Plus className="h-4 w-4 mr-2" />
                Add Tool
              </Button>
            </div>
          </div>
        </div>
        
        {/* قائمة الأدوات الحالية */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => (
                <TableRow key={tool.id}>
                  {editingTool && editingTool.id === tool.id ? (
                    <>
                      <TableCell>
                        <Input 
                          value={editingTool.name}
                          onChange={(e) => setEditingTool({...editingTool, name: e.target.value})}
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={editingTool.category} 
                          onValueChange={(value: any) => setEditingTool({...editingTool, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diagnostic">Diagnostic</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="optimization">Optimization</SelectItem>
                            <SelectItem value="monitoring">Monitoring</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={editingTool.isActive} 
                          onCheckedChange={(checked) => setEditingTool({...editingTool, isActive: checked})} 
                        />
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={editingTool.isPremium} 
                          onCheckedChange={(checked) => setEditingTool({...editingTool, isPremium: checked})} 
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="sm" onClick={handleSaveTool}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{tool.name}</TableCell>
                      <TableCell>{tool.category}</TableCell>
                      <TableCell>
                        <Switch 
                          checked={tool.isActive} 
                          onCheckedChange={() => handleToggleActive(tool.id)} 
                        />
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={tool.isPremium} 
                          onCheckedChange={() => handleTogglePremium(tool.id)} 
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="sm" onClick={() => handleEditTool(tool)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteTool(tool.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleToggleActive(tool.id)}>
                            {tool.isActive ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* إجراءات إضافية */}
        <div className="flex justify-end space-x-2 rtl:space-x-reverse">
          <Button variant="outline" onClick={handleExportTools}>
            <Download className="h-4 w-4 mr-2" />
            Export Tools
          </Button>
          <div className="relative">
            <Button variant="outline" onClick={() => document.getElementById('import-tools')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import Tools
            </Button>
            <input 
              id="import-tools" 
              type="file" 
              accept=".json" 
              onChange={handleImportTools} 
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
