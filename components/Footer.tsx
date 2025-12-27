
import React from 'react';
import { Instagram, MapPin, Phone } from 'lucide-react';
import { WHATSAPP_URL, INSTAGRAM, ADDRESS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0c10] pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          <div>
            <h4 className="text-2xl font-black mb-6">MF <span className="text-red-500">AURUM</span> LEGACY</h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              O cuidado que seu carro merece com a paixão que só a MF Aurum Legacy tem. O melhor lava car de Criciúma.
            </p>
            <div className="flex gap-4">
              <a href={`https://instagram.com/${INSTAGRAM.replace('@', '')}`} target="_blank" className="bg-white/5 p-3 rounded-lg text-white hover:text-red-500 transition-all">
                <Instagram size={24} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" className="bg-white/5 p-3 rounded-lg text-white hover:text-red-500 transition-all">
                <Phone size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-red-500 shrink-0" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-red-500 shrink-0" />
                <span>(48) 99163-2244</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Horários</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Segunda - Sexta</span>
                <span className="text-white font-medium">08h - 18h</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Sábado</span>
                <span className="text-white font-medium">08h - 13h</span>
              </li>
              <li className="flex justify-between text-red-500 font-bold">
                <span>Domingo</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MF Aurum Legacy - Paixão por brilho automotivo.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
