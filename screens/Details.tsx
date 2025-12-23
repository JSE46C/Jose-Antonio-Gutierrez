
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_WORK_ORDERS } from '../constants';
import { OrderStatus } from '../types';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = MOCK_WORK_ORDERS.find(o => o.id === id) || MOCK_WORK_ORDERS[0];
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

  const handleStatusChange = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus);
    order.status = newStatus;
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-48">
      <div className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
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

      <main className="flex flex-1 flex-col gap-4 p-4">
        {/* Status Selector Section */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Estado de la OT</h3>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl">
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

        {/* Machine Info Card */}
        <div className="flex bg-white dark:bg-surface-dark rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm gap-4 items-center">
           <div className="size-20 shrink-0 rounded-xl bg-cover bg-center border border-slate-100 dark:border-slate-800" style={{backgroundImage: `url("${order.imageUrl}")`}} />
           <div className="flex-1 min-w-0">
             <h3 className="font-black text-lg leading-tight truncate">{order.title}</h3>
             <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 truncate uppercase">{order.location}</p>
             <div className="flex gap-2 mt-2">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${currentStatus === OrderStatus.IN_PROGRESS ? 'bg-amber-500/10 text-amber-600' : 'bg-primary/10 text-primary'}`}>
                  {currentStatus}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Ref: {order.id.split('-')[1]}</span>
             </div>
           </div>
        </div>

        {/* Issue Description */}
        <div className="p-5 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Problema Reportado</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{order.description}</p>
        </div>

        {/* Combined Activity / Input Log */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Historial de Trabajo</h3>
            <button onClick={() => navigate('/add-item')} className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">add</span> Añadir
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Labor Summary */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
               <div className="bg-slate-50 dark:bg-slate-800/30 px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Mano de Obra (HN)</span>
                  <span className="text-xs font-black text-primary">3.5h Totales</span>
               </div>
               {order.laborLogs.length > 0 ? order.laborLogs.map(log => (
                 <div key={log.id} className="p-4 flex items-center justify-between border-b last:border-b-0 border-slate-50 dark:border-slate-800/50">
                   <div className="flex items-center gap-3">
                     <span className="bg-blue-100 text-blue-600 dark:bg-primary/10 dark:text-primary px-2 py-0.5 rounded text-[10px] font-black uppercase">{log.type}</span>
                     <span className="text-sm text-slate-900 dark:text-white font-bold">{log.technician}</span>
                   </div>
                   <span className="font-mono text-sm font-black text-slate-900 dark:text-white">{log.duration}</span>
                 </div>
               )) : (
                 <p className="p-6 text-xs text-slate-500 font-medium italic text-center">Sin imputaciones de tiempo.</p>
               )}
            </div>

            {/* Materials Summary */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
               <div className="bg-slate-50 dark:bg-slate-800/30 px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Materiales (Furgoneta)</span>
                  <span className="text-xs font-black text-primary">{order.materials.length} Artículos</span>
               </div>
               {order.materials.length > 0 ? order.materials.map(mat => (
                 <div key={mat.id} className="p-4 flex items-center justify-between border-b last:border-b-0 border-slate-50 dark:border-slate-800/50">
                   <div className="flex flex-col min-w-0">
                     <span className="text-sm text-slate-900 dark:text-white font-bold truncate">{mat.name}</span>
                     <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">Ref: {mat.sku}</span>
                   </div>
                   <div className="text-right ml-4">
                      <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg font-black text-sm">x{mat.quantity}</span>
                   </div>
                 </div>
               )) : (
                 <p className="p-6 text-xs text-slate-500 font-medium italic text-center">No se han añadido materiales aún.</p>
               )}
            </div>
          </div>
        </div>
      </main>

      {/* Mechanic Sticky Footer - Quick Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-5 max-w-md mx-auto space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/add-item?type=labor')}
            className="flex flex-col items-center justify-center gap-1 h-16 rounded-2xl bg-slate-100 dark:bg-surface-highlight text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-2xl mb-1 text-primary">timer</span>
            <span>Fichar Tiempo</span>
          </button>
          <button 
            onClick={() => navigate('/add-item?type=material')}
            className="flex flex-col items-center justify-center gap-1 h-16 rounded-2xl bg-slate-100 dark:bg-surface-highlight text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-2xl mb-1 text-primary">inventory_2</span>
            <span>Añadir Material</span>
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
