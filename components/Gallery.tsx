
import React from 'react';
import { Instagram, Camera, ArrowRight } from 'lucide-react';
import { INSTAGRAM } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-[#0f1115]">
      <div className="container mx-auto px-6 text-center reveal">
        <div className="max-w-4xl mx-auto bg-[#16191f] border border-white/5 rounded-[2rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Elementos Decorativos de Fundo */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-900/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="bg-red-500/10 w-20 h-20 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-8 rotate-3 shadow-inner">
              <Instagram size={40} />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Nossa Galeria Real</h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Respeitamos a privacidade e o tempo de cada cliente. Por isso, centralizamos todos os nossos resultados diários, vídeos e antes & depois diretamente em nossa rede social.
            </p>

            <div className="flex flex-col items-center gap-6">
              <a 
                href={`https://instagram.com/${INSTAGRAM.replace('@', '')}`}
                target="_blank"
                className="group relative inline-flex items-center gap-4 bg-red-gradient text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(220,38,38,0.25)] active:scale-95 overflow-hidden"
              >
                <Instagram size={24} className="group-hover:rotate-12 transition-transform" />
                VER RESULTADOS NO INSTAGRAM
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
              
              <div className="flex items-center gap-2 text-red-500/60 font-bold uppercase tracking-[0.2em] text-xs">
                <Camera size={14} />
                <span>Atualizado Diariamente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
