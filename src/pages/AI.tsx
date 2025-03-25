
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIPageHeader } from "@/components/ai/AIPageHeader";
import { AIMainContent } from "@/components/ai/AIMainContent";

const AI = () => {
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string, timestamp?: Date}[]>([
    {
      role: "assistant", 
      content: "مرحباً! أنا مساعد OCTA-GRAM الذكي. كيف يمكنني مساعدتك في مجال الشبكات والاتصالات؟", 
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AIPageHeader />
          <AIMainContent initialMessages={messages} />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AI;
