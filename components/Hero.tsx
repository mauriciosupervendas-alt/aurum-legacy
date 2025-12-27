import React from 'react';
import { WHATSAPP_URL } from '../constants';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center pt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10"></div>
      
      <img 
        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover"
        alt="Carro limpo brilhando"
      />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/30 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 reveal">
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">Padrão de Elite Criciúma</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-8 reveal uppercase italic tracking-tighter">
            O LEGADO <br />
            DO <span className="text-red-gradient">BRILHO</span> <br /> PERFEITO.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed reveal" style={{ transitionDelay: '0.2s' }}>
            Transformamos seu veículo com a exclusividade <span className="text-white font-bold">MF Aurum Legacy</span>. 
            Técnica artesanal e os melhores produtos do mundo para o seu carro.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center">
                <CheckCircle size={14} className="text-red-500" />
              </div>
              <span>Vitrificação Cerâmica</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center">
                <CheckCircle size={14} className="text-red-500" />
              </div>
              <span>Higienização Detalhada</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 reveal" style={{ transitionDelay: '0.4s' }}>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              className="group bg-red-gradient text-white px-12 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3"
            >
              AGENDAR AGORA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={scrollToServices}
              className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-12 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-white/10 transition-all cursor-pointer"
            >
              NOSSOS SERVIÇOS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;