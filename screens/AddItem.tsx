
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MECHANICS = [
  "Sergio Gutierrez",
  "Ivan Gutierrez",
  "Roberto Sanchez",
  "Maria Garcia"
];

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get('type') === 'labor' ? 'Labor' : 'Materials';
  
  const [activeTab, setActiveTab] = useState<'Materials' | 'Labor'>(initialType);
  const [units, setUnits] = useState(1);
  const [selectedMechanic, setSelectedMechanic] = useState(MECHANICS[0]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm">
      <div className="relative flex flex-col h-[85vh] bg-background-light dark:bg-background-dark rounded-t-3xl shadow-inner animate-slide-up max-w-md mx-auto w-full">
        {/* Handle */}
        <div className="flex flex-col items-center pt-3 pb-1 w-full shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        <div className="px-6 pb-2 pt-2 flex justify-between items-center shrink-0">
          <h2 className="text-gray-900 dark:text-white text-2xl font-black">Quick Add</h2>
          <button onClick={() => navigate(-1)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Simplified Toggle */}
        <div className="px-6 py-4">
           <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
             <button 
               onClick={() => setActiveTab('Materials')}
               className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'Materials' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
             >
               Materials
             </button>
             <button 
               onClick={() => setActiveTab('Labor')}
               className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'Labor' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
             >
               Labor
             </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Default Warehouse/Type Info - Read Only */}
          <div className="flex gap-2">
             <div className="flex-1 bg-primary/5 border border-primary/10 rounded-xl p-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Source</p>
                  <p className="text-xs font-bold text-primary">FURGONETA</p>
                </div>
             </div>
             <div className="flex-1 bg-green-500/5 border border-green-500/10 rounded-xl p-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">schedule</span>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Type</p>
                  <p className="text-xs font-bold text-green-600">HORAS NORMALES (HN)</p>
                </div>
             </div>
          </div>

          {/* Mechanic Selector - Only for Labor */}
          {activeTab === 'Labor' && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Mechanic</label>
              <div className="relative">
                <select 
                  value={selectedMechanic}
                  onChange={(e) => setSelectedMechanic(e.target.value)}
                  className="w-full appearance-none rounded-2xl bg-white dark:bg-[#1A242F] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-5 text-lg font-bold focus:ring-2 focus:ring-primary shadow-sm"
                >
                  {MECHANICS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
          )}

          {/* Reference Input */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {activeTab === 'Materials' ? 'Reference / SKU' : 'Amount of Hours'}
            </label>
            <div className="flex items-center w-full rounded-2xl bg-white dark:bg-[#1A242F] border border-gray-200 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-primary shadow-sm">
              <input 
                autoFocus
                className="flex-1 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 p-5 text-lg font-bold" 
                placeholder={activeTab === 'Materials' ? "Scan or enter SKU..." : "e.g. 2.5"} 
                type="text" 
              />
              {activeTab === 'Materials' && (
                <button className="p-5 text-primary hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border-l border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">barcode_scanner</span>
                </button>
              )}
            </div>
          </div>

          {activeTab === 'Materials' && (
            <div className="flex gap-4">
              {/* Quantity Selector */}
              <div className="flex-1 space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</label>
                <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-[#1A242F] border border-gray-200 dark:border-gray-700 p-2 shadow-sm h-16">
                  <button 
                    onClick={() => setUnits(Math.max(1, units - 1))}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="text-xl font-black text-gray-900 dark:text-white font-mono">{units}</span>
                  <button 
                    onClick={() => setUnits(units + 1)}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Comment - Optional */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Optional Comment</label>
            <textarea 
              className="w-full rounded-2xl bg-white dark:bg-[#1A242F] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary p-4 text-base shadow-sm resize-none" 
              placeholder="..." 
              rows={2}
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark pb-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-full h-16 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/30 transition-all transform active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span>Confirm Imputation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
