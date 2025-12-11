import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { Event, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface EventsProps {
  events: Event[];
  lang: Language;
}

export const Events: React.FC<EventsProps> = ({ events, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.events}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-flutter-1 overflow-hidden hover:shadow-flutter-2 transition-shadow border-l-4 border-brand-500">
             <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg text-gray-900 dark:text-white">{event.title}</h3>
                   <span className={`text-xs px-2 py-1 rounded-full capitalize
                     ${event.type === 'fun' ? 'bg-orange-100 text-orange-800' : 
                       event.type === 'holiday' ? 'bg-red-100 text-red-800' : 
                       'bg-blue-100 text-blue-800'}
                   `}>
                     {event.type}
                   </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                   <div className="flex items-center gap-2">
                      <CalendarIcon size={16} className="text-brand-500" />
                      <span>{event.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Clock size={16} className="text-brand-500" />
                      <span>{event.time}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-brand-500" />
                      <span>{event.location}</span>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};