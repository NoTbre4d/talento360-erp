'use client';

import React, { useState } from 'react';
import {
  UserPlus,
  Clock,
  DollarSign,
  CheckCircle,
  Plus,
  ChevronRight,
  Star,
  Mail,
  Phone,
  Briefcase,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { Candidate, CandidateStage, JobOpening } from '../../types/hr';

interface RecruitmentModuleProps {
  jobOpenings: JobOpening[];
  candidates: Candidate[];
  onOpenNewJob: () => void;
  onUpdateCandidateStage: (candidateId: string, nextStage: CandidateStage) => void;
}

const STAGES: CandidateStage[] = [
  'Postulado',
  'Filtro Curricular',
  'Entrevista RRHH',
  'Prueba Técnica',
  'Oferta',
  'Contratado'
];

export const RecruitmentModule: React.FC<RecruitmentModuleProps> = ({
  jobOpenings,
  candidates,
  onOpenNewJob,
  onUpdateCandidateStage
}) => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');

  const filteredCandidates = selectedRoleFilter === 'all'
    ? candidates
    : candidates.filter(c => c.roleApplied === selectedRoleFilter);

  const getNextStage = (current: CandidateStage): CandidateStage | null => {
    const idx = STAGES.indexOf(current);
    if (idx >= 0 && idx < STAGES.length - 1) {
      return STAGES[idx + 1];
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
            <UserPlus className="w-3.5 h-3.5" />
            Atracción del Talento & ATS (Applicant Tracking System)
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pipeline de Selección & Reclutamiento Ágil
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Optimización del embudo de contratación, evaluación de compatibilidad cultural y técnica, y reducción de costos de reclutamiento.
          </p>
        </div>

        <button
          onClick={onOpenNewJob}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Publicar Nueva Vacante
        </button>
      </div>

      {/* 4 Strategic ATS KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time-to-Hire</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">22 días</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
            ↓ 16 días vs. año anterior (Meta: &lt; 25d)
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Costo por Contratación</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">$1,850 USD</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
            45% menor al costo de agencia externa
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa Aceptación Ofertas</span>
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">91.4%</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Alta competitividad del paquete salarial
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Fuente de Talento</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white">Referidos (44%)</div>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
            LinkedIn (32%) • Web Interna (24%)
          </p>
        </div>
      </div>

      {/* Active Job Requisitions Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Vacantes Abiertas Actualmente ({jobOpenings.length})
          </h3>
          <span className="text-xs text-slate-400">Filtrar embudo por vacante:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedRoleFilter('all')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedRoleFilter === 'all'
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <p className="text-xs font-bold truncate">Todas las Vacantes</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{candidates.length} candidatos totales</p>
          </button>

          {jobOpenings.map(job => (
            <button
              key={job.id}
              onClick={() => setSelectedRoleFilter(job.title)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedRoleFilter === job.title
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                  job.priority === 'Alta' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400' :
                  'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}>
                  {job.priority}
                </span>
                <span className="text-[10px] text-slate-400">{job.daysOpen} días abierta</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{job.title}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>{job.department}</span>
                <strong className="text-indigo-600 dark:text-indigo-400">{job.applicantsCount} post.</strong>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Kanban Pipeline */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Tablero Kanban de Reclutamiento
            <span className="text-xs font-normal text-slate-400">
              (Haz clic en "Avanzar Etapa →" para mover candidatos en el funnel)
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {STAGES.map((stage) => {
            const stageCandidates = filteredCandidates.filter(c => c.stage === stage);

            return (
              <div
                key={stage}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col min-h-[380px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {stage}
                  </h4>
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
                    {stageCandidates.length}
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {stageCandidates.length === 0 ? (
                    <div className="h-28 flex items-center justify-center text-center p-3 text-[11px] text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      Sin candidatos en esta fase
                    </div>
                  ) : (
                    stageCandidates.map((c) => {
                      const nextStage = getNextStage(c.stage);

                      return (
                        <div
                          key={c.id}
                          className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1 mb-1.5">
                              <h5 className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">
                                {c.name}
                              </h5>
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1 rounded">
                                {c.matchScore}%
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-1 font-medium">
                              {c.roleApplied}
                            </p>

                            <div className="flex items-center gap-1 text-amber-500 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-2.5 h-2.5 ${i < c.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                                />
                              ))}
                            </div>

                            <div className="text-[10px] text-slate-400 space-y-0.5 mb-2">
                              <p className="truncate">Asp: ${c.expectedSalary.toLocaleString()} USD</p>
                              <p className="truncate">Postulado: {c.appliedDate}</p>
                            </div>
                          </div>

                          {nextStage && (
                            <button
                              onClick={() => onUpdateCandidateStage(c.id, nextStage)}
                              className="mt-2 w-full py-1 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <span>Avanzar a {nextStage}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}

                          {c.stage === 'Contratado' && (
                            <div className="mt-2 text-center py-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg">
                              ✓ Proceso Completado
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
