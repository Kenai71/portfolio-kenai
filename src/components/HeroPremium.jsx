import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroPremium = () => {
  const ref = useRef(null);
  // Captura o scroll apenas deste container para criar o efeito parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // A imagem vai descer um pouco mais devagar que o scroll (Parallax)
  const yBackend = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // O texto vai sumir suavemente ao rolar
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} style={{ height: '100vh', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* BACKGROUND COM PARALLAX (Estilo Lando) */}
      <motion.div 
        style={{ 
          y: yBackend,
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url(/img/1.png)', // Usando sua imagem
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)', // Escurece para o texto brilhar
          zIndex: -1
        }} 
      />

      {/* TEXTO COM REVEAL MASCARADO (Estilo Igloo/Lando) */}
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div style={{ opacity: opacityText }}>
          <MaskedText text="DESIGNER" delay={0} />
          <MaskedText text="CRIATIVO" delay={0.15} />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ 
              marginTop: '2rem', 
              fontSize: '1.2rem', 
              color: '#00f5c8', 
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
          >
            & Estrategista Visual
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// Componente auxiliar para o efeito de texto "nascendo"
const MaskedText = ({ text, delay }) => {
  return (
    <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <motion.h1
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ 
          duration: 1.2, 
          ease: [0.6, 0.01, -0.05, 0.95], // Easing "premium" usado nesses sites
          delay: delay 
        }}
        style={{ 
          fontSize: 'clamp(3rem, 10vw, 8rem)', 
          lineHeight: 1, 
          margin: 0, 
          fontWeight: 800,
          color: '#fff' 
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default HeroPremium;