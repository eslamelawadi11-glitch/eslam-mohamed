import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Students } from './components/Students';
import { Attendance } from './components/Attendance';
import { Finance } from './components/Finance';
import { Messaging } from './components/Messaging';
import { Settings } from './components/Settings';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Staff } from './components/Staff';
import { User, Role, Language, Theme } from './types';
import { MOCK_USERS, MOCK_STUDENTS, MOCK_INVOICES, MOCK_STATS, MOCK_MESSAGES, MOCK_EVENTS, MOCK_GALLERY, MOCK_STAFF } from './constants';

function App() {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Default to Manager
  const [currentView, setCurrentView] = useState('dashboard');
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  // Handle Theme Change
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Role Switching Logic (Mocking Auth)
  const handleRoleSwitch = (role: Role) => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      // Reset view to dashboard if current view isn't allowed
      if (role === 'PARENT' && ['dashboard', 'students', 'staff'].includes(currentView)) {
         setCurrentView('attendance');
      } else if (role === 'STAFF' && ['dashboard', 'staff', 'finance'].includes(currentView)) {
        setCurrentView('students');
      } else {
        setCurrentView(role === 'MANAGER' ? 'dashboard' : 'attendance');
      }
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard stats={MOCK_STATS} lang={lang} />;
      case 'students':
        return <Students students={MOCK_STUDENTS} lang={lang} role={currentUser.role} />;
      case 'attendance':
        return <Attendance students={MOCK_STUDENTS} lang={lang} />;
      case 'finance':
        return <Finance invoices={MOCK_INVOICES} lang={lang} />;
      case 'messages':
        return <Messaging messages={MOCK_MESSAGES} currentUser={currentUser} lang={lang} />;
      case 'calendar':
        return <Events events={MOCK_EVENTS} lang={lang} />;
      case 'gallery':
        return <Gallery items={MOCK_GALLERY} lang={lang} />;
      case 'staff':
        return <Staff staff={MOCK_STAFF} lang={lang} />;
      case 'settings':
        return <Settings currentUser={currentUser} onRoleSwitch={handleRoleSwitch} lang={lang} />;
      default:
        return <Dashboard stats={MOCK_STATS} lang={lang} />;
    }
  };

  return (
    <Layout
      currentUser={currentUser}
      currentRole={currentUser.role}
      currentView={currentView}
      onNavigate={setCurrentView}
      lang={lang}
      setLang={setLang}
      theme={theme}
      setTheme={setTheme}
      onLogout={() => alert("Logged out!")}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;