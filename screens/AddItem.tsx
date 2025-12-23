
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Materials' | 'Labor'>('Materials');
  const [units, setUnits] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm">
      <div className="relative flex flex-col h-[90vh] bg-background-light dark:bg-background-dark rounded-t-2xl shadow-inner animate-slide-up max-w-md mx-auto w-full">
        <div className="flex flex-col items-center pt-3 pb-1 w-full shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        <div className="px-5 pb-2 pt-2 flex justify-between items-center shrink-0">
          <h2 className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight">Add Items</h2>
          <button onClick={() => navigate(-1)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="shrink-0">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setActiveTab('Materials')}
              className={`flex-1 py-3 text-sm font-bold tracking-wide border-b-[3px] transition-colors ${activeTab === 'Materials' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
            >
              Materials
            </button>
            <button 
              onClick={() => setActiveTab('Labor')}
              className={`flex-1 py-3 text-sm font-bold tracking-wide border-b-[3px] transition-colors ${activeTab === 'Labor' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
            >
              Labor
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reference</label>
            <div className="flex items-center w-full rounded-lg bg-white dark:bg-[#1A242F] border border-gray-200 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-primary shadow-sm">
              <input 
                className="flex-1 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 p-4 text-base" 
                placeholder="Scan or type..." 
                type="text" 
              />
              <button className="p-4 text-primary hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors border-l border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">barcode_scanner</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <input 
              className="w-full rounded-lg bg-white dark:bg-[#1A242F] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary p-4 text-base shadow-sm" 
              placeholder="Item Name" 
              type="text" 
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Warehouse</label>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg bg-white dark:bg-[#1A242F] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-4 pr-10 text-base focus:ring-2 focus:ring-primary shadow-sm">
                  <option value="van">Van</option>
                  <option value="main">Main Warehouse</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
            <div className="w-1/3 space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">Units</label>
              <div className="flex items-center justify-between rounded-lg bg-white dark:bg-[#1A242F] border border-gray-200 dark:border-gray-700 p-1 shadow-sm h-[58px]">
                <button 
                  onClick={() => setUnits(Math.max(1, units - 1))}
                  className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="text-lg font-semibold text-gray-900 dark:text-white font-mono">{units}</span>
                <button 
                  onClick={() => setUnits(units + 1)}
                  className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark pb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add {activeTab === 'Materials' ? 'Material' : 'Labor'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
