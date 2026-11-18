'use client';

import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Award,
  GraduationCap,
  HeartHandshake,
  DollarSign,
  TrendingUp,
  FileText,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export type ActiveModule = 
  | 'dashboard' 
  | 'employees' 
  | 'ats' 
  | 'performance' 
  | 'training' 
  | 'wellbeing' 
  | 'payroll' 
  | 'erp' 
  | 'reports';

interface SidebarProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  pendingApprovalsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  setActiveModule,
  collapsed,
  setCollapsed,
  pendingApprovalsCount
}) => {
  const menuItems = [
    {
      id: 'dashboard' as ActiveModule,
      label: 'People Analytics',
      sub: 'Dashboard Estratégico',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'employees' as ActiveModule,
      label: 'Colaboradores',
      sub: 'Directorio 360° & Expedientes',
      icon: Users,
      badge: '148'
    },
    {
      id: 'ats' as ActiveModule,
      label: 'Atracción & ATS',
      sub: 'Pipeline de Selección',
      icon: UserPlus,
      badge: '4 vac.'
    },
    {
      id: 'performance' as ActiveModule,
      label: 'Desempeño & 9-Box',
      sub: 'Matriz de Talento & OKRs',
      icon: Award,
      badge: null
    },
    {
      id: 'training' as ActiveModule,
      label: 'Capacitación & Skills',
      sub: 'Desarrollo de Competencias',
      icon: GraduationCap,
      badge: null
    },
    {
      id: 'wellbeing' as ActiveModule,
      label: 'Clima, SST & Ausencias',
      sub: 'Factor Bradford & eNPS',
      icon: HeartHandshake,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} pend.` : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'payroll' as ActiveModule,
      label: 'Nómina & Equidad',
      sub: 'Compensación & Beneficios',
      icon: DollarSign,
      badge: null
    },
    {
      id: 'erp' as ActiveModule,
      label: 'Conexión ERP',
      sub: 'Impacto en Ventas & Finanzas',
      icon: TrendingUp,
      badge: 'ROI 3.8x',
      badgeColor: 'bg-emerald-500 text-white'
    },
    {
      id: 'reports' as ActiveModule,
      label: 'Informes Ejecutivos',
      sub: 'Auditoría & Cumplimiento',
      icon: FileText,
      badge: null
    }
  ];

  return (
    <aside 
      className={`relative flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 z-40 select-none ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-black text-lg">
              T
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base">
                  Talento<span className="text-indigo-600 dark:text-indigo-400">360</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded">
                  ERP
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Human Capital Management
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
            T
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2">
          {!collapsed && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Módulos de Gestión
            </p>
          )}
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left relative ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200 font-normal'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30' 
                  : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
              }`}>
                <Icon className="w-4 h-4 shrink-0" />
              </div>

              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-normal">
                    {item.sub}
                  </p>
                </div>
              )}

              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-600 rounded-r-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Status Card */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-lg border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-tight">People Intelligence</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Organización con <strong className="text-white">Clima Saludable</strong> (+58 eNPS) y rotación 34% menor al promedio sectorial.
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>Plantilla: 148 pers.</span>
            <span className="text-emerald-400 font-semibold">98.2% Asistencia</span>
          </div>
        </div>
      )}
    </aside>
  );
};
