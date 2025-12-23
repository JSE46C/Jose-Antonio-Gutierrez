
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_WORK_ORDERS } from '../constants';

const CompleteOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = MOCK_WORK_ORDERS.find(o => o.id === id) || MOCK_WORK_ORDERS[0];
  const [reportType, setReportType] = useState<'budgeted' | 'detailed'>('detailed');

  const subtotal = 325.00;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="relative flex flex-col min-h-screen pb-32 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 text-slate-900 dark:text-white rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold flex-1 text-center pr-8">Finalize Work Order</h1>
      </header>

      <section className="px-4 py-6">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card-light dark:bg-card-dark shadow-sm border border-slate-100 dark:border-slate-800/50">
          <div className="w-16 h-16 rounded-full bg-cover bg-center shrink-0 border-2 border-slate-100 dark:border-slate-700" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwXOK75Hi88kNmTQFGXF5xLtOdl83u6BmsFYfWBs0GNqN8suDltO2RybROXG6cH1xatvdxJ_HnpUMEHcpbhOsUzElh7DT9RnUXdr61F3hRSrfR_oZUVogTeD-JTHNiwZ5nEXlJAucJS4rFwclbR5Lt1doXOmrl6QSRiwemCQ7vRMrIun3mRPseKHQALFJ2U8092CeD5GXlJ0odEpJLJuGOfa7RkzzxYbRb_lNE2dUQZ3ldK4gKBwIsoEq8PPDEkdVhKM7ocUcnyyM")'}} />
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold truncate">Juan Perez</h2>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">Verified</span>
            </div>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark truncate">2018 Toyota Corolla • ABC-123</p>
            <p className="text-xs text-slate-400 mt-1">Client ID: #88392</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-2">
        <div className="flex p-1 rounded-xl bg-slate-200 dark:bg-[#1c2127]">
          <button 
            onClick={() => setReportType('budgeted')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${reportType === 'budgeted' ? 'bg-primary text-white shadow-md' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
          >
            Budgeted
          </button>
          <button 
            onClick={() => setReportType('detailed')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${reportType === 'detailed' ? 'bg-primary text-white shadow-md' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
          >
            Detailed
          </button>
        </div>
      </section>

      <section className="px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Services Performed (2)</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Batch Sign</span>
            <input defaultChecked className="w-5 h-5 rounded border-slate-300 text-primary bg-slate-100 dark:bg-slate-700" type="checkbox" />
          </div>
        </div>
        
        <ServiceCard 
          title="Oil Change & Filter" 
          duration="0.8 hrs" 
          price={85.00} 
          breakdown={[
            { label: 'Labor (Basic)', amount: 60.00 },
            { label: 'Synthetic Oil 5W-30', amount: 25.00 }
          ]}
        />
      </section>

      <section className="px-4 py-2">
        <div className="p-5 rounded-xl bg-white dark:bg-[#151e28] border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <span>Subtotal</span>
            <span className="font-medium text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <span>Tax (10%)</span>
            <span className="font-medium text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
          </div>
          <div className="h-px bg-slate-100 dark:bg-slate-700 my-1" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">ink_pen</span>
          Signatures
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-bold">Technician</label>
            <span className="text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span> Signed
            </span>
          </div>
          <div className="relative h-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/20 flex items-center px-4 overflow-hidden">
            <div className="w-32 h-12 bg-contain bg-no-repeat opacity-60 dark:invert" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiLLO6J0FLJDp5WpDTcECoPb1-s9SsWsw9x0ZoHOrILftN5D7oc4Rl0-LtL0KSM70PJ-veQONV6v9wG3_bCPoNoeqsU75Sa393P2Y3ERoXjgCGSdbZ9iU8lCnuzvBCzNcm0ND-RPbUM9U4_qFuyE39aB4Vq19bn3iju516IyqGKrQc73ejdtA6ktwRYIiTHqTej-pz20T4giDvpP2pZAKWPOqfQFxVlZgcJijifZAgnuZQ6b5RSskrcn-5Gb5vKoBm9YACjA2Nl8c")'}} />
            <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono">TS: 2023-10-27 10:42:15</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-bold">Customer</label>
            <button className="text-xs text-primary font-bold uppercase">Clear</button>
          </div>
          <div className="relative h-56 rounded-xl bg-card-light dark:bg-card-dark border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary transition-colors shadow-inner overflow-hidden flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">gesture</span>
            <span className="text-slate-400 text-sm font-medium">Sign here with finger</span>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              By signing, I acknowledge that the work described above has been performed to my satisfaction and I authorize the charges to be billed to my account.
            </p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 max-w-md mx-auto">
        <button 
          onClick={() => { alert('Order Finalized!'); navigate('/'); }}
          className="w-full group relative overflow-hidden rounded-xl bg-primary text-white font-bold text-base py-4 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <span>Finalize & Send</span>
            <span className="material-symbols-outlined text-xl">send</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ title: string; duration: string; price: number; breakdown: { label: string; amount: number }[] }> = ({ title, duration, price, breakdown }) => (
  <div className="flex flex-col gap-3 p-4 rounded-xl bg-card-light dark:bg-card-dark shadow-sm border border-slate-100 dark:border-slate-800 transition-all active:scale-[0.99]">
    <div className="flex justify-between items-start gap-3">
      <div className="flex gap-3 items-start flex-1">
        <div className="mt-1 shrink-0">
          <input defaultChecked className="w-5 h-5 rounded border-slate-300 text-primary" type="checkbox" />
        </div>
        <div className="flex flex-col">
          <h4 className="font-bold text-base leading-tight">{title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="material-symbols-outlined text-[16px] text-green-500">check_circle</span>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Completed • {duration}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-base font-bold">${price.toFixed(2)}</span>
      </div>
    </div>
    <div className="ml-8 pl-4 border-l-2 border-slate-100 dark:border-slate-700 text-sm space-y-2 mt-1">
      {breakdown.map((item, idx) => (
        <div key={idx} className="flex justify-between text-text-secondary-light dark:text-text-secondary-dark">
          <span>{item.label}</span>
          <span>${item.amount.toFixed(2)}</span>
        </div>
      ))}
    </div>
  </div>
);

export default CompleteOrder;
