import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Combo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceStart: string;
  durationMinutes: number;
  features: string[];
}

interface ServiceCardProps {
  combo: Combo;
  selectedAddOns: string[];
  onBook: (combo: Combo) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ combo, selectedAddOns, onBook }) => {
  return (
    <div 
      className={`relative p-4 md:p-6 rounded-[2rem] md:rounded-[2rem] bg-[#16191f] border transition-all flex flex-col h-full reveal ${combo.id === 'intermediario' ? 'border-red-600 shadow-red-glow md:scale-105 z-10' : 'border-white/5 opacity-90 hover:opacity-100 hover:border-white/20'}`}
    >
      {combo.id === 'intermediario' && (
        <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-red-gradient text-white text-[9px] md:text-[10px] font-black px-6 md:px-8 py-1.5 md:py-2 rounded-full uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">
          Mais Popular
        </div>
      )}
      
      <div className="mb-2 md:mb-4 text-center mt-2 md:mt-0 w-full">
        <h5 className="text-red-500 text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-2 md:mb-3 break-words whitespace-normal">{combo.tagline}</h5>
        <h4 className="text-2xl md:text-2xl font-black text-white uppercase italic tracking-tighter break-words whitespace-normal">{combo.name}</h4>
      </div>
      
      <div className="mb-3 md:mb-6 text-center">
        <span className="text-[10px] md:text-xs font-bold text-gray-500 block mb-1 uppercase tracking-wider">A partir de</span>
        <span className="text-3xl md:text-4xl font-black text-white">{(combo as any).categoryPricing?.SMALL?.price || combo.priceStart}</span>
        <div className="flex items-center justify-center gap-2 mt-1 md:mt-2 text-gray-500">
          <CheckCircle2 size={12} className="text-red-600 md:w-3.5 md:h-3.5" />
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest italic">~ {((combo as any).categoryPricing?.SMALL?.durationMinutes || combo.durationMinutes) >= 60 ? `${Math.floor(((combo as any).categoryPricing?.SMALL?.durationMinutes || combo.durationMinutes) / 60)}h${((combo as any).categoryPricing?.SMALL?.durationMinutes || combo.durationMinutes) % 60 > 0 ? ` ${((combo as any).categoryPricing?.SMALL?.durationMinutes || combo.durationMinutes) % 60}min` : ''}` : `${((combo as any).categoryPricing?.SMALL?.durationMinutes || combo.durationMinutes)}min`}</span>
        </div>
      </div>
      
      <p className="text-gray-400 mb-3 md:mb-6 text-xs md:text-sm leading-relaxed italic text-center px-2 md:px-4 break-words whitespace-normal">
        {combo.description}
      </p>
      
      <div className="space-y-2 md:space-y-2 mb-3 md:mb-6 flex-grow w-full">
        {combo.features.map((feat, i) => (
          <div key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-300">
            <CheckCircle2 size={14} className="text-red-600 shrink-0 md:w-4 md:h-4 mt-0.5" />
            <span className="break-words whitespace-normal flex-1">{feat}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onBook(combo);
        }}
        className={`w-full mt-auto py-2.5 md:py-4 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] ${combo.id === 'intermediario' ? 'bg-red-gradient text-white shadow-red-900/20' : 'bg-white text-black hover:bg-gray-200'}`}
      >
        Agendar Agora
      </button>
    </div>
  );
};

export default ServiceCard;
