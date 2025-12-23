
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'Clients' | 'Equipment'>('Equipment');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-dark overflow-hidden pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background-dark/95 backdrop-blur-md border-b border-[#283039]">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={() => navigate('/')} className="text-white flex size-12 items-center justify-start">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-white text-lg font-bold flex-1 text-center">Command Center</h2>
          <div className="flex w-12 items-center justify-end">
            <span className="material-symbols-outlined text-[#9dabb9]">help</span>
          </div>
        </div>

        <div className="px-4 py-2 space-y-3">
          <SearchInput icon="person_search" placeholder="Search Client (Name, Phone, ID)" />
          <SearchInput icon="directions_car" placeholder="Search Machine" defaultValue="Genie" hasClear />
        </div>

        <div className="px-4 py-3">
          <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-input-bg p-1">
            <button 
              onClick={() => setView('Clients')}
              className={`flex-1 h-full flex items-center justify-center rounded-md text-sm font-medium transition-all ${view === 'Clients' ? 'bg-background-dark shadow-sm text-white ring-1 ring-white/10' : 'text-[#9dabb9]'}`}
            >
              Clients
            </button>
            <button 
              onClick={() => setView('Equipment')}
              className={`flex-1 h-full flex items-center justify-center rounded-md text-sm font-medium transition-all ${view === 'Equipment' ? 'bg-background-dark shadow-sm text-white ring-1 ring-white/10' : 'text-[#9dabb9]'}`}
            >
              Equipment
            </button>
          </div>
        </div>

        <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar mask-gradient-right">
          <FilterChip label="Brand: Genie" active />
          <FilterChip label="Location" hasArrow />
          <FilterChip label="Status" hasArrow />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        <p className="text-[#9dabb9] text-xs font-medium pl-1 uppercase tracking-wider mb-2">3 Units Found</p>
        
        <EquipmentCard 
          title="Genie GS-1930" 
          subtitle="Scissor Lift • 19ft" 
          tag="GEN-1930" 
          sn="SN ...8921"
          img="https://img.directindustry.com/images_di/photo-g/16478-16168863.jpg"
          assignee="Roberto Sanchez"
          selected
          onClick={() => navigate('/details/WO-4829')}
        />

        <EquipmentCard 
          title="Toyota 8FGU25" 
          subtitle="Forklift • 5000lb" 
          tag="TOY-555" 
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x1y1cKwbVd6G4j0M3tQ6rGZ4oKq6_aKq7w&s"
        />
      </div>

      {/* Floating Action Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-30">
        <div className="bg-surface-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] text-[#9dabb9] uppercase tracking-wider font-bold">Selected Unit</p>
              <p className="text-white font-bold text-sm">Genie GS-1930 (Scissor)</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#9dabb9] uppercase tracking-wider font-bold">Owner</p>
              <p className="text-white font-medium text-sm">Roberto S.</p>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-[#283039] text-white hover:bg-[#323b46] transition-colors">
              <span className="material-symbols-outlined text-[20px]">history</span>
              <span className="font-bold text-sm">History</span>
            </button>
            <button 
              onClick={() => navigate('/create')}
              className="flex-[2] flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(19,127,236,0.4)]"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span className="font-bold text-sm">Create Job</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchInput: React.FC<{ icon: string; placeholder: string; defaultValue?: string; hasClear?: boolean }> = ({ icon, placeholder, defaultValue, hasClear }) => (
  <div className="flex h-12 w-full items-stretch rounded-lg bg-input-bg focus-within:ring-2 ring-primary/50 transition-all overflow-hidden">
    <div className="text-[#9dabb9] flex items-center justify-center pl-4 pr-3">
      <span className="material-symbols-outlined text-[24px]">{icon}</span>
    </div>
    <input 
      className="flex-1 min-w-0 bg-transparent text-white border-none focus:ring-0 placeholder:text-[#9dabb9] text-base" 
      placeholder={placeholder} 
      defaultValue={defaultValue} 
    />
    {hasClear && (
      <button className="text-white flex items-center justify-center pr-3 cursor-pointer hover:text-primary">
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    )}
  </div>
);

const FilterChip: React.FC<{ label: string; active?: boolean; hasArrow?: boolean }> = ({ label, active, hasArrow }) => (
  <button className={`flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full px-4 border transition-all ${active ? 'bg-primary text-white border-primary/20 shadow-[0_0_10px_rgba(19,127,236,0.3)]' : 'bg-input-bg border-white/5 text-white hover:bg-white/5'}`}>
    <p className={`text-xs ${active ? 'font-bold' : 'font-medium'}`}>{label}</p>
    {active ? (
      <span className="material-symbols-outlined text-[16px]">close</span>
    ) : hasArrow ? (
      <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
    ) : null}
  </button>
);

const EquipmentCard: React.FC<{ title: string; subtitle: string; tag: string; sn?: string; img: string; assignee?: string; selected?: boolean; onClick?: () => void }> = ({ title, subtitle, tag, sn, img, assignee, selected, onClick }) => (
  <div 
    onClick={onClick}
    className={`relative flex flex-col gap-3 rounded-xl p-3 shadow-lg group cursor-pointer border transition-all ${selected ? 'bg-surface-dark border-primary/40' : 'bg-surface-dark border-transparent hover:border-white/10'}`}
  >
    {selected && (
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/20 px-2 py-1 rounded-md">
        <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
        <span className="text-xs font-bold text-primary">Selected</span>
      </div>
    )}
    <div className="flex items-start gap-3">
      <div className="h-16 w-16 shrink-0 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
        <img alt={title} className="h-full w-full object-cover opacity-90" src={img} />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-white text-base font-bold leading-tight truncate">{title}</h3>
        <p className="text-[#9dabb9] text-sm mt-0.5">{subtitle}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center rounded-md bg-[#283039] px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-white/10 font-mono">{tag}</span>
          {sn && <span className="text-[#9dabb9] text-xs">• {sn}</span>}
        </div>
      </div>
    </div>
    {assignee && (
      <div className="flex items-center gap-3 rounded-lg bg-input-bg/50 p-2 border border-white/5 mt-1">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
          <span className="material-symbols-outlined text-[18px]">person</span>
        </div>
        <div className="flex flex-col flex-1">
          <p className="text-xs text-[#9dabb9]">Assignee</p>
          <p className="text-sm font-medium text-white">{assignee}</p>
        </div>
        <span className="text-primary text-sm font-medium hover:underline">View</span>
      </div>
    )}
  </div>
);

export default Search;
