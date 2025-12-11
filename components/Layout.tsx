import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  DollarSign, 
  MessageCircle, 
  Settings, 
  Menu, 
  X, 
  Moon, 
  Sun,
  LogOut,
  Calendar,
  Image,
  Briefcase
} from 'lucide-react';
import { User, Role, Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User;
  currentRole: Role;
  currentView: string;
  onNavigate: (view: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentUser,
  currentRole,
  currentView,
  onNavigate,
  lang,
  setLang,
  theme,
  setTheme,
  onLogout
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard, roles: ['MANAGER'] },
    { id: 'students', icon: Users, label: t.students, roles: ['MANAGER', 'STAFF'] },
    { id: 'attendance', icon: CalendarCheck, label: t.attendance, roles: ['MANAGER', 'STAFF', 'PARENT'] },
    { id: 'calendar', icon: Calendar, label: t.calendar, roles: ['MANAGER', 'STAFF', 'PARENT'] },
    { id: 'gallery', icon: Image, label: t.gallery, roles: ['MANAGER', 'STAFF', 'PARENT'] },
    { id: 'finance', icon: DollarSign, label: t.finance, roles: ['MANAGER', 'PARENT'] },
    { id: 'staff', icon: Briefcase, label: t.staff, roles: ['MANAGER'] },
    { id: 'messages', icon: MessageCircle, label: t.messages, roles: ['MANAGER', 'STAFF', 'PARENT'] },
    { id: 'settings', icon: Settings, label: t.settings, roles: ['MANAGER', 'STAFF', 'PARENT'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(currentRole));

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-hidden ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay (ModalBarrier) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Drawer Widget style) */}
      <div className={`
        fixed inset-y-0 z-50 w-[304px] bg-white dark:bg-gray-800 shadow-flutter-3 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:w-72
        ${isRTL 
          ? (isSidebarOpen ? 'right-0 translate-x-0' : 'right-0 translate-x-full lg:translate-x-0') 
          : (isSidebarOpen ? 'left-0 translate-x-0' : 'left-0 -translate-x-full lg:translate-x-0')
        }
      `}>
        <div className="flex flex-col h-full">
          {/* User Account Header (Flutter Style) */}
          <div className="h-44 bg-brand-500 dark:bg-gray-900 p-6 flex flex-col justify-end text-white bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
             <div className="flex items-start justify-between">
                <img 
                  src={currentUser.avatar} 
                  alt="User" 
                  className="w-16 h-16 rounded-full border-2 border-white mb-3 shadow-sm bg-white"
                />
                 <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="lg:hidden text-white/80 hover:text-white"
                >
                  <X size={24} />
                </button>
             </div>
             <div>
                <p className="font-bold text-lg">{currentUser.name}</p>
                <p className="text-sm opacity-90">{currentUser.email}</p>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <nav className="px-2 space-y-1">
              {filteredMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-full transition-all ripple
                    ${currentView === item.id 
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <item.icon size={22} className={`mx-4 ${isRTL ? 'ml-4' : 'mr-4'} ${currentView === item.id ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500'}`} />
                  {item.label}
                </button>
              ))}
              
              <hr className="my-2 border-gray-200 dark:border-gray-700 mx-4" />
              
              <button 
                  onClick={onLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ripple"
                >
                  <LogOut size={22} className={`mx-4 text-gray-500`} />
                  {t.logout}
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content (Scaffold Body) */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* AppBar Widget */}
        <header className="bg-brand-600 dark:bg-gray-800 text-white shadow-flutter-1 z-30 h-16 shrink-0 transition-colors">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-white/10 focus:outline-none ripple"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-medium px-4 tracking-wide">
                {menuItems.find(i => i.id === currentView)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-2">
               <button
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors ripple"
                  title="Toggle Language"
                >
                  <span className="font-bold text-sm">{lang === 'en' ? 'AR' : 'EN'}</span>
                </button>
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors ripple"
                  title="Toggle Theme"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};