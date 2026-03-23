import React from 'react';
import { Instagram, MapPin, Phone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

const Footer: React.FC = () => {
  const { content } = useContent();

  const encodedMessage = encodeURIComponent(
    `Olá, MF Aurum Legacy!\n\n` +
    `Quero tirar dúvidas`
  );
  const whatsappUrl = `https://wa.me/${content.contact.phone}?text=${encodedMessage}`;

  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          
          <div className="lg:col-span-2">
            <h4 className="text-3xl font-black mb-8 tracking-tighter uppercase">MF <span className="text-red-600">AURUM</span> LEGACY</h4>
            <p className="text-gray-500 mb-10 leading-relaxed max-w-md italic">
              Onde a paixão por brilho encontra a técnica de elite. O cuidado absoluto que seu patrimônio merece, em Criciúma.
            </p>
            <div className="flex gap-6">
              <a href={`https://instagram.com/${content.contact.instagram.replace('@', '')}`} target="_blank" className="bg-white/5 p-4 rounded-2xl text-white hover:bg-red-600 transition-all shadow-xl">
                <Instagram size={24} />
              </a>
              <a href={whatsappUrl} target="_blank" className="bg-white/5 p-4 rounded-2xl text-white hover:bg-red-600 transition-all shadow-xl">
                <Send size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-red-600 uppercase tracking-[0.4em]">Contato</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-gray-400 group">
                <MapPin size={22} className="text-red-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm leading-relaxed">{content.contact.address}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 group">
                <Phone size={22} className="text-red-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">{content.contact.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-red-600 uppercase tracking-[0.4em]">Expediente</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500 uppercase tracking-widest text-[10px]">Seg - Sex</span>
                <span className="text-white font-bold tracking-tight">08h às 18h</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500 uppercase tracking-widest text-[10px]">Sábado</span>
                <span className="text-white font-bold tracking-tight">08h às 13h</span>
              </li>
              <li className="flex justify-between text-red-600 font-black italic uppercase text-[10px] tracking-widest pt-2">
                <span>Domingo</span>
                <span>FECHADO</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-medium">© {new Date().getFullYear()} MF Aurum Legacy Detailing</p>
          <div className="flex gap-8 text-[9px] text-white/40 uppercase tracking-widest font-bold">
            <span className="hover:text-red-600 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-red-600 cursor-pointer transition-colors">Terms</span>
            <Link to="/admin" className="hover:text-red-600 cursor-pointer transition-colors">Admin</Link>
          </div>
        </div>
      </div>
      
      {/* Botão Flutuante Customizado */}
      <a href={whatsappUrl} target="_blank" className="fixed bottom-6 right-4 md:bottom-10 md:right-10 z-[100] bg-red-600 p-3 md:p-5 rounded-full shadow-red-glow hover:scale-110 transition-transform active:scale-95 group">
          <Send size={24} className="text-white group-hover:rotate-12 transition-transform md:w-[28px] md:h-[28px]" />
      </a>
    </footer>
  );
};

export default Footer;