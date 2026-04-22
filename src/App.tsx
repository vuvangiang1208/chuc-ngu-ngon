/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Moon, Star, Heart, Cloud } from 'lucide-react';
import { useState, useEffect } from 'react';

const STARS_COUNT = 50;
const FIREWORK_PARTICLES = 24;

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export default function App() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  const [fireworks, setFireworks] = useState<Particle[]>([]);
  const [isAutoFiring, setIsAutoFiring] = useState(true);

  useEffect(() => {
    const newStars = Array.from({ length: STARS_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);

    // Automatic firework display for 1 minute 36 seconds (96s)
    const startTime = Date.now();
    const duration = 96 * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.1);
        createHeartFirework(x, y);
      } else {
        setIsAutoFiring(false);
        clearInterval(interval);
      }
    }, 1500); // Fire every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  const createHeartFirework = (centerX: number, centerY: number) => {
    const particles: Particle[] = [];
    const timestamp = Date.now();
    
    for (let i = 0; i < FIREWORK_PARTICLES; i++) {
      const t = (i / FIREWORK_PARTICLES) * 2 * Math.PI;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      particles.push({
        id: timestamp + i,
        x: centerX,
        y: centerY,
        vx: x * 0.6,
        vy: y * 0.6,
        size: Math.random() * 8 + 8,
        color: `hsl(${Math.random() * 40 + 320}, 100%, 75%)`, // Pink/Magenta range
      });
    }
    
    setFireworks((prev) => [...prev, ...particles]);
    setTimeout(() => {
      setFireworks((prev) => prev.filter((p) => !particles.find(newP => newP.id === p.id)));
    }, 2000);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-[#1a0a1a] cursor-pointer"
      onClick={(e) => createHeartFirework(e.clientX, e.clientY)}
    >
      {/* Background Hidden Names Intertwined */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 3 }}
          className="relative flex flex-col items-center justify-center scale-150 rotate-[-15deg]"
        >
          <div className="font-serif text-[12vw] whitespace-nowrap text-pink-200 leading-none opacity-40">
            Vũ Văn Giang
          </div>
          <Heart size={300} className="text-pink-300 -my-20 opacity-30" fill="currentColor" />
          <div className="font-serif text-[12vw] whitespace-nowrap text-pink-200 leading-none opacity-40">
            Trần Khánh Chi
          </div>
        </motion.div>
      </div>

      {/* Atmosphere Gradients - Pink/Purple */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 70% 20%, rgba(255, 100, 200, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(150, 50, 255, 0.12) 0%, transparent 40%)
            `,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating Clouds - Soft Pink */}
      <motion.div
        className="absolute bottom-[10%] -left-[20%] opacity-[0.04]"
        animate={{ x: ['0%', '140%'] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <Cloud size={300} className="text-pink-200" fill="currentColor" />
      </motion.div>

      {/* Fixed Moon */}
      <motion.div 
        className="absolute top-[80px] right-[40px] md:right-[120px] w-[120px] h-[120px] rounded-full bg-[#fffde7] z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        style={{
          boxShadow: '0 0 80px rgba(253, 224, 71, 0.2), inset -20px -20px 40px rgba(0,0,0,0.05)',
        }}
      />

      {/* Main Content Card */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4 select-none">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-[600px] w-full p-8 md:p-16 rounded-[40px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-[25px] text-center shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-pink-500/[0.1] border border-pink-400/[0.2] text-[10px] md:text-xs uppercase tracking-[2px] mb-10 text-pink-300 font-sans font-medium">
            Gửi tới Vợ Yêu
          </div>
          
          <h1 
            className="text-5xl md:text-6xl font-serif italic mb-6 leading-tight"
            style={{
              background: 'linear-gradient(to bottom, #fff 30%, #ff99cc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Trần Khánh Chi
          </h1>

          <div className="text-pink-400 text-2xl my-6 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={36} fill="currentColor" />
            </motion.div>
          </div>

          <p className="text-base md:text-lg lg:text-xl font-sans font-light text-pink-50/80 leading-relaxed tracking-[0.5px]">
            Chúc em có một giấc ngủ thật ngon và những giấc mơ ngọt ngào nhất. 
            Anh luôn ở đây, bảo vệ và yêu thương em mỗi ngày. 
            Ngủ ngon nhé, công chúa của anh.
          </p>

          <footer className="mt-12 flex flex-col items-center gap-4">
            <div className="flex justify-center gap-5">
              <div className="w-10 h-[1px] bg-pink-300/20 self-center" />
              <span className="font-serif italic text-pink-200/50 text-sm">
                Ký tên: Chồng của Chi
              </span>
              <div className="w-10 h-[1px] bg-pink-300/20 self-center" />
            </div>
            <div className="font-serif italic text-pink-300/30 text-xs">Vũ Văn Giang ❤️ Trần Khánh Chi</div>
          </footer>
        </motion.div>
      </div>

      {/* Heart Fireworks Animation */}
      <AnimatePresence>
        {fireworks.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: p.x, 
              y: p.y, 
              scale: 0,
              opacity: 1 
            }}
            animate={{ 
              x: p.x + p.vx * 12, 
              y: p.y + p.vy * 12,
              scale: [0, 1.2, 0.6],
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.8, 
              ease: "easeOut"
            }}
            className="absolute pointer-events-none z-50"
          >
            <Heart size={p.size} style={{ color: p.color }} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 w-full text-center text-pink-200/20 font-sans text-[10px] uppercase tracking-widest pointer-events-none px-4">
        {isAutoFiring ? "Đang diễn ra màn pháo hoa đặc biệt (96s)..." : "Chạm để nổ pháo hoa trái tim"}
      </div>
    </div>
  );
}



