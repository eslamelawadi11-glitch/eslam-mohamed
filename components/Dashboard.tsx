import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, UserCheck, DollarSign, TrendingUp } from 'lucide-react';
import { DashboardStats, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  stats: DashboardStats;
  lang: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, lang }) => {
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  const data = [
    { name: 'Sun', present: 40, absent: 5 },
    { name: 'Mon', present: 38, absent: 7 },
    { name: 'Tue', present: 42, absent: 3 },
    { name: 'Wed', present: 44, absent: 1 },
    { name: 'Thu', present: 41, absent: 4 },
  ];

  const pieData = [
    { name: 'Paid', value: 75 },
    { name: 'Pending', value: 20 },
    { name: 'Overdue', value: 5 },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Users} 
          label={t.totalStudents} 
          value={stats.totalStudents} 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={UserCheck} 
          label={t.staffPresent} 
          value={stats.staffPresent} 
          color="bg-purple-500" 
        />
        <StatCard 
          icon={TrendingUp} 
          label={t.attendanceRate} 
          value={`${stats.attendanceRate}%`} 
          color="bg-green-500" 
        />
        <StatCard 
          icon={DollarSign} 
          label={t.monthlyRevenue} 
          value={`$${stats.revenueThisMonth.toLocaleString()}`} 
          color="bg-orange-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t.attendance}</h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="present" fill="#0ea5e9" radius={[4, 4, 0, 0]} name={t.present} />
                <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} name={t.absent} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t.finance}</h3>
          <div className="h-80 w-full flex items-center justify-center" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">{t.paid}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">{t.pending}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">{t.overdue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};