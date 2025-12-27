import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
    Menu, X, Shield, Droplets, Zap, Eye, Car, Brush, 
    Star, CheckCircle2, Instagram, ArrowRight, MapPin, Phone, Quote, Send, ShieldCheck, Trophy
} from 'lucide-react';

// --- CONSTANTS ---
const PHONE_NUMBER = "5548991632244";
const INSTAGRAM = "@mfaurumlegacy";
const ADDRESS = "Criciúma, SC (Próximo ao Centro)";
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Olá, MF Aurum Legacy! Gostaria de solicitar um orçamento para meu carro.\n\nModelo do veículo: ")}`;

const SERVICES = [
    { id: '1', title: 'Lavagem Completa + Cera', desc: 'Lavagem detalhada da lataria, rodas e aplicação de cera.', icon: Car },
    { id: '2', title: 'Higienização Interna', desc: 'Limpeza profunda de bancos e teto com remoção de manchas.', icon: Brush },
    { id: '3', title: 'Limpeza de Motor', desc: 'Remoção técnica de gordura com proteção técnica.', icon: Zap },
    { id: '4', title: 'Proteção de Pintura', desc: 'Aplicação de selantes para brilho duradouro e proteção.', icon: Shield },
    { id: '5', title: 'Polimento de Faróis', desc: 'Restauração da transparência e segurança noturna.', icon: Eye },
    { id: '6', title: 'Vidros e Plásticos', desc: 'Revitalização e cristalização para visibilidade total.', icon: Droplets }
];

const COMBOS = [
    { id: 'dia-a-dia', name: 'Combo do Dia a Dia', tagline: 'O mais pedido', features: ['Lavagem Externa', 'Aspiração', 'Pretinho', 'Perfume'], price: 'Consulte' },
    { id: 'aurum-top', name: 'Aurum Top Brilho', tagline: 'Resultado de Novo', features: ['Lavagem Detalhada', 'Cera Carnaúba', 'Limpeza Painel', 'Descontaminação'], price: 'Orçamento' },
    { id: 'faxina-geral', name: 'Faxina Geral', tagline: 'Renovação Total', features: ['Bancos', 'Motor', 'Oxi-sanitização', 'Plásticos'], price: 'Sob Consulta' }
];

const TESTIMONIALS = [
    { id: 1, name: "João Pedro", role: "Chevrolet Onix", text: "O melhor custo-benefício de Criciúma. O carro volta parecendo que saiu da concessionária, muito capricho!", rating: 5 },
    { id: 2, name: "Mariana Costa", role: "Hyundai HB20", text: "Sempre levo meu carro lá. São rápidos, honestos e o preço é muito justo. Recomendo a lavagem com cera.", rating: 5 },
    { id: 3, name: "Carlos Alberto", role: "VW Gol G6", text: "Fiz a higienização dos bancos e ficou 100%. Tiraram manchas que eu achei que nunca iam sair.", rating: 4 }
];

// --- COMPONENTES ---

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setIsOpen(false);
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isOpen ? 'bg-black/95 py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none">
                            MF <span className="text-red-500">AURUM</span>
                        </span>
                        <span className="text-[8px] md:text-[10px] text-white/60 tracking-[0.3em] uppercase font-bold">Legacy</span>
                    </div>
                </div>
                <div className="hidden lg:flex items-center space-x-8">
                    {['home', 'about', 'services', 'gallery'].map(i => (
                        <button key={i} onClick={() => scrollTo(i)} className="text-[10px] font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
                            {i === 'home' ? 'Início' : i === 'about' ? 'Sobre' : i === 'services' ? 'Serviços' : 'Galeria'}
                        </button>
                    ))}
                    <a href={WHATSAPP_URL} target="_blank" className="bg-red-gradient px-6 py-3 rounded-lg text-[10px] font-black uppercase shadow-glow">Orçamento</a>
                </div>
                <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
            </div>
            {isOpen && (
                <div className="lg:hidden bg-black fixed inset-0 flex flex-col items-center justify-center space-y-8 text-2xl font-black uppercase z-40">
                    {['home', 'about', 'services', 'gallery'].map(i => (
                        <button key={i} onClick={() => scrollTo(i)}>{i}</button>
                    ))}
                    <a href={WHATSAPP_URL} className="bg-red-gradient px-12 py-4 rounded-xl">WhatsApp</a>
                </div>
            )}
        </nav>
    );
};

