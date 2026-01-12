import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroPremium = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Texto sobe com efeito Parallax
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      id="home" 
      ref={ref} 
      style={{ 
        height: '100vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        // Fundo transparente para mostrar a aurora-bg do App.jsx
        background: 'transparent',
        zIndex: 1 
      }}
    >
      {/* TEXTO PRINCIPAL */}
      <motion.div 
        className="container" 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center', 
          y: yText,
          opacity: opacityHero
        }}
      >
        <div className="hero-text-wrapper">
            <MaskedReveal text="DESIGNER" delay={0.1} />
            <MaskedReveal text="CRIATIVO" delay={0.25} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="hero-subtitle-container"
        >
          <p className="premium-subtitle">& Estrategista Visual</p>
          
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Scrolle para explorar</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const MaskedReveal = ({ text, delay }) => {
  return (
    <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <motion.h1
        initial={{ y: "110%", rotate: 3 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ 
          duration: 1.0, 
          ease: [0.25, 1, 0.5, 1], 
          delay: delay 
        }}
        className="premium-title"
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default HeroPremium;