
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_WORK_ORDERS } from '../constants';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = MOCK_WORK_ORDERS.find(o => o.id === id) || MOCK_WORK_ORDERS[0];

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <div className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between h-16">
          <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors size-10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold">Work Order #{order.id}</h2>
          <button className="text-slate-900 dark:text-white flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors size-10">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      <main className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-sm bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
          <div className="relative w-full aspect-video">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url("${order.imageUrl}")`}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary text-white shadow-lg">{order.status}</span>
            </div>
            <div className="absolute bottom-3 left-4 right-4">
              <h1 className="text-white text-2xl font-bold leading-tight drop-shadow-md">{order.title}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">Location</p>
                <p className="text-slate-900 dark:text-white text-base font-medium">{order.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]">description</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">Reported Issue</p>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mt-1">{order.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">Activity Log</h3>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Est: $70.00</span>
        </div>

        <div className="flex flex-col gap-3">
          <details className="group rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 open:ring-1 open:ring-primary/50 transition-all duration-200" open>
            <summary className="flex cursor-pointer items-center justify-between p-4 list-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white text-sm font-semibold">Labor Logs</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">3.5 Hours logged</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <div className="px-4 pb-4 pt-0 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 mt-2">
              {order.laborLogs.map(log => (
                <div key={log.id} className="pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">{log.initials}</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{log.technician}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{log.time}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono bg-slate-100 dark:bg-surface-highlight px-2 py-1 rounded">{log.duration}</span>
                </div>
              ))}
              {order.laborLogs.length === 0 && <p className="pt-4 text-sm text-slate-500 italic">No labor logged yet.</p>}
            </div>
          </details>
          
          <details className="group rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 open:ring-1 open:ring-primary/50 transition-all duration-200" open>
            <summary className="flex cursor-pointer items-center justify-between p-4 list-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white text-sm font-semibold">Materials Used</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{order.materials.length} Items</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <div className="flex flex-col border-t border-slate-100 dark:border-slate-800">
              {order.materials.map(mat => (
                <div key={mat.id} className="flex items-center gap-4 px-4 py-3 justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-slate-600 dark:text-slate-300 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-highlight shrink-0 size-10">
                      <span className="material-symbols-outlined text-[20px]">build</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-slate-900 dark:text-white text-sm font-medium line-clamp-1">{mat.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-normal line-clamp-2">SKU: {mat.sku} | Qty: {mat.quantity}</p>
                    </div>
                  </div>
                  <div className="shrink-0"><p className="text-slate-900 dark:text-white text-sm font-medium">${mat.price.toFixed(2)}</p></div>
                </div>
              ))}
              {order.materials.length === 0 && <p className="p-4 text-sm text-slate-500 italic">No materials added.</p>}
            </div>
          </details>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 max-w-md mx-auto">
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/add-item')}
            className="flex flex-1 flex-col items-center justify-center gap-1 p-2 rounded-xl bg-slate-100 dark:bg-surface-highlight text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-2xl">add_circle</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide">Add Item</span>
          </button>
          <button className="flex flex-1 flex-col items-center justify-center gap-1 p-2 rounded-xl bg-slate-100 dark:bg-surface-highlight text-slate-600 dark:text-slate-300 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl">timer</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide">Log Time</span>
          </button>
          <button 
            onClick={() => navigate(`/complete/${order.id}`)}
            className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">check_circle</span>
            <span>Complete Job</span>
          </button>
        </div>
        <div className="h-2"></div>
      </div>
    </div>
  );
};

export default Details;
