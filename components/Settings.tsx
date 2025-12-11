import React from 'react';
import { User, Role, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Shield, User as UserIcon } from 'lucide-react';

interface SettingsProps {
  currentUser: User;
  onRoleSwitch: (role: Role) => void;
  lang: Language;
}

export const Settings: React.FC<SettingsProps> = ({ currentUser, onRoleSwitch, lang }) => {
  const t = TRANSLATIONS[lang];

  const roles: Role[] = ['MANAGER', 'STAFF', 'PARENT'];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t.profile}</h2>
        <div className="flex items-center gap-6">
          <img src={currentUser.avatar} alt="Profile" className="w-20 h-20 rounded-full" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">{currentUser.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-400 text-xs font-semibold rounded-full capitalize">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="text-brand-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.switchRole}</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Use these buttons to demonstrate the application from different user perspectives. In a real application, this would be handled by authentication.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => onRoleSwitch(role)}
              className={`
                flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                ${currentUser.role === role 
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-800 text-gray-600 dark:text-gray-300'}
              `}
            >
              <UserIcon size={20} />
              <span className="font-medium">{role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};