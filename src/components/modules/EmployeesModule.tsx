'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  Eye,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  AlertCircle,
  TrendingUp,
  Award,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Employee, Department, EmployeeStatus, Modality } from '../../types/hr';

interface EmployeesModuleProps {
  employees: Employee[];
  onSelectEmployee: (emp: Employee) => void;
  onOpenNewEmployee: () => void;
  searchFilter: string;
}

export const EmployeesModule: React.FC<EmployeesModuleProps> = ({
  employees,
  onSelectEmployee,
  onOpenNewEmployee,
  searchFilter
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const effectiveSearch = localSearch || searchFilter;

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      emp.role.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      emp.department.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      emp.skills.some(s => s.name.toLowerCase().includes(effectiveSearch.toLowerCase()));

    const matchesDept = selectedDept === 'all' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    const matchesModality = selectedModality === 'all' || emp.modality === selectedModality;

    return matchesSearch && matchesDept && matchesStatus && matchesModality;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            Gestión de Personal & Expediente Digital
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Directorio de Colaboradores (Evaluación 360°)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Expedientes digitales centralizados, trazabilidad de competencias, historial de desempeño y seguimiento de retención del talento clave.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewEmployee}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            Registrar Colaborador
          </button>
        </div>
      </div>

      {/* Control Bar: Filters & View Switch */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search box inside module */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrar por nombre o cargo..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="all">Todos los Departamentos</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Talento Humano">Talento Humano</option>
            <option value="Operaciones">Operaciones</option>
            <option value="Ventas y Mercadeo">Ventas y Mercadeo</option>
            <option value="Finanzas">Finanzas</option>
            <option value="Logística">Logística</option>
          </select>

          {/* Modality Filter */}
          <select
            value={selectedModality}
            onChange={(e) => setSelectedModality(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="all">Todas las Modalidades</option>
            <option value="Presencial">Presencial</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Remoto">Remoto</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="all">Todos los Estados</option>
            <option value="Activo">Activo</option>
            <option value="En Vacaciones">En Vacaciones</option>
            <option value="Incapacidad">Incapacidad</option>
          </select>
        </div>

        {/* View Switcher & Counter */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {filteredEmployees.length} colaboradores
          </span>

          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-400'
              }`}
              title="Vista en Tarjetas"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-400'
              }`}
              title="Vista en Tabla"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => onSelectEmployee(emp)}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Avatar, Status, Flight Risk */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-indigo-500 transition-all"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {emp.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">
                        {emp.role}
                      </p>
                      <span className="text-[10px] text-slate-400">ID: {emp.id}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      emp.status === 'Activo'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400'
                        : emp.status === 'En Vacaciones'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400'
                    }`}>
                      {emp.status}
                    </span>

                    {emp.flightRisk === 'Alto' && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 rounded-md animate-pulse">
                        <ShieldAlert className="w-2.5 h-2.5" /> Fuga Alta
                      </span>
                    )}
                  </div>
                </div>

                {/* Dept & Modality Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                    {emp.department}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-lg">
                    {emp.modality}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg">
                    {emp.tenureYears} años
                  </span>
                </div>

                {/* Performance & Potential Scores */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Desempeño</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${emp.performanceScore}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {emp.performanceScore}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Potencial 9-Box</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${emp.potentialScore}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {emp.potentialScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Skills Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {emp.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                      {skill.name}
                    </span>
                  ))}
                  {emp.skills.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                      +{emp.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card: Salary & 360 Profile CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block">Salario Base Mensual</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    ${emp.salary.toLocaleString()} USD
                  </span>
                </div>

                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Ver Perfil 360° <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Colaborador</th>
                  <th className="px-4 py-3.5">Departamento & Cargo</th>
                  <th className="px-3 py-3.5">Modalidad</th>
                  <th className="px-3 py-3.5">Desempeño</th>
                  <th className="px-3 py-3.5">Potencial</th>
                  <th className="px-3 py-3.5">Riesgo Fuga</th>
                  <th className="px-3 py-3.5">Salario (USD)</th>
                  <th className="px-3 py-3.5">Estado</th>
                  <th className="px-4 py-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => onSelectEmployee(emp)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3 flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-xs">{emp.name}</p>
                        <p className="text-[10px] text-slate-400">{emp.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{emp.role}</p>
                      <p className="text-[10px] text-slate-400">{emp.department}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 text-[10px] rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold">
                        {emp.modality}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-bold text-indigo-600 dark:text-indigo-400">
                      {emp.performanceScore}%
                    </td>
                    <td className="px-3 py-3 font-bold text-amber-500">
                      {emp.potentialScore}%
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        emp.flightRisk === 'Alto' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400' :
                        emp.flightRisk === 'Medio' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' :
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                      }`}>
                        {emp.flightRisk}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-bold text-slate-800 dark:text-slate-200">
                      ${emp.salary.toLocaleString()}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        emp.status === 'Activo'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : emp.status === 'En Vacaciones'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Expediente →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
