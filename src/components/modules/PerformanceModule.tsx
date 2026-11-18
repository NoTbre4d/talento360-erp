'use client';

import React, { useState } from 'react';
import {
  Award,
  Target,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  TrendingUp,
  User,
  ShieldCheck,
  ChevronRight,
  Star,
  MessageSquare,
  UserCheck,
  Users,
  PlusCircle,
  ChevronDown,
  Send,
  X,
  ClipboardCheck,
  BarChart3,
  Eye
} from 'lucide-react';
import { Employee, OKR, Evaluation360, EvaluatorRelation, EvaluationCompetency } from '../../types/hr';

interface PerformanceModuleProps {
  employees: Employee[];
  okrs: OKR[];
  evaluations: Evaluation360[];
  onSelectEmployee: (emp: Employee) => void;
  onToggleKeyResult: (okrId: string, krIndex: number) => void;
  onAddEvaluation: (evaluation: Evaluation360) => void;
}

const DEFAULT_COMPETENCIES = [
  'Liderazgo Estratégico',
  'Comunicación Asertiva',
  'Orientación a Resultados',
  'Trabajo en Equipo',
  'Innovación y Mejora Continua',
  'Gestión del Tiempo'
];

const RELATION_OPTIONS: EvaluatorRelation[] = [
  'Líder Directo',
  'Par / Colega',
  'Subordinado',
  'Autoevaluación'
];

const RELATION_COLORS: Record<EvaluatorRelation, string> = {
  'Líder Directo': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
  'Par / Colega': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  'Subordinado': 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  'Autoevaluación': 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
};

const RELATION_WEIGHTS: Record<EvaluatorRelation, number> = {
  'Líder Directo': 35,
  'Par / Colega': 25,
  'Subordinado': 25,
  'Autoevaluación': 15
};

