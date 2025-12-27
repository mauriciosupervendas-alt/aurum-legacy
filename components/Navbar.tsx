
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { WHATSAPP_URL } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'services', 'gallery'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        
        <div 
          className="relative cursor-pointer group flex items-center transition-transform duration-500 hover:scale-105 z-50"
          onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setActiveSection('home'); }}
        >
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none">
              MF <span className="text-red-500">AURUM</span>
            </span>
            <span className="text-[8px] md:text-[10px] text-white/60 tracking-[0.3em] uppercase font-bold">Legacy</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-12">
          <div className="flex items-center space-x-8 text-[11px] font-bold tracking-[0.3em] text-white/70">
            {['home', 'about', 'services', 'gallery'].map((item) => (
              <button 
                key={item}
                onClick={() => handleLinkClick(item)} 
                className={`relative py-2 hover:text-red-500 transition-colors uppercase group ${activeSection === item ? 'text-red-500' : ''}`}
              >
                {item === 'home' ? 'Início' : item === 'about' ? 'Sobre' : item === 'services' ? 'Serviços' : 'Galeria'}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${activeSection === item ? 'scale-x-100' : ''}`}></span>
              </button>
            ))}
          </div>
          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            className="bg-red-gradient text-white px-8 py-3 text-[10px] font-black tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] uppercase hover:scale-105 active:scale-95 rounded-lg"
          >
            PEDIR ORÇAMENTO
          </a>
        </div>

        <button className="lg:hidden text-white p-2 z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          {isMenuOpen ? <X size={26} className="text-red-500 transition-all" /> : <Menu size={26} className="transition-all" />}
        </button>
      </div>

      <div className={`lg:hidden fixed inset-0 w-full h-screen bg-black transition-all duration-700 ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 px-6 pt-20">
          {['home', 'about', 'services', 'gallery'].map((item) => (
            <button 
              key={item}
              onClick={() => handleLinkClick(item)} 
              className={`text-2xl font-black text-white hover:text-red-500 tracking-[0.2em] uppercase transition-all`}
            >
              {item === 'home' ? 'INÍCIO' : item === 'about' ? 'SOBRE' : item === 'services' ? 'SERVIÇOS' : 'GALERIA'}
            </button>
          ))}
          <div className="w-full pt-8">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              className="block w-full text-center bg-red-gradient text-white py-5 font-bold tracking-widest text-xs uppercase shadow-2xl rounded-xl"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
