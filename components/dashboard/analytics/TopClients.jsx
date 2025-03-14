'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TopClients({ data }) {
  const tableRef = useRef(null);
  const rowRefs = useRef([]);
  
  useEffect(() => {
    // Animate table rows
    gsap.fromTo(rowRefs.current,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Top Clients by Revenue</h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
          View All Clients
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-left text-sm font-medium text-slate-500">Client</th>
              <th className="pb-3 text-right text-sm font-medium text-slate-500">Revenue</th>
              <th className="pb-3 text-center text-sm font-medium text-slate-500">Projects</th>
              <th className="pb-3 text-right text-sm font-medium text-slate-500">Performance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client, index) => {
              // Calculate percentage of the top client's revenue for the visual indicator
              const maxRevenue = Math.max(...data.map(c => c.revenue));
              const percentage = (client.revenue / maxRevenue) * 100;
              
              return (
                <tr 
                  key={client.name}
                  ref={el => rowRefs.current[index] = el}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-3">
                        {client.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right font-medium text-slate-800">
                    KES {client.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 rounded-full w-6 h-6 font-medium">
                      {client.projects}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end">
                      <div className="w-24 bg-slate-100 rounded-full h-2 mr-3">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600">{((client.revenue / data.reduce((sum, c) => sum + c.revenue, 0)) * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
        <div className="text-sm text-slate-500">
          Showing top {data.length} out of {data.length + 15} clients
        </div>
        <div className="text-sm">
          <span className="font-medium text-slate-800">Total Revenue: </span>
          <span>KES {data.reduce((sum, client) => sum + client.revenue, 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
