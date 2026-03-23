import React, { useState, useRef } from 'react';
import { useContent } from '../contexts/ContentContext';
import ServiceCard from './ServiceCard';
import AddOnsSection from './AddOnsSection';
import BookingModal from './BookingModal';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Combo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceStart: string;
  durationMinutes: number;
  features: string[];
}

const Services: React.FC = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Combo | null>(null);
  const { content } = useContent();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const scrollToElement = (id: string) => {
    const element = itemRefs.current.get(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBook = (combo: Combo) => {
    setSelectedPackage(combo);
    setIsModalOpen(true);
    scrollToElement(combo.id);
  };

  const handleBookStandalone = () => {
    setSelectedPackage({
      id: 'standalone-addons',
      name: 'Serviços Adicionais',
      tagline: 'Personalizado',
      description: 'Agendamento apenas de serviços adicionais.',
      priceStart: 'R$ 0,00',
      durationMinutes: 0,
      features: []
    });
    setIsModalOpen(true);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth * 0.85 : scrollContainerRef.current.clientWidth / 3;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth * 0.85 : scrollContainerRef.current.clientWidth / 3;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="bg-[#0a0c10]">
      <div id="packages" className="py-8 md:py-12 bg-gradient-to-b from-[#0a0c10] to-[#0f1115]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-6 md:mb-10 reveal">
            <h2 className="text-2xl md:text-5xl font-black mb-2 md:mb-4 uppercase">Nossos Pacotes</h2>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-[10px] md:text-xs">O cuidado que seu legado merece</p>
          </div>

          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pt-4 md:pt-8 pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide"
            >
              {content.combos.map((combo) => (
                <div 
                  key={combo.id} 
                  ref={(el) => {
                    if (el) itemRefs.current.set(combo.id, el);
                    else itemRefs.current.delete(combo.id);
                  }}
                  className="w-[85vw] md:w-[calc(33.333%-1.33rem)] snap-center snap-always h-full shrink-0"
                  onClick={() => scrollToElement(combo.id)}
                >
                  <ServiceCard 
                    combo={combo} 
                    selectedAddOns={selectedAddOns} 
                    onBook={handleBook}
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation Controls */}
            <div className={`flex justify-center gap-6 mt-6 ${content.combos.length > 3 ? 'flex' : 'md:hidden'}`}>
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
          </div>

          <AddOnsSection selectedAddOns={selectedAddOns} toggleAddOn={toggleAddOn} onBookStandalone={handleBookStandalone} />
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPackage={selectedPackage}
        selectedAddOns={selectedAddOns}
      />
    </section>
  );
};

export default Services;