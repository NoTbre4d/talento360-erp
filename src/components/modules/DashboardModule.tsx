'use client';

import React from 'react';
import {
  Users,
  TrendingDown,
  Activity,
  Heart,
  DollarSign,
  PieChart as PieIcon,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertTriangle,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  TURNOVER_VS_TRAINING_HISTORY,
  HEADCOUNT_BY_DEPARTMENT,
  CLIMATE_RADAR_DATA,
  ERP_FINANCE_METRICS
} from '../../data/mockData';
import { AlertItem, Employee } from '../../types/hr';

interface DashboardModuleProps {
  employees: Employee[];
  alerts: AlertItem[];
  onNavigate: (module: any) => void;
  onSelectEmployee: (employee: Employee) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  employees,
  alerts,
  onNavigate,
  onSelectEmployee
}) => {
  // Top 6 strategic KPIs
  const kpis = [
    {
      title: 'Headcount Activo',
      value: '148',
      sub: '4 vacantes abiertas',
      change: '+6.2%',
      isPositive: true,
      icon: Users,
      color: 'indigo',
      academicBadge: 'Plantilla Laboral'
    },
    {
      title: 'Tasa de Rotación (Turnover)',
      value: '2.8%',
      sub: 'Meta anual: < 3.5%',
      change: '-1.4%',
      isPositive: true, // Decreasing turnover is good!
      icon: TrendingDown,
      color: 'emerald',
      academicBadge: 'Retención de Talento'
    },
    {
      title: 'Ausentismo (Factor Bradford)',
      value: '1.8%',
      sub: 'Bradford Prom: 42 (Bajo Riesgo)',
      change: '-0.4%',
      isPositive: true,
      icon: Activity,
      color: 'amber',
      academicBadge: 'Salud Ocupacional / SST'
    },
    {
      title: 'Clima Laboral (eNPS)',
      value: '+58',
      sub: 'Benchmark sectorial: +42 pts',
      change: '+11 pts',
      isPositive: true,
      icon: Heart,
      color: 'rose',
      academicBadge: 'Cultura & Lealtad'
    },
    {
      title: 'Ingreso por Empleado (Productividad)',
      value: '$5,304',
      sub: 'EBITDA por colaborador',
      change: '+9.4%',
      isPositive: true,
      icon: DollarSign,
      color: 'blue',
      academicBadge: 'People Analytics ROI'
    },
    {
      title: 'Masa Salarial / Ingresos ERP',
      value: '28.4%',
      sub: '$223.1k / $785.0k facturado',
      change: '-1.1%',
      isPositive: true,
      icon: PieIcon,
      color: 'violet',
      academicBadge: 'Finanzas & Nómina'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome & Strategic HR Focus Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold backdrop-blur-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Gestión Estratégica del Talento Humano • People Analytics
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dashboard de Capital Humano e Impacto en Negocio
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Monitoreo integral de indicadores de ciclo de vida del colaborador, productividad del equipo, bienestar psicosocial y su retorno directo sobre las finanzas empresariales.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => onNavigate('performance')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl backdrop-blur-sm transition-colors border border-white/10 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-amber-400" />
              Ver Matriz 9-Box
            </button>
            <button
              onClick={() => onNavigate('employees')}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              Directorio 360°
            </button>
          </div>
        </div>
      </div>

      {/* 6 Strategic KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {kpi.academicBadge}
                </span>
                <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">
                {kpi.title}
              </h3>
              
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {kpi.value}
                </span>
                <span className={`inline-flex items-center text-xs font-bold ${
                  kpi.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {kpi.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 inline" /> : <ArrowDownRight className="w-3.5 h-3.5 inline" />}
                  {kpi.change}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 truncate">
                {kpi.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1: Turnover vs Training (The core People Analytics correlation) & Climate Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Turnover vs Training Hours */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Correlación: Tasa de Rotación (%) vs. Horas de Capacitación
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
                  12 Meses
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Demuestra el impacto del plan de desarrollo en la disminución de renuncias voluntarias (People Analytics).
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TURNOVER_VS_TRAINING_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCapacitacion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#6366f1" fontSize={11} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" fontSize={11} tickLine={false} domain={[0, 6]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="horasCapacitacion"
                  name="Horas de Capacitación Promedio"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorCapacitacion)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="rotacion"
                  name="Tasa de Rotación Voluntaria (%)"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#ef4444' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>💡 Conclusión analítica: Cada incremento de 10 hrs en formación reduce la rotación en 0.7 puntos porcentuales.</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Ahorro estimado: $33,600 USD/mes</span>
          </div>
        </div>

        {/* Radar: Organizational Climate Diagnosis */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Diagnóstico de Clima Laboral
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 rounded-full">
                eNPS +58
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Evaluación en 6 dimensiones vs. benchmark de la industria.
            </p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={CLIMATE_RADAR_DATA}>
                <PolarGrid stroke="#94a3b8" opacity={0.2} />
                <PolarAngleAxis dataKey="area" stroke="#94a3b8" fontSize={9.5} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" opacity={0.3} />
                <Radar name="Empresa Actual" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.45} />
                <Radar name="Benchmark Sector" dataKey="benchmark" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
              <span className="block text-[10px] font-medium">Dimensión más alta</span>
              <strong className="text-xs font-bold">Seguridad y Salud (94%)</strong>
            </div>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
              <span className="block text-[10px] font-medium">Oportunidad de mejora</span>
              <strong className="text-xs font-bold">Compensación (79%)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2: Headcount by Modality & Talent Matrix / Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Headcount by Department & Work Modality */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Distribución de Personal por Departamento y Modalidad
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Seguimiento de esquemas de trabajo (Presencial, Híbrido y Remoto) en la organización.
              </p>
            </div>
            <button
              onClick={() => onNavigate('employees')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Ver tabla <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HEADCOUNT_BY_DEPARTMENT} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="departamento" stroke="#94a3b8" fontSize={11} tickLine={false} />
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
                <Bar dataKey="presencial" name="Presencial" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="hibrido" name="Híbrido" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="remoto" name="Remoto" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Talent Priorities & Critical Alerts Table */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Alertas Críticas de RRHH
              </h3>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Atención prioritaria para evitar fugas y retrasos legales.
            </p>

            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    {alert.type === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                    {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                    {alert.type === 'info' && <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                        {alert.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {alert.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                        {alert.actionText && (
                          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                            {alert.actionText} →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Total alertas: {alerts.length}</span>
            <button
              onClick={() => onNavigate('wellbeing')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Gestionar en Bienestar & SST →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
