
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SERVICES, COMBOS, WHATSAPP_URL } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#0a0c10]">
      <div className="container mx-auto px-6 mb-24">
        <div className="text-center mb-16 reveal">
          <h3 className="text-red-500 font-bold tracking-widest mb-4 uppercase text-sm">Serviços Profissionais</h3>
          <h2 className="text-3xl md:text-5xl font-black mb-6">O que seu carro precisa?</h2>
          <div className="w-20 h-1 bg-red-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
          {SERVICES.map((s) => (
            <div key={s.id} className="bg-[#16191f] p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
              <div className="bg-red-500/10 w-14 h-14 rounded-xl flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                <s.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{s.title}</h4>
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
            <h2 className="text-3xl md:text-5xl font-black mb-4">Nossos Pacotes</h2>
            <p className="text-gray-400">Escolha o cuidado ideal para hoje</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
            {COMBOS.map((combo) => (
              <div 
                key={combo.id} 
                className={`relative p-8 rounded-3xl bg-[#16191f] border-2 transition-all flex flex-col h-full ${combo.id === 'aurum-top' ? 'border-red-600 shadow-2xl shadow-red-600/10 scale-105 z-10' : 'border-white/5'}`}
              >
                {combo.id === 'aurum-top' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-gradient text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    Mais Procurado
                  </div>
                )}
                <div className="mb-6">
                  <h5 className="text-red-500 text-xs font-bold tracking-widest uppercase mb-2">{combo.tagline}</h5>
                  <h4 className="text-2xl font-black text-white">{combo.name}</h4>
                </div>
                <div className="mb-8">
                  <span className="text-2xl font-black text-white">{combo.priceLabel}</span>
                </div>
                <p className="text-gray-400 mb-8 text-sm">
                  {combo.description}
                </p>
                <div className="space-y-4 mb-10 flex-grow">
                  {combo.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  className={`block text-center py-4 rounded-xl font-bold transition-all ${combo.id === 'aurum-top' ? 'bg-red-gradient text-white hover:brightness-110' : 'bg-white/5 text-white hover:bg-white/10'}`}
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
