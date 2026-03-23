import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Camera, Calendar, Clock, User, Car, Check, ChevronRight, ChevronLeft, Upload } from 'lucide-react';
import Fuse from 'fuse.js';
import { CAR_MODELS } from '../constants';
import { useContent } from '../contexts/ContentContext';

interface Combo {
  id: string;
  name: string;
  priceStart: string;
  durationMinutes: number;
  features?: string[]; // Added features to interface as it might be used
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Combo | null;
  selectedAddOns: string[];
}

const OBJECTIVES = ['Venda', 'Compra Recente', 'Conforto', 'Outro'];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', 
  '13:30', '14:30', '15:30', '16:30'
];

type VehicleCategory = 'SMALL' | 'MEDIUM' | 'LARGE';

const getVehicleCategory = (model: string): VehicleCategory => {
  const lowerModel = model.toLowerCase();
  if (!lowerModel) return 'SMALL';
  
  const largeKeywords = [
    's10', 'trailblazer', 'silverado', 'd20', 'veraneio', 'bonanza', 'a10', 'c10', 'd10',
    'amarok', 'touareg', 'kombi', 'id.buzz',
    'toro', 'titano', 'ducato', 'scudo',
    'santa fe', 'palisade', 'veracruz', 'hr', 'equus',
    'hilux', 'sw4', 'land cruiser', 'prado', 'sequoia', 'tundra', 'tacoma', 'previa',
    'pilot', 'ridgeline', 'odyssey',
    'commander', 'wrangler', 'gladiator', 'grand cherokee',
    'frontier', 'pathfinder', 'murano',
    'master', 'trafic',
    'ranger', 'maverick', 'f-150', 'transit', 'edge', 'f-1000', 'f-250', 'f-100',
    'expert', 'boxer',
    'jumpy', 'jumper',
    'l200', 'pajero', 'outlander',
    'ram', '1500', '2500', '3500', 'classic',
    'defender', 'discovery', 'range rover',
    'xc90',
    'q7', 'q8',
    'x5', 'x6', 'x7',
    'gle', 'gls', 'g-class', 'sprinter',
    'cayenne',
    'carnival', 'mohave', 'bongo',
    'macan', 'caminhonete', 'pickup', 'van', 'suv grande'
  ];

  const mediumKeywords = [
    'onix plus', 'tracker', 'spin', 'equinox', 'cruze', 'cobalt', 'captiva', 'vectra', 'astra', 'omega', 'monza', 'opala', 'corsa sedan', 'corsa wagon',
    't-cross', 'nivus', 'virtus', 'taos', 'tiguan', 'jetta', 'golf', 'voyage', 'spacefox', 'parati', 'santana', 'passat', 'bora', 'pointer', 'apollo', 'variant',
    'fastback', 'cronos', 'siena', 'grand siena', 'linea', 'doblo', 'weekend', 'marea', 'tempra', 'tipo', 'elba', 'premio',
    'creta', 'tucson', 'azera', 'sonata', 'elantra', 'ix35',
    'corolla', 'yaris', 'rav4', 'camry', 'prius', 'fielder',
    'hr-v', 'city', 'civic', 'zr-v', 'cr-v', 'accord',
    'compass', 'renegade', 'cherokee', 'patriot', 'liberty',
    'kicks', 'versa', 'sentra', 'tiida', 'livina', 'x-trail', 'altima', 'maxima',
    'duster', 'oroch', 'logan', 'captur', 'kangoo', 'megane', 'fluence', 'symbol', 'scénic', 'laguna',
    'bronco', 'territory', 'fusion', 'escort', 'verona', 'versailles', 'del rey', 'corcel', 'galaxie', 'landau', 'belina', 'pampa', 'royale',
    '2008', '3008', 'partner', '408', '508', '307', '405', '504',
    'c4', 'c5', 'aircross', 'picasso', 'berlingo', 'xantia', 'xsara',
    'eclipse', 'asx', 'lancer', 'galant',
    'evoque', 'velar',
    'xc60', 'xc40', 's60', 's90', 'v60',
    'q3', 'q5', 'a3 sedan', 'a4', 'a5', 'a6', 'a7', 'a8',
    'x1', 'x2', 'x3', 'x4', 'série 3', 'série 5', 'série 7',
    'gla', 'glb', 'glc', 'classe c', 'classe e', 'classe s', 'cla',
    'panamera', 'taycan',
    'sportage', 'sorento', 'cerato', 'optima', 'cadenza', 'stinger', 'carens',
    'suv', 'sedan', 'sedã', 'perua'
  ];

  if (largeKeywords.some(kw => lowerModel.includes(kw))) return 'LARGE';
  if (mediumKeywords.some(kw => lowerModel.includes(kw))) return 'MEDIUM';
  
  return 'SMALL';
};

