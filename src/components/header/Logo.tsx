
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Logo() {
  const heartbeatPath = "M0,10 L5,10 L7,2 L9,18 L11,0 L13,10 L15,5 L17,10 L20,10";
  
  return (
    <Link to="/" className="relative mr-3 sm:mr-8 group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 dark:border-gray-800/50 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm xs:text-base font-bold flex items-center justify-center w-full"
        >
          <div className="flex flex-col items-center">
            <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-octaBlue-500 bg-clip-text text-transparent">OCTA</span>
            <div className="relative w-full flex justify-center">
              <span className="absolute -top-0.5 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>
              <span className="mx-0.5">-</span>
            </div>
            <span className="bg-gradient-to-tr from-purple-600 to-octaBlue-500 bg-clip-text text-transparent">GRAM</span>
          </div>
          
          <motion.div 
            className="absolute -right-9 top-1/2 -translate-y-1/2 h-5 w-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="40" height="14" viewBox="0 0 60 20" className="overflow-visible">
              <motion.path
                d={heartbeatPath}
                stroke="rgba(14, 165, 233, 0.8)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  stroke: [
                    "rgba(14, 165, 233, 0.8)",
                    "rgba(139, 92, 246, 0.8)",
                    "rgba(14, 165, 233, 0.8)"
                  ]
                }}
                transition={{
                  pathLength: { 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  },
                  opacity: { duration: 0.5 },
                  stroke: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
              
              <motion.circle
                r="1"
                fill="#0EA5E9"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  fill: [
                    "#0EA5E9",
                    "#8B5CF6",
                    "#0EA5E9"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <animateMotion
                  dur="1.5s"
                  repeatCount="indefinite"
                  path={heartbeatPath}
                />
              </motion.circle>
              
              <motion.path
                d={heartbeatPath}
                stroke="rgba(14, 165, 233, 0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  stroke: [
                    "rgba(14, 165, 233, 0.3)",
                    "rgba(139, 92, 246, 0.3)",
                    "rgba(14, 165, 233, 0.3)"
                  ]
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  stroke: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                style={{ filter: "blur(2px)" }}
              />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute -z-10 inset-0 rounded-full opacity-30"
            animate={{
              boxShadow: [
                "0 0 0 rgba(79, 70, 229, 0)",
                "0 0 10px rgba(79, 70, 229, 0.3)",
                "0 0 0 rgba(79, 70, 229, 0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      </div>
    </Link>
  );
}
