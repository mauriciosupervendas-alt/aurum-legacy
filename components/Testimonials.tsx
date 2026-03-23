import React, { useState, useRef, useEffect } from 'react';
import { Star, Send, Quote, ChevronLeft, ChevronRight, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { CAR_MODELS } from '../constants';

const Testimonials: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    car: '',
    text: '',
    rating: 5
  });
  const [submitted, setSubmitted] = useState(false);
  const { content, updateContent } = useContent();
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // New state for suggestions and validation
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [nameError, setNameError] = useState('');
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only letters and spaces (including accented characters)
    if (/^[a-zA-Z\u00C0-\u00FF\s]*$/.test(value)) {
      setFormData({ ...formData, name: value });
      setNameError('');
    }
  };

  const handleCarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, car: value });
    
    if (value.length > 1) {
      const filtered = CAR_MODELS.filter(model => 
        model.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCar = (car: string) => {
    setFormData({ ...formData, car });
    setShowSuggestions(false);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name (at least 2 words)
    const nameParts = formData.name.trim().split(/\s+/);
    if (nameParts.length < 2) {
      setNameError('Por favor, insira seu nome e sobrenome.');
      return;
    }

    if (!formData.name || !formData.car || !formData.text) return;

    const newTestimonial = {
      name: formData.name,
      role: formData.car,
      text: formData.text,
      rating: formData.rating,
      status: 'pending' as const
    };

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTestimonial),
      });

      if (response.ok) {
        // Optimistically update local state
        updateContent({
          ...content,
          testimonials: [...content.testimonials, { ...newTestimonial, id: Date.now() }]
        });
        
        setSubmitted(true);
        setFormData({ name: '', car: '', text: '', rating: 5 });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Erro ao enviar avaliação. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Erro ao enviar avaliação. Verifique sua conexão.');
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth * 0.8 : scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth * 0.8 : scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const approvedTestimonials = content.testimonials.filter(t => t.status === 'approved' || !t.status);
  const filteredTestimonials = ratingFilter 
    ? approvedTestimonials.filter(t => t.rating === ratingFilter)
    : approvedTestimonials;

  return (
    <section className="py-12 md:py-20 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6 md:mb-12 reveal">
          <h3 className="text-red-500 font-black tracking-[0.3em] mb-2 md:mb-4 uppercase text-[10px]">Feedback</h3>
          <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 uppercase italic tracking-tighter">Opinião de quem confia</h2>
          <div className="w-16 md:w-24 h-1 bg-red-gradient mx-auto mb-6 md:mb-8"></div>
        </div>

        {/* Filter */}
        <div className="flex justify-start md:justify-center mb-8 gap-2 overflow-x-auto pb-2 scrollbar-hide px-4 -mx-4 md:mx-0">
          <button 
            onClick={() => setRatingFilter(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${!ratingFilter ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
          >
            Todos
          </button>
          {[5, 4, 3, 2, 1].map(star => (
            <button 
              key={star}
              onClick={() => setRatingFilter(star === ratingFilter ? null : star)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-1 whitespace-nowrap ${ratingFilter === star ? 'bg-red-600 text-white border-red-600' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
            >
              {star} <Star size={10} className="fill-current" />
            </button>
          ))}
        </div>

        <div className="relative mb-8 md:mb-16">
          <div 
            ref={scrollContainerRef}
            className="grid grid-rows-2 grid-flow-col auto-cols-[85vw] md:auto-cols-[calc(33.333%-0.67rem)] gap-4 overflow-x-auto pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide snap-x snap-mandatory"
          >
            {filteredTestimonials.map((t) => (
              <div key={t.id} className="bg-[#111] p-5 md:p-10 border border-white/5 rounded-2xl md:rounded-3xl relative overflow-hidden group snap-center shrink-0 flex flex-col h-full">
                <Quote className="absolute -top-2 -right-2 md:-top-4 md:-right-4 text-white/5 w-16 h-16 md:w-24 md:h-24 rotate-12 transition-transform group-hover:rotate-0" />
                <div className="mb-4">
                  <StarRating rating={t.rating} />
                </div>
                
                <div className="flex-grow w-full">
                  <p className={`text-gray-400 italic leading-relaxed text-xs md:text-sm transition-all duration-300 break-words whitespace-normal ${expandedId === t.id ? '' : 'line-clamp-3'}`}>
                    "{t.text}"
                  </p>
                  {t.text.length > 100 && (
                    <button 
                      onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                      className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2 hover:text-red-400 flex items-center gap-1"
                    >
                      {expandedId === t.id ? (
                        <>Ler menos <ChevronUp size={12} /></>
                      ) : (
                        <>Ler mais <ChevronDown size={12} /></>
                      )}
                    </button>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <h5 className="text-white font-bold uppercase tracking-tight text-sm">{t.name}</h5>
                  <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className={`flex justify-center gap-4 mt-8 ${filteredTestimonials.length > 6 ? 'flex' : 'md:hidden'}`}>
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg active:scale-95 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg active:scale-95 transition-transform"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-6 md:p-12 bg-[#0c0c0c] border border-red-900/20 relative shadow-2xl rounded-[2rem] md:rounded-[3rem] reveal">
          <div className="text-center mb-4 md:mb-8 relative z-10">
            <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic">Deixe sua avaliação</h4>
            <p className="text-gray-500 text-[10px] md:text-xs mt-2 md:mt-3 uppercase tracking-widest">Sua voz ajuda a construir nosso legado</p>
          </div>

          {submitted ? (
            <div className="text-center py-8 md:py-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                <Star className="text-red-600 fill-red-600" size={32} />
              </div>
              <h4 className="text-white text-2xl md:text-3xl font-black mb-4 uppercase">Obrigado!</h4>
              <p className="text-gray-500 uppercase tracking-widest text-[10px] max-w-md mx-auto leading-relaxed">
                Feedback enviado com sucesso! Sua avaliação será analisada por nossa equipe e em breve poderá aparecer em nosso site.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Nome Sobrenome" 
                    className={`w-full bg-black border ${nameError ? 'border-red-500' : 'border-white/10'} p-3 md:p-5 text-white outline-none focus:border-red-600 transition-colors text-xs md:text-sm rounded-xl md:rounded-2xl`}
                    value={formData.name}
                    onChange={handleNameChange}
                    onFocus={handleInputFocus}
                    required
                  />
                  {nameError && <p className="text-red-500 text-[10px] absolute -bottom-4 left-2">{nameError}</p>}
                </div>
                
                <div className="relative" ref={suggestionsRef}>
                  <input 
                    type="text" 
                    placeholder="Seu Carro" 
                    className="w-full bg-black border border-white/10 p-3 md:p-5 text-white outline-none focus:border-red-600 transition-colors text-xs md:text-sm rounded-xl md:rounded-2xl"
                    value={formData.car}
                    onChange={handleCarChange}
                    onFocus={(e) => {
                      if (formData.car.length > 1) setShowSuggestions(true);
                      handleInputFocus(e);
                    }}
                    required
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-[#16191f] border border-white/10 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <div 
                          key={index}
                          onClick={() => selectCar(suggestion)}
                          className="px-4 py-3 text-xs md:text-sm text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0"
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 md:gap-3 py-3 md:py-6 bg-white/[0.02] rounded-xl md:rounded-2xl">
                <span className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-black">Sua Nota</span>
                <StarRating rating={formData.rating} interactive onRate={(r) => setFormData({...formData, rating: r})} />
              </div>

              <textarea 
                placeholder="Como foi o resultado?" 
                rows={3}
                className="w-full bg-black border border-white/10 p-3 md:p-5 text-white outline-none focus:border-red-600 transition-colors text-xs md:text-sm resize-none rounded-xl md:rounded-2xl"
                value={formData.text}
                onChange={e => setFormData({...formData, text: e.target.value})}
                onFocus={handleInputFocus}
                required
              ></textarea>

              <button 
                type="submit"
                className="w-full bg-red-gradient text-white font-black py-3 md:py-6 text-[10px] md:text-xs tracking-[0.4em] uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-4 rounded-xl md:rounded-2xl shadow-red-glow"
              >
                ENVIAR <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const StarRating = ({ rating, interactive = false, onRate }: { rating: number, interactive?: boolean, onRate?: (r: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star 
        key={s} 
        size={interactive ? 24 : 14} 
        onClick={() => interactive && onRate?.(s)}
        className={`${s <= rating ? 'text-red-600 fill-red-600' : 'text-gray-800'} ${interactive ? 'cursor-pointer hover:scale-125 transition-transform' : ''}`} 
      />
    ))}
  </div>
);

export default Testimonials;