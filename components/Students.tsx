import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, ArrowLeft, Phone, MapPin, Activity, Calendar } from 'lucide-react';
import { Student, Language, Role } from '../types';
import { TRANSLATIONS } from '../constants';

interface StudentsProps {
  students: Student[];
  lang: Language;
  role: Role;
}

export const Students: React.FC<StudentsProps> = ({ students: initialStudents, lang, role }) => {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add student would go here
    setIsAddModalOpen(false);
  };

  if (selectedStudent) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm min-h-[80vh] flex flex-col">
        {/* Detail View Header */}
        <div className="p-4 border-b dark:border-gray-700 flex items-center gap-4">
          <button 
            onClick={() => setSelectedStudent(null)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={isRTL ? 'rotate-180' : ''} />
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedStudent.name}</h2>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Card */}
            <div className="w-full md:w-1/3 flex flex-col items-center p-6 border rounded-2xl dark:border-gray-700">
               <img src={selectedStudent.photo} alt={selectedStudent.name} className="w-32 h-32 rounded-full mb-4 shadow-md object-cover" />
               <h3 className="text-2xl font-bold dark:text-white">{selectedStudent.name}</h3>
               <p className="text-gray-500 dark:text-gray-400 mb-6">{selectedStudent.class}</p>
               
               <div className="w-full space-y-3">
                 <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Calendar size={18} />
                    <span>{selectedStudent.dob} ({selectedStudent.age} yrs)</span>
                 </div>
                 <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <MapPin size={18} />
                    <span>{selectedStudent.address}</span>
                 </div>
                 <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Activity size={18} />
                    <span className="capitalize">{selectedStudent.status}</span>
                 </div>
               </div>
            </div>

            {/* Info Tabs (Simplified as sections for this demo) */}
            <div className="w-full md:w-2/3 space-y-6">
               {/* Medical Info */}
               <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                  <h4 className="text-lg font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                    <Activity /> {t.medicalInfo}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t.allergies}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedStudent.medical?.allergies.length ? selectedStudent.medical.allergies.map(a => (
                          <span key={a} className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs border border-red-200">{a}</span>
                        )) : <span className="text-gray-500">-</span>}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t.medications}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedStudent.medical?.medications.length ? selectedStudent.medical.medications.map(m => (
                          <span key={m} className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs border border-blue-200">{m}</span>
                        )) : <span className="text-gray-500">-</span>}
                      </div>
                    </div>
                  </div>
               </div>

               {/* Parent Info */}
               <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">{t.parent}</h4>
                  <div className="flex items-center justify-between">
                     <div>
                       <p className="font-semibold text-gray-900 dark:text-white">{selectedStudent.parentName}</p>
                       <p className="text-sm text-gray-500">{t.emergencyContact}</p>
                     </div>
                     <button className="p-3 bg-brand-500 text-white rounded-full hover:bg-brand-600 shadow-sm">
                        <Phone size={20} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-140px)]">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 flex gap-4 items-center">
         <div className="relative flex-1">
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
         </div>
         <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Filter size={24} />
         </button>
      </div>

      {/* List View */}
      <div className="grid grid-cols-1 gap-3">
        {filteredStudents.map((student) => (
          <div 
            key={student.id} 
            onClick={() => setSelectedStudent(student)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-flutter-1 flex items-center gap-4 hover:shadow-flutter-2 transition-shadow cursor-pointer"
          >
            <img 
              src={student.photo} 
              alt={student.name} 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white text-base truncate">{student.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{student.class} • {student.parentName}</p>
            </div>
            
            <div className="flex flex-col items-end gap-1">
               <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize
                  ${student.attendanceToday === 'present' ? 'bg-green-100 text-green-800' : 
                    student.attendanceToday === 'absent' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}
                `}>
                  {student.attendanceToday || '-'}
                </span>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
               <MoreVertical size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Action Button (FAB) */}
      {role === 'MANAGER' && (
        <div className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-40`}>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-14 h-14 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl shadow-flutter-2 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ripple"
          >
            <Plus size={28} />
          </button>
        </div>
      )}

      {/* Add Student Dialog (Simple Modal) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b dark:border-gray-700">
              <h3 className="text-xl font-bold dark:text-white">{t.addStudent}</h3>
            </div>
            <form onSubmit={handleAddStudent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.studentName}</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-brand-500 outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.class}</label>
                    <select className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-brand-500 outline-none">
                      <option>Sunflowers</option>
                      <option>Butterflies</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.dob}</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-brand-500 outline-none" required />
                 </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.parent}</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-brand-500 outline-none" required />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-brand-600 font-medium hover:bg-brand-50 rounded-lg transition-colors"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 shadow-sm transition-colors"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};