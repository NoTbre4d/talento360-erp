'use client';

import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  DollarSign,
  ShieldAlert,
  Star,
  CheckCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Employee } from '../../types/hr';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  onClose: () => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ employee, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'performance' | 'skills' | 'compensation'>('profile');

  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black">{employee.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  employee.status === 'Activo' ? 'bg-emerald-500/30 text-emerald-300' :
                  employee.status === 'En Vacaciones' ? 'bg-blue-500/30 text-blue-300' :
                  'bg-amber-500/30 text-amber-300'
                }`}>
                  {employee.status}
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">{employee.role} • {employee.department}</p>
              <p className="text-[10px] text-slate-300 mt-0.5">ID: {employee.id} • Modalidad: {employee.modality}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Nav */}
        <div className="flex items-center px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Expediente General
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'performance'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Desempeño & 9-Box
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'skills'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Competencias & Formación
          </button>
          <button
            onClick={() => setActiveTab('compensation')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'compensation'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Compensación & Retención
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-700 dark:text-slate-300 text-xs">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Resumen Profesional
                </h4>
                <p className="leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {employee.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Correo Corporativo</span>
                    <strong className="text-xs text-slate-900 dark:text-white">{employee.email}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Contacto Telefónico</span>
                    <strong className="text-xs text-slate-900 dark:text-white">{employee.phone}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Ubicación / Sede</span>
                    <strong className="text-xs text-slate-900 dark:text-white">{employee.location}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Fecha de Ingreso</span>
                    <strong className="text-xs text-slate-900 dark:text-white">
                      {employee.hireDate} ({employee.tenureYears} años)
                    </strong>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Líder Directo</span>
                  <strong className="text-xs text-indigo-900 dark:text-indigo-200">{employee.manager}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Tipo de Contrato</span>
                  <strong className="text-xs text-indigo-900 dark:text-indigo-200">{employee.contractType}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Nivel Académico</span>
                  <strong className="text-xs text-indigo-900 dark:text-indigo-200">{employee.education}</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Puntaje de Desempeño (KPIs)
                  </span>
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
                    {employee.performanceScore}%
                  </span>
                  <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold mt-1 block">
                    Nivel Superior a la Meta
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Potencial de Liderazgo (9-Box)
                  </span>
                  <span className="text-3xl font-black text-amber-500 mt-1 block">
                    {employee.potentialScore}%
                  </span>
                  <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold mt-1 block">
                    Alto Potencial de Promoción
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Diagnóstico en Matriz de Talento 9-Box
                </h4>
                <p className="leading-relaxed">
                  Colaborador clasificado como <strong>Talento Clave / Alto Rendimiento</strong>. Se recomienda mantener asignación en proyectos estratégicos y planificar desarrollo de competencias gerenciales.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Matriz de Competencias Evaluadas (Nivel 1 a 5)
                </h4>
                <div className="space-y-2.5">
                  {employee.skills.map((skill, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{skill.name}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < skill.level ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                          />
                        ))}
                        <span className="text-xs font-bold ml-1 text-slate-700 dark:text-slate-300">
                          {skill.level}/5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Certificaciones Oficiales Registradas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {employee.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 rounded-xl font-semibold text-xs flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-500" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compensation' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Salario Base Mensual</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    ${employee.salary.toLocaleString()} USD
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-400 block font-medium">Riesgo de Fuga</span>
                  <span className={`text-base font-bold mt-1 inline-block ${
                    employee.flightRisk === 'Alto' ? 'text-rose-600' :
                    employee.flightRisk === 'Medio' ? 'text-amber-500' :
                    'text-emerald-600'
                  }`}>
                    {employee.flightRisk} {employee.flightRisk === 'Alto' && '⚠️ Requiere revisión salarial'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                  Plan de Retención Personalizado
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  Beneficios activos: Seguro de salud complementario 100%, bono anual por cumplimiento de OKRs del 15%, y presupuesto de formación de $1,200 USD anuales.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            Cerrar Expediente
          </button>
        </div>
      </div>
    </div>
  );
};
