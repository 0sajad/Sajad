
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { PingTestTool } from "./tools/PingTestTool";
import { PacketLossTool } from "./tools/PacketLossTool";
import { TracerouteTool } from "./tools/TracerouteTool";
import { PortScannerTool } from "./tools/PortScannerTool";
import { DnsLookupTool } from "./tools/DnsLookupTool";
import { JitterAnalysisTool } from "./tools/JitterAnalysisTool";
import { NetworkConfigTool } from "./tools/NetworkConfigTool";
import { motion } from "framer-motion";

const CommunicationToolsPage = () => {
  const { t } = useTranslation("communicationTools");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 sm:px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t("title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transform-gpu"
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            <Tabs defaultValue="ping" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent border border-gray-200 dark:border-gray-700 p-1 rounded-xl w-auto shadow-inner">
                  <TabsTrigger 
                    value="ping" 
                    className="data-[state=active]:shadow-md data-[state=active]:translate-y-0 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {t("categories.diagnostic")}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="scanner" 
                    className="data-[state=active]:shadow-md data-[state=active]:translate-y-0 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {t("categories.scanner")}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analysis" 
                    className="data-[state=active]:shadow-md data-[state=active]:translate-y-0 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {t("categories.analysis")}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="config" 
                    className="data-[state=active]:shadow-md data-[state=active]:translate-y-0 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {t("categories.config")}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="ping" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <motion.div variants={item} className="transform-gpu hover:-translate-y-1 transition-transform duration-300">
                    <PingTestTool />
                  </motion.div>
                  <motion.div variants={item} className="transform-gpu hover:-translate-y-1 transition-transform duration-300">
                    <PacketLossTool />
                  </motion.div>
                  <motion.div variants={item} className="transform-gpu hover:-translate-y-1 transition-transform duration-300 md:col-span-2">
                    <TracerouteTool />
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="scanner" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <motion.div variants={item} className="transform-gpu hover:-translate-y-1 transition-transform duration-300">
                    <PortScannerTool />
                  </motion.div>
                  <motion.div variants={item} className="transform-gpu hover:-translate-y-1 transition-transform duration-300">
                    <DnsLookupTool />
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="analysis" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-6"
                >
                  <motion.div variants={item} className="transform-gpu hover:-translate-y-1 transition-transform duration-300">
                    <JitterAnalysisTool />
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="config" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-6"
                >
                  <motion.div variants={item} className="transform-gpu hover:-translate-y-1 transition-transform duration-300">
                    <NetworkConfigTool />
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunicationToolsPage;
