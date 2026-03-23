import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SERVICES as DEFAULT_SERVICES, COMBOS as DEFAULT_COMBOS, ADD_ONS as DEFAULT_ADD_ONS, TESTIMONIALS as DEFAULT_TESTIMONIALS, PHONE_NUMBER as DEFAULT_PHONE, INSTAGRAM as DEFAULT_INSTAGRAM, ADDRESS as DEFAULT_ADDRESS } from '../constants';

interface SiteContent {
  contact: {
    phone: string;
    instagram: string;
    address: string;
  };
  services: typeof DEFAULT_SERVICES;
  combos: typeof DEFAULT_COMBOS;
  addOns: typeof DEFAULT_ADD_ONS;
  testimonials: (typeof DEFAULT_TESTIMONIALS[0] & { status: 'pending' | 'approved' | 'rejected' })[];
}

const defaultContent: SiteContent = {
  contact: {
    phone: DEFAULT_PHONE,
    instagram: DEFAULT_INSTAGRAM,
    address: DEFAULT_ADDRESS
  },
  services: DEFAULT_SERVICES,
  combos: DEFAULT_COMBOS,
  addOns: DEFAULT_ADD_ONS,
  testimonials: DEFAULT_TESTIMONIALS.map(t => ({ ...t, status: 'approved' as const }))
};

const ContentContext = createContext<{
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  loading: boolean;
  refreshContent: () => Promise<void>;
}>({
  content: defaultContent,
  updateContent: () => {},
  loading: true,
  refreshContent: async () => {}
});

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch content');
      })
      .then(data => {
        // Merge with default to ensure structure exists if API returns partial data
        setContent(prev => ({ ...prev, ...data }));
      })
      .catch(err => console.error('Error loading site content:', err))
      .finally(() => setLoading(false));
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const refreshContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setContent(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Error refreshing content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, loading, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
