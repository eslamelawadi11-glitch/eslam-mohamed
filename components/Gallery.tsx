import React from 'react';
import { GalleryItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface GalleryProps {
  items: GalleryItem[];
  lang: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ items, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.photos}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm">
             <img 
               src={item.url} 
               alt={item.title} 
               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-white/80 text-xs">{item.date}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};