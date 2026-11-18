'use client';

import React, { useState } from 'react';
import { X, UserPlus, CheckCircle } from 'lucide-react';
import { Employee, Department, Modality, ContractType } from '../../types/hr';

interface NewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

export const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: 'Tecnología' as Department,
    modality: 'Híbrido' as Modality,
    contractType: 'Indefinido' as ContractType,
    salary: 2800,
    performanceScore: 85,
    potentialScore: 80,
    flightRisk: 'Bajo' as 'Bajo' | 'Medio' | 'Alto',
    phone: '+57 310 000 0000',
    location: 'Bogotá, Colombia',
    education: 'Profesional Universitario'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;

    const newEmp: Employee = {
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      modality: formData.modality,
      contractType: formData.contractType,
      status: 'Activo',
      hireDate: '2026-10-14',
      salary: Number(formData.salary),
      performanceScore: Number(formData.performanceScore),
      potentialScore: Number(formData.potentialScore),
      flightRisk: formData.flightRisk,
      manager: 'Dirección de Área',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      skills: [
        { name: 'Trabajo en Equipo', level: 4 },
        { name: 'Comunicación Asertiva', level: 4 },
        { name: 'Resolución de Problemas', level: 4 }
      ],
      certifications: ['Inducción Corporativa Talento360'],
      education: formData.education,
      bio: `Colaborador recién vinculado al equipo de ${formData.department} en calidad de ${formData.role}. En proceso de inducción y curva de aprendizaje.`,
      tenureYears: 0.1,
      phone: formData.phone,
      location: formData.location
    };

    onSave(newEmp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-black">Registrar Nuevo Colaborador</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre Completo</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Paula Andrea Restrepo"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Correo Electrónico</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="p.restrepo@talento360.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cargo / Posición</label>
              <input
                required
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Ej. Especialista de Producto"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Departamento</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Tecnología">Tecnología</option>
                <option value="Talento Humano">Talento Humano</option>
                <option value="Operaciones">Operaciones</option>
                <option value="Ventas y Mercadeo">Ventas y Mercadeo</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Logística">Logística</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Modalidad</label>
              <select
                value={formData.modality}
                onChange={(e) => setFormData({ ...formData, modality: e.target.value as Modality })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Híbrido">Híbrido</option>
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tipo Contrato</label>
              <select
                value={formData.contractType}
                onChange={(e) => setFormData({ ...formData, contractType: e.target.value as ContractType })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Indefinido">Indefinido</option>
                <option value="Término Fijo">Término Fijo</option>
                <option value="Aprendizaje">Aprendizaje</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Salario Mensual (USD)</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Desempeño (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.performanceScore}
                onChange={(e) => setFormData({ ...formData, performanceScore: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Potencial (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.potentialScore}
                onChange={(e) => setFormData({ ...formData, potentialScore: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Riesgo de Fuga</label>
              <select
                value={formData.flightRisk}
                onChange={(e) => setFormData({ ...formData, flightRisk: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Bajo">Bajo</option>
                <option value="Medio">Medio</option>
                <option value="Alto">Alto</option>
              </select>
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
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all"
            >
              Guardar Colaborador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
