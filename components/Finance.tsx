import React from 'react';
import { Download, CreditCard, AlertCircle } from 'lucide-react';
import { Invoice, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FinanceProps {
  invoices: Invoice[];
  lang: Language;
}

export const Finance: React.FC<FinanceProps> = ({ invoices, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.finance}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-4">{t.invoice} ID</th>
              <th className="px-6 py-4">{t.studentName}</th>
              <th className="px-6 py-4">{t.date}</th>
              <th className="px-6 py-4">{t.amount}</th>
              <th className="px-6 py-4 text-center">{t.status}</th>
              <th className="px-6 py-4 text-right">{t.action}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">#{inv.id.toUpperCase()}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{inv.studentName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{inv.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{inv.date}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">${inv.amount}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${inv.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                      inv.status === 'overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}
                  `}>
                    {t[inv.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-600 hover:text-brand-700 dark:text-brand-400 p-2">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};