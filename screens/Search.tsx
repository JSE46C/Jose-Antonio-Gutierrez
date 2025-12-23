
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface EquipmentItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  sn?: string;
  img: string;
  assignee?: string;
  orderId?: string;
  clientId: string;
  clientName: string;
  brand: string;
}

const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq1',
    title: "Genie Z-45/25",
    subtitle: "Plataforma Elevadora Articulada",
    tag: "GEN-150",
    sn: "SN G150-8921",
    img: "https://img.directindustry.com/images_di/photo-g/16478-16168863.jpg",
    assignee: "Sergio Gutierrez",
    orderId: 'WO-4829',
    clientId: 'CL-990',
    clientName: 'Logistics Center Inc.',
    brand: 'Genie'
  },
  {
    id: 'eq2',
    title: "Haulotte Star 10",
    subtitle: "Plataforma Elevadora Vertical",
    tag: "HAU-210",
    sn: "SN H210-4412",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x1y1cKwbVd6G4j0M3tQ6rGZ4oKq6_aKq7w&s",
    clientId: 'CL-552',
    clientName: 'Main Warehouse Ltd.',
    brand: 'Haulotte'
  },
  {
    id: 'eq3',
    title: "GH Bridge Crane 10T",
    subtitle: "Grúa Puente Monorraíl",
    tag: "GH-305",
    sn: "SN GH305-XP",
    img: "https://www.ghcranes.com/media/images/gh-cranes-components-hoists-overhead-cranes-grúas-puente-components-gh.jpg",
    clientId: 'CL-990',
    clientName: 'Logistics Center Inc.',
    brand: 'GH'
  },
  {
    id: 'eq4',
    title: "Genie GS-1932",
    subtitle: "Plataforma de Tijera",
    tag: "GEN-410",
    sn: "SN G410-009",
    img: "https://img.directindustry.com/images_di/photo-g/16478-16168863.jpg",
    assignee: "Ivan Gutierrez",
    clientId: 'CL-880',
    clientName: 'Aero Cargo SA',
    brand: 'Genie'
  },
  {
    id: 'eq5',
    title: "Haulotte HA16 RTJ",
    subtitle: "Plataforma Elevadora Diésel",
    tag: "HAU-185",
    sn: "SN H185-RTJ",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x1y1cKwbVd6G4j0M3tQ6rGZ4oKq6_aKq7w&s",
    clientId: 'CL-880',
    clientName: 'Aero Cargo SA',
    brand: 'Haulotte'
  }
];

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedEq, setSelectedEq] = useState<EquipmentItem | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const cachedData = localStorage.getItem('fsp_equipment_cache');
    if (cachedData) {
      setEquipment(JSON.parse(cachedData));
    } else {
      setEquipment(INITIAL_EQUIPMENT);
      localStorage.setItem('fsp_equipment_cache', JSON.stringify(INITIAL_EQUIPMENT));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const clients = useMemo(() => {
    const unique = Array.from(new Set(INITIAL_EQUIPMENT.map(e => e.clientId)));
    return unique.map(id => ({
      id,
      name: INITIAL_EQUIPMENT.find(e => e.clientId === id)?.clientName || 'Unknown'
    }));
  }, []);

  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClient = selectedClientId ? item.clientId === selectedClientId : true;
      return matchesSearch && matchesClient;
    });
  }, [equipment, searchQuery, selectedClientId]);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-dark overflow-hidden pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background-dark/95 backdrop-blur-md border-b border-[#283039]">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button 
            onClick={() => navigate('/')} 
            className="text-white flex size-10 items-center justify-center rounded-full bg-white/5 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">home</span>
          </button>
          <div className="flex flex-col items-center flex-1">
            <h2 className="text-white text-base font-black uppercase tracking-widest">Buscador</h2>
            <div className="flex items-center gap-1">
              <span className={`size-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-amber-500'}`}></span>
              <span className="text-[10px] text-[#9dabb9] font-bold uppercase tracking-tighter">
                {isOnline ? 'Conectado' : 'Offline'}
              </span>
            </div>
          </div>
          <div className="size-10"></div>
        </div>

        <div className="px-4 py-2 space-y-3">
          {/* Selector de Cliente - Lógica Inversa */}
          <div className="relative">
            <select 
              className="w-full h-12 bg-input-bg border border-white/10 rounded-xl text-white px-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-primary"
              value={selectedClientId || ''}
              onChange={(e) => {
                setSelectedClientId(e.target.value || null);
                setSelectedEq(null);
              }}
            >
              <option value="">Todos los Clientes</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-3 text-slate-500 pointer-events-none">expand_more</span>
          </div>

          {/* Buscador por ID/Máquina */}
          <div className="flex h-12 w-full items-stretch rounded-xl bg-input-bg border border-white/10 overflow-hidden">
             <div className="text-[#9dabb9] flex items-center justify-center pl-4 pr-2">
                <span className="material-symbols-outlined">search</span>
             </div>
             <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white border-none focus:ring-0 placeholder:text-slate-500 text-sm font-bold" 
              placeholder="Ej: GEN-150, HAU-210, GH..." 
             />
             {searchQuery && (
               <button onClick={() => setSearchQuery('')} className="pr-2 text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">close</span>
               </button>
             )}
          </div>
        </div>

        <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar mask-gradient-right">
          <FilterChip label="Lifting Platforms" active={searchQuery.toLowerCase().includes('plataforma')} onClick={() => setSearchQuery('Plataforma')} />
          <FilterChip label="Cranes (GH)" active={searchQuery.toLowerCase().includes('gh')} onClick={() => setSearchQuery('GH')} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest pl-1">
          {filteredEquipment.length} máquinas encontradas
        </p>
        
        {filteredEquipment.map((item) => (
          <div 
            key={item.id}
            onClick={() => {
              setSelectedEq(item);
              // Si eliges la máquina, te mostramos el contexto del cliente (ya está en el card)
            }}
            className={`relative flex flex-col gap-3 rounded-2xl p-4 transition-all border ${selectedEq?.id === item.id ? 'bg-surface-dark border-primary' : 'bg-surface-dark/50 border-white/5'}`}
          >
            <div className="flex items-start gap-4">
               <div className="size-16 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 overflow-hidden">
                  <img src={item.img} className="h-full w-full object-cover opacity-80" alt={item.title} />
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white text-base font-black truncate">{item.title}</h3>
                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 rounded border border-primary/20">{item.tag}</span>
                  </div>
                  <p className="text-[#9dabb9] text-xs font-bold uppercase mt-1">{item.clientName}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{item.subtitle}</p>
               </div>
            </div>
            
            {selectedEq?.id === item.id && (
              <div className="pt-3 border-t border-white/5 flex gap-2 animate-in fade-in slide-in-from-top-2">
                 <button 
                   onClick={(e) => { e.stopPropagation(); navigate(`/details/${item.orderId || 'WO-4829'}`); }}
                   className="flex-1 bg-primary text-white h-10 rounded-lg text-xs font-black uppercase shadow-lg shadow-primary/20"
                 >
                   Abrir Orden de Trabajo
                 </button>
                 <button className="px-3 bg-white/5 text-white h-10 rounded-lg hover:bg-white/10">
                    <span className="material-symbols-outlined">info</span>
                 </button>
              </div>
            )}
          </div>
        ))}
        
        {filteredEquipment.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600">
            <span className="material-symbols-outlined text-5xl mb-2">inventory_2</span>
            <p className="text-sm font-bold">No hay máquinas que coincidan</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-6 right-6 z-30">
        <button 
          onClick={() => navigate('/create')}
          className="w-full h-16 bg-white text-black rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>NUEVA OT</span>
        </button>
      </div>
    </div>
  );
};

const FilterChip: React.FC<{ label: string; active?: boolean; onClick?: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-full px-5 border transition-all active:scale-95 ${active ? 'bg-primary text-white border-primary/20' : 'bg-input-bg border-white/5 text-[#9dabb9]'}`}
  >
    <p className={`text-xs ${active ? 'font-bold' : 'font-medium'}`}>{label}</p>
  </button>
);

export default Search;
