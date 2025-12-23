
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_WORK_ORDERS } from '../constants';
import { OrderStatus } from '../types';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Re-fetch order from mock data. Since MOCK_WORK_ORDERS is a global mutable array, 
  // mutations from AddItem.tsx will be visible here upon remount.
  const order = useMemo(() => MOCK_WORK_ORDERS.find(o => o.id === id) || MOCK_WORK_ORDERS[0], [id]);
  
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

  const handleStatusChange = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus);
    order.status = newStatus;
  };

  // Combine labor logs and materials into a unified history for better visibility
  const interventionHistory = useMemo(() => {
    const logs = order.laborLogs.map(log => ({
      ...log,
      entryType: 'labor' as const,
      timestamp: log.time, // Simplification for sorting if needed
    }));

    const mats = order.materials.map(mat => ({
      id: mat.id,
      entryType: 'material' as const,
      title: mat.name,
      subtitle: `Ref: ${mat.sku}`,
      value: `x${mat.quantity}`,
      timestamp: 'Just now', // Materials don't have timestamps in the current mock, usually added "now"
      comment: mat.comment
    }));

    return [...logs, ...mats];
  }, [order.laborLogs, order.materials]);

  const laborTotal = useMemo(() => {
    return order.laborLogs.reduce((sum, log) => {
      const val = parseFloat(log.duration);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [order.laborLogs]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-64">
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between h-16">
          <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors size-10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest">OT #{order.id}</h2>
            <p className="text-[10px] text-slate-500 font-medium">{order.clientName}</p>
          </div>
          <button className="text-slate-900 dark:text-white flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors size-10">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      <main className="flex flex-1 flex-col gap-5 p-4">
        {/* Status Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado de la Intervención</h3>
             <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${currentStatus === OrderStatus.IN_PROGRESS ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'}`}>{currentStatus}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <button 
              onClick={() => handleStatusChange(OrderStatus.IN_PROGRESS)}
              className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${currentStatus === OrderStatus.IN_PROGRESS ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              En curso
            </button>
            <button 
              onClick={() => handleStatusChange(OrderStatus.PENDING)}
              className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${currentStatus === OrderStatus.PENDING ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              Pendiente Firma
            </button>
          </div>
        </section>

        {/* Machine Card */}
        <div className="flex bg-white dark:bg-surface-dark rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm gap-4 items-center">
           <div className="size-20 shrink-0 rounded-2xl bg-cover bg-center border border-slate-100 dark:border-slate-800 shadow-inner" style={{backgroundImage: `url("${order.imageUrl}")`}} />
           <div className="flex-1 min-w-0">
             <h3 className="font-black text-lg leading-tight truncate">{order.title}</h3>
             <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 truncate uppercase tracking-wide">{order.location}</p>
             <div className="flex gap-2 mt-3">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Ref: {order.id}</span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Mec: {order.assignee.split(' ')[0]}</span>
             </div>
           </div>
        </div>

        {/* Work Description */}
        <div className="p-6 rounded-3xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Descripción del Parte</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{order.description}</p>
        </div>

        {/* Chronological Intervention History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Historial de Trabajo (Detalle)</h3>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-primary uppercase">{laborTotal.toFixed(1)}h Totales</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {interventionHistory.length > 0 ? interventionHistory.map((item, index) => (
              <div key={item.id || index} className="relative flex gap-4 bg-white dark:bg-surface-dark rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  item.entryType === 'material' ? 'bg-green-500/10 text-green-500' : 
                  (item.type === 'Travel' || item.type === 'Zone' || item.type === 'KM' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary')
                }`}>
                  <span className="material-symbols-outlined text-xl">
                    {item.entryType === 'material' ? 'inventory_2' : 
                    (item.type === 'Travel' || item.type === 'Zone' || item.type === 'KM' ? 'local_shipping' : 'timer')}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                      {item.entryType === 'material' ? item.title : item.technician}
                    </p>
                    <span className="font-mono text-xs font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {item.entryType === 'material' ? item.value : `${item.duration}${item.type === 'KM' ? 'km' : 'h'}`}
                    </span>
                  </div>
                  
                  <div className="flex flex-col mt-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                       <span>{item.entryType === 'material' ? item.subtitle : item.type}</span>
                       <span className="size-0.5 rounded-full bg-slate-300"></span>
                       <span className="italic">{item.timestamp}</span>
                    </div>
                    {/* Check entryType to safely access entry-specific fields like comment or reference */}
                    {item.entryType === 'material' && item.comment && (
                      <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                        {item.comment}
                      </p>
                    )}
                    {item.entryType === 'labor' && item.reference && (
                       <p className="mt-1 text-[10px] text-amber-600 font-black uppercase">{item.reference}</p>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-10 bg-white/50 dark:bg-surface-dark/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <span className="material-symbols-outlined text-4xl text-slate-300">history_toggle_off</span>
                <p className="text-xs text-slate-500 font-bold mt-2 uppercase tracking-widest">Sin registros de actividad</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Sticky Quick Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 p-5 max-w-md mx-auto space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => navigate(`/add-item?type=labor&orderId=${order.id}`)}
            className="flex flex-col items-center justify-center gap-1 h-16 rounded-2xl bg-slate-50 dark:bg-surface-highlight text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-sm border border-slate-200/50 dark:border-slate-700/50"
          >
            <span className="material-symbols-outlined text-xl mb-1 text-primary">timer</span>
            <span>Tiempo</span>
          </button>
          <button 
            onClick={() => navigate(`/add-item?type=material&orderId=${order.id}`)}
            className="flex flex-col items-center justify-center gap-1 h-16 rounded-2xl bg-slate-50 dark:bg-surface-highlight text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-sm border border-slate-200/50 dark:border-slate-700/50"
          >
            <span className="material-symbols-outlined text-xl mb-1 text-green-500">inventory_2</span>
            <span>Pieza</span>
          </button>
          <button 
            onClick={() => navigate(`/add-item?type=travel&orderId=${order.id}`)}
            className="flex flex-col items-center justify-center gap-1 h-16 rounded-2xl bg-slate-50 dark:bg-surface-highlight text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-sm border border-slate-200/50 dark:border-slate-700/50"
          >
            <span className="material-symbols-outlined text-xl mb-1 text-amber-500">local_shipping</span>
            <span>Viaje</span>
          </button>
        </div>
        <button 
          onClick={() => navigate(`/complete/${order.id}`)}
          className="w-full flex items-center justify-center gap-3 h-16 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">draw</span>
          <span>FIRMAR Y FINALIZAR</span>
        </button>
      </div>
    </div>
  );
};

export default Details;
