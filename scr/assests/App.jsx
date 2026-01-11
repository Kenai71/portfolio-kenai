import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Mantive apenas os ícones usados. O Instagram já vem do lucide-react (padrão preto/branco via CSS)
import { Moon, Sun, Menu, X, Instagram } from 'lucide-react'; 
import { projects } from './dados/projects'; // Verifique se o nome do arquivo é projects.js ou projetos.js
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  // Gerenciamento do Tema
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // Filtragem dos Projetos
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Variantes de Animação
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="app-container">
      {/* BACKGROUND ANIMADO */}
      <div className="aurora-bg"></div>

      {/* HEADER */}
      <header>
        <div className="container nav-container">
          <a href="#" className="logo">Kenai<span>.</span></a>
          
          <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfólio</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          </nav>

          <div className="nav-right">
            <button onClick={toggleTheme} className="icon-btn" aria-label="Alterar tema">
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
        <section id="home" className="hero">
          <motion.div 
            className="container hero-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h1>Designer Criativo & Estrategista Visual</h1>
            <p className="subtitle">Transformando ideias em identidades visuais memoráveis e experiências digitais impactantes.</p>
            <a href="#portfolio" className="btn">Veja meus trabalhos</a>
          </motion.div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio">
          <div className="container">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Meus Projetos<span>.</span>
            </motion.h2>
            
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
              <AnimatePresence>
                {filteredProjects.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="portfolio-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="image-container">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="portfolio-overlay">
                      <h3>{item.title}</h3>
                      <p>{item.type}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* SOBRE SECTION */}
        <section id="sobre">
          <div className="container">
            <motion.div 
              className="sobre-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="sobre-imagem">
                <img src="/sua-foto.png" alt="Foto de Kenai" />
              </div>
              <div className="sobre-texto">
                <h2 className="section-title-left">Sobre Mim<span>.</span></h2>
                <p>Olá! Sou <strong>Kenai</strong>, um designer de <strong>18 anos</strong> apaixonado por criar soluções visuais...</p>
                <p>Acredito que um bom design é a combinação de estratégia, criatividade e atenção aos detalhes.</p>
                
                {/* BOTÃO WHATSAPP CORRIGIDO */}
                <a 
                  href="https://wa.me/5571997391105?text=Quero%20saber%20mais%20sobre%20seus%20servi%C3%A7os" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn" 
                  style={{marginTop: '1rem'}}
                >
                  Vamos conversar
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTATO SECTION */}
        <section id="contato">
          <div className="container">
             <motion.div 
                className="contato-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
             >
                <h2 className="section-title">Vamos criar algo<br/>incrível <span>juntos?</span></h2>
                <p>Se você tem um projeto em mente ou apenas quer dizer um "oi", adoraria ouvir de você.</p>
                <a href="mailto:kenaidesign22@gmail.com" className="btn">Enviar um e-mail</a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER ATUALIZADO */}
      <footer>
        <div className="container footer-content">
          <div className="social-links">
            {/* Ícone do Lucide React herda a cor do texto (preto/branco dependendo do tema) */}
            <a 
              href="https://www.instagram.com/kenai.design/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
          <p>&copy; 2025 Kenai. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;