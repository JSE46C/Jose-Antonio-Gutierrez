
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_WORK_ORDERS, CLIENT_AVATAR } from '../constants';
import { OrderStatus } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-24">
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary" 
                style={{backgroundImage: `url("${CLIENT_AVATAR}")`}}
              />
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-light dark:border-background-dark" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Oct 24, 2023</p>
              <h2 className="text-lg font-bold leading-tight dark:text-white">Hello, Alex</h2>
            </div>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar mask-gradient-right snap-x">
          <button className="snap-start shrink-0 flex h-8 items-center justify-center px-4 rounded-full bg-primary text-white text-sm font-medium transition-transform active:scale-95">All</button>
          <button className="snap-start shrink-0 flex h-8 items-center justify-center px-4 rounded-full bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-slate-300 text-sm font-medium border border-transparent dark:border-slate-700">Roberto S.</button>
          <button className="snap-start shrink-0 flex h-8 items-center justify-center px-4 rounded-full bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-slate-300 text-sm font-medium border border-transparent dark:border-slate-700">Maria G.</button>
          <button className="snap-start shrink-0 flex h-8 items-center justify-center px-4 rounded-full bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-slate-300 text-sm font-medium border border-transparent dark:border-slate-700">Carlos L.</button>
        </div>
      </header>

      <div className="px-4 py-2">
        <div className="flex gap-3">
          <StatCard icon="pending_actions" color="text-amber-500" count={5} label="Pending" />
          <StatCard icon="priority_high" color="text-red-500" count={3} label="High Priority" />
          <StatCard icon="check_circle" color="text-green-500" count={2} label="Completed" />
        </div>
      </div>

      <main className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Assigned Tasks</h3>
          <span onClick={() => navigate('/search')} className="text-xs text-primary font-medium cursor-pointer">View Map</span>
        </div>

        {MOCK_WORK_ORDERS.map((order) => (
          <div 
            key={order.id}
            onClick={() => navigate(`/details/${order.id}`)}
            className={`flex flex-col bg-white dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm border ${order.status === OrderStatus.IN_PROGRESS ? 'border-2 border-primary/20' : 'border-slate-200 dark:border-slate-700'} cursor-pointer transition-all active:scale-[0.98]`}
          >
            {order.status === OrderStatus.IN_PROGRESS && (
              <div className="bg-primary/10 px-4 py-1.5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wide text-primary">In Progress - Assignee: {order.assignee.split(' ')[0]}</span>
              </div>
            )}
            <div className="flex p-4 pb-3 gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">#{order.id}</span>
                  {order.status === OrderStatus.HIGH_PRIORITY && (
                    <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                      Priority: High
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{order.title}</h4>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{order.subtitle}</p>
              </div>
              <div className="w-24 h-24 shrink-0 rounded-lg bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url("${order.imageUrl}")`}} />
            </div>
            {order.status !== OrderStatus.IN_PROGRESS && (
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span className="text-xs font-bold">Due {order.dueDate}</span>
                </div>
                <button className="h-8 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1">Start Job</button>
              </div>
            )}
          </div>
        ))}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pb-safe max-w-md mx-auto">
        <div className="flex justify-around items-center h-16 px-6">
          <button className="flex flex-col items-center justify-center gap-1 h-full text-primary min-w-[64px]">
            <span className="material-symbols-outlined">assignment</span>
            <span className="text-[10px] font-medium">Orders</span>
          </button>
          <button onClick={() => navigate('/create')} className="flex items-center justify-center -mt-8 size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
          <button onClick={() => navigate('/search')} className="flex flex-col items-center justify-center gap-1 h-full text-slate-400 dark:text-slate-500 min-w-[64px]">
            <span className="material-symbols-outlined">map</span>
            <span className="text-[10px] font-medium">Map</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

const StatCard: React.FC<{ icon: string; color: string; count: number; label: string }> = ({ icon, color, count, label }) => (
  <div className="flex-1 bg-white dark:bg-surface-dark rounded-lg p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between min-h-[80px]">
    <div className="flex justify-between items-start">
      <span className={`material-symbols-outlined ${color} text-[20px]`}>{icon}</span>
      <span className="text-2xl font-bold dark:text-white text-slate-900">{count}</span>
    </div>
    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-tighter">{label}</p>
  </div>
);

export default Dashboard;
