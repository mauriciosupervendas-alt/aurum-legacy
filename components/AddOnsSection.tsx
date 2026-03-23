import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Square, CheckSquare, ChevronRight, ChevronLeft } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface AddOnsSectionProps {
  selectedAddOns: string[];
  toggleAddOn: (id: string) => void;
  onBookStandalone?: () => void;
}

const AddOnsSection: React.FC<AddOnsSectionProps> = ({ selectedAddOns, toggleAddOn, onBookStandalone }) => {
  const [expandedAddOns, setExpandedAddOns] = useState<string[]>([]);
  const { content } = useContent();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const scrollToElement = (id: string) => {
    setTimeout(() => {
      const element = itemRefs.current.get(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }, 350);
  };

  const centerContainer = () => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }, 350);
  };

  const toggleExpand = (id: string) => {
    setExpandedAddOns(prev => {
      const isExpanding = !prev.includes(id);
      if (isExpanding) {
        scrollToElement(id);
        return [...prev, id];
      } else {
        // Closing
        centerContainer();
        return prev.filter(item => item !== id);
      }
    });
  };

  const handleToggleAddOn = (id: string) => {
    toggleAddOn(id);
    scrollToElement(id);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth * 0.85 : scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth * 0.85 : scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-6 md:mt-12 max-w-5xl mx-auto">
      <div className="text-center mb-4 md:mb-8 reveal">
        <h3 className="text-xl md:text-3xl font-black text-white uppercase mb-2 md:mb-4">Adicionais e Complementos</h3>
        <p className="text-gray-400 text-xs md:text-sm">Personalize seu pacote com nossos serviços especializados</p>
      </div>

      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="grid grid-rows-5 grid-flow-col auto-cols-[85vw] md:auto-cols-[calc(50%-0.5rem)] gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide snap-x snap-mandatory"
        >
          {content.addOns.map((addon) => (
            <div 
              key={addon.id} 
              ref={(el) => {
                if (el) itemRefs.current.set(addon.id, el);
                else itemRefs.current.delete(addon.id);
              }}
              className={`bg-[#16191f] rounded-xl md:rounded-2xl p-2.5 md:p-4 border transition-all snap-center shrink-0 ${selectedAddOns.includes(addon.id) ? 'border-red-500/50 bg-red-900/10' : 'border-white/5 hover:border-white/10'}`}
            >
              <div className="flex items-start justify-between gap-3 md:gap-4">
                <button 
                  onClick={() => handleToggleAddOn(addon.id)}
                  className="flex items-center gap-3 md:gap-4 flex-1 text-left group"
                >
                  {selectedAddOns.includes(addon.id) ? (
                    <CheckSquare size={20} className="text-red-500 shrink-0 md:w-6 md:h-6" />
                  ) : (
                    <Square size={20} className="text-gray-600 group-hover:text-gray-400 shrink-0 md:w-6 md:h-6" />
                  )}
                  <div>
                    <h4 className={`font-bold uppercase tracking-wide text-xs md:text-base break-words whitespace-normal ${selectedAddOns.includes(addon.id) ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {addon.name}
                    </h4>
                    <div className="flex items-center gap-2 md:gap-3 mt-0.5 md:mt-1 flex-wrap">
                      <p className="text-red-500 font-bold text-[10px] md:text-sm whitespace-nowrap">A partir de: {(addon as any).categoryPricing?.SMALL?.price || addon.price}</p>
                      <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase italic tracking-widest border-l border-white/10 pl-2 md:pl-3 whitespace-nowrap">
                        ~ {((addon as any).categoryPricing?.SMALL?.durationMinutes || addon.durationMinutes) >= 60 ? `${Math.floor(((addon as any).categoryPricing?.SMALL?.durationMinutes || addon.durationMinutes) / 60)}h${((addon as any).categoryPricing?.SMALL?.durationMinutes || addon.durationMinutes) % 60 > 0 ? ` ${((addon as any).categoryPricing?.SMALL?.durationMinutes || addon.durationMinutes) % 60}min` : ''}` : `${((addon as any).categoryPricing?.SMALL?.durationMinutes || addon.durationMinutes)}min`}
                      </span>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => toggleExpand(addon.id)}
                  className="text-gray-500 hover:text-white transition-colors p-1.5 md:p-2 bg-white/5 rounded-full"
                  aria-label="Ver mais detalhes"
                >
                  {expandedAddOns.includes(addon.id) ? <ChevronUp size={16} className="md:w-5 md:h-5" /> : <ChevronDown size={16} className="md:w-5 md:h-5" />}
                </button>
              </div>
              
              {expandedAddOns.includes(addon.id) && (
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5 text-xs md:text-sm text-gray-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  {addon.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className={`flex justify-center gap-6 mt-6 ${content.addOns.length > 10 ? 'flex' : 'md:hidden'}`}>
          <button 
            onClick={scrollLeft}
            className="p-3 bg-[#16191f] rounded-full border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollRight}
            className="p-3 bg-[#16191f] rounded-full border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all shadow-lg"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Standalone Booking Button */}
        {selectedAddOns.length > 0 && (
          <div className="mt-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            {selectedAddOns.every(id => content.addOns.find(a => a.id === id)?.allowStandalone) ? (
              <button
                onClick={onBookStandalone}
                className="bg-red-gradient text-white px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase hover:shadow-lg hover:scale-105 transition-all shadow-red-900/20"
              >
                Agendar Apenas Adicionais ({selectedAddOns.length})
              </button>
            ) : (
              <div className="text-center">
                <button
                  disabled
                  className="bg-white/5 text-gray-500 border border-white/10 px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase cursor-not-allowed"
                >
                  Agendar Apenas Adicionais ({selectedAddOns.length})
                </button>
                <p className="text-red-500 text-xs mt-2 font-bold">
                  * Alguns adicionais selecionados exigem a contratação de um pacote.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddOnsSection;
