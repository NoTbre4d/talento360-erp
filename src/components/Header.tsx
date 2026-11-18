'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  UserCheck, 
  Calendar, 
  PlusCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { AlertItem } from '../types/hr';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  selectedPeriod: string;
  setSelectedPeriod: (val: string) => void;
  alerts: AlertItem[];
  onOpenNewEmployee: () => void;
  onOpenNewJob: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  selectedPeriod,
  setSelectedPeriod,
  alerts,
  onOpenNewEmployee,
  onOpenNewJob,
  searchQuery,
  setSearchQuery,
  onExportReport
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const activeAlerts = alerts.filter(a => !dismissedAlerts.includes(a.id));

  const dismissAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedAlerts(prev => [...prev, id]);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar colaborador, cargo, vacante o habilidad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder:text-slate-400 dark:text-slate-100"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Period Selector */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-transparent border-none focus:outline-none cursor-pointer pr-1"
          >
            <option value="Octubre 2026 (Mes Actual)">Octubre 2026 (Mes Actual)</option>
            <option value="Q3 - 2026 (Trimestre)">Q3 - 2026 (Trimestre)</option>
            <option value="Año 2026 (Acumulado)">Año 2026 (Acumulado)</option>
          </select>
        </div>

        {/* Quick Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-indigo-500/20 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Acción Rápida</span>
          </button>

          {showQuickMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
              <button
                onClick={() => { setShowQuickMenu(false); onOpenNewEmployee(); }}
                className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-indigo-500" />
                Registrar Nuevo Colaborador
              </button>
              <button
                onClick={() => { setShowQuickMenu(false); onOpenNewJob(); }}
                className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-emerald-500" />
                Abrir Nueva Vacante ATS
              </button>
              <button
                onClick={() => { setShowQuickMenu(false); onExportReport(); }}
                className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1 pt-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-500" />
                Exportar Informe Ejecutivo
              </button>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Centro de Alertas de RRHH"
          >
            <Bell className="w-4 h-4" />
            {activeAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Alertas de Talento Humano
                  </h4>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 rounded-full">
                    {activeAlerts.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                >
                  Cerrar
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto px-2 py-1 divide-y divide-slate-100 dark:divide-slate-800/60">
                {activeAlerts.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
                    No tienes alertas pendientes en este momento.
                  </p>
                ) : (
                  activeAlerts.map(alert => (
                    <div key={alert.id} className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors relative group">
                      <div className="flex items-start gap-2.5">
                        {alert.type === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />}
                        {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                        {alert.type === 'info' && <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />}
                        {alert.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}

                        <div className="flex-1 pr-4">
                          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                            {alert.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                            {alert.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-medium">
                              {alert.module}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => dismissAlert(alert.id, e)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-opacity p-1"
                          title="Descartar"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dark/Light mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
            alt="Carolina Gómez"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-none">
              Lic. Carolina Gómez Soto
            </p>
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium mt-0.5 leading-none">
              Directora de Talento Humano
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
