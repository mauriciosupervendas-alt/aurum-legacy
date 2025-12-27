import React from 'react';
import { Instagram, MapPin, Phone, Send } from 'lucide-react';
import { WHATSAPP_URL, INSTAGRAM, ADDRESS } from '../constants';

const Footer: React.FC = () => {
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
              <a href={`https://instagram.com/${INSTAGRAM.replace('@', '')}`} target="_blank" className="bg-white/5 p-4 rounded-2xl text-white hover:bg-red-600 transition-all shadow-xl">
                <Instagram size={24} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" className="bg-white/5 p-4 rounded-2xl text-white hover:bg-red-600 transition-all shadow-xl">
                <Send size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-red-600 uppercase tracking-[0.4em]">Contato</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-gray-400 group">
                <MapPin size={22} className="text-red-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm leading-relaxed">{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 group">
                <Phone size={22} className="text-red-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">(48) 99163-2244</span>
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
          </div>
        </div>
      </div>
      
      {/* Botão Flutuante Customizado */}
      <a href={WHATSAPP_URL} target="_blank" className="fixed bottom-10 right-10 z-[100] bg-red-600 p-5 rounded-full shadow-red-glow hover:scale-110 transition-transform active:scale-95 group">
          <Send size={28} className="text-white group-hover:rotate-12 transition-transform" />
      </a>
    </footer>
  );
};

export default Footer;