'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  ShieldCheck,
  Download,
  CheckCircle,
  Scale
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { SALARY_EQUITY_DATA } from '../../data/mockData';
import { Employee } from '../../types/hr';

interface PayrollModuleProps {
  employees: Employee[];
  onExport: () => void;
}

export const PayrollModule: React.FC<PayrollModuleProps> = ({ employees, onExport }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    onExport();
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const totalPayroll = employees.reduce((acc, e) => acc + e.salary, 0) * 1.35; // Including 35% legal benefits & taxes
  const avgSalary = Math.round(totalPayroll / (employees.length || 1));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            Compensación, Beneficios & Equidad Salarial
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Nómina Estratégica & Transparencia Salarial
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Control presupuestario de la masa salarial, parafiscales, horas extras y auditoría continua de equidad de género por niveles jerárquicos.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Exportar Planilla Nómina (.xlsx)
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Planilla de nómina electrónica generada con éxito y firmada digitalmente con sello de auditoría.</span>
        </div>
      )}

      {/* 4 Payroll KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Costo Masa Salarial Mes</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">$223,100 USD</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Incluye salarios, seguridad social y aportes
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Salario Promedio General</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">$2,960 USD</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
            Competitivo en el percentil 75 del mercado
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brecha Salarial Género</span>
            <Scale className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">1.1%</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
            Certificación de Equidad Salarial Aprobada
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Horas Extras Liquidadas</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">$4,120 USD</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Concentrado en Logística y Operaciones
          </p>
        </div>
      </div>

      {/* Salary Equity Chart (Academic Crucial Concept) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Análisis de Equidad Salarial por Bandas y Género
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                Igual Salario por Igual Trabajo
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comparativa de remuneración media (USD/mes) entre hombres y mujeres en cada nivel de la estructura organizacional.
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SALARY_EQUITY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
              <XAxis dataKey="nivel" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Bar dataKey="hombres" name="Remuneración Hombres (USD)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mujeres" name="Remuneración Mujeres (USD)" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payroll Table Sample */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Desglose de Liquidación Salarial de la Muestra (Octubre 2026)
          </h3>
          <span className="text-xs text-slate-400">Total colaboradores liquidados: {employees.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Colaborador</th>
                <th className="px-3 py-3">Cargo</th>
                <th className="px-3 py-3">Salario Base</th>
                <th className="px-3 py-3">Bonos / Comisiones</th>
                <th className="px-3 py-3">Deducciones (Salud/Pensión)</th>
                <th className="px-3 py-3 font-bold text-slate-900 dark:text-white">Neto a Pagar</th>
                <th className="px-3 py-3 text-right">Estado Dispersión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {employees.map((emp) => {
                const bonus = emp.performanceScore > 90 ? Math.round(emp.salary * 0.15) : 0;
                const deductions = Math.round(emp.salary * 0.08);
                const netPay = emp.salary + bonus - deductions;

                return (
                  <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {emp.name}
                    </td>
                    <td className="px-3 py-3">{emp.role}</td>
                    <td className="px-3 py-3 font-semibold">${emp.salary.toLocaleString()} USD</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">
                      {bonus > 0 ? `+$${bonus.toLocaleString()}` : '$0'}
                    </td>
                    <td className="px-3 py-3 text-rose-500">
                      -${deductions.toLocaleString()}
                    </td>
                    <td className="px-3 py-3 font-extrabold text-slate-900 dark:text-white">
                      ${netPay.toLocaleString()} USD
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        ✓ Dispersado
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
