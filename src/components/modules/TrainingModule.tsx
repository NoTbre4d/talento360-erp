'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  DollarSign,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  BarChart2,
  BookOpen
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
import { Course } from '../../types/hr';

interface TrainingModuleProps {
  courses: Course[];
  onEnroll: (courseId: string) => void;
}

const SKILLS_GAP_DATA = [
  { habilidad: 'Liderazgo & Coaching', actual: 3.4, requerido: 4.5, brecha: -1.1 },
  { habilidad: 'Arquitectura Cloud & DevOps', actual: 4.2, requerido: 4.8, brecha: -0.6 },
  { habilidad: 'People Analytics & BI', actual: 3.1, requerido: 4.2, brecha: -1.1 },
  { habilidad: 'Ventas Consultivas B2B', actual: 4.4, requerido: 4.6, brecha: -0.2 },
  { habilidad: 'Seguridad & SST', actual: 4.6, requerido: 4.5, brecha: 0.1 },
  { habilidad: 'Gestión Financiera de Costos', actual: 3.8, requerido: 4.2, brecha: -0.4 }
];

export const TrainingModule: React.FC<TrainingModuleProps> = ({ courses, onEnroll }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      onEnroll(courseId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            Capacitación, Desarrollo & Matriz de Competencias
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Universidad Corporativa & Cierre de Brechas (Skills Gap)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Planes de formación continua, desarrollo de habilidades críticas para el negocio y medición del retorno de inversión (ROI) en aprendizaje.
          </p>
        </div>
      </div>

      {/* 4 Training KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Horas Promedio / Empleado</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">48 hrs/año</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
            Meta anual (40 hrs) superada en 120%
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Presupuesto Ejecutado</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">78.5%</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            $34,000 USD de $43,300 asignados
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa de Finalización</span>
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">88.4%</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
            +6.2% vs. periodo previo
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Satisfacción Cursos</span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">4.8 / 5.0</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Calificación de los colaboradores
          </p>
        </div>
      </div>

      {/* Skills Gap Analysis Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Análisis de Brecha de Habilidades (Skills Gap Analysis)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comparativa entre el nivel de competencia requerido por el cargo vs. nivel evaluado actualmente (Escala 1 a 5).
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 self-start">
            Prioridad: Liderazgo y People Analytics
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SKILLS_GAP_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
              <XAxis dataKey="habilidad" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis domain={[0, 5]} stroke="#94a3b8" fontSize={11} tickLine={false} />
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
              <Bar dataKey="actual" name="Nivel Evaluado Actual" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="requerido" name="Nivel Requerido por el Perfil" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Courses Catalog */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Catálogo de Cursos Corporativos en Curso ({courses.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course.id);
            const progress = Math.round((course.completed / course.enrolled) * 100);

            return (
              <div
                key={course.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      {course.departmentTarget}
                    </span>
                    <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                      ★ {course.satisfactionScore} / 5.0
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">Instructor: {course.instructor}</p>

                  <div className="grid grid-cols-3 gap-2 my-4 text-center">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="text-[10px] text-slate-400 block">Duración</span>
                      <strong className="text-xs font-bold text-slate-800 dark:text-slate-200">{course.hours} horas</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="text-[10px] text-slate-400 block">Inscritos</span>
                      <strong className="text-xs font-bold text-slate-800 dark:text-slate-200">{course.enrolled} personas</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="text-[10px] text-slate-400 block">Graduados</span>
                      <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{course.completed}</strong>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <span className="text-slate-400">Tasa de culminación</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Certificación verificada al finalizar</span>
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      isEnrolled
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    }`}
                  >
                    {isEnrolled ? '✓ Inscrito Correctamente' : 'Inscribir Colaboradores'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
