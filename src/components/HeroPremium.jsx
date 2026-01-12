import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroPremium = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      id="home" 
      ref={ref} 
      style={{ 
        height: '100vh', 
        minHeight: '550px',
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'transparent',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      <motion.div 
        className="container" 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center', 
          y: yText,
          opacity: opacityHero,
          width: '100%'
        }}
      >
        <div className="hero-text-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MaskedReveal text="DESIGNER" delay={0.1} />
            <MaskedReveal text="CRIATIVO" delay={0.25} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="hero-subtitle-container"
        >
          {/* As cores agora são controladas pela classe CSS 'premium-subtitle' */}
          <p className="premium-subtitle">
            & Estrategista Visual
          </p>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              marginTop: '3rem', 
              opacity: 0.6, 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              // Usamos 'inherit' para pegar a cor do texto do pai (body/hero)
              color: 'inherit' 
            }}
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
    <div style={{ overflow: 'hidden' }}>
      <motion.h1
        initial={{ y: "110%", rotate: 2 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ 
          duration: 1.0, 
          ease: [0.25, 1, 0.5, 1], 
          delay: delay 
        }}
        // A classe 'premium-title' no CSS agora usa var(--cor-texto)
        className="premium-title" 
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default HeroPremium;