
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_WORK_ORDERS, CLIENT_AVATAR } from '../constants';
import { OrderStatus } from '../types';

type FilterType = 'Pendientes' | 'Hoy' | 'Urgentes';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('Pendientes');

  // Calculate KPIs
  const kpis = useMemo(() => {
    const technicianName = "Sergio Gutierrez";
    let totalHours = 0;
    
    MOCK_WORK_ORDERS.forEach(order => {
      order.laborLogs.forEach(log => {
        if (log.technician === technicianName && log.time.includes('Today')) {
          // Extract numerical value from duration string like "2.5 hrs"
          const hours = parseFloat(log.duration);
          if (!isNaN(hours)) totalHours += hours;
        }
      });
    });

    const pendingCount = MOCK_WORK_ORDERS.filter(o => o.status !== OrderStatus.COMPLETED).length;

    return {
      totalHours,
      pendingCount
    };
  }, []);

  // Filter orders based on active tab and completion status
  const filteredOrders = useMemo(() => {
    let orders = MOCK_WORK_ORDERS.filter(order => order.status !== OrderStatus.COMPLETED);

    if (activeFilter === 'Hoy') {
      orders = orders.filter(o => o.dueDate.toLowerCase().includes('today'));
    } else if (activeFilter === 'Urgentes') {
      orders = orders.filter(o => o.status === OrderStatus.HIGH_PRIORITY);
    }
    // 'Pendientes' shows all non-completed orders by default

    return orders;
  }, [activeFilter]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBatchSign = () => {
    if (selectedIds.length === 0) return;
    navigate(`/complete/${selectedIds[0]}?batch=${selectedIds.join(',')}`);
  };

  return (
    <div className="flex flex-col pb-48 min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary shadow-sm" 
                style={{backgroundImage: `url("${CLIENT_AVATAR}")`}}
              />
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-light dark:border-background-dark" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">Técnico</p>
              <h2 className="text-base font-bold leading-tight dark:text-white">Sergio Gutierrez</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                setSelectedIds([]);
              }}
              className={`flex items-center justify-center px-3 h-10 rounded-full text-xs font-black uppercase tracking-widest transition-all ${isSelectMode ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-white'}`}
            >
              {isSelectMode ? 'Cancelar' : 'Seleccionar'}
            </button>
            <button 
              onClick={() => navigate('/search')}
              className="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-white"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>

        {/* KPIs Section */}
        <div className="grid grid-cols-2 gap-3 px-4 py-2">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
             <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">assignment</span>
             </div>
             <div>
                <p className="text-xl font-black leading-none">{kpis.pendingCount}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">OTs Pendientes</p>
             </div>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
             <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600">timer</span>
             </div>
             <div>
                <p className="text-xl font-black leading-none">{kpis.totalHours.toFixed(1)}h</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Imputado Hoy</p>
             </div>
          </div>
        </div>

        {/* Functional Filter Tabs */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar mask-gradient-right">
          <button 
            onClick={() => setActiveFilter('Pendientes')}
            className={`shrink-0 flex h-8 items-center justify-center px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === 'Pendientes' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-slate-300'}`}
          >
            Pendientes
          </button>
          <button 
            onClick={() => setActiveFilter('Hoy')}
            className={`shrink-0 flex h-8 items-center justify-center px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === 'Hoy' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-slate-300'}`}
          >
            Hoy
          </button>
          <button 
            onClick={() => setActiveFilter('Urgentes')}
            className={`shrink-0 flex h-8 items-center justify-center px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === 'Urgentes' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-slate-300'}`}
          >
            Urgentes
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{activeFilter}</h3>
          <span className="text-[10px] font-bold text-primary uppercase">{filteredOrders.length} Resultados</span>
        </div>

        {filteredOrders.map((order) => (
          <div 
            key={order.id}
            onClick={() => isSelectMode ? toggleSelect(order.id) : navigate(`/details/${order.id}`)}
            className={`relative flex flex-col bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm transition-all border-2 active:scale-[0.98] ${
              selectedIds.includes(order.id) 
                ? 'border-primary ring-4 ring-primary/10' 
                : 'border-transparent dark:border-slate-800'
            }`}
          >
            {isSelectMode && (
              <div className="absolute top-4 left-4 z-10">
                <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedIds.includes(order.id) ? 'bg-primary border-primary text-white' : 'bg-white/10 border-white/20'}`}>
                  {selectedIds.includes(order.id) && <span className="material-symbols-outlined text-sm font-black">check</span>}
                </div>
              </div>
            )}

            <div className={`flex p-4 gap-4 ${isSelectMode ? 'pl-14' : ''}`}>
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400">#{order.id}</span>
                  {order.status === OrderStatus.HIGH_PRIORITY && (
                    <span className="text-[8px] font-black uppercase tracking-tighter bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20">Urgente</span>
                  )}
                </div>
                <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight truncate">{order.title}</h4>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate uppercase tracking-wide">{order.clientName}</p>
                <div className="flex items-center gap-1 mt-2 text-slate-400">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  <span className="text-[10px] font-medium truncate">{order.location}</span>
                </div>
              </div>
              <div className="size-20 shrink-0 rounded-xl bg-center bg-cover border border-slate-100 dark:border-slate-800" style={{backgroundImage: `url("${order.imageUrl}")`}} />
            </div>

            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full animate-pulse ${order.status === OrderStatus.IN_PROGRESS ? 'bg-amber-500' : 'bg-primary'}`}></span>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{order.status}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 italic">Previsión: {order.dueDate.split(',')[1]}</span>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <span className="material-symbols-outlined text-6xl opacity-20">inventory_2</span>
            <p className="mt-4 font-bold text-sm">No hay órdenes en esta categoría</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe max-w-md mx-auto">
        {isSelectMode && selectedIds.length > 0 ? (
          <div className="flex items-center justify-between p-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col">
              <span className="text-xs font-black text-primary uppercase tracking-widest">{selectedIds.length} OT Seleccionadas</span>
              <p className="text-[10px] text-slate-500 font-medium">Lote listo para firma</p>
            </div>
            <button 
              onClick={handleBatchSign}
              className="h-14 px-8 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center gap-3"
            >
              <span>Continuar</span>
              <span className="material-symbols-outlined">draw</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-around items-center h-16 px-6">
            <button 
              onClick={() => navigate('/')}
              className="flex flex-col items-center justify-center gap-1 text-primary"
            >
              <span className="material-symbols-outlined">assignment</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Órdenes</span>
            </button>
            <button onClick={() => navigate('/create')} className="flex items-center justify-center -mt-8 size-14 rounded-full bg-primary text-white shadow-xl shadow-primary/40 active:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">add</span>
            </button>
            <button onClick={() => navigate('/search')} className="flex flex-col items-center justify-center gap-1 text-slate-400">
              <span className="material-symbols-outlined">search</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Buscador</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
