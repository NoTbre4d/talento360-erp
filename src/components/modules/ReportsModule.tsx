'use client';

import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Building2,
  Calendar,
  Award,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<number>(0);

  const reportsList = [
    {
      id: 0,
      title: 'Informe Estratégico de People Analytics & Retención',
      date: '13 de Octubre de 2026',
      period: 'Tercer Trimestre (Q3 - 2026)',
      status: 'Aprobado por Junta Directiva',
      summary: 'Análisis global de rotación voluntaria (2.8%), efectividad de planes de retención del talento clave, evolución del eNPS (+58) y retorno de inversión en capacitación corporativa (ROI 3.8x).'
    },
    {
      id: 1,
      title: 'Dictamen de Cumplimiento Normativo SG-SST y Ausentismo',
      date: '08 de Octubre de 2026',
      period: 'Mes de Septiembre 2026',
      status: 'Auditado Sin Observaciones',
      summary: 'Evaluación del Sistema de Gestión de Seguridad y Salud en el Trabajo, índice de Bradford organizacional (42 puntos - Nivel Seguro), trazabilidad de incapacidades médicas y protocolos de ergonomía.'
    },
    {
      id: 2,
      title: 'Auditoría de Equidad y Transparencia Salarial',
      date: '01 de Octubre de 2026',
      period: 'Vigencia Fiscal 2026',
      status: 'Certificación de Equidad Otorgada',
      summary: 'Revisión exhaustiva de bandas salariales por niveles jerárquicos y género. Brecha no explicada del 1.1%, cumpliendo con estándares internacionales de igualdad retributiva.'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const activeReport = reportsList[selectedReport];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            Informes Ejecutivos & Auditoría de Talento
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Reportes Oficiales de Talento Humano
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Documentos formales listos para comités de presidencia, auditorías externas de SST y juntas directivas.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Exportar a PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Reports Selector */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Informes Disponibles
          </h3>

          {reportsList.map((rep) => (
            <button
              key={rep.id}
              onClick={() => setSelectedReport(rep.id)}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedReport === rep.id
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                  {rep.period}
                </span>
                <span className="text-[10px] text-slate-400">{rep.date}</span>
              </div>
              <h4 className="text-xs font-extrabold leading-snug">{rep.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {rep.summary}
              </p>
            </button>
          ))}
        </div>

        {/* Right: Formal Document Preview */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          {/* Document Header */}
          <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <span className="text-xs font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Talento360 ERP • Dirección de Gestión del Talento Humano
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {activeReport.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Período Evaluado: {activeReport.period} • Fecha de Emisión: {activeReport.date}
              </p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
              {activeReport.status}
            </span>
          </div>

          {/* Document Content */}
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
                1. Resumen Ejecutivo
              </h4>
              <p>{activeReport.summary}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                2. Indicadores Clave Certificados
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block">Plantilla Total</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">148 Colab.</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block">Tasa Rotación</span>
                  <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">2.8% Anual</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block">Clima Laboral</span>
                  <strong className="text-sm font-bold text-indigo-600 dark:text-indigo-400">+58 eNPS</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 block">Retorno Capacitación</span>
                  <strong className="text-sm font-bold text-amber-500">3.8x ROI</strong>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
                3. Conclusiones y Plan de Acción
              </h4>
              <p>
                Los indicadores de capital humano evidencian alta estabilidad organizacional. Se recomienda continuar fortaleciendo la Universidad Corporativa en liderazgo adaptativo y mantener las bandas salariales en el percentil 75 del sector tech y servicios para blindar al personal clave frente a ofertas externas.
              </p>
            </div>
          </div>

          {/* Formal Signatures Block */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-8 text-center">
            <div>
              <div className="w-40 border-b border-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">Lic. Carolina Gómez Soto</p>
              <p className="text-[10px] text-slate-400">Directora de Gestión del Talento Humano</p>
              <p className="text-[9px] text-slate-400">SHRM-SCP • MP #48921-TH</p>
            </div>
            <div>
              <div className="w-40 border-b border-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">Ing. David Vélez</p>
              <p className="text-[10px] text-slate-400">Gerente General &amp; CEO</p>
              <p className="text-[9px] text-slate-400">Talento360 ERP Corp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
