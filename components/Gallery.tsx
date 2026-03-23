import React from 'react';
import { Instagram, Camera, ArrowRight } from 'lucide-react';
import { INSTAGRAM } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-12 md:py-20 bg-[#0f1115]">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto bg-[#16191f] border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl reveal">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-900/5 rounded-full blur-[100px]"></div>

          <div className="relative z-10">
            <div className="bg-red-600/10 w-16 h-16 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6 md:mb-10 rotate-3 shadow-inner border border-red-500/20">
              <Instagram size={32} className="md:w-12 md:h-12" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 uppercase italic leading-none tracking-tighter">RESULTADOS <br /><span className="text-red-gradient">REAIS</span></h2>
            <p className="text-gray-500 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Confira no nosso Instagram o antes e depois que define o padrão de qualidade da MF Aurum Legacy.
            </p>

            <div className="flex flex-col items-center gap-6 md:gap-8">
              <a 
                href={`https://instagram.com/${INSTAGRAM.replace('@', '')}`}
                target="_blank"
                className="group relative inline-flex items-center gap-4 md:gap-5 bg-red-gradient text-white px-8 py-4 md:px-14 md:py-7 rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-red-glow active:scale-95"
              >
                <Instagram size={28} className="group-hover:rotate-12 transition-transform" />
                VER NO INSTAGRAM
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </a>
              
              <div className="flex items-center gap-3 text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                <Camera size={14} />
                <span>Portfólio Diário</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;