export const PerformanceModule: React.FC<PerformanceModuleProps> = ({
  employees,
  okrs,
  evaluations,
  onSelectEmployee,
  onToggleKeyResult,
  onAddEvaluation
}) => {
  const [activeTab, setActiveTab] = useState<'9box' | 'okrs' | '360review'>('9box');
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);

  // 360 Review state
  const [showNewEvalForm, setShowNewEvalForm] = useState(false);
  const [evalSelectedEmployee, setEvalSelectedEmployee] = useState<string>('');
  const [evalRelation, setEvalRelation] = useState<EvaluatorRelation>('Líder Directo');
  const [evalEvaluatorName, setEvalEvaluatorName] = useState('');
  const [evalCompetencies, setEvalCompetencies] = useState<EvaluationCompetency[]>(
    DEFAULT_COMPETENCIES.map(name => ({ name, score: 0 }))
  );
  const [evalComments, setEvalComments] = useState('');
  const [filterEmployee, setFilterEmployee] = useState<string>('all');
  const [expandedEvalId, setExpandedEvalId] = useState<string | null>(null);

  // Helper to place employees in 9-Box coordinates
  const getQuadrant = (emp: Employee) => {
    const perf = emp.performanceScore >= 90 ? 'alto' : emp.performanceScore >= 75 ? 'medio' : 'bajo';
    const pot = emp.potentialScore >= 90 ? 'alto' : emp.potentialScore >= 75 ? 'medio' : 'bajo';
    return `${pot}-${perf}`;
  };

  const quadrantsConfig = [
    {
      id: 'alto-bajo',
      label: 'Enigma / Dilema',
      action: 'Potencial alto pero resultados bajos. Requiere mentoría o reubicación de rol.',
      color: 'bg-amber-500/10 border-amber-400 dark:border-amber-600/40 text-amber-700 dark:text-amber-300',
      tag: 'Alto Potencial • Bajo Desempeño'
    },
    {
      id: 'alto-medio',
      label: 'Futuro Líder',
      action: 'Crecer mediante proyectos desafiantes y aceleración de liderazgo.',
      color: 'bg-indigo-500/10 border-indigo-400 dark:border-indigo-600/40 text-indigo-700 dark:text-indigo-300',
      tag: 'Alto Potencial • Medio Desempeño'
    },
    {
      id: 'alto-alto',
      label: 'Estrella / Top Talent (Star)',
      action: 'Retención crítica. Candidatos inmediatos a plan de sucesión y bonos.',
      color: 'bg-emerald-500/10 border-emerald-400 dark:border-emerald-600/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30',
      tag: 'Alto Potencial • Alto Desempeño'
    },
    {
      id: 'medio-bajo',
      label: 'Dilema / En Riesgo',
      action: 'Capacitación focalizada y revisión de motivación a 60 días.',
      color: 'bg-rose-500/10 border-rose-400 dark:border-rose-600/40 text-rose-700 dark:text-rose-300',
      tag: 'Medio Potencial • Bajo Desempeño'
    },
    {
      id: 'medio-medio',
      label: 'Profesional Clave',
      action: 'Sostén operativo de la empresa. Incentivar desarrollo continuo.',
      color: 'bg-slate-500/10 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
      tag: 'Medio Potencial • Medio Desempeño'
    },
    {
      id: 'medio-alto',
      label: 'Alto Rendimiento',
      action: 'Experto en su función. Reconocer logros y asignarle aprendices.',
      color: 'bg-indigo-500/10 border-indigo-400 dark:border-indigo-600/40 text-indigo-700 dark:text-indigo-300',
      tag: 'Medio Potencial • Alto Desempeño'
    },
    {
      id: 'bajo-bajo',
      label: 'Bajo Desempeño Crítico',
      action: 'Plan de Mejora del Desempeño (PIP) o desvinculación asistida.',
      color: 'bg-red-500/10 border-red-500 dark:border-red-700 text-red-700 dark:text-red-300',
      tag: 'Bajo Potencial • Bajo Desempeño'
    },
    {
      id: 'bajo-medio',
      label: 'Efectivo / Cumplidor',
      action: 'Cumple estándares mínimos en su cargo. Mantener motivación.',
      color: 'bg-slate-500/10 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
      tag: 'Bajo Potencial • Medio Desempeño'
    },
    {
      id: 'bajo-alto',
      label: 'Especialista Confiable',
      action: 'Muy buen ejecutor en su área. No forzar a roles de gestión.',
      color: 'bg-blue-500/10 border-blue-400 dark:border-blue-600/40 text-blue-700 dark:text-blue-300',
      tag: 'Bajo Potencial • Alto Desempeño'
    }
  ];

  // --- 360 Review helpers ---
  const filteredEvaluations = filterEmployee === 'all'
    ? evaluations
    : evaluations.filter(ev => ev.employeeId === filterEmployee);

  const uniqueEvaluatedEmployees = Array.from(new Set(evaluations.map(e => e.employeeId)));

  const getEmployeeById = (id: string) => employees.find(e => e.id === id);

  const getAverageForEmployee = (empId: string) => {
    const empEvals = evaluations.filter(e => e.employeeId === empId);
    if (empEvals.length === 0) return 0;
    return empEvals.reduce((acc, ev) => acc + ev.overallScore, 0) / empEvals.length;
  };

  const handleSetCompetencyScore = (index: number, score: number) => {
    setEvalCompetencies(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], score };
      return updated;
    });
  };

  const handleSubmitEvaluation = () => {
    if (!evalSelectedEmployee || !evalEvaluatorName.trim() || evalCompetencies.some(c => c.score === 0)) return;

    const emp = getEmployeeById(evalSelectedEmployee);
    if (!emp) return;

    const overallScore = parseFloat(
      (evalCompetencies.reduce((acc, c) => acc + c.score, 0) / evalCompetencies.length).toFixed(1)
    );

    const newEval: Evaluation360 = {
      id: `EVAL-${Date.now()}`,
      employeeId: evalSelectedEmployee,
      employeeName: emp.name,
      evaluatorName: evalEvaluatorName,
      relation: evalRelation,
      competencies: [...evalCompetencies],
      overallScore,
      comments: evalComments,
      date: new Date().toISOString().split('T')[0],
      period: 'Q3 - 2026'
    };

    onAddEvaluation(newEval);

    // Reset form
    setShowNewEvalForm(false);
    setEvalSelectedEmployee('');
    setEvalRelation('Líder Directo');
    setEvalEvaluatorName('');
    setEvalCompetencies(DEFAULT_COMPETENCIES.map(name => ({ name, score: 0 })));
    setEvalComments('');
  };

  const isFormValid = evalSelectedEmployee && evalEvaluatorName.trim() && evalCompetencies.every(c => c.score > 0);

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 3.5) return 'text-indigo-600 dark:text-indigo-400';
    if (score >= 2.5) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 4.5) return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60';
    if (score >= 3.5) return 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/60';
    if (score >= 2.5) return 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60';
    return 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return 'Excepcional';
    if (score >= 3.5) return 'Bueno';
    if (score >= 2.5) return 'Aceptable';
    if (score >= 1.5) return 'Necesita Mejorar';
    return 'Crítico';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            Gestión del Rendimiento & Plan de Sucesión
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Desempeño, Matriz 9-Box & Metas OKRs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Alineación estratégica de objetivos departamentales, evaluación de competencias 360° y mapa de talento para desarrollo de líderes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('9box')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === '9box'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Matriz 9-Box Grid
          </button>
          <button
            onClick={() => setActiveTab('okrs')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'okrs'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Metas & OKRs (Q3)
          </button>
          <button
            onClick={() => setActiveTab('360review')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === '360review'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Evaluación 360°
          </button>
        </div>
      </div>

      {/* TAB 1: 9-BOX GRID */}
      {activeTab === '9box' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-900 dark:text-indigo-200">
              <strong className="font-bold">¿Cómo interpretar la Matriz de las 9 Cajas (9-Box Grid)?</strong>
              <p className="mt-0.5 leading-relaxed text-indigo-800 dark:text-indigo-300">
                El eje horizontal evalúa el <strong>Desempeño actual</strong> (cumplimiento de KPIs y objetivos). El eje vertical mide el <strong>Potencial futuro</strong> (capacidad de liderazgo y adaptabilidad). Es la herramienta estándar para comités de talento y planes de sucesión. Haz clic en cualquier colaborador para ver su expediente 360°.
              </p>
            </div>
          </div>

          {/* The 9-Box Visual Grid Container */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Eje Vertical: Potencial vs. Eje Horizontal: Desempeño
                </span>
              </div>
              <span className="text-xs text-slate-400">Total en muestra: {employees.length} personas</span>
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {quadrantsConfig.map((quadrant) => {
                const empsInQuadrant = employees.filter(e => getQuadrant(e) === quadrant.id);

                return (
                  <div
                    key={quadrant.id}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[190px] ${quadrant.color}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="text-xs font-extrabold leading-tight">
                          {quadrant.label}
                        </h4>
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-white/80 dark:bg-slate-900/80 shadow-xs">
                          {empsInQuadrant.length} pers.
                        </span>
                      </div>
                      <p className="text-[10px] opacity-80 mb-2 font-medium">
                        {quadrant.tag}
                      </p>
                      <p className="text-[10px] opacity-90 line-clamp-2 leading-relaxed italic mb-3">
                        {quadrant.action}
                      </p>
                    </div>

                    {/* Employee Badges in this quadrant */}
                    <div className="space-y-1.5 pt-2 border-t border-current/15">
                      {empsInQuadrant.length === 0 ? (
                        <p className="text-[10px] opacity-60 text-center py-2">Sin colaboradores asignados</p>
                      ) : (
                        empsInQuadrant.map((emp) => (
                          <div
                            key={emp.id}
                            onClick={() => onSelectEmployee(emp)}
                            className="p-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between text-slate-900 dark:text-white group"
                          >
                            <div className="flex items-center gap-2">
                              <img src={emp.avatar} alt={emp.name} className="w-6 h-6 rounded-lg object-cover" />
                              <div>
                                <p className="text-xs font-bold leading-none group-hover:text-indigo-600 transition-colors">
                                  {emp.name}
                                </p>
                                <p className="text-[9px] text-slate-400 leading-none mt-0.5">
                                  {emp.role}
                                </p>
                              </div>
                            </div>
                            <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400">
                              {emp.performanceScore}% / {emp.potentialScore}%
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OKRs TRACKING */}
      {activeTab === 'okrs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {okrs.map((okr) => (
              <div
                key={okr.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      {okr.department} • {okr.quarter}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      okr.status === 'Alcanzado' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                      okr.status === 'En riesgo' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                    }`}>
                      {okr.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                    {okr.objective}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Líder responsable: {okr.owner}</p>

                  {/* Progress Bar */}
                  <div className="mt-4 mb-4">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-slate-500">Progreso Trimestral</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{okr.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${okr.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Results Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Resultados Clave (Key Results):
                    </p>
                    {okr.keyResults.map((kr, idx) => (
                      <div
                        key={idx}
                        onClick={() => onToggleKeyResult(okr.id, idx)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                          kr.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {kr.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`text-xs ${
                          kr.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300 font-medium'
                        }`}>
                          {kr.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 360° EVALUATION - FULL INTERACTIVE MODULE */}
      {activeTab === '360review' && (
        <div className="space-y-5">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
              <ClipboardCheck className="w-5 h-5 mx-auto text-indigo-500 mb-1" />
              <span className="text-2xl font-black text-slate-900 dark:text-white block">{evaluations.length}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Evaluaciones Registradas</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
              <Users className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
              <span className="text-2xl font-black text-slate-900 dark:text-white block">{uniqueEvaluatedEmployees.length}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Colaboradores Evaluados</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
              <BarChart3 className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <span className="text-2xl font-black text-slate-900 dark:text-white block">
                {evaluations.length > 0 ? (evaluations.reduce((a, e) => a + e.overallScore, 0) / evaluations.length).toFixed(1) : '—'}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Promedio General</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
              <Target className="w-5 h-5 mx-auto text-rose-500 mb-1" />
              <span className="text-2xl font-black text-slate-900 dark:text-white block">
                {employees.length - uniqueEvaluatedEmployees.length}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pendientes de Evaluar</span>
            </div>
          </div>

          {/* Ponderación Info Card */}
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-900 dark:text-indigo-200">
              <strong className="font-bold">Modelo de Evaluación Multidireccional 360°</strong>
              <p className="mt-0.5 leading-relaxed text-indigo-800 dark:text-indigo-300">
                Las evaluaciones se ponderan automáticamente: <strong>Líder (35%)</strong>, <strong>Pares (25%)</strong>, <strong>Subordinados (25%)</strong> y <strong>Autoevaluación (15%)</strong>. 
                Califica a cada colaborador en 6 competencias clave usando una escala de 1 a 5 estrellas.
              </p>
            </div>
          </div>

          {/* Action Bar: New Evaluation + Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNewEvalForm(!showNewEvalForm)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30"
              >
                {showNewEvalForm ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                {showNewEvalForm ? 'Cancelar' : 'Nueva Evaluación 360°'}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Filtrar por:</span>
              <select
                value={filterEmployee}
                onChange={(e) => setFilterEmployee(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="all">Todos los colaboradores</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* New Evaluation Form */}
          {showNewEvalForm && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 shadow-lg space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-2 rounded-xl bg-indigo-600 text-white">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Formulario de Evaluación 360°
                  </h3>
                  <p className="text-[10px] text-slate-400">Periodo: Q3 - 2026 | Escala: 1 (Mínimo) a 5 (Excepcional)</p>
                </div>
              </div>

              {/* Row 1: Employee + Evaluator + Relation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                    Colaborador a Evaluar *
                  </label>
                  <select
                    value={evalSelectedEmployee}
                    onChange={(e) => setEvalSelectedEmployee(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">— Seleccionar —</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                    Nombre del Evaluador *
                  </label>
                  <input
                    type="text"
                    value={evalEvaluatorName}
                    onChange={(e) => setEvalEvaluatorName(e.target.value)}
                    placeholder="Ej: María López (Gerente)"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                    Relación con el Evaluado *
                  </label>
                  <select
                    value={evalRelation}
                    onChange={(e) => setEvalRelation(e.target.value as EvaluatorRelation)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {RELATION_OPTIONS.map(rel => (
                      <option key={rel} value={rel}>{rel} ({RELATION_WEIGHTS[rel]}%)</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Competencies Rating Grid */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Calificación de Competencias (1-5 estrellas) *
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {evalCompetencies.map((comp, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        comp.score > 0
                          ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/60'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{comp.name}</span>
                        {comp.score > 0 && (
                          <span className={`text-[10px] font-extrabold ${getScoreColor(comp.score)}`}>
                            {comp.score}/5
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleSetCompetencyScore(idx, star)}
                            className="group/star p-0.5 transition-transform hover:scale-125"
                            title={`${star} estrella${star > 1 ? 's' : ''}`}
                          >
                            <Star
                              className={`w-5 h-5 transition-colors ${
                                star <= comp.score
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300 dark:text-slate-600 group-hover/star:text-amber-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-[10px] text-slate-400">
                          {comp.score === 0 ? 'Sin calificar' :
                           comp.score === 1 ? 'Insuficiente' :
                           comp.score === 2 ? 'Necesita mejorar' :
                           comp.score === 3 ? 'Aceptable' :
                           comp.score === 4 ? 'Bueno' : 'Excepcional'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  Comentarios y Retroalimentación Cualitativa
                </label>
                <textarea
                  value={evalComments}
                  onChange={(e) => setEvalComments(e.target.value)}
                  rows={3}
                  placeholder="Describe las fortalezas observadas, áreas de mejora y recomendaciones específicas de desarrollo..."
                  className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">
                  {evalCompetencies.filter(c => c.score > 0).length} de {evalCompetencies.length} competencias calificadas
                  {isFormValid && (
                    <span className="ml-2 text-emerald-600 font-bold">✓ Formulario completo</span>
                  )}
                </div>
                <button
                  onClick={handleSubmitEvaluation}
                  disabled={!isFormValid}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    isFormValid
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Enviar Evaluación
                </button>
              </div>
            </div>
          )}

          {/* Evaluations List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Historial de Evaluaciones Registradas
              </h3>
              <span className="text-[10px] font-bold text-slate-400">
                {filteredEvaluations.length} evaluaci{filteredEvaluations.length === 1 ? 'ón' : 'ones'}
              </span>
            </div>

            {filteredEvaluations.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                <ClipboardCheck className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Sin evaluaciones registradas</p>
                <p className="text-xs text-slate-400 mt-1">
                  Haz clic en &quot;Nueva Evaluación 360°&quot; para calificar a un colaborador.
                </p>
              </div>
            ) : (
              filteredEvaluations.map((ev) => {
                const emp = getEmployeeById(ev.employeeId);
                const isExpanded = expandedEvalId === ev.id;

                return (
                  <div
                    key={ev.id}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
                  >
                    {/* Evaluation Row Header */}
                    <div
                      onClick={() => setExpandedEvalId(isExpanded ? null : ev.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {emp && (
                          <img
                            src={emp.avatar}
                            alt={ev.employeeName}
                            className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-700 shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                              {ev.employeeName}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${RELATION_COLORS[ev.relation]}`}>
                              {ev.relation}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Evaluador: <strong className="text-slate-600 dark:text-slate-300">{ev.evaluatorName}</strong> • {ev.date} • {ev.period}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className={`px-3 py-1.5 rounded-xl border text-center ${getScoreBg(ev.overallScore)}`}>
                          <span className={`text-lg font-black block leading-none ${getScoreColor(ev.overallScore)}`}>
                            {ev.overallScore}
                          </span>
                          <span className={`text-[9px] font-bold ${getScoreColor(ev.overallScore)}`}>
                            {getScoreLabel(ev.overallScore)}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Expanded Detail */}
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-slate-800 pt-3">
                        {/* Competencies Grid */}
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Desglose de Competencias
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {ev.competencies.map((comp, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between"
                              >
                                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate mr-2">
                                  {comp.name}
                                </span>
                                <div className="flex items-center gap-0.5 shrink-0">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                      key={s}
                                      className={`w-3 h-3 ${
                                        s <= comp.score
                                          ? 'fill-amber-400 text-amber-400'
                                          : 'text-slate-300 dark:text-slate-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Score Bar */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                            <span>Nivel de Desempeño General</span>
                            <span>{((ev.overallScore / 5) * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                ev.overallScore >= 4.5 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                                ev.overallScore >= 3.5 ? 'bg-gradient-to-r from-indigo-500 to-indigo-400' :
                                ev.overallScore >= 2.5 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                                'bg-gradient-to-r from-rose-500 to-rose-400'
                              }`}
                              style={{ width: `${(ev.overallScore / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Comments */}
                        {ev.comments && (
                          <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                            <div className="flex items-start gap-2">
                              <MessageSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                &ldquo;{ev.comments}&rdquo;
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
