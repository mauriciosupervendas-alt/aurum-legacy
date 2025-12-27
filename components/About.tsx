
import React from 'react';
import { Trophy, Star, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0f1115] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative reveal">
            <div className="rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-auto object-cover"
                alt="Equipe trabalhando"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-gradient p-6 rounded-xl shadow-2xl hidden md:block">
              <p className="text-white font-black text-3xl">100%</p>
              <p className="text-white text-xs font-bold uppercase">Satisfação Garantida</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 reveal" style={{ transitionDelay: '0.2s' }}>
            <h2 className="text-red-500 font-bold tracking-widest mb-4 text-sm uppercase">Excelência em cada detalhe</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
              A Paixão por Carros no <br /> Nosso DNA
            </h3>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                Na <span className="text-white font-bold">MF Aurum Legacy</span>, acreditamos que um carro limpo reflete o cuidado do dono. Nossa missão é oferecer o melhor serviço de estética automotiva da região, garantindo um resultado surpreendente.
              </p>
              <p>
                Tratamos cada veículo como se fosse nosso. Utilizamos técnicas que não agridem a pintura e garantem um brilho duradouro. O nome <span className="text-white font-semibold italic">"Aurum"</span> remete ao valor e à excelência que entregamos em cada processo de cuidado com o seu patrimônio.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-10">
               <div className="flex items-center gap-4">
                  <div className="bg-red-500/10 p-3 rounded-lg text-red-500"><ShieldCheck size={24} /></div>
                  <div>
                    <p className="text-white font-bold">Qualidade</p>
                    <p className="text-xs text-gray-500 uppercase">Nível Premium</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="bg-red-500/10 p-3 rounded-lg text-red-500"><Star size={24} /></div>
                  <div>
                    <p className="text-white font-bold">Brilho</p>
                    <p className="text-xs text-gray-500 uppercase">Impecável</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="bg-red-500/10 p-3 rounded-lg text-red-500"><Trophy size={24} /></div>
                  <div>
                    <p className="text-white font-bold">Confiança</p>
                    <p className="text-xs text-gray-500 uppercase">Tradição</p>
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
