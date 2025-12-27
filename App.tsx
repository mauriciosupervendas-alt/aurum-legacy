import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Trophy } from 'lucide-react';

const App: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#DC2626] selection:text-white">
      <Navbar />
      <Hero />
      
      {/* Banner Rotativo Racing Red */}
      <div className="py-10 bg-red-gradient overflow-hidden border-y border-white/10 relative z-30">
        <div className="animate-marquee whitespace-nowrap flex">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex items-center mx-10">
              <span className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tighter">MF AURUM LEGACY •</span>
              <span className="mx-6 text-white/50"><Trophy size={24} /></span>
              <span className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tighter">EXCELÊNCIA EM ESTÉTICA AUTOMOTIVA •</span>
            </div>
          ))}
        </div>
      </div>

      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;