const getVehiclePriceMultiplier = (category: VehicleCategory): number => {
  switch (category) {
    case 'LARGE': return 1.4;
    case 'MEDIUM': return 1.2;
    case 'SMALL':
    default: return 1.0;
  }
};

const getCategoryLabel = (category: VehicleCategory): string => {
  switch (category) {
    case 'LARGE': return 'Caminhonete / Veículo Grande';
    case 'MEDIUM': return 'SUV / Sedan';
    case 'SMALL':
    default: return 'Carro Pequeno / Hatch';
  }
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedPackage, selectedAddOns }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    carModel: '',
    objective: '',
    date: null as Date | null,
    time: '',
    photos: [] as File[]
  });
  const [isCustomObjective, setIsCustomObjective] = useState(false);
  const { content } = useContent();
  
  // Car Suggestions State
  const [carSuggestions, setCarSuggestions] = useState<string[]>([]);
  const [showCarSuggestions, setShowCarSuggestions] = useState(false);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isUploading, setIsUploading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<{date: string, time: string, duration?: number}[]>([]);
  
  const timeSlotsRef = useRef<HTMLDivElement>(null);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  // Fetch booked slots
  useEffect(() => {
    if (isOpen) {
      fetch('/api/appointments')
        .then(res => res.json())
        .then(data => setBookedSlots(data))
        .catch(err => console.error('Failed to fetch appointments:', err));
    }
  }, [isOpen]);

  // Calculate Totals
  const totals = useMemo(() => {
    if (!selectedPackage) return { price: 0, duration: 0, category: 'SMALL' as VehicleCategory };
    
    // Determine category and multiplier
    const category = getVehicleCategory(formData.carModel);
    const multiplier = getVehiclePriceMultiplier(category);

    let totalPrice = 0;
    let totalDuration = 0;

    // Package pricing
    if ((selectedPackage as any).categoryPricing && (selectedPackage as any).categoryPricing[category]) {
      const catPrice = (selectedPackage as any).categoryPricing[category].price;
      totalPrice += parseInt(catPrice.replace(/\D/g, '')) / 100;
      totalDuration += (selectedPackage as any).categoryPricing[category].durationMinutes;
    } else {
      let basePackagePrice = parseInt(selectedPackage.priceStart.replace(/\D/g, '')) / 100;
      totalPrice += basePackagePrice * multiplier;
      totalDuration += selectedPackage.durationMinutes || 0;
    }

    selectedAddOns.forEach(id => {
      const addon = content.addOns.find(a => a.id === id);
      if (addon) {
        if ((addon as any).categoryPricing && (addon as any).categoryPricing[category]) {
          const catPrice = (addon as any).categoryPricing[category].price;
          totalPrice += parseInt(catPrice.replace(/\D/g, '')) / 100;
          totalDuration += (addon as any).categoryPricing[category].durationMinutes;
        } else {
          let baseAddonPrice = parseInt(addon.price.replace(/\D/g, '')) / 100;
          totalPrice += baseAddonPrice * multiplier;
          totalDuration += addon.durationMinutes || 0;
        }
      }
    });

    return {
      price: totalPrice,
      duration: totalDuration,
      category
    };
  }, [selectedPackage, selectedAddOns, content.addOns, formData.carModel]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  };

  // Initialize Fuse for fuzzy search
  const fuse = useMemo(() => new Fuse(CAR_MODELS, {
    includeScore: true,
    threshold: 0.4, // 0.0 is perfect match, 1.0 is match anything. 0.4 is a good balance for typos.
  }), []);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !selectedPackage) return null;

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files || [])]
      }));
    }
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Padding for empty days at start
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const handleSendToWhatsApp = async () => {
    setIsUploading(true);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('carModel', formData.carModel);
      data.append('objective', formData.objective);
      data.append('date', formData.date ? formData.date.toLocaleDateString('pt-BR') : '');
      data.append('time', formData.time);
      data.append('duration', totals.duration.toString()); // Send duration
      data.append('packageName', selectedPackage.name);
      data.append('packagePrice', selectedPackage.priceStart);
      
      const addOnsNames = content.addOns
        .filter(addon => selectedAddOns.includes(addon.id))
        .map(addon => addon.name)
        .join(', ');
      data.append('addOns', addOnsNames);

      formData.photos.forEach(photo => {
        data.append('photos', photo);
      });

      const response = await fetch('/api/schedule', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        // Update local state to reflect new booking immediately
        if (formData.date) {
            setBookedSlots(prev => [...prev, { 
                date: formData.date!.toLocaleDateString('pt-BR'), 
                time: formData.time,
                duration: totals.duration
            }]);
        }
        
        // Construct WhatsApp Message
        const phone = content.contact.phone.replace(/\D/g, '');
        const message = `*Novo Agendamento - MF Aurum Legacy*

*Cliente:* ${formData.name}
*Veículo:* ${formData.carModel} (${getCategoryLabel(totals.category)})
*Objetivo:* ${formData.objective}

*Serviço:* ${selectedPackage.name}
*Adicionais:* ${addOnsNames || 'Nenhum'}

*Data:* ${formData.date?.toLocaleDateString('pt-BR')}
*Horário:* ${formData.time}
*Duração Est.:* ${formatDuration(totals.duration)}

*Valor Total:* R$ ${totals.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

_Agendamento realizado via site_`;

        const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
        
        alert('Agendamento realizado com sucesso! Você será redirecionado para o WhatsApp.');
        window.open(whatsappUrl, '_blank');
        onClose();
      } else {
        alert('Erro ao realizar agendamento. Tente novamente.');
      }
    } catch (error) {
      console.error('Error scheduling:', error);
      alert('Erro ao realizar agendamento. Verifique sua conexão.');
    } finally {
      setIsUploading(false);
    }
  };

  const getRequiredPhotos = () => {
    const isStandalone = selectedPackage.id === 'standalone-addons';
    let photos: string[] = [];

    if (!isStandalone) {
      photos = [
        'Frente e Traseira (pegando placa e parachoques)',
        'Laterais completas',
        'Interior (Bancos e Painel)',
        'Detalhe do que mais incomoda (riscos, manchas, etc)'
      ];
    }

    if (selectedAddOns.includes('motor') || (!isStandalone && selectedPackage?.features?.some(f => f.includes('Motor')))) {
      if (!photos.includes('Cofre do Motor (aberto)')) photos.push('Cofre do Motor (aberto)');
    }

    if (selectedAddOns.includes('higienizacao-bancos') || selectedAddOns.includes('hidratacao-couro') || selectedAddOns.includes('impermeabilizacao') || (!isStandalone && selectedPackage?.features?.some(f => f.includes('Bancos')))) {
      if (!photos.includes('Detalhe dos Bancos (manchas/sujeira)')) photos.push('Detalhe dos Bancos (manchas/sujeira)');
    }

    if (selectedAddOns.includes('farois')) {
      if (!photos.includes('Close nos Faróis')) photos.push('Close nos Faróis');
    }

    if (selectedAddOns.includes('chuva-acida')) {
      if (!photos.includes('Vidros contra a luz (para ver manchas)')) photos.push('Vidros contra a luz (para ver manchas)');
    }

    if (isStandalone) {
      if (selectedAddOns.includes('polimento') || selectedAddOns.includes('vitrificacao') || selectedAddOns.includes('descontaminacao')) {
        if (!photos.includes('Frente e Traseira (pegando placa e parachoques)')) photos.push('Frente e Traseira (pegando placa e parachoques)');
        if (!photos.includes('Laterais completas')) photos.push('Laterais completas');
        if (!photos.includes('Detalhe do que mais incomoda (riscos, manchas, etc)')) photos.push('Detalhe do que mais incomoda (riscos, manchas, etc)');
      }
    }

    if (isStandalone && photos.length === 0) {
      photos.push('Detalhe do que mais incomoda (riscos, manchas, etc)');
    }

    return photos;
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white uppercase mb-2">Seus Dados</h3>
        <p className="text-gray-400 text-sm">Conte-nos um pouco sobre você e o carro.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Seu Nome</label>
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              value={formData.name}
              onChange={e => {
                const val = e.target.value;
                // Allow only letters and spaces (including accented characters)
                if (/^[a-zA-ZÀ-ÿ\s]*$/.test(val)) {
                  setFormData({...formData, name: val});
                }
              }}
              onFocus={handleInputFocus}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-red-500 focus:outline-none transition-colors"
              placeholder="Como gostaria de ser chamado?"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Modelo do Veículo</label>
          <div className="relative">
            <Car size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              value={formData.carModel}
              onChange={e => {
                const val = e.target.value;
                setFormData({...formData, carModel: val});
                if (val.length > 0) {
                  // Use Fuse.js for fuzzy search
                  const results = fuse.search(val);
                  // Limit to top 5 suggestions
                  const filtered = results.slice(0, 5).map(result => result.item);
                  setCarSuggestions(filtered);
                  setShowCarSuggestions(true);
                } else {
                  setShowCarSuggestions(false);
                }
              }}
              onFocus={(e) => {
                if (formData.carModel.length > 0) setShowCarSuggestions(true);
                handleInputFocus(e);
              }}
              onBlur={() => setTimeout(() => setShowCarSuggestions(false), 200)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-red-500 focus:outline-none transition-colors"
              placeholder="Digite o modelo do carro ou moto..."
            />
            
            {/* Suggestions Dropdown */}
            {showCarSuggestions && carSuggestions.length > 0 && (
              <div className="absolute z-50 w-full bg-[#16191f] border border-white/10 rounded-xl mt-1 max-h-48 overflow-y-auto shadow-xl custom-scrollbar">
                {carSuggestions.map((car, index) => (
                  <div 
                    key={index}
                    className="px-4 py-3 hover:bg-white/5 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors border-b border-white/5 last:border-0"
                    onClick={() => {
                      setFormData({...formData, carModel: car});
                      setShowCarSuggestions(false);
                    }}
                  >
                    {car}
                  </div>
                ))}
              </div>
            )}
          </div>
          {formData.carModel.length > 2 && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Categoria identificada: <span className="font-bold text-white">{getCategoryLabel(totals.category)}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-3 ml-1">Qual seu objetivo com o carro?</label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {OBJECTIVES.map(obj => {
              const isSelected = obj === 'Outro' ? isCustomObjective : formData.objective === obj && !isCustomObjective;
              return (
                <button
                  key={obj}
                  onClick={() => {
                    if (obj === 'Outro') {
                      setIsCustomObjective(true);
                      setFormData({...formData, objective: ''});
                    } else {
                      setIsCustomObjective(false);
                      setFormData({...formData, objective: obj});
                    }
                  }}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${isSelected ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                >
                  {obj}
                </button>
              );
            })}
          </div>
          
          {isCustomObjective && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              <input 
                type="text" 
                value={formData.objective}
                onChange={e => setFormData({...formData, objective: e.target.value})}
                onFocus={handleInputFocus}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Descreva seu objetivo (Ex: Remover riscos, vender rápido...)"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
      {/* Resumo do Pedido - New Section */}
      <div className="bg-red-600/10 border border-red-500/20 rounded-2xl p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Serviços escolhidos a partir de:</span>
            <span className="text-2xl font-black text-white italic">
              R$ {totals.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
            <Clock size={20} className="text-red-500" />
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase block">Tempo Estimado</span>
              <span className="text-sm font-black text-white uppercase italic">~ {formatDuration(totals.duration)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white uppercase mb-2">Avaliação Visual</h3>
        <p className="text-gray-400 text-sm">Para um orçamento preciso, precisamos ver o estado atual do veículo.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Camera size={16} className="text-red-500" />
              Fotos Necessárias
            </h4>
            <ul className="text-xs text-gray-400 space-y-2 mb-4">
              {getRequiredPhotos().map((photo, index) => (
                <li key={index}>• {photo}</li>
              ))}
            </ul>
            
            <label className="block w-full cursor-pointer group">
              <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center group-hover:border-red-500/50 transition-colors bg-black/20">
                <Upload size={24} className="text-gray-500 group-hover:text-red-500 mb-2 transition-colors" />
                <span className="text-xs text-gray-400 group-hover:text-white text-center">
                  Clique para adicionar fotos<br/>
                  <span className="text-[10px] opacity-60">{formData.photos.length} fotos selecionadas</span>
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const isSlotAvailable = (timeStr: string, durationMinutes: number, date: Date | null) => {
    if (!date) return false;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    const slotTimeInMinutes = hours * 60 + minutes;
    const endTimeInMinutes = slotTimeInMinutes + durationMinutes;
    
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Sunday closed
    if (dayOfWeek === 0) return false;
    
    // Saturday: Closes at 13:00
    if (dayOfWeek === 6) {
        const closingTime = 13 * 60;
        return endTimeInMinutes <= closingTime;
    }
    
    // Mon-Fri: Closes at 18:00
    const closingTime = 18 * 60;
    
    // Check if it fits within business hours
    return endTimeInMinutes <= closingTime;
  };

  const checkOverlap = (slotTime: string, slotDuration: number, bookedSlots: {date: string, time: string, duration?: number}[], selectedDate: Date | null) => {
    if (!selectedDate) return false;
    const selectedDateStr = selectedDate.toLocaleDateString('pt-BR');

    const [slotH, slotM] = slotTime.split(':').map(Number);
    const slotStart = slotH * 60 + slotM;
    const slotEnd = slotStart + slotDuration;

    return bookedSlots.some(booked => {
        if (booked.date !== selectedDateStr) return false;

        const [bookedH, bookedM] = booked.time.split(':').map(Number);
        const bookedStart = bookedH * 60 + bookedM;
        const bookedDuration = booked.duration || 60; // Default to 60 min if not present
        const bookedEnd = bookedStart + bookedDuration;

        // Check for overlap: (StartA < EndB) and (StartB < EndA)
        return (slotStart < bookedEnd) && (bookedStart < slotEnd);
    });
  };

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white uppercase mb-2">Agendamento</h3>
        <p className="text-gray-400 text-sm">Escolha o melhor dia e horário para trazer seu legado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-1 hover:text-red-500 text-white">
              <ChevronLeft size={20} />
            </button>
            <span className="text-white font-bold capitalize">
              {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-1 hover:text-red-500 text-white">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
              <span key={i} className="text-[10px] text-gray-500 font-bold">{d}</span>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((date, i) => {
              if (!date) return <div key={i} />;
              const isSelected = formData.date?.toDateString() === date.toDateString();
              const isPast = date < new Date(new Date().setHours(0,0,0,0));
              const isSunday = date.getDay() === 0;
              
              return (
                <button
                  key={i}
                  disabled={isPast || isSunday}
                  onClick={() => {
                    setFormData({...formData, date, time: ''});
                    setTimeout(() => {
                      timeSlotsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className={`
                    aspect-square rounded-lg text-xs font-medium flex items-center justify-center transition-all
                    ${isSelected ? 'bg-red-600 text-white shadow-lg scale-110' : 'text-gray-300 hover:bg-white/10'}
                    ${(isPast || isSunday) ? 'opacity-20 cursor-not-allowed' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="flex flex-col" ref={timeSlotsRef}>
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Clock size={16} className="text-red-500" />
            Horários Disponíveis
            {formData.date && <span className="text-gray-500 font-normal text-xs ml-auto">{formData.date.toLocaleDateString('pt-BR')}</span>}
          </h4>
          
          {!formData.date ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-xs italic border border-dashed border-white/10 rounded-xl">
              Selecione uma data primeiro
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 content-start">
              {TIME_SLOTS.map(time => {
                const isOverlapping = checkOverlap(time, totals.duration, bookedSlots, formData.date);
                const isDurationValid = isSlotAvailable(time, totals.duration, formData.date);
                const isDisabled = isOverlapping || !isDurationValid;
                
                return (
                  <button
                    key={time}
                    disabled={isDisabled}
                    onClick={() => setFormData({...formData, time})}
                    className={`
                      py-2 px-3 rounded-lg text-sm font-medium border transition-all relative overflow-hidden
                      ${isDisabled 
                        ? 'bg-white/5 border-white/5 text-gray-600 cursor-not-allowed opacity-50' 
                        : formData.time === time 
                          ? 'bg-white text-black border-white' 
                          : 'bg-transparent border-white/20 text-gray-300 hover:border-red-500 hover:text-red-500'
                      }
                    `}
                  >
                    {time}
                    {!isDurationValid && !isOverlapping && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/80 text-[8px] text-red-500 font-bold uppercase tracking-widest">
                        Tempo Insuficiente
                      </span>
                    )}
                    {isOverlapping && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/80 text-[8px] text-gray-500 font-bold uppercase tracking-widest">
                        Reservado
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#0f1115] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#16191f]">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Agendar Serviço</h2>
            <p className="text-xs text-red-500 font-bold mt-1">
              {selectedPackage.name}
              {selectedPackage.id !== 'standalone-addons' && ` • A partir de R$ ${totals.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/5">
          <div 
            className="h-full bg-red-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-[#16191f] flex justify-between items-center">
          {step > 1 ? (
            <button 
              onClick={handleBack}
              className="px-6 py-3 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Voltar
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button 
              onClick={handleNext}
              disabled={step === 1 && (!formData.name || !formData.carModel || !formData.objective)}
              className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Próximo <ChevronRight size={14} />
            </button>
          ) : (
            <button 
              onClick={handleSendToWhatsApp}
              disabled={!formData.date || !formData.time || isUploading}
              className="bg-red-gradient text-white px-8 py-3 rounded-xl font-black text-xs tracking-widest uppercase hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-red-900/20"
            >
              {isUploading ? 'Enviando...' : 'Confirmar no WhatsApp'} <Check size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
