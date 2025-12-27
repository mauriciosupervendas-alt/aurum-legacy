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
          className={`${s <= rating ? 'text-red-600 fill-red-600' : 'text-gray-800'} ${interactive ? 'cursor-pointer hover:scale-125 transition-transform' : ''}`} 
        />
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h3 className="text-red-500 font-black tracking-[0.3em] mb-4 uppercase text-[10px]">Feedback</h3>
          <h2 className="text-3xl md:text-6xl font-black mb-8 uppercase italic tracking-tighter">Opinião de quem confia</h2>
          <div className="w-24 h-1 bg-red-gradient mx-auto mb-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-[#111] p-10 border border-white/5 rounded-3xl relative overflow-hidden group reveal">
              <Quote className="absolute -top-4 -right-4 text-white/5 w-24 h-24 rotate-12 transition-transform group-hover:rotate-0" />
              <StarRating rating={t.rating} />
              <p className="text-gray-400 mt-8 mb-10 italic leading-relaxed text-sm">"{t.text}"</p>
              <div>
                <h5 className="text-white font-bold uppercase tracking-tight">{t.name}</h5>
                <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mt-2 italic">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto p-10 md:p-16 bg-[#0c0c0c] border border-red-900/20 relative shadow-2xl rounded-[3rem] reveal">
          <div className="text-center mb-12 relative z-10">
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">Deixe sua avaliação</h4>
            <p className="text-gray-500 text-xs mt-3 uppercase tracking-widest">Sua voz ajuda a construir nosso legado</p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Star className="text-red-600 fill-red-600" size={40} />
              </div>
              <h4 className="text-white text-3xl font-black mb-4 uppercase">Obrigado!</h4>
              <p className="text-gray-500 uppercase tracking-widest text-[10px]">Feedback enviado com sucesso.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Nome Completo" 
                  className="w-full bg-black border border-white/10 p-5 text-white outline-none focus:border-red-600 transition-colors text-sm rounded-2xl"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Seu Carro" 
                  className="w-full bg-black border border-white/10 p-5 text-white outline-none focus:border-red-600 transition-colors text-sm rounded-2xl"
                  value={formData.car}
                  onChange={e => setFormData({...formData, car: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col items-center gap-3 py-6 bg-white/[0.02] rounded-2xl">
                <span className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-black">Sua Nota</span>
                <StarRating rating={formData.rating} interactive onRate={(r) => setFormData({...formData, rating: r})} />
              </div>

              <textarea 
                placeholder="Como foi o resultado?" 
                rows={4}
                className="w-full bg-black border border-white/10 p-5 text-white outline-none focus:border-red-600 transition-colors text-sm resize-none rounded-2xl"
                value={formData.text}
                onChange={e => setFormData({...formData, text: e.target.value})}
                required
              ></textarea>

              <button 
                type="submit"
                className="w-full bg-red-gradient text-white font-black py-6 text-xs tracking-[0.4em] uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-4 rounded-2xl shadow-red-glow"
              >
                ENVIAR FEEDBACK <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;