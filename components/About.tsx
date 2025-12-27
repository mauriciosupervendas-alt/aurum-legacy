import React from 'react';
import { Trophy, Star, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-[#080808] overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 relative reveal">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Detailing Profissional"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-red-gradient p-10 rounded-[2rem] shadow-2xl hidden md:block z-20">
              <p className="text-white font-black text-4xl italic tracking-tighter leading-none">ELITE</p>
              <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Detailing Standard</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 reveal">
            <h2 className="text-red-600 font-black tracking-[0.5em] mb-6 text-xs uppercase italic">A Nossa Essência</h2>
            <h3 className="text-4xl md:text-7xl font-black mb-10 leading-[0.9] uppercase italic tracking-tighter">
              UM LEGADO DE <br /><span className="text-red-gradient">PERFEIÇÃO</span>
            </h3>
            <div className="space-y-8 text-gray-500 text-lg leading-relaxed font-light">
              <p>
                Na <span className="text-white font-bold">MF Aurum Legacy</span>, elevamos o cuidado automotivo ao nível de arte. Localizada no coração de Criciúma, nossa boutique de estética nasceu da paixão visceral por veículos impecáveis.
              </p>
              <p>
                O nome <span className="text-white font-black italic tracking-tighter">AURUM</span> simboliza o nosso compromisso inegociável com o padrão máximo. Utilizamos apenas as melhores tecnologias de proteção de pintura e higienização do mercado mundial.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-white/5 pt-12">
               <div className="flex flex-col items-center sm:items-start gap-4">
                  <div className="bg-red-600/10 p-4 rounded-2xl text-red-600 border border-red-600/20"><ShieldCheck size={32} /></div>
                  <div className="text-center sm:text-left">
                    <p className="text-white font-black uppercase text-xs tracking-widest">Proteção</p>
                    <p className="text-[10px] text-gray-600 uppercase mt-1 font-bold">Garantida</p>
                  </div>
               </div>
               <div className="flex flex-col items-center sm:items-start gap-4">
                  <div className="bg-red-600/10 p-4 rounded-2xl text-red-600 border border-red-600/20"><Star size={32} /></div>
                  <div className="text-center sm:text-left">
                    <p className="text-white font-black uppercase text-xs tracking-widest">Brilho</p>
                    <p className="text-[10px] text-gray-600 uppercase mt-1 font-bold">Inigualável</p>
                  </div>
               </div>
               <div className="flex flex-col items-center sm:items-start gap-4">
                  <div className="bg-red-600/10 p-4 rounded-2xl text-red-600 border border-red-600/20"><Trophy size={32} /></div>
                  <div className="text-center sm:text-left">
                    <p className="text-white font-black uppercase text-xs tracking-widest">Técnica</p>
                    <p className="text-[10px] text-gray-600 uppercase mt-1 font-bold">Certificada</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;