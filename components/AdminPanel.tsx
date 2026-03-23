import React, { useState, useEffect } from 'react';
import { Trash2, Lock, Calendar, Clock, Image, Search, X, Settings, ArrowLeft, MessageSquare, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContentEditor from './ContentEditor';
import { useContent } from '../contexts/ContentContext';

const AdminPanel: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'photos' | 'settings' | 'testimonials'>('appointments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string; carModel: string } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, message: '', onConfirm: () => {} });
  const { content, updateContent, refreshContent } = useContent();

  useEffect(() => {
    if (activeTab === 'testimonials') {
      refreshContent();
    }
  }, [activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '6002') {
      setIsAuthenticated(true);
      fetchAppointments();
    } else {
      alert('Senha incorreta');
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Fetch full details from admin endpoint
      const res = await fetch(`/api/admin/appointments?password=6002`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch admin appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (date: string, time: string) => {
    setConfirmModal({
      isOpen: true,
      message: `Tem certeza da exclusão?`,
      onConfirm: async () => {
        try {
          const res = await fetch('/api/appointments', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time, password: '6002' })
          });

          if (res.ok) {
            alert('Agendamento excluído com sucesso');
            fetchAppointments();
          } else {
            alert('Erro ao excluir agendamento');
          }
        } catch (error) {
          console.error('Error cancelling appointment:', error);
        }
      }
    });
  };

  const saveContent = async (newContent: any) => {
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: '6002',
          content: newContent
        })
      });

      if (res.ok) {
        updateContent(newContent);
      } else {
        alert('Erro ao salvar alterações.');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Erro ao salvar alterações.');
    }
  };

  const handleTestimonialStatus = (id: number, status: 'approved' | 'rejected') => {
    const updatedTestimonials = content.testimonials.map(t => 
      t.id === id ? { ...t, status } : t
    );
    const newContent = { ...content, testimonials: updatedTestimonials };
    saveContent(newContent);
  };

  const handleDeleteTestimonial = (id: number) => {
    setConfirmModal({
      isOpen: true,
      message: 'Tem certeza da exclusão?',
      onConfirm: () => {
        const updatedTestimonials = content.testimonials.filter(t => t.id !== id);
        const newContent = { ...content, testimonials: updatedTestimonials };
        saveContent(newContent);
      }
    });
  };

  // Filter based on search term for both tabs
  const filteredAppointments = appointments.filter(app => {
    const search = searchTerm.toLowerCase();
    return (
      app.name.toLowerCase().includes(search) ||
      app.carModel.toLowerCase().includes(search) ||
      app.date.includes(search)
    );
  });

  // Filter appointments with photos for the gallery tab
  const filteredPhotos = filteredAppointments.filter(app => app.photoLinks && app.photoLinks.length > 0);

  // Filter testimonials
  const pendingTestimonials = content.testimonials.filter(t => t.status === 'pending');
  const processedTestimonials = content.testimonials.filter(t => t.status !== 'pending');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4 relative">
        <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
          <div className="p-2 bg-[#16191f] rounded-lg border border-white/10 group-hover:border-red-500/50 transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider hidden md:inline">Voltar ao Site</span>
        </Link>

        <form onSubmit={handleLogin} className="bg-[#16191f] p-8 rounded-2xl border border-white/10 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center text-red-500">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Área Administrativa</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de Acesso"
            className="w-full bg-black border border-white/10 p-4 text-white rounded-xl mb-4 outline-none focus:border-red-600 transition-colors"
          />
          <button
            type="submit"
            className="w-full bg-red-gradient text-white font-bold py-4 rounded-xl uppercase tracking-widest hover:shadow-lg transition-all"
          >
            Acessar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] p-4 md:p-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors p-2 bg-[#16191f] rounded-lg border border-white/10 hover:border-red-500/50 hover:text-red-500" title="Voltar ao Site">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-white uppercase">Painel Admin</h1>
          </div>
          
          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            <div className="flex flex-wrap justify-center bg-[#16191f] p-1 rounded-lg border border-white/10 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'appointments' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <Calendar size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Agendamentos</span>
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'photos' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <Image size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Fotos</span>
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'testimonials' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <MessageSquare size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Avaliações</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'settings' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <Settings size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Config</span>
              </button>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="text-gray-400 hover:text-white text-sm uppercase font-bold tracking-wider md:ml-auto">Sair</button>
          </div>
        </div>

        {loading ? (
          <div className="text-white text-center py-12">Carregando dados...</div>
        ) : (
          <>
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome, carro ou data..."
                    className="w-full bg-[#16191f] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-colors"
                  />
                </div>

                <div className="grid gap-4">
                  {filteredAppointments.length === 0 ? (
                    <div className="text-gray-500 text-center py-12 border border-dashed border-white/10 rounded-2xl">
                      {searchTerm ? 'Nenhum agendamento encontrado para sua busca.' : 'Nenhum agendamento encontrado.'}
                    </div>
                  ) : (
                    filteredAppointments.map((app, index) => (
                      <div key={index} className="bg-[#16191f] p-6 rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-red-500/30 transition-all">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-bold text-lg">{app.name}</span>
                            <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded uppercase tracking-wider">{app.carModel}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="text-red-500" />
                              <span>{app.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="text-red-500" />
                              <span>{app.time} ({app.duration || 60} min)</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 italic">
                            {app.packageName} • {app.objective}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {app.photoLinks && app.photoLinks.length > 0 && (
                            <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 flex items-center gap-1">
                              <Image size={12} /> {app.photoLinks.length} fotos
                            </span>
                          )}
                          <button
                            onClick={() => handleCancel(app.date, app.time)}
                            className="p-3 bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                            title="Cancelar Agendamento"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome do cliente ou modelo do carro..."
                    className="w-full bg-[#16191f] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-colors"
                  />
                </div>

                {filteredPhotos.length === 0 ? (
                  <div className="text-gray-500 text-center py-12 border border-dashed border-white/10 rounded-2xl">
                    {searchTerm ? 'Nenhuma foto encontrada para sua busca.' : 'Nenhuma foto enviada pelos clientes ainda.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPhotos.map((app, appIndex) => (
                      <div key={appIndex} className="bg-[#16191f] rounded-xl border border-white/5 overflow-hidden group hover:border-red-500/30 transition-all">
                        <div className="p-4 border-b border-white/5 bg-black/20">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-white font-bold text-sm">{app.name}</h3>
                              <p className="text-red-500 text-xs font-bold uppercase tracking-wider mt-1">{app.carModel}</p>
                            </div>
                            <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded">{app.date}</span>
                          </div>
                        </div>
                        
                        <div className="p-4 grid grid-cols-2 gap-2">
                          {app.photoLinks.map((link: string, photoIndex: number) => (
                            <div 
                              key={photoIndex} 
                              className="aspect-square rounded-lg overflow-hidden relative cursor-pointer group/img"
                              onClick={() => setSelectedImage({ url: link, name: app.name, carModel: app.carModel })}
                            >
                              <img 
                                src={link} 
                                alt={`Foto de ${app.name}`} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" 
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <Search size={20} className="text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-3 bg-black/40 text-[10px] text-gray-500 border-t border-white/5 truncate">
                          {app.objective}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                {/* Pending Reviews */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                    Pendentes de Aprovação
                  </h3>
                  
                  {pendingTestimonials.length === 0 ? (
                    <div className="text-gray-500 text-center py-8 border border-dashed border-white/10 rounded-xl bg-[#16191f]/50">
                      Nenhuma avaliação pendente no momento.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pendingTestimonials.map((t) => (
                        <div key={t.id} className="bg-[#16191f] p-6 rounded-xl border border-yellow-500/20 relative group">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-white font-bold">{t.name}</h4>
                              <p className="text-gray-500 text-xs uppercase tracking-wider">{t.role}</p>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(s => (
                                <span key={s} className={`text-xs ${s <= t.rating ? 'text-yellow-500' : 'text-gray-700'}`}>★</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm italic mb-6">"{t.text}"</p>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleTestimonialStatus(t.id, 'approved')}
                              className="flex-1 bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                            >
                              <Check size={14} /> Aprovar
                            </button>
                            <button 
                              onClick={() => handleTestimonialStatus(t.id, 'rejected')}
                              className="flex-1 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                            >
                              <X size={14} /> Rejeitar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* History */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 border-t border-white/10 pt-8">Histórico</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {processedTestimonials.map((t) => (
                      <div key={t.id} className={`bg-[#16191f] p-4 rounded-xl border ${t.status === 'approved' ? 'border-green-500/20' : 'border-red-500/20'} opacity-75 hover:opacity-100 transition-opacity`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-white font-bold text-sm">{t.name}</h4>
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider">{t.role}</p>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${t.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {t.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs italic mb-4 line-clamp-2">"{t.text}"</p>
                        
                        <div className="flex justify-end gap-2">
                          {t.status === 'rejected' && (
                            <button 
                              onClick={() => handleTestimonialStatus(t.id, 'approved')}
                              className="text-green-500 hover:text-green-400 text-[10px] font-bold uppercase"
                            >
                              Reaprovar
                            </button>
                          )}
                          {t.status === 'approved' && (
                            <button 
                              onClick={() => handleTestimonialStatus(t.id, 'rejected')}
                              className="text-yellow-500 hover:text-yellow-400 text-[10px] font-bold uppercase"
                            >
                              Ocultar
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="text-red-500 hover:text-red-400 text-[10px] font-bold uppercase ml-2"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <ContentEditor password={password} />
            )}
          </>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10">
            <X size={32} />
          </button>
          <div className="relative max-w-full max-h-[90vh] flex flex-col items-center">
            <img 
              src={selectedImage.url} 
              alt={`Foto de ${selectedImage.name}`} 
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 bg-[#16191f] border border-white/10 px-6 py-3 rounded-xl flex flex-col items-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-bold text-lg">{selectedImage.name}</h3>
              <p className="text-red-500 font-bold uppercase text-sm tracking-widest">{selectedImage.carModel}</p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16191f] border border-white/10 p-6 rounded-2xl max-w-sm w-full shadow-2xl transform scale-100 transition-all">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Confirmação</h3>
            <p className="text-gray-300 text-center mb-8">{confirmModal.message}</p>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className="flex-1 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-white/5 text-gray-400 hover:bg-white/10 transition-colors"
              >
                Não
              </button>
              <button
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal({ ...confirmModal, isOpen: false });
                }}
                className="flex-1 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20 transition-colors"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
