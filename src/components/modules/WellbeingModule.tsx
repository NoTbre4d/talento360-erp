'use client';

import React, { useState } from 'react';
import {
  HeartHandshake,
  Activity,
  Calendar,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { ABSENTEEISM_REASONS } from '../../data/mockData';
import { VacationRequest } from '../../types/hr';

interface WellbeingModuleProps {
  vacations: VacationRequest[];
  onApproveVacation: (id: string) => void;
  onRejectVacation: (id: string) => void;
}

export const WellbeingModule: React.FC<WellbeingModuleProps> = ({
  vacations,
  onApproveVacation,
  onRejectVacation
}) => {
  // Bradford Calculator demo states
  const [bradfordSpells, setBradfordSpells] = useState<number>(3);
  const [bradfordDays, setBradfordDays] = useState<number>(6);

  // Bradford formula: S^2 * D
  const calculatedBradford = Math.pow(bradfordSpells, 2) * bradfordDays;

  const getBradfordRisk = (score: number) => {
    if (score < 50) return { label: 'Bajo Riesgo', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400' };
    if (score < 200) return { label: 'Riesgo Moderado (Requiere Charla RRHH)', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400' };
    return { label: 'Alto Riesgo (Alerta Disciplinaria/SST)', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400' };
  };

  const riskInfo = getBradfordRisk(calculatedBradford);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            Bienestar, Salud Ocupacional (SST) & Control de Ausencias
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Gestión del Ausentismo, Factor de Bradford & Clima
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Control científico de ausencias repetitivas, cumplimiento de normativas de Seguridad y Salud en el Trabajo, y trámite ágil de vacaciones.
          </p>
        </div>
      </div>

      {/* Bradford Factor Section (Academic Highlight) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              Métrica Clave de Talento Humano: Factor de Bradford (Bradford Formula)
            </div>
            <h3 className="text-xl font-bold">
              ¿Por qué las ausencias cortas y frecuentes dañan más la productividad?
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              La fórmula de Bradford establece que <strong className="text-white">B = S² × D</strong>, donde <em>S</em> es el número de episodios de ausencia (spells) y <em>D</em> es la cantidad total de días. Múltiples ausencias imprevistas desorganizan turnos de trabajo mucho más que una sola ausencia prolongada por incapacidad médica.
            </p>
          </div>

          {/* Interactive Bradford Simulator */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 min-w-[280px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 block mb-2">
              Simulador Interactivo de Bradford
            </span>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Episodios de ausencia (S):</span>
                  <strong className="text-white">{bradfordSpells} veces</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={bradfordSpells}
                  onChange={(e) => setBradfordSpells(Number(e.target.value))}
                  className="w-full accent-indigo-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Días totales ausente (D):</span>
                  <strong className="text-white">{bradfordDays} días</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={bradfordDays}
                  onChange={(e) => setBradfordDays(Number(e.target.value))}
                  className="w-full accent-indigo-400 cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Puntaje Bradford</span>
                  <span className="text-2xl font-black text-white">{calculatedBradford} pts</span>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-lg ${riskInfo.color}`}>
                  {riskInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Reasons of Absence Chart & eNPS Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Causes of Absence Donut/Pie */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Desglose de Causas de Ausentismo (Mes Actual)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Total jornadas perdidas: 92 días en toda la organización (1.8% del tiempo productivo).
            </p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ABSENTEEISM_REASONS}
                  dataKey="dias"
                  nameKey="motivo"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {ABSENTEEISM_REASONS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#fff'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            El 52% corresponde a incapacidades médicas avaladas por la EPS. Cero multas por incumplimiento SST.
          </p>
        </div>

        {/* eNPS (Employee Net Promoter Score) Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Composición del eNPS (+58 Puntos)
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 rounded-full">
                Nivel Excelente
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              "¿Qué tan probable es que recomiendes esta empresa a un amigo como un excelente lugar para trabajar?"
            </p>
          </div>

          <div className="space-y-4 my-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Smile className="w-4 h-4" /> Promotores (Puntajes 9 y 10)
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">66% (98 pers.)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '66%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1.5 text-amber-500">
                  <Meh className="w-4 h-4" /> Pasivos / Neutrales (Puntajes 7 y 8)
                </span>
                <span className="text-amber-500">26% (38 pers.)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1.5 text-rose-500">
                  <Frown className="w-4 h-4" /> Detractores (Puntajes 1 al 6)
                </span>
                <span className="text-rose-500">8% (12 pers.)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '8%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300">
            Fórmula Oficial: <strong>% Promotores (66%) - % Detractores (8%) = +58 eNPS</strong>.
          </div>
        </div>
      </div>

      {/* Row 3: Vacation Requests Management (Interactive) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Solicitudes de Vacaciones & Descansos Reglamentarios
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Gestión de ausencias programadas sin afectar la continuidad operativa.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Colaborador</th>
                <th className="px-3 py-3">Departamento</th>
                <th className="px-3 py-3">Período Solicitado</th>
                <th className="px-3 py-3">Días Hábiles</th>
                <th className="px-3 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Decisión de RRHH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {vacations.map((vac) => (
                <tr key={vac.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                    {vac.employeeName}
                  </td>
                  <td className="px-3 py-3">{vac.department}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    {vac.startDate} al {vac.endDate}
                  </td>
                  <td className="px-3 py-3 font-bold text-indigo-600 dark:text-indigo-400">
                    {vac.daysRequested} días
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      vac.status === 'Aprobado' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                      vac.status === 'Rechazado' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                    }`}>
                      {vac.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {vac.status === 'Pendiente' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onApproveVacation(vac.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Aprobar
                        </button>
                        <button
                          onClick={() => onRejectVacation(vac.id)}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" /> Rechazar
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Trámite Cerrado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
