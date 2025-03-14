'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FinancialMetrics({ data }) {
  const numbersRef = useRef([]);
  
  useEffect(() => {
    // Animate numbers counting up
    numbersRef.current.forEach(element => {
      const value = parseInt(element.dataset.value);
      gsap.fromTo(element, 
        { innerText: 0 }, 
        { 
          innerText: value, 
          duration: 2, 
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            element.innerText = element.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (element.dataset.prefix) {
              element.innerText = element.dataset.prefix + element.innerText;
            }
            if (element.dataset.suffix) {
              element.innerText = element.innerText + element.dataset.suffix;
            }
          }
        }
      );
    });
  }, [data]);

  const formatCurrency = (amount) => {
    return 'KES ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Financial Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-sm font-medium text-slate-500 mb-2">Total Revenue</h4>
          <p 
            ref={el => numbersRef.current[0] = el} 
            data-value={data.totalRevenue / 1000} 
            data-prefix="KES " 
            data-suffix="K"
            className="text-2xl font-bold text-slate-800"
          >
            0
          </p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-emerald-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z" clipRule="evenodd" />
              </svg>
              {data.growthRate}%
            </span>
            <span className="text-slate-500 ml-2">vs previous period</span>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-sm font-medium text-slate-500 mb-2">Expenses</h4>
          <p 
            ref={el => numbersRef.current[1] = el} 
            data-value={data.expenses / 1000} 
            data-prefix="KES " 
            data-suffix="K"
            className="text-2xl font-bold text-slate-800"
          >
            0
          </p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-slate-500">
              {((data.expenses / data.totalRevenue) * 100).toFixed(1)}% of revenue
            </span>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-sm font-medium text-slate-500 mb-2">Net Profit</h4>
          <p 
            ref={el => numbersRef.current[2] = el} 
            data-value={data.profit / 1000} 
            data-prefix="KES " 
            data-suffix="K"
            className="text-2xl font-bold text-emerald-600"
          >
            0
          </p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-slate-500">
              Margin: {((data.profit / data.totalRevenue) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <h4 className="text-sm font-medium text-emerald-700 mb-2">Profit Growth</h4>
          <p 
            ref={el => numbersRef.current[3] = el} 
            data-value={data.growthRate} 
            data-suffix="%"
            className="text-2xl font-bold text-emerald-700"
          >
            0
          </p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-emerald-600">
              Healthy increase year-over-year
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Financial Year 2024-2025</span>
          <span className="text-emerald-600 font-medium cursor-pointer hover:text-emerald-700 transition-colors">
            View Detailed Report →
          </span>
        </div>
      </div>
    </div>
  );
}
