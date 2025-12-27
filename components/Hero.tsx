
import React from 'react';
import { WHATSAPP_URL } from '../constants';
import { CheckCircle } from 'lucide-react';

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
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      <img 
        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover"
        alt="Carro limpo brilhando"
      />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-gradient px-4 py-1 rounded-full mb-6 reveal">
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">Qualidade Nível Máximo</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 reveal">
            Seu carro com o <br />
            <span className="text-red-500">brilho</span> que <br /> impressiona!
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl font-light leading-relaxed reveal" style={{ transitionDelay: '0.2s' }}>
            Lavagem completa e higienização com quem entende de carro. Recupere o orgulho de dirigir um veículo impecável.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-10 reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={18} className="text-red-500" />
              <span>Resultados Impecáveis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={18} className="text-red-500" />
              <span>Produtos Profissionais</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={18} className="text-red-500" />
              <span>Preço Justo</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={18} className="text-red-500" />
              <span>Agendamento Fácil</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 reveal" style={{ transitionDelay: '0.4s' }}>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              className="bg-red-gradient text-white px-10 py-5 rounded-lg font-bold text-center hover:scale-105 transition-all shadow-xl shadow-red-500/10"
            >
              SOLICITAR ORÇAMENTO
            </a>
            <button 
              onClick={scrollToServices}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-lg font-bold text-center hover:bg-white/20 transition-all cursor-pointer"
            >
              VER SERVIÇOS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
