'use client';

import React, { useState } from 'react';
import { X, Briefcase, Plus } from 'lucide-react';
import { JobOpening, Department } from '../../types/hr';

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: JobOpening) => void;
}

export const NewJobModal: React.FC<NewJobModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: 'Tecnología' as Department,
    openings: 1,
    budgetMax: 3500,
    priority: 'Alta' as 'Alta' | 'Media' | 'Baja'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newJob: JobOpening = {
      id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      department: formData.department,
      openings: Number(formData.openings),
      applicantsCount: 0,
      daysOpen: 1,
      budgetMax: Number(formData.budgetMax),
      status: 'Activa',
      priority: formData.priority
    };

    onSave(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-black">Abrir Nueva Requisición / Vacante ATS</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Título de la Vacante</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej. Líder de Crecimiento & Marketing Digital"
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Departamento</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Tecnología">Tecnología</option>
                <option value="Talento Humano">Talento Humano</option>
                <option value="Operaciones">Operaciones</option>
                <option value="Ventas y Mercadeo">Ventas y Mercadeo</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Logística">Logística</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Prioridad de Contratación</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Número de Plazas</label>
              <input
                type="number"
                min="1"
                value={formData.openings}
                onChange={(e) => setFormData({ ...formData, openings: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Presupuesto Máximo (USD)</label>
              <input
                type="number"
                value={formData.budgetMax}
                onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-500/20 transition-all"
            >
              Publicar Requisición
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
