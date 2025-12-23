
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CLIENTS } from '../constants';

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = e.target.value;
    setSelectedClientId(clientId);
    const client = MOCK_CLIENTS.find(c => c.id === clientId);
    if (client) {
      setLocationValue(client.defaultLocation);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationValue(`${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error(error);
        alert("Error al obtener ubicación. Por favor, introduce manualmente.");
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex items-center justify-between px-4 py-3 bg-background-light dark:bg-background-dark shrink-0 z-20 border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Crear Orden de Trabajo</h2>
        <button className="text-primary text-base font-bold">Draft</button>
      </header>

      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        <div className="flex flex-col pt-4">
          <h2 className="text-slate-900 dark:text-white text-base font-bold px-5 pb-3">Tipo de Orden</h2>
          <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
            <TypeChip icon="build" label="Reparación" active />
            <TypeChip icon="handyman" label="Mantenimiento" />
            <TypeChip icon="troubleshoot" label="Diagnóstico" />
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-800 mx-5 my-4" />

        <div className="flex flex-col px-5 gap-5">
          <h2 className="text-slate-900 dark:text-white text-base font-bold tracking-tight">Detalles del Cliente</h2>
          
          <div className="flex flex-col w-full">
            <p className="text-slate-600 dark:text-[#9dabb9] text-xs font-black uppercase tracking-widest pb-2">Cliente</p>
            <div className="relative group">
              <select 
                value={selectedClientId}
                onChange={handleClientChange}
                className="w-full rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] h-14 pl-4 pr-12 text-base transition-all appearance-none"
              >
                <option value="">Seleccionar Cliente...</option>
                {MOCK_CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="absolute right-0 top-0 h-14 w-12 flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">expand_more</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-slate-600 dark:text-[#9dabb9] text-xs font-black uppercase tracking-widest pb-2">Ubicación</p>
            <div className="flex gap-2">
              <input 
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                className="flex-1 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] h-14 px-4 text-base transition-all" 
                placeholder="Introducir ubicación..." 
              />
              <button 
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors border shadow-sm ${isGettingLocation ? 'bg-slate-100 dark:bg-slate-800' : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'}`}
              >
                <span className={`material-symbols-outlined ${isGettingLocation ? 'animate-spin opacity-50' : ''}`}>location_on</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-slate-600 dark:text-[#9dabb9] text-xs font-black uppercase tracking-widest pb-2">Máquina / Activo ID</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input className="w-full rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] h-14 px-4 text-base transition-all" placeholder="Ej: GEN-150..." />
              </div>
              <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#283039] text-slate-700 dark:text-white hover:bg-slate-200 transition-colors border border-slate-200 dark:border-[#3b4754]">
                <span className="material-symbols-outlined">qr_code_scanner</span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-800 mx-5 my-6" />

        <div className="flex flex-col px-5 gap-5">
          <div className="flex justify-between items-center">
            <h2 className="text-slate-900 dark:text-white text-base font-bold tracking-tight uppercase tracking-widest">Instrucciones</h2>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500 text-[18px]">priority_high</span>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-wide">Urgente</span>
            </div>
          </div>
          <textarea className="w-full rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] h-32 p-4 text-base transition-all" placeholder="Describe el problema reportado..."></textarea>
        </div>

        <div className="flex flex-col px-5 pt-4 gap-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-primary">notifications</span>
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">Notificar al Jefe de Taller</p>
                <p className="text-[10px] text-slate-500 font-bold">Enviar aviso de nueva asignación</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent z-30 pt-10">
        <button 
          onClick={() => navigate('/')}
          className="group w-full h-16 bg-primary hover:bg-blue-600 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transition-all duration-200"
        >
          <span>CREAR ORDEN</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

const TypeChip: React.FC<{ icon: string; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 cursor-pointer transition-transform active:scale-95 ${active ? 'bg-primary text-white shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-[#283039] border border-slate-200 dark:border-transparent text-slate-700 dark:text-slate-300'}`}>
    <span className="material-symbols-outlined text-[18px]">{icon}</span>
    <p className="text-xs font-black uppercase tracking-tight">{label}</p>
  </div>
);

export default CreateOrder;
