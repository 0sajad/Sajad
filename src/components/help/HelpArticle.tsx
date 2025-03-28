
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMode } from "@/context/ModeContext";
import { 
  ThumbsUp, 
  ThumbsDown, 
  Clock, 
  Calendar, 
  User, 
  Edit, 
  Save, 
  X, 
  Download, 
  Printer,
  Share2
} from "lucide-react";
import { useA11y } from "@/hooks/useA11y";
import { Textarea } from "@/components/ui/textarea";

interface HelpArticleProps {
  articleId: string;
}

export function HelpArticle({ articleId }: HelpArticleProps) {
  const { t } = useTranslation(['helpCenter']);
  const { isDeveloperMode } = useMode();
  const { announce } = useA11y();
  const [isEditing, setIsEditing] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const [editedContent, setEditedContent] = useState("");
  
  useEffect(() => {
    // محاكاة جلب بيانات المقالة
    const fetchArticle = async () => {
      // في الإصدار المستقبلي، سيتم استبدال هذا بالاتصال الفعلي بقاعدة البيانات
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // بيانات وهمية للمقالة
      const mockArticle = {
        id: articleId,
        title: getMockTitle(articleId),
        content: getMockContent(articleId),
        author: "Admin",
        createdAt: new Date(2023, 7, 15),
        updatedAt: new Date(2023, 10, 20),
        category: articleId.split('-')[0],
        likes: 45,
        dislikes: 3
      };
      
      setArticle(mockArticle);
      setEditedContent(mockArticle.content);
      announce(`Article loaded: ${mockArticle.title}`, "info");
    };
    
    fetchArticle();
  }, [articleId, announce]);
  
  // الحصول على العنوان الوهمي للمقالة
  const getMockTitle = (id: string) => {
    const titles: {[key: string]: string} = {
      "getting-started": "Getting Started Guide",
      "network-setup": "Network Setup",
      "troubleshooting": "Troubleshooting Common Issues",
      "wifi-optimization": "WiFi Signal Optimization",
      "security-best-practices": "Security Best Practices",
      "faq-connection": "Connection Problems",
      "faq-speed": "Speed Issues",
      "faq-security": "Security Questions",
      "faq-devices": "Device Compatibility",
      "faq-settings": "Settings Configuration",
      "video-setup": "Initial Setup Tutorial",
      "video-tools": "Network Tools Overview",
      "video-security": "Securing Your Network",
      "video-troubleshoot": "Troubleshooting Guide",
      "video-advanced": "Advanced Features",
      "api-docs": "API Documentation",
      "developer-guide": "Developer Guide",
      "plugin-development": "Plugin Development",
      "custom-tools": "Creating Custom Tools",
      "integration": "Integration Guide"
    };
    
    return titles[id] || "Article Title";
  };
  
  // الحصول على المحتوى الوهمي للمقالة
  const getMockContent = (id: string) => {
    return `
# ${getMockTitle(id)}

## Introduction

This is a comprehensive guide on ${getMockTitle(id).toLowerCase()}. Follow these instructions to get the best results.

## Main Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna consectetur ultrices. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.

### Section 1

- Point 1: Important information about this topic
- Point 2: More details and instructions
- Point 3: Best practices to follow

### Section 2

1. Step 1: First, do this...
2. Step 2: Then, proceed with...
3. Step 3: Finally, complete by...

## Conclusion

Following these guidelines will help you achieve optimal results. If you encounter any issues, refer to our troubleshooting section or contact support.

## Related Articles

- Troubleshooting Guide
- Advanced Settings
- Performance Optimization
`;
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    announce("Editing mode activated", "info");
  };
  
  const handleSave = () => {
    if (article) {
      setArticle({
        ...article,
        content: editedContent,
        updatedAt: new Date()
      });
      setIsEditing(false);
      announce("Article saved successfully", "success");
    }
  };
  
  const handleCancel = () => {
    setEditedContent(article?.content || "");
    setIsEditing(false);
    announce("Edit canceled", "info");
  };
  
  const handlePrint = () => {
    window.print();
    announce("Printing article", "info");
  };
  
  const handleDownload = () => {
    // إنشاء ملف نصي للتنزيل
    const blob = new Blob([article?.content || ""], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article?.title || 'article'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    announce("Article downloaded", "success");
  };
  
  const handleShare = () => {
    // محاكاة مشاركة المقالة
    announce("Article share dialog opened", "info");
  };
  
  if (!article) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-center">
              <div className="h-6 w-32 bg-muted rounded mx-auto mb-4"></div>
              <div className="h-4 w-64 bg-muted rounded mx-auto"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{article.title}</CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {new Date(article.updatedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {article.author}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <Textarea 
              className="min-h-[500px] font-mono text-sm"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end space-x-2 rtl:space-x-reverse">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(article.content) }} />
          </div>
        )}
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 rtl:space-x-reverse">
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {article.likes}
            </button>
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ThumbsDown className="h-4 w-4 mr-1" />
              {article.dislikes}
            </button>
          </div>
          
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            {isDeveloperMode && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// وظيفة بسيطة لتحويل Markdown إلى HTML
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown
    // العناوين
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    // القوائم المرقمة
    .replace(/^(\d+)\. (.*)$/gm, '<li>$2</li>')
    // القوائم غير المرقمة
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    // الخط المائل
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // الخط العريض
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // الروابط
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // الفواصل الأفقية
    .replace(/^---$/gm, '<hr>')
    // فقرات النص
    .replace(/\n\n/g, '</p><p>');
  
  // لف النص في وسم فقرة
  html = '<p>' + html + '</p>';
  
  // تنظيف القوائم
  html = html.replace(/<li>.*?<\/li>/g, (match) => {
    return match;
  });
  
  return html;
}
