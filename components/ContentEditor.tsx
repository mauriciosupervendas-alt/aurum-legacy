import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash, ChevronDown, ChevronUp } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface ContentEditorProps {
  password: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ password }) => {
  const { content, updateContent } = useContent();
  const [editableContent, setEditableContent] = useState(content);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('contact');
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, message: '', onConfirm: () => {} });
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ isOpen: false, message: '', type: 'success' });

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ isOpen: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, isOpen: false })), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          content: editableContent
        })
      });

      if (res.ok) {
        updateContent(editableContent);
        showNotification('Conteúdo atualizado com sucesso!', 'success');
      } else {
        showNotification('Erro ao salvar conteúdo.', 'error');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      showNotification('Erro ao salvar conteúdo.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateContact = (field: string, value: string) => {
    setEditableContent(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  // Generic helper to update items in an array
  const updateItem = (section: 'combos' | 'addOns' | 'testimonials' | 'services', index: number, field: string, value: any) => {
    setEditableContent(prev => {
      const newArray = [...prev[section]];
      const item = { ...newArray[index], [field]: value };
      
      // Sync base fields to SMALL category if categoryPricing exists
      if ((section === 'combos' || section === 'addOns') && (item as any).categoryPricing) {
        if (field === 'priceStart' || field === 'price') {
          item.categoryPricing = {
            ...item.categoryPricing,
            SMALL: { ...item.categoryPricing.SMALL, price: value }
          };
        } else if (field === 'durationMinutes') {
          item.categoryPricing = {
            ...item.categoryPricing,
            SMALL: { ...item.categoryPricing.SMALL, durationMinutes: value }
          };
        }
      }
      
      newArray[index] = item;
      return { ...prev, [section]: newArray };
    });
  };

  const updateCategoryPricing = (section: 'combos' | 'addOns', index: number, category: 'SMALL' | 'MEDIUM' | 'LARGE', field: 'price' | 'durationMinutes', value: any) => {
    setEditableContent(prev => {
      const newArray = [...prev[section]];
      const item = { ...newArray[index] };
      
      if (!item.categoryPricing) {
        const basePrice = section === 'combos' ? (item as any).priceStart : (item as any).price;
        const baseDuration = item.durationMinutes || 60;
        item.categoryPricing = {
          SMALL: { price: basePrice, durationMinutes: baseDuration },
          MEDIUM: { price: basePrice, durationMinutes: baseDuration },
          LARGE: { price: basePrice, durationMinutes: baseDuration }
        };
      }
      
      item.categoryPricing = {
        ...item.categoryPricing,
        [category]: {
          ...item.categoryPricing[category],
          [field]: value
        }
      };
      
      // Sync SMALL category with base price/duration for backward compatibility
      if (category === 'SMALL') {
        if (field === 'price') {
          if (section === 'combos') {
            (item as any).priceStart = value;
          } else {
            (item as any).price = value;
          }
        } else if (field === 'durationMinutes') {
          item.durationMinutes = value;
        }
      }
      
      newArray[index] = item;
      return { ...prev, [section]: newArray };
    });
  };

  const addItem = (section: 'combos' | 'addOns' | 'testimonials' | 'services', initialItem: any) => {
    setEditableContent(prev => ({
      ...prev,
      [section]: [...prev[section], initialItem]
    }));
  };

  const removeItem = (section: 'combos' | 'addOns' | 'testimonials' | 'services', index: number) => {
    setConfirmModal({
      isOpen: true,
      message: 'Tem certeza da exclusão?',
      onConfirm: () => {
        setEditableContent(prev => ({
          ...prev,
          [section]: prev[section].filter((_, i) => i !== index)
        }));
      }
    });
  };

  const SectionHeader = ({ title, section }: { title: string, section: string }) => (
    <button 
      onClick={() => setActiveSection(activeSection === section ? null : section)}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${activeSection === section ? 'bg-red-600/10 border-red-500 text-white' : 'bg-[#16191f] border-white/10 text-gray-400 hover:text-white'}`}
    >
      <span className="font-bold uppercase tracking-wider">{title}</span>
      {activeSection === section ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-end sticky top-0 z-10 bg-[#0a0c10]/95 backdrop-blur-sm py-4 border-b border-white/5 mb-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-red-gradient text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      {/* Contact Section */}
      <div className="space-y-2">
        <SectionHeader title="Informações de Contato" section="contact" />
        {activeSection === 'contact' && (
          <div className="bg-[#16191f] p-6 rounded-xl border border-white/10 space-y-4 animate-in slide-in-from-top-2">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone (WhatsApp)</label>
              <input
                type="text"
                value={editableContent.contact.phone}
                onChange={e => updateContact('phone', e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Instagram</label>
              <input
                type="text"
                value={editableContent.contact.instagram}
                onChange={e => updateContact('instagram', e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Endereço</label>
              <input
                type="text"
                value={editableContent.contact.address}
                onChange={e => updateContact('address', e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Combos Section */}
      <div className="space-y-2">
        <SectionHeader title="Pacotes (Combos)" section="combos" />
        {activeSection === 'combos' && (
          <div className="space-y-4 animate-in slide-in-from-top-2">
            {editableContent.combos.map((combo, index) => (
              <div key={index} className="bg-[#16191f] p-6 rounded-xl border border-white/10 relative group">
                <button 
                  onClick={() => removeItem('combos', index)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome</label>
                    <input
                      type="text"
                      value={combo.name}
                      onChange={e => updateItem('combos', index, 'name', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Preço Inicial</label>
                    <input
                      type="text"
                      value={combo.priceStart}
                      onChange={e => updateItem('combos', index, 'priceStart', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duração (minutos)</label>
                    <input
                      type="number"
                      value={combo.durationMinutes || 0}
                      onChange={e => updateItem('combos', index, 'durationMinutes', parseInt(e.target.value) || 0)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição</label>
                    <input
                      type="text"
                      value={combo.description}
                      onChange={e => updateItem('combos', index, 'description', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Itens (separados por vírgula)</label>
                    <textarea
                      value={combo.features.join(', ')}
                      onChange={e => updateItem('combos', index, 'features', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none h-24"
                    />
                  </div>
                  
                  {/* Category Pricing for Combos */}
                  <div className="md:col-span-3 border-t border-white/10 pt-4 mt-2">
                    <h4 className="text-sm font-bold text-white mb-3">Preços e Duração por Categoria</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* SMALL */}
                      <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <h5 className="text-xs font-bold text-gray-400 mb-2">Carro Pequeno / Hatch</h5>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Preço</label>
                            <input
                              type="text"
                              value={combo.categoryPricing?.SMALL?.price || combo.priceStart}
                              onChange={e => updateCategoryPricing('combos', index, 'SMALL', 'price', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Duração (min)</label>
                            <input
                              type="number"
                              value={combo.categoryPricing?.SMALL?.durationMinutes || combo.durationMinutes}
                              onChange={e => updateCategoryPricing('combos', index, 'SMALL', 'durationMinutes', parseInt(e.target.value) || 0)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                      {/* MEDIUM */}
                      <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <h5 className="text-xs font-bold text-gray-400 mb-2">SUV / Sedan</h5>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Preço</label>
                            <input
                              type="text"
                              value={combo.categoryPricing?.MEDIUM?.price || combo.priceStart}
                              onChange={e => updateCategoryPricing('combos', index, 'MEDIUM', 'price', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Duração (min)</label>
                            <input
                              type="number"
                              value={combo.categoryPricing?.MEDIUM?.durationMinutes || combo.durationMinutes}
                              onChange={e => updateCategoryPricing('combos', index, 'MEDIUM', 'durationMinutes', parseInt(e.target.value) || 0)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                      {/* LARGE */}
                      <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <h5 className="text-xs font-bold text-gray-400 mb-2">Caminhonete / Grande</h5>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Preço</label>
                            <input
                              type="text"
                              value={combo.categoryPricing?.LARGE?.price || combo.priceStart}
                              onChange={e => updateCategoryPricing('combos', index, 'LARGE', 'price', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Duração (min)</label>
                            <input
                              type="number"
                              value={combo.categoryPricing?.LARGE?.durationMinutes || combo.durationMinutes}
                              onChange={e => updateCategoryPricing('combos', index, 'LARGE', 'durationMinutes', parseInt(e.target.value) || 0)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => addItem('combos', { 
                id: Date.now().toString(), 
                name: 'Novo Pacote', 
                priceStart: 'R$ 0,00', 
                description: '', 
                features: [], 
                durationMinutes: 60,
                categoryPricing: {
                  SMALL: { price: 'R$ 0,00', durationMinutes: 60 },
                  MEDIUM: { price: 'R$ 0,00', durationMinutes: 60 },
                  LARGE: { price: 'R$ 0,00', durationMinutes: 60 }
                }
              })}
              className="w-full py-4 border border-dashed border-white/10 rounded-xl text-gray-500 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Adicionar Pacote
            </button>
          </div>
        )}
      </div>

      {/* Add-ons Section */}
      <div className="space-y-2">
        <SectionHeader title="Adicionais" section="addOns" />
        {activeSection === 'addOns' && (
          <div className="space-y-4 animate-in slide-in-from-top-2">
            {editableContent.addOns.map((addon, index) => (
              <div key={index} className="bg-[#16191f] p-6 rounded-xl border border-white/10 relative">
                <button 
                  onClick={() => removeItem('addOns', index)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome</label>
                    <input
                      type="text"
                      value={addon.name}
                      onChange={e => updateItem('addOns', index, 'name', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Preço</label>
                    <input
                      type="text"
                      value={addon.price}
                      onChange={e => updateItem('addOns', index, 'price', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duração (minutos)</label>
                    <input
                      type="number"
                      value={addon.durationMinutes || 0}
                      onChange={e => updateItem('addOns', index, 'durationMinutes', parseInt(e.target.value) || 0)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição</label>
                    <textarea
                      value={addon.description}
                      onChange={e => updateItem('addOns', index, 'description', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none h-20"
                    />
                  </div>
                  <div className="md:col-span-3 flex items-center justify-between bg-black/20 border border-white/10 rounded-lg p-4">
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-wider mb-1 text-sm">Permitir Agendamento Avulso</h4>
                      <p className="text-gray-400 text-xs">Quando ativado, o cliente pode escolher este serviço sem precisar escolher um pacote principal.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={addon.allowStandalone || false}
                        onChange={(e) => updateItem('addOns', index, 'allowStandalone', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  
                  {/* Category Pricing for Add-ons */}
                  <div className="md:col-span-3 border-t border-white/10 pt-4 mt-2">
                    <h4 className="text-sm font-bold text-white mb-3">Preços e Duração por Categoria</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* SMALL */}
                      <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <h5 className="text-xs font-bold text-gray-400 mb-2">Carro Pequeno / Hatch</h5>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Preço</label>
                            <input
                              type="text"
                              value={addon.categoryPricing?.SMALL?.price || addon.price}
                              onChange={e => updateCategoryPricing('addOns', index, 'SMALL', 'price', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Duração (min)</label>
                            <input
                              type="number"
                              value={addon.categoryPricing?.SMALL?.durationMinutes || addon.durationMinutes}
                              onChange={e => updateCategoryPricing('addOns', index, 'SMALL', 'durationMinutes', parseInt(e.target.value) || 0)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                      {/* MEDIUM */}
                      <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <h5 className="text-xs font-bold text-gray-400 mb-2">SUV / Sedan</h5>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Preço</label>
                            <input
                              type="text"
                              value={addon.categoryPricing?.MEDIUM?.price || addon.price}
                              onChange={e => updateCategoryPricing('addOns', index, 'MEDIUM', 'price', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Duração (min)</label>
                            <input
                              type="number"
                              value={addon.categoryPricing?.MEDIUM?.durationMinutes || addon.durationMinutes}
                              onChange={e => updateCategoryPricing('addOns', index, 'MEDIUM', 'durationMinutes', parseInt(e.target.value) || 0)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                      {/* LARGE */}
                      <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <h5 className="text-xs font-bold text-gray-400 mb-2">Caminhonete / Grande</h5>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Preço</label>
                            <input
                              type="text"
                              value={addon.categoryPricing?.LARGE?.price || addon.price}
                              onChange={e => updateCategoryPricing('addOns', index, 'LARGE', 'price', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Duração (min)</label>
                            <input
                              type="number"
                              value={addon.categoryPricing?.LARGE?.durationMinutes || addon.durationMinutes}
                              onChange={e => updateCategoryPricing('addOns', index, 'LARGE', 'durationMinutes', parseInt(e.target.value) || 0)}
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-red-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => addItem('addOns', { 
                id: Date.now().toString(), 
                name: 'Novo Adicional', 
                price: 'R$ 0,00', 
                description: '', 
                durationMinutes: 30, 
                allowStandalone: false,
                categoryPricing: {
                  SMALL: { price: 'R$ 0,00', durationMinutes: 30 },
                  MEDIUM: { price: 'R$ 0,00', durationMinutes: 30 },
                  LARGE: { price: 'R$ 0,00', durationMinutes: 30 }
                }
              })}
              className="w-full py-4 border border-dashed border-white/10 rounded-xl text-gray-500 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Adicionar Serviço Adicional
            </button>
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="space-y-2">
        <SectionHeader title="Depoimentos" section="testimonials" />
        {activeSection === 'testimonials' && (
          <div className="space-y-4 animate-in slide-in-from-top-2">
            {editableContent.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#16191f] p-6 rounded-xl border border-white/10 relative">
                <button 
                  onClick={() => removeItem('testimonials', index)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome</label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={e => updateItem('testimonials', index, 'name', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Carro/Cargo</label>
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={e => updateItem('testimonials', index, 'role', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Depoimento</label>
                    <textarea
                      value={testimonial.text}
                      onChange={e => updateItem('testimonials', index, 'text', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nota (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={testimonial.rating}
                      onChange={e => updateItem('testimonials', index, 'rating', parseInt(e.target.value))}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => addItem('testimonials', { id: Date.now(), name: 'Novo Cliente', role: 'Carro Modelo', text: 'Depoimento...', rating: 5 })}
              className="w-full py-4 border border-dashed border-white/10 rounded-xl text-gray-500 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Adicionar Depoimento
            </button>
          </div>
        )}
      </div>

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
      {/* Notification Toast */}
      {notification.isOpen && (
        <div className={`fixed bottom-6 right-6 z-[400] px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-600/20 border-green-500 text-green-400' 
            : 'bg-red-600/20 border-red-500 text-red-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="font-bold uppercase tracking-wider text-xs">{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
