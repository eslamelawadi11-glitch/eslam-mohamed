import React from 'react';
import { Check, X, Clock } from 'lucide-react';
import { Student, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface AttendanceProps {
  students: Student[];
  lang: Language;
}

export const Attendance: React.FC<AttendanceProps> = ({ students, lang }) => {
  const t = TRANSLATIONS[lang];

  // In a real app, this would be a mutation to an API
  const handleMark = (id: string, status: string) => {
    console.log(`Marked ${id} as ${status}`);
    // Update local state or refetch here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.markAttendance}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
          {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{student.class}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleMark(student.id, 'present')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-colors ${
                  student.attendanceToday === 'present' 
                  ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
                  : 'border-gray-100 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Check size={20} />
                <span className="text-xs mt-1 font-medium">{t.present}</span>
              </button>
              
              <button 
                onClick={() => handleMark(student.id, 'absent')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-colors ${
                  student.attendanceToday === 'absent' 
                  ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' 
                  : 'border-gray-100 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <X size={20} />
                <span className="text-xs mt-1 font-medium">{t.absent}</span>
              </button>

              <button 
                onClick={() => handleMark(student.id, 'late')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-colors ${
                  student.attendanceToday === 'late' 
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400' 
                  : 'border-gray-100 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Clock size={20} />
                <span className="text-xs mt-1 font-medium">{t.late}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};