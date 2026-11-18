'use client';

import React from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { ERP_SALES_PRODUCTIVITY, ERP_FINANCE_METRICS } from '../../data/mockData';

export const ERPConnectorsModule: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          Integración ERP: Talento Humano + Finanzas + Ventas
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Impacto del Capital Humano en los Resultados del Negocio
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Demostración cuantitativa de cómo las políticas de retención, capacitación y selección impactan directamente las ventas comerciales y la rentabilidad financiera (EBITDA).
        </p>
      </div>

      {/* Financial Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white shadow-xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
            Ahorro por Retención de Talento
          </span>
          <div className="text-3xl font-black mt-2 text-white">$33,600 USD / mes</div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Se retuvo a 4 colaboradores clave gracias a revisiones tempranas de planes de carrera y clima. Costo evitado de contratación externa: $8,400 USD por puesto.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-bold">
            <span>✓ Retorno Directo al EBITDA</span>
            <span>+4.2% margen</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950 to-slate-900 text-white shadow-xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            ROI de la Capacitación Laboral
          </span>
          <div className="text-3xl font-black mt-2 text-emerald-400">3.8x Retorno</div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Por cada $1.00 USD invertido en la Universidad Corporativa, la organización recupera $3.80 USD en menor tiempo de resolución de errores y reducción de mermas.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-bold">
            <span>Inversión: $34,000 USD</span>
            <span>Retorno: $129,200 USD</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Masa Salarial vs. Facturación ERP
          </span>
          <div className="text-3xl font-black mt-2 text-white">28.4%</div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Costo de nómina total: $223,100 USD sobre $785,000 USD de facturación global de la empresa. Indicador de alta eficiencia operativa.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-300 font-bold">
            <span>Benchmark Industria</span>
            <span>Rango óptimo: 25% - 32%</span>
          </div>
        </div>
      </div>

      {/* Sales Team Productivity Breakdown */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Vínculo Talento Humano &gt; Ventas Comerciales
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
                Efecto Antigüedad &amp; Formación
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Demuestra que colaboradores con mayor permanencia y capacitación en la empresa generan hasta un 230% más de ingresos comerciales.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Ejecutivo Comercial</th>
                <th className="px-3 py-3">Antigüedad en Empresa</th>
                <th className="px-3 py-3">Ventas Facturadas Mes</th>
                <th className="px-3 py-3">Meta Trimestral</th>
                <th className="px-3 py-3">Cumplimiento %</th>
                <th className="px-3 py-3">Comisión Generada</th>
                <th className="px-3 py-3 text-right">Efecto Retención</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {ERP_SALES_PRODUCTIVITY.map((sp, idx) => {
                const pct = Math.round((sp.ventasMes / sp.meta) * 100);

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {sp.asesor}
                    </td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[10px]">
                        {sp.antiguedad}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">
                      ${sp.ventasMes.toLocaleString()} USD
                    </td>
                    <td className="px-3 py-3 text-slate-400">
                      ${sp.meta.toLocaleString()} USD
                    </td>
                    <td className="px-3 py-3 font-extrabold text-emerald-600 dark:text-emerald-400">
                      {pct}%
                    </td>
                    <td className="px-3 py-3 text-indigo-600 dark:text-indigo-400 font-bold">
                      ${sp.comision.toLocaleString()} USD
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        pct >= 100 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                      }`}>
                        {pct >= 100 ? 'Top Performer' : 'En Rampa'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
