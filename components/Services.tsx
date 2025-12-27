import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SERVICES, COMBOS, WHATSAPP_URL } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#0a0c10]">
      <div className="container mx-auto px-6 mb-24">
        <div className="text-center mb-16 reveal">
          <h3 className="text-red-500 font-bold tracking-widest mb-4 uppercase text-sm">Serviços Profissionais</h3>
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">O que seu carro precisa?</h2>
          <div className="w-20 h-1 bg-red-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div key={s.id} className="bg-[#16191f] p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group reveal">
              <div className="bg-red-500/10 w-14 h-14 rounded-xl flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                <s.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 uppercase">{s.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 bg-gradient-to-b from-[#0a0c10] to-[#0f1115]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase">Nossos Pacotes</h2>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">O cuidado que seu legado merece</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMBOS.map((combo) => (
              <div 
                key={combo.id} 
                className={`relative p-10 rounded-[2.5rem] bg-[#16191f] border transition-all flex flex-col h-full reveal ${combo.id === 'aurum-top' ? 'border-red-600 shadow-red-glow scale-105 z-10' : 'border-white/5 opacity-80 hover:opacity-100'}`}
              >
                {combo.id === 'aurum-top' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-gradient text-white text-[10px] font-black px-8 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                    Elite Choice
                  </div>
                )}
                <div className="mb-6">
                  <h5 className="text-red-500 text-[10px] font-black tracking-[0.3em] uppercase mb-3">{combo.tagline}</h5>
                  <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">{combo.name}</h4>
                </div>
                <div className="mb-8">
                  <span className="text-xl font-black text-white/50">{combo.priceLabel}</span>
                </div>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed italic">
                  {combo.description}
                </p>
                <div className="space-y-4 mb-10 flex-grow">
                  {combo.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm text-gray-300">
                      <CheckCircle2 size={18} className="text-red-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  className={`block text-center py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${combo.id === 'aurum-top' ? 'bg-red-gradient text-white shadow-lg' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                  Orçamento no WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;