import React, { useState, useEffect } from 'react';
import { X, Lock, Image as ImageIcon, Loader2 } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset state on close
      setPassword('');
      setIsAuthenticated(false);
      setPhotos([]);
      setError('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/uploads?password=${password}`);
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.files);
        setIsAuthenticated(true);
      } else {
        setError('Senha incorreta');
      }
    } catch {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#0f1115] w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#16191f]">
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            {isAuthenticated ? <ImageIcon className="text-red-600" size={20} /> : <Lock className="text-red-600" size={20} />}
            Galeria do Cliente
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          {!isAuthenticated ? (
            <div className="flex flex-col items-center justify-center h-64">
              <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Lock size={32} className="text-gray-500" />
                  </div>
                  <h3 className="text-white font-bold">Acesso Restrito</h3>
                  <p className="text-gray-500 text-xs mt-1">Digite a senha para visualizar as fotos.</p>
                </div>
                
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-red-500 focus:outline-none transition-colors text-center tracking-widest"
                    placeholder="SENHA"
                    autoFocus
                  />
                </div>

                {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || !password}
                  className="w-full bg-red-gradient text-white py-3 rounded-xl font-black text-xs tracking-widest uppercase hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-red-900/20"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : 'Acessar'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {photos.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Nenhuma foto encontrada.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((url, index) => (
                    <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="group relative aspect-square bg-black/50 rounded-lg overflow-hidden border border-white/10 hover:border-red-500/50 transition-colors block">
                      <img 
                        src={url} 
                        alt={`Upload ${index}`} 
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-[10px] text-white truncate w-full font-mono">{url.split('/').pop()}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
