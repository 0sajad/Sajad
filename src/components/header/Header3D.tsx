
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Text3D, Center } from "@react-three/drei";
import { Mesh, Color, Vector3 } from "three";
import { useMode } from "@/context/ModeContext";
import { useTranslation } from "react-i18next";

const FloatingLogo = () => {
  const meshRef = useRef<Mesh>(null);
  const textRef = useRef<Mesh>(null);
  const { theme } = useMode();
  const darkMode = theme === "dark";
  
  // Animation for the floating effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1 + 0.1;
      meshRef.current.rotation.y += 0.003;
    }
    
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05 + 0.05;
    }
  });

  return (
    <group>
      {/* Floating sphere */}
      <mesh ref={meshRef} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial 
          color={darkMode ? "#1e40af" : "#3b82f6"} 
          metalness={0.5}
          roughness={0.2}
          emissive={darkMode ? "#1e3a8a" : "#60a5fa"}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Text */}
      <group ref={textRef} position={[0, 0.05, 0]}>
        <Center>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.25}
            height={0.05}
            curveSegments={12}
            position={[-0.85, 0.25, 0]}
          >
            OCTA
            <meshStandardMaterial 
              color={darkMode ? "#8b5cf6" : "#6366f1"} 
              metalness={0.8}
              roughness={0.1}
              emissive={darkMode ? "#4c1d95" : "#818cf8"}
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>
        <Center>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.23}
            height={0.05}
            curveSegments={12}
            position={[-0.85, -0.2, 0]}
          >
            GRAM
            <meshStandardMaterial 
              color={darkMode ? "#8b5cf6" : "#6366f1"} 
              metalness={0.8}
              roughness={0.1}
              emissive={darkMode ? "#4c1d95" : "#818cf8"}
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>
      </group>
    </group>
  );
};

const OrbitingSpheres = () => {
  const sphere1Ref = useRef<Mesh>(null);
  const sphere2Ref = useRef<Mesh>(null);
  const sphere3Ref = useRef<Mesh>(null);
  const { theme } = useMode();
  const darkMode = theme === "dark";

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Orbit spheres around center
    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.sin(time * 0.5) * 1.5;
      sphere1Ref.current.position.z = Math.cos(time * 0.5) * 1.5;
    }
    
    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.sin(time * 0.8 + 2) * 1.2;
      sphere2Ref.current.position.z = Math.cos(time * 0.8 + 2) * 1.2;
    }
    
    if (sphere3Ref.current) {
      sphere3Ref.current.position.x = Math.sin(time * 1.1 + 4) * 0.9;
      sphere3Ref.current.position.z = Math.cos(time * 1.1 + 4) * 0.9;
    }
  });

  return (
    <>
      <mesh ref={sphere1Ref} position={[1.5, 0, 0]} scale={0.12}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={darkMode ? "#ec4899" : "#f472b6"} 
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      <mesh ref={sphere2Ref} position={[-1.2, 0, 0]} scale={0.15}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={darkMode ? "#10b981" : "#34d399"} 
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      <mesh ref={sphere3Ref} position={[0, 0, 0.9]} scale={0.1}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={darkMode ? "#f59e0b" : "#fbbf24"} 
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </>
  );
};

export const Header3D: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useMode();
  const darkMode = theme === "dark";
  
  return (
    <div className="w-full h-16 relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <color attach="background" args={[darkMode ? "#111827" : "#ffffff"]} />
        
        {/* Ambient light */}
        <ambientLight intensity={0.8} />
        
        {/* Directional light */}
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1.5}
          castShadow
        />
        
        {/* Point lights for dynamic lighting */}
        <pointLight position={[-10, 0, -5]} intensity={0.5} color={darkMode ? "#4f46e5" : "#6366f1"} />
        <pointLight position={[5, 0, 5]} intensity={0.5} color={darkMode ? "#8b5cf6" : "#a855f7"} />
        
        {/* 3D elements */}
        <FloatingLogo />
        <OrbitingSpheres />
        
        {/* Controls with limited functionality */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};
