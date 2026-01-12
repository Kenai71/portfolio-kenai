import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, Menu, X, Instagram, ArrowUpRight } from 'lucide-react'; 
import { projects } from './dados/project';
import HeroPremium from './components/HeroPremium';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  // Parallax suave para a imagem do "Sobre"
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const yAboutImg = useTransform(aboutScroll, [0, 1], ["10%", "-10%"]);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="app-container">
      <div className="aurora-bg"></div>
      
      {/* HEADER */}
      <header>
        <div className="container nav-container">
          <a href="#" className="logo">Kenai<span>.</span></a>
          
          <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>Trabalhos</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          </nav>

          <div className="nav-right">
            <button onClick={toggleTheme} className="icon-btn">
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger icon-btn">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <HeroPremium />

        {/* PORTFOLIO SECTION */}
        <section id="portfolio">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Projetos Selecionados<span className="dot">.</span></h2>
            </motion.div>
            
            <div className="portfolio-filters">
              {['all', 'marcas', 'posts', 'web'].map((cat) => (
                <button 
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`} 
                  onClick={() => setFilter(cat)}
                >
                  {cat === 'all' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <motion.div layout className="portfolio-grid">
              <AnimatePresence mode='popLayout'>
                {filteredProjects.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="portfolio-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="image-container">
                        <img src={item.image} alt={item.title} />
                    </div>
                    
                    {/* NOVO OVERLAY PREMIUM */}
                    <div className="portfolio-overlay">
                      <div className="overlay-text">
                        <h3>{item.title}</h3>
                        <p>{item.type}</p>
                      </div>
                      <div className="overlay-icon">
                        <ArrowUpRight size={28} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* SOBRE SECTION */}
        <section id="sobre" ref={aboutRef}>
          <div className="container">
            <div className="sobre-content">
              <motion.div 
                className="sobre-imagem-wrapper"
                style={{ y: yAboutImg }}
              >
                <img src="/img/1.png" alt="Kenai" className="sobre-foto" />
              </motion.div>
              
              <div className="sobre-texto">
                <h2 className="section-title-left">Sobre Mim<span>.</span></h2>
                <p className="lead-text">Olá! Sou <strong>Kenai</strong>, designer visual apaixonado por criar identidades que marcam.</p>
                <p>Com 18 anos, combino estética minimalista com estratégia robusta. Meu objetivo é transformar ideias em experiências visuais memoráveis.</p>
                
                <a href="https://wa.me/5571997391105" target="_blank" className="btn btn-outline">
                  Vamos conversar
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO SECTION */}
        <section id="contato">
          <div className="container">
             <motion.div 
                className="contato-content"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
             >
                <h2 className="section-title huge-text">Vamos criar algo<br/><span>único?</span></h2>
                <a href="mailto:kenaidesign22@gmail.com" className="btn btn-large">
                  Enviar e-mail
                </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-content">
          <div className="social-links">
            <a href="https://www.instagram.com/kenai.design/" target="_blank"><Instagram /></a>
          </div>
          <p>&copy; 2025 Kenai.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;