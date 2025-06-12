'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function InvoiceAgingReport({ data }) {
  const barsRef = useRef([]);
  const numbersRef = useRef([]);
  
  // Calculate the total amount and percentages
  const totalAmount = data.reduce((total, item) => total + item.amount, 0);
  
  // Define colors for the different aging categories
  const getStatusColor = (status) => {
    switch(status) {
      case 'Current': return { bg: 'bg-emerald-500', text: 'text-emerald-800' };
      case '1-30 days': return { bg: 'bg-blue-500', text: 'text-blue-800' };
      case '31-60 days': return { bg: 'bg-amber-500', text: 'text-amber-800' };
      case '61-90 days': return { bg: 'bg-orange-500', text: 'text-orange-800' };
      case '90+ days': return { bg: 'bg-red-500', text: 'text-red-800' };
      default: return { bg: 'bg-slate-500', text: 'text-slate-800' };
    }
  };
  
  useEffect(() => {
    // Animate the progress bars
    barsRef.current.forEach((bar, index) => {
      const percentage = (data[index].amount / totalAmount) * 100;
      
      gsap.fromTo(bar, 
        { width: '0%' }, 
        { width: `${percentage}%`, duration: 1.5, ease: 'power3.out' }
      );
    });
    
    // Animate the numbers
    numbersRef.current.forEach((element, index) => {
      gsap.fromTo(element, 
        { innerText: 0 }, 
        { 
          innerText: Math.round(data[index].amount / 1000), 
          duration: 1.5, 
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            element.innerText = 'KES ' + element.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K';
          }
        }
      );
    });
  }, [data, totalAmount]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Invoice Aging Report</h3>
      
      <div className="flex-grow space-y-5">
        {data.map((item, index) => {
          const percentage = ((item.amount / totalAmount) * 100).toFixed(1);
          const { bg, text } = getStatusColor(item.status);
          
          return (
            <div key={item.status} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${bg} mr-2`}></span>
                  <span className="text-sm font-medium text-slate-700">{item.status}</span>
                </div>
                <span 
                  ref={el => numbersRef.current[index] = el}
                  className="text-sm font-semibold text-slate-800"
                >
                  KES 0
                </span>
              </div>
              
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  ref={el => barsRef.current[index] = el}
                  className={`h-full ${bg} rounded-full`}
                  style={{ width: '0%' }}
                ></div>
              </div>
              
              <p className={`text-xs ${text}`}>{percentage}% of total invoices</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Total Outstanding</span>
          <span className="text-base font-bold text-slate-800">
            KES {(totalAmount).toLocaleString()}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
            View Full Report
          </a>
          <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
            Send Reminders
          </a>
        </div>
      </div>
    </div>
  );
}