const Hero = () => (
    <section id="home" className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/75 z-10"></div>
        <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover animate-pulse-slow" alt="Lavagem" />
        <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-3xl">
                <div className="bg-red-gradient inline-block px-4 py-1 rounded-full mb-6 text-[10px] font-black uppercase reveal active">Qualidade Aurum</div>
                <h1 className="text-5xl md:text-8xl font-black leading-none mb-6 reveal active">O BRILHO <br /> QUE <span className="text-red-600 italic">DOMINA</span></h1>
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl font-light reveal active">Estética automotiva premium em Criciúma. Recupere o orgulho do seu patrimônio com o toque de ouro.</p>
                <div className="flex flex-col sm:flex-row gap-4 reveal active">
                    <a href={WHATSAPP_URL} target="_blank" className="bg-red-gradient text-white px-10 py-5 rounded-xl font-black uppercase text-xs shadow-glow hover:scale-105 transition-all text-center">Pedir Orçamento</a>
                    <button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})} className="bg-white/5 border border-white/20 text-white px-10 py-5 rounded-xl font-black uppercase text-xs hover:bg-white/10 transition-all">Ver Serviços</button>
                </div>
            </div>
        </div>
    </section>
);

const About = () => (
    <section id="about" className="py-24 bg-[#0f1115]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
                <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1620005273523-7a9159c38127?q=80&w=1200&auto=format&fit=crop" className="rounded-3xl border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Sobre" />
                    <div className="absolute -bottom-6 -right-6 bg-red-gradient p-6 rounded-2xl shadow-2xl hidden md:block">
                        <p className="text-white font-black text-3xl">100%</p>
                        <p className="text-[10px] uppercase font-bold tracking-widest">Compromisso</p>
                    </div>
                </div>
            </div>
            <div className="reveal">
                <h2 className="text-red-500 font-black uppercase text-sm mb-4">Nossa Essência</h2>
                <h3 className="text-4xl md:text-6xl font-black mb-8 italic uppercase leading-tight">Excelência <br /> em cada <span className="text-red-600">Detalhe</span></h3>
                <p className="text-gray-400 text-lg mb-6">A MF Aurum Legacy nasceu para elevar o padrão da estética automotiva em Criciúma. "Aurum" significa ouro, e é esse o valor que aplicamos em cada serviço.</p>
                <p className="text-gray-400 text-lg mb-10">Tratamos cada veículo com técnica apurada e produtos de ponta. Não é apenas limpeza, é restauração e proteção.</p>
                <div className="flex gap-8">
                    <div className="flex flex-col items-center"><ShieldCheck className="text-red-600 mb-2" /> <span className="text-[10px] font-bold uppercase">Proteção</span></div>
                    <div className="flex flex-col items-center"><Star className="text-red-600 mb-2" /> <span className="text-[10px] font-bold uppercase">Brilho</span></div>
                    <div className="flex flex-col items-center"><Trophy className="text-red-600 mb-2" /> <span className="text-[10px] font-bold uppercase">Técnica</span></div>
                </div>
            </div>
        </div>
    </section>
);

