import React from 'react';
import { StaffMember, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Phone, Mail, MoreVertical } from 'lucide-react';

interface StaffProps {
  staff: StaffMember[];
  lang: Language;
}

export const Staff: React.FC<StaffProps> = ({ staff, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.staffManagement}</h2>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
          {t.addNew}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-flutter-1 flex items-start gap-4">
            <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-100" />
            <div className="flex-1 min-w-0">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-brand-600 dark:text-brand-400 text-sm font-medium">{member.role}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
               </div>
               
               <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                     <Phone size={14} />
                     <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                     <Mail size={14} />
                     <span className="truncate">{member.email}</span>
                  </div>
               </div>

               <div className="mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {member.status === 'active' ? t.active : t.onLeave}
                  </span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};