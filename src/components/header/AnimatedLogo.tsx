
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMode } from '@/context/ModeContext';

export const AnimatedLogo: React.FC = () => {
  const { theme } = useMode();
  const isDark = theme === 'dark';
  const svgControls = useAnimation();
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const heartbeatPath = "M0,10 L5,10 L7,2 L9,18 L11,0 L13,10 L15,5 L17,10 L20,10";

  useEffect(() => {
    const animatePath = async () => {
      await svgControls.start({
        opacity: 1,
        pathLength: 1,
        transition: {
          duration: 2,
          ease: "easeInOut"
        }
      });
      
      svgControls.start({
        stroke: [
          isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(14, 165, 233, 0.8)",
          isDark ? "rgba(79, 70, 229, 0.8)" : "rgba(59, 130, 246, 0.8)",
          isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(14, 165, 233, 0.8)",
        ],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }
      });
    };

    animatePath();
  }, [svgControls, isDark]);

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
            <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">OCTA</span>
            <div className="relative w-full flex justify-center">
              <motion.span 
                className="absolute -top-0.5 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.span>
              <motion.span 
                className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              ></motion.span>
              <span className="mx-0.5">-</span>
            </div>
            <span className="bg-gradient-to-tr from-purple-600 to-blue-500 bg-clip-text text-transparent">GRAM</span>
          </div>
          
          <motion.div 
            className="absolute -right-9 top-1/2 -translate-y-1/2 h-5 w-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="40" height="14" viewBox="0 0 60 20" className="overflow-visible">
              <motion.path
                ref={pathRef}
                d={heartbeatPath}
                stroke={isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(14, 165, 233, 0.8)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={svgControls}
              />
              
              <motion.circle
                ref={circleRef}
                r="1"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  fill: [
                    isDark ? "#8B5CF6" : "#0EA5E9",
                    isDark ? "#6366F1" : "#3B82F6",
                    isDark ? "#8B5CF6" : "#0EA5E9",
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
                stroke={isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(14, 165, 233, 0.3)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  stroke: [
                    isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(14, 165, 233, 0.3)",
                    isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(59, 130, 246, 0.3)",
                    isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(14, 165, 233, 0.3)",
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
                isDark ? "0 0 0 rgba(139, 92, 246, 0)" : "0 0 0 rgba(59, 130, 246, 0)",
                isDark ? "0 0 10px rgba(139, 92, 246, 0.3)" : "0 0 10px rgba(59, 130, 246, 0.3)",
                isDark ? "0 0 0 rgba(139, 92, 246, 0)" : "0 0 0 rgba(59, 130, 246, 0)"
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
};
