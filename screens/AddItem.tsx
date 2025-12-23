
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_WORK_ORDERS } from '../constants';

const MECHANICS = [
  "Sergio Gutierrez",
  "Ivan Gutierrez",
  "Roberto Sanchez",
  "Maria Garcia"
];

const ZONES = [
  "Zona A (Casco Urbano)",
  "Zona B (Periferia)",
  "Zona 3 (Provincia)",
  "Tarifa Especial Nocturna"
];

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTypeFromUrl = searchParams.get('type');
  const orderId = searchParams.get('orderId'); // Passed from Details.tsx
  
  type TabType = 'Materials' | 'Labor' | 'Travel';
  const [activeTab, setActiveTab] = useState<TabType>(
    initialTypeFromUrl === 'labor' ? 'Labor' : 
    initialTypeFromUrl === 'travel' ? 'Travel' : 'Materials'
  );

  const [units, setUnits] = useState(1);
  const [sku, setSku] = useState('');
  const [laborHours, setLaborHours] = useState('0');
  const [comments, setComments] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState(MECHANICS[0]);
  
  // Travel specific states
  const [travelMode, setTravelMode] = useState<'Zone' | 'Manual'>('Zone');
  const [manualTravelType, setManualTravelType] = useState<'KM' | 'Units'>('KM');
  const [manualTravelValue, setManualTravelValue] = useState('0');
  const [selectedZone, setSelectedZone] = useState(ZONES[0]);

  const handleConfirm = () => {
    const order = MOCK_WORK_ORDERS.find(o => o.id === orderId);
    if (!order) {
       alert("Error: No se ha encontrado la Orden de Trabajo.");
       navigate(-1);
       return;
    }

    if (activeTab === 'Labor') {
      order.laborLogs.push({
        id: `L-${Date.now()}`,
        technician: selectedMechanic,
        initials: selectedMechanic.split(' ').map(n => n[0]).join(''),
        time: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: laborHours,
        type: 'HN'
      });
    } else if (activeTab === 'Materials') {
      order.materials.push({
        id: `M-${Date.now()}`,
        name: sku || 'Material Desconocido',
        sku: sku || 'N/A',
        quantity: units,
        price: 0,
        comment: comments
      });
    } else if (activeTab === 'Travel') {
       order.laborLogs.push({
         id: `T-${Date.now()}`,
         technician: selectedMechanic,
         initials: selectedMechanic.split(' ').map(n => n[0]).join(''),
         time: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
         duration: travelMode === 'Manual' ? manualTravelValue : '1',
         type: travelMode === 'Manual' ? (manualTravelType === 'KM' ? 'KM' : 'Travel') : 'Zone',
         reference: travelMode === 'Zone' ? selectedZone : undefined
       });
    }

    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm">
      <div className="relative flex flex-col h-[90vh] bg-background-light dark:bg-background-dark rounded-t-3xl shadow-inner animate-slide-up max-w-md mx-auto w-full">
        {/* Handle */}
        <div className="flex flex-col items-center pt-3 pb-1 w-full shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        <div className="px-6 pb-2 pt-2 flex justify-between items-center shrink-0">
          <h2 className="text-gray-900 dark:text-white text-2xl font-black tracking-tight">Imputación Rápida</h2>
          <button onClick={() => navigate(-1)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* 3-Way Tab Toggle */}
        <div className="px-6 py-4">
           <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
             <button 
               onClick={() => setActiveTab('Materials')}
               className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'Materials' ? 'bg-white dark:bg-surface-dark text-primary shadow-lg shadow-black/5' : 'text-slate-500'}`}
             >
               Materiales
             </button>
             <button 
               onClick={() => setActiveTab('Labor')}
               className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'Labor' ? 'bg-white dark:bg-surface-dark text-primary shadow-lg shadow-black/5' : 'text-slate-500'}`}
             >
               Mano Obra
             </button>
             <button 
               onClick={() => setActiveTab('Travel')}
               className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'Travel' ? 'bg-white dark:bg-surface-dark text-primary shadow-lg shadow-black/5' : 'text-slate-500'}`}
             >
               Viaje
             </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          
          {/* Context Pills */}
          <div className="flex gap-2">
             <div className="flex-1 bg-primary/5 border border-primary/10 rounded-2xl p-3 flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Origen</p>
                  <p className="text-xs font-black text-primary">FURGONETA</p>
                </div>
             </div>
             <div className="flex-1 bg-green-500/5 border border-green-500/10 rounded-2xl p-3 flex items-center gap-3">
                <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center">
                   <span className="material-symbols-outlined text-green-600 text-sm">verified_user</span>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Tarifa</p>
                  <p className="text-xs font-black text-green-600">NORMAL (HN)</p>
                </div>
             </div>
          </div>

          {/* TRAVEL TAB CONTENT */}
          {activeTab === 'Travel' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modalidad de Viaje</label>
                <div className="flex gap-2">
                   <button 
                     onClick={() => setTravelMode('Zone')}
                     className={`flex-1 flex flex-col items-center justify-center gap-1 h-20 rounded-2xl border-2 transition-all ${travelMode === 'Zone' ? 'bg-primary/10 border-primary text-primary shadow-md' : 'bg-white dark:bg-[#1A242F] border-slate-200 dark:border-slate-800 text-slate-500'}`}
                   >
                     <span className="material-symbols-outlined">map</span>
                     <span className="text-[10px] font-black uppercase">Zona Cliente</span>
                   </button>
                   <button 
                     onClick={() => setTravelMode('Manual')}
                     className={`flex-1 flex flex-col items-center justify-center gap-1 h-20 rounded-2xl border-2 transition-all ${travelMode === 'Manual' ? 'bg-primary/10 border-primary text-primary shadow-md' : 'bg-white dark:bg-[#1A242F] border-slate-200 dark:border-slate-800 text-slate-500'}`}
                   >
                     <span className="material-symbols-outlined">edit_road</span>
                     <span className="text-[10px] font-black uppercase">Entrada Manual</span>
                   </button>
                </div>
              </div>

              {travelMode === 'Zone' ? (
                <div className="space-y-3 animate-in slide-in-from-left-2 duration-300">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Seleccionar Zona</label>
                  <div className="relative">
                    <select 
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full appearance-none rounded-2xl bg-white dark:bg-[#1A242F] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-5 text-base font-bold focus:ring-4 focus:ring-primary/20 shadow-sm transition-all"
                    >
                      {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
                   <div className="space-y-3">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unidad de Medida</label>
                      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                         <button 
                           onClick={() => setManualTravelType('KM')}
                           className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${manualTravelType === 'KM' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
                         >
                           Kilómetros (KM)
                         </button>
                         <button 
                           onClick={() => setManualTravelType('Units')}
                           className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${manualTravelType === 'Units' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
                         >
                           Unidades (Uds)
                         </button>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Valor Introducido ({manualTravelType})
                      </label>
                      <input 
                        type="number"
                        value={manualTravelValue}
                        onChange={(e) => setManualTravelValue(e.target.value)}
                        className="w-full rounded-2xl bg-white dark:bg-[#1A242F] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-5 text-2xl font-black focus:ring-4 focus:ring-primary/20 shadow-sm"
                        placeholder="0.00"
                        autoFocus
                      />
                   </div>
                </div>
              )}
            </div>
          )}

          {/* LABOR TAB CONTENT */}
          {activeTab === 'Labor' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mecánico Asignado</label>
                <div className="relative">
                  <select 
                    value={selectedMechanic}
                    onChange={(e) => setSelectedMechanic(e.target.value)}
                    className="w-full appearance-none rounded-2xl bg-white dark:bg-[#1A242F] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-5 text-base font-bold focus:ring-4 focus:ring-primary/20 shadow-sm"
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

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Horas Trabajadas</label>
                <div className="flex items-center w-full rounded-2xl bg-white dark:bg-[#1A242F] border border-slate-200 dark:border-slate-800 overflow-hidden focus-within:ring-4 focus-within:ring-primary/20 shadow-sm">
                  <input 
                    autoFocus
                    value={laborHours}
                    onChange={(e) => setLaborHours(e.target.value)}
                    className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 p-5 text-2xl font-black" 
                    placeholder="0.00" 
                    type="number" 
                    step="0.25"
                  />
                  <div className="bg-slate-50 dark:bg-slate-800 px-5 h-full flex items-center font-black text-slate-400">H</div>
                </div>
              </div>
            </div>
          )}

          {/* MATERIALS TAB CONTENT */}
          {activeTab === 'Materials' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Referencia / SKU / Nombre</label>
                <div className="flex items-center w-full rounded-2xl bg-white dark:bg-[#1A242F] border border-slate-200 dark:border-slate-800 overflow-hidden focus-within:ring-4 focus-within:ring-primary/20 shadow-sm">
                  <input 
                    autoFocus
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 p-5 text-base font-bold" 
                    placeholder="Escanea o escribe..." 
                    type="text" 
                  />
                  <button className="p-5 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-l border-slate-100 dark:border-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[28px]">barcode_scanner</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cantidad</label>
                <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-[#1A242F] border border-slate-200 dark:border-slate-800 p-2 shadow-sm h-16">
                  <button 
                    onClick={() => setUnits(Math.max(1, units - 1))}
                    className="w-14 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl active:scale-90"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{units}</span>
                  <button 
                    onClick={() => setUnits(units + 1)}
                    className="w-14 h-full flex items-center justify-center text-slate-500 hover:text-primary transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl active:scale-90"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Global Comment Field */}
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observaciones (Opcional)</label>
            <textarea 
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full rounded-2xl bg-white dark:bg-[#1A242F] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-4 focus:ring-primary/20 p-4 text-sm font-medium shadow-sm resize-none" 
              placeholder="Añade detalles adicionales si es necesario..." 
              rows={3}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark pb-10 shrink-0">
          <button 
            onClick={handleConfirm}
            className="w-full h-16 flex items-center justify-center gap-3 bg-primary hover:bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/30 transition-all transform active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-2xl">check_circle</span>
            <span>Confirmar Imputación</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
