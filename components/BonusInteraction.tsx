
import React, { useState } from 'react';
import { Ticket, Send } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

const BonusInteraction: React.FC = () => {
  const [name, setName] = useState('');
  const [car, setCar] = useState('');

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !car) return;
    const msg = encodeURIComponent(`Olá! Recebi a "multa" da MF Aurum Legacy e gostaria de validar meu brinde!\n\nNome: ${name}\nVeículo: ${car}`);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="bg-[#080808] border border-white/10 p-8 md:p-16 relative reveal">
          <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.03] pointer-events-none">
            <Ticket className="w-32 h-32 md:w-64 md:h-64 -rotate-12 text-red-500" />
          </div>
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 italic uppercase tracking-wider">
              Encontrou nossa <span className="text-red-500">"Multa"</span>?
            </h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
              Resgate seu benefício agora! Se deixamos um aviso no seu carro, você ganhou um brinde especial na sua próxima lavagem.
            </p>
          </div>

          <form onSubmit={handleValidate} className="flex flex-col md:flex-row gap-4 relative z-10">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Nome" 
                className="w-full bg-black border border-white/5 px-6 py-5 text-white focus:border-red-500/50 outline-none transition-all placeholder:text-gray-700 text-sm rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Seu Carro" 
                className="w-full bg-black border border-white/5 px-6 py-5 text-white focus:border-red-500/50 outline-none transition-all placeholder:text-gray-700 text-sm rounded-lg"
                value={car}
                onChange={(e) => setCar(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="bg-red-gradient text-white font-black px-10 py-5 flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-95 uppercase text-[10px] tracking-[0.3em] shadow-lg shadow-red-500/10 rounded-lg"
            >
              Resgatar Brinde <Send size={14} />
            </button>
          </form>
          
          <p className="text-center mt-10 text-[9px] md:text-[10px] text-gray-600 uppercase tracking-[0.4em] font-medium">
            Apresente o cupom físico no dia do serviço.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BonusInteraction;
