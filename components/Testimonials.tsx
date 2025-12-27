
import React, { useState } from 'react';
import { Star, MessageSquarePlus, Send, Quote } from 'lucide-react';
import { PHONE_NUMBER, TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    car: '',
    text: '',
    rating: 5
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.car || !formData.text) return;

    const message = encodeURIComponent(
      `*Avaliação do Cliente*\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*Veículo:* ${formData.car}\n` +
      `*Nota:* ${formData.rating} Estrelas\n` +
      `*Mensagem:* ${formData.text}`
    );
    
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
    setSubmitted(true);
    setFormData({ name: '', car: '', text: '', rating: 5 });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const StarRating = ({ rating, interactive = false, onRate }: { rating: number, interactive?: boolean, onRate?: (r: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star 
          key={s} 
          size={interactive ? 24 : 16} 
          onClick={() => interactive && onRate?.(s)}
          className={`${s <= rating ? 'text-red-500 fill-red-500' : 'text-gray-700'} ${interactive ? 'cursor-pointer hover:scale-125 transition-transform' : ''}`} 
        />
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-red-500 font-bold tracking-[0.2em] mb-4 uppercase text-[10px]">Depoimentos</h3>
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight">O que dizem os clientes</h2>
          <div className="w-24 h-1 bg-red-gradient mx-auto mb-12"></div>
        </div>

        {/* Grid de Depoimentos Existentes (Sem Imagens) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-[#111] p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
              <Quote className="absolute -top-2 -right-2 text-white/5 w-20 h-20 rotate-12 transition-transform group-hover:rotate-0" />
              <StarRating rating={t.rating} />
              <p className="text-gray-400 mt-6 mb-8 italic leading-relaxed">"{t.text}"</p>
              <div>
                <h5 className="text-white font-bold">{t.name}</h5>
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Formulário de Nova Avaliação */}
        <div className="max-w-2xl mx-auto p-8 md:p-12 bg-[#111] border border-red-500/20 relative shadow-2xl rounded-3xl reveal">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <MessageSquarePlus size={80} className="text-red-500" />
          </div>

          <div className="text-center mb-8 relative z-10">
            <h4 className="text-xl font-bold text-white uppercase tracking-widest">Deixe sua opinião</h4>
            <p className="text-gray-500 text-xs mt-2">Sua avaliação é enviada direto para o nosso WhatsApp</p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-red-500 fill-red-500" size={32} />
              </div>
              <h4 className="text-white text-2xl mb-4">Valeu pelo feedback!</h4>
              <p className="text-gray-400 text-sm">Agradecemos a preferência!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Seu nome" 
                  className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-red-500 transition-colors text-sm rounded-xl"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Modelo do carro" 
                  className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-red-500 transition-colors text-sm rounded-xl"
                  value={formData.car}
                  onChange={e => setFormData({...formData, car: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col items-center gap-2 py-4 bg-white/[0.02] rounded-xl">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Sua Nota</span>
                <StarRating rating={formData.rating} interactive onRate={(r) => setFormData({...formData, rating: r})} />
              </div>

              <textarea 
                placeholder="Como foi sua experiência?" 
                rows={4}
                className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-red-500 transition-colors text-sm resize-none rounded-xl"
                value={formData.text}
                onChange={e => setFormData({...formData, text: e.target.value})}
                required
              ></textarea>

              <button 
                type="submit"
                className="w-full bg-red-gradient text-white font-black py-5 text-[10px] md:text-xs tracking-[0.3em] uppercase hover:brightness-110 transition-all flex items-center justify-center gap-3 rounded-2xl shadow-xl shadow-red-600/10"
              >
                Avaliar via WhatsApp <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
