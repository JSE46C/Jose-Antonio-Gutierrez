
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_WORK_ORDERS } from '../constants';
import { OrderStatus } from '../types';

const CompleteOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const primaryOrder = useMemo(() => 
    MOCK_WORK_ORDERS.find(o => o.id === id) || MOCK_WORK_ORDERS[0], 
  [id]);

  const queryParams = new URLSearchParams(location.search);
  const initialBatch = queryParams.get('batch')?.split(',') || [primaryOrder.id];

  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>(initialBatch);
  const [reportType, setReportType] = useState<'detailed' | 'summary'>('detailed');
  const [extraEmail, setExtraEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [markAsCompleted, setMarkAsCompleted] = useState(true);

  useEffect(() => {
    if (queryParams.get('batch')) {
      setSelectedOrderIds(queryParams.get('batch')?.split(',') || []);
    }
  }, [location.search]);

  const handleFinalize = () => {
    if (selectedOrderIds.length === 0) {
      alert("Por favor, selecciona al menos un parte para firmar.");
      return;
    }

    if (markAsCompleted) {
      selectedOrderIds.forEach(oid => {
        const order = MOCK_WORK_ORDERS.find(o => o.id === oid);
        if (order) order.status = OrderStatus.COMPLETED;
      });
    }

    let message = `¡${selectedOrderIds.length} partes firmados y enviados!`;
    message += `\nConfiguración: ${reportType === 'detailed' ? 'Parte con detalle completo' : 'Resumen sin detalle'}.`;
    if (markAsCompleted) message += `\nLas órdenes han sido marcadas como completadas.`;
    
    alert(message);
    navigate('/');
  };

  return (
    <div className="relative flex flex-col min-h-screen pb-48 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 text-slate-900 dark:text-white rounded-full active:bg-slate-200 dark:active:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xs font-black flex-1 text-center uppercase tracking-[0.2em] text-slate-500">Cierre de Trabajo</h1>
        <div className="w-10"></div>
      </header>

      <section className="p-4">
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex items-center gap-4 shadow-sm">
           <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-3xl">corporate_fare</span>
           </div>
           <div className="flex-1">
              <h2 className="text-xl font-black leading-tight tracking-tight">{primaryOrder.clientName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-primary font-black uppercase tracking-wider">Cliente #{primaryOrder.clientId}</span>
                <span className="size-1 rounded-full bg-slate-300"></span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{selectedOrderIds.length} OT Seleccionadas</span>
              </div>
           </div>
        </div>
      </section>

      <section className="px-4 space-y-3 mb-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Resumen del Lote</h3>
        <div className="max-h-48 overflow-y-auto pr-1 space-y-2 no-scrollbar">
          {MOCK_WORK_ORDERS.filter(o => selectedOrderIds.includes(o.id)).map(order => (
            <div key={order.id} className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-3 flex justify-between items-center">
              <div className="min-w-0">
                <p className="text-sm font-black truncate">{order.title}</p>
                <p className="text-[10px] text-slate-500 font-bold">Ref: {order.id}</p>
              </div>
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 space-y-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Configuración del Parte (PDF)</h3>
          <div className="flex p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-inner">
            <button 
              onClick={() => setReportType('detailed')} 
              className={`flex-1 py-3 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all ${reportType === 'detailed' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
            >
              Con Detalle
            </button>
            <button 
              onClick={() => setReportType('summary')} 
              className={`flex-1 py-3 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all ${reportType === 'summary' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
            >
              Sin Detalle
            </button>
          </div>
          <p className="text-[10px] text-slate-500 font-medium px-2 text-center">
            {reportType === 'detailed' 
              ? 'El cliente verá el desglose completo de materiales, horas de mano de obra e información de desplazamientos.' 
              : 'El cliente solo recibirá el resumen general de la intervención sin desglose técnico.'}
          </p>
        </div>

        <div className={`p-5 rounded-2xl bg-white dark:bg-surface-dark border transition-all shadow-sm ${showEmailInput ? 'border-primary ring-4 ring-primary/10' : 'border-slate-200 dark:border-slate-800'}`}>
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><span className="material-symbols-outlined text-primary">alternate_email</span></div>
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">Email Adicional</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Copia PDF manual</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input checked={showEmailInput} onChange={(e) => setShowEmailInput(e.target.checked)} className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
           </div>
           {showEmailInput && (
             <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
               <input type="email" value={extraEmail} onChange={(e) => setExtraEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400" placeholder="admin@cliente.com" />
             </div>
           )}
        </div>
      </section>

      <section className="px-4 py-6 space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Firma Digital del Cliente</h3>
        <div className="relative h-48 rounded-3xl bg-white dark:bg-surface-dark border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center cursor-crosshair active:bg-slate-50 dark:active:bg-slate-800/30 transition-colors shadow-inner group">
           <div className="size-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-1 group-active:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-slate-300">draw</span>
           </div>
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Validar {selectedOrderIds.length} partes aquí</p>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
             <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Marcar como completadas</p>
             <p className="text-[10px] text-slate-500 font-bold uppercase">Desaparecerán de la ruta principal</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input checked={markAsCompleted} onChange={(e) => setMarkAsCompleted(e.target.checked)} className="sr-only peer" type="checkbox" />
            <div className="w-12 h-7 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        <button 
          onClick={handleFinalize}
          disabled={selectedOrderIds.length === 0}
          className={`w-full h-16 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all ${markAsCompleted ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-primary text-white shadow-primary/30'}`}
        >
          <span>{markAsCompleted ? 'FIRMAR Y COMPLETAR' : 'FIRMAR Y ENVIAR'} ({selectedOrderIds.length})</span>
          <span className="material-symbols-outlined text-2xl">{markAsCompleted ? 'done_all' : 'send'}</span>
        </button>
      </div>
    </div>
  );
};

export default CompleteOrder;
