import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const PhotoViewer: React.FC = () => {
  const { filename } = useParams<{ filename: string }>();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login', { state: { from: { pathname: `/view/${filename}` } } });
        return;
      }

      try {
        const response = await fetch(`/api/uploads/${filename}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        } else if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('authToken');
          navigate('/login', { state: { from: { pathname: `/view/${filename}` } } });
        } else {
          setError('Failed to load image');
        }
      } catch {
        setError('Error loading image');
      } finally {
        setLoading(false);
      }
    };

    if (filename) {
      fetchImage();
    }
  }, [filename, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="text-center">
          <Lock size={48} className="mx-auto text-red-500 mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Uploaded content" 
          className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10"
        />
      )}
    </div>
  );
};

export default PhotoViewer;