const Services = () => (
    <section id="services" className="py-24 bg-[#0a0c10]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-20 reveal">
                <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">Especialidades</h2>
                <div className="w-20 h-1 bg-red-gradient mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {SERVICES.map(s => (
                    <div key={s.id} className="bg-[#111317] p-10 rounded-3xl border border-white/5 hover:border-red-600/50 transition-all group reveal">
                        <div className="bg-red-600/10 w-16 h-16 rounded-2xl flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-600 group-hover:text-white transition-all"><s.icon size={28} /></div>
                        <h4 className="text-2xl font-black mb-4 uppercase">{s.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {COMBOS.map(combo => (
                    <div key={combo.id} className={`p-10 rounded-[2.5rem] border-2 flex flex-col ${combo.id === 'aurum-top' ? 'border-red-600 bg-[#111] scale-105 shadow-glow' : 'border-white/5 bg-transparent'} reveal`}>
                        <h5 className="text-red-500 font-black uppercase text-[10px] mb-2">{combo.tagline}</h5>
                        <h4 className="text-3xl font-black mb-6 uppercase">{combo.name}</h4>
                        <div className="space-y-4 mb-10 flex-grow">
                            {combo.features.map(f => (
                                <div key={f} className="flex items-center gap-3 text-sm text-gray-400">
                                    <CheckCircle2 size={16} className="text-red-600" />
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                        <a href={WHATSAPP_URL} target="_blank" className={`w-full py-5 rounded-2xl text-center font-black uppercase text-xs ${combo.id === 'aurum-top' ? 'bg-red-gradient' : 'bg-white/5 hover:bg-white/10'}`}>Consultar</a>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Testimonials = () => {
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={16} className={s <= rating ? 'text-red-500 fill-red-500' : 'text-gray-700'} />
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-red-500 font-bold tracking-[0.2em] mb-4 uppercase text-[10px]">Depoimentos</h3>
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight">O que dizem os clientes</h2>
          <div className="w-24 h-1 bg-red-gradient mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-[#111] p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
              <Quote className="absolute -top-2 -right-2 text-white/5 w-20 h-20 rotate-12" />
              <StarRating rating={t.rating} />
              <p className="text-gray-400 mt-6 mb-8 italic leading-relaxed">"{t.text}"</p>
              <div>
                <h5 className="text-white font-bold">{t.name}</h5>
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => (
    <section id="gallery" className="py-24 bg-[#0f1115]">
        <div className="container mx-auto px-6 text-center reveal">
            <div className="bg-[#0a0c10] p-12 md:p-24 rounded-[4rem] border border-white/5">
                <Instagram size={48} className="text-red-600 mx-auto mb-8" />
                <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase italic leading-none">Nossos Resultados</h2>
                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">Confira o brilho de centenas de carros que já passaram pelas nossas mãos diretamente em nosso Instagram.</p>
                <a href={`https://instagram.com/${INSTAGRAM.replace('@','')}`} target="_blank" className="bg-red-gradient px-12 py-6 rounded-2xl inline-flex items-center gap-4 text-xl font-black uppercase shadow-glow hover:scale-105 transition-all">Seguir {INSTAGRAM} <ArrowRight /></a>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16">
            <div>
                <h4 className="text-2xl font-black mb-6 uppercase">MF <span className="text-red-500">AURUM</span></h4>
                <p className="text-gray-500 leading-relaxed mb-8">Estética automotiva de elite em Criciúma. O cuidado que seu carro merece, o legado que você confia.</p>
                <div className="flex gap-4">
                   <a href={`https://instagram.com/${INSTAGRAM.replace('@','')}`} target="_blank" className="hover:text-red-500 cursor-pointer transition-colors"><Instagram /></a>
                   <a href={WHATSAPP_URL} target="_blank" className="hover:text-red-500 cursor-pointer transition-colors"><Phone /></a>
                </div>
            </div>
            <div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-red-500">Onde estamos</h4>
                <p className="text-gray-400 flex gap-4 items-start"><MapPin className="text-red-600" /> {ADDRESS}</p>
                <p className="text-gray-400 mt-4 flex gap-4 items-center"><Phone className="text-red-600" /> (48) 99163-2244</p>
            </div>
            <div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-red-500">Atendimento</h4>
                <ul className="text-gray-400 space-y-2 text-sm">
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Seg - Sex</span> <span className="text-white font-bold">08:00 - 18:00</span></li>
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Sábados</span> <span className="text-white font-bold">08:00 - 13:00</span></li>
                    <li className="text-red-600 italic uppercase font-black">Domingos: Fechado</li>
                </ul>
            </div>
        </div>
        <div className="text-center mt-20 text-[10px] text-white/20 uppercase tracking-[0.5em]">© MF Aurum Legacy - Criciúma / SC</div>
    </footer>
);

const App = () => {
    useEffect(() => {
        const obs = new IntersectionObserver((es) => {
            es.forEach(e => e.isIntersecting && e.target.classList.add('active'));
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <div className="py-12 bg-red-gradient overflow-hidden border-y border-white/10">
                <div className="animate-marquee whitespace-nowrap">
                    {[1,2,3,4,5].map(i => (
                        <span key={i} className="text-2xl md:text-5xl font-black mx-12 uppercase italic">Estética Automotiva de Elite • MF Aurum Legacy •</span>
                    ))}
                </div>
            </div>
            <About />
            <Services />
            <Testimonials />
            <Gallery />
            <section className="py-24 bg-white text-black text-center relative overflow-hidden">
                <div className="container mx-auto px-6 reveal">
                    <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase leading-tight">VEM DAR <br /> AQUELE <span className="text-red-600 italic">TALENTO</span>!</h2>
                    <p className="text-gray-500 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed italic">Transforme seu carro hoje mesmo com quem entende de brilho real.</p>
                    <a href={WHATSAPP_URL} target="_blank" className="bg-red-gradient text-white px-16 py-8 rounded-[2rem] text-xl font-black uppercase shadow-2xl hover:scale-110 transition-all inline-block">Agendar WhatsApp</a>
                </div>
            </section>
            <Footer />
            <a href={WHATSAPP_URL} target="_blank" className="fixed bottom-8 right-8 z-[100] bg-[#25D366] p-5 rounded-[2rem] shadow-2xl hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.088.275.073.376-.043.101-.116.433-.506.548-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
                </svg>
            </a>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}