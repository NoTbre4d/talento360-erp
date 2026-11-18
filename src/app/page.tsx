'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Sidebar, ActiveModule } from '../components/Sidebar';
import { DashboardModule } from '../components/modules/DashboardModule';
import { EmployeesModule } from '../components/modules/EmployeesModule';
import { RecruitmentModule } from '../components/modules/RecruitmentModule';
import { PerformanceModule } from '../components/modules/PerformanceModule';
import { TrainingModule } from '../components/modules/TrainingModule';
import { WellbeingModule } from '../components/modules/WellbeingModule';
import { PayrollModule } from '../components/modules/PayrollModule';
import { ERPConnectorsModule } from '../components/modules/ERPConnectorsModule';
import { ReportsModule } from '../components/modules/ReportsModule';
import { EmployeeDetailModal } from '../components/modals/EmployeeDetailModal';
import { NewEmployeeModal } from '../components/modals/NewEmployeeModal';
import { NewJobModal } from '../components/modals/NewJobModal';

import {
  INITIAL_EMPLOYEES,
  INITIAL_JOB_OPENINGS,
  INITIAL_CANDIDATES,
  INITIAL_OKRS,
  INITIAL_COURSES,
  INITIAL_VACATION_REQUESTS,
  INITIAL_ALERTS,
  INITIAL_EVALUATIONS
} from '../data/mockData';
import { Employee, Candidate, JobOpening, VacationRequest, CandidateStage, Evaluation360 } from '../types/hr';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('Octubre 2026 (Mes Actual)');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive datasets in state
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(INITIAL_JOB_OPENINGS);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [okrs, setOkrs] = useState(INITIAL_OKRS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [vacations, setVacations] = useState<VacationRequest[]>(INITIAL_VACATION_REQUESTS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [evaluations360, setEvaluations360] = useState<Evaluation360[]>(INITIAL_EVALUATIONS);

  // Modals state
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // When user types in global search, auto switch to employees view if searching for a person
  useEffect(() => {
    if (searchQuery.trim().length > 1 && activeModule !== 'employees') {
      setActiveModule('employees');
    }
  }, [searchQuery, activeModule]);

  // Handler: Advance candidate stage
  const handleUpdateCandidateStage = (candidateId: string, nextStage: CandidateStage) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, stage: nextStage } : c));
    showToast(`Candidato movido a la etapa "${nextStage}" con éxito.`);
  };

  // Handler: Toggle OKR key result
  const handleToggleKeyResult = (okrId: string, krIndex: number) => {
    setOkrs(prev => prev.map(okr => {
      if (okr.id === okrId) {
        const updatedKrs = [...okr.keyResults];
        updatedKrs[krIndex] = {
          ...updatedKrs[krIndex],
          completed: !updatedKrs[krIndex].completed
        };
        const completedCount = updatedKrs.filter(k => k.completed).length;
        const progress = Math.round((completedCount / updatedKrs.length) * 100);
        return {
          ...okr,
          keyResults: updatedKrs,
          progress,
          status: progress === 100 ? 'Alcanzado' : okr.status
        };
      }
      return okr;
    }));
  };

  // Handler: Approve Vacation
  const handleApproveVacation = (id: string) => {
    setVacations(prev => prev.map(v => v.id === id ? { ...v, status: 'Aprobado' } : v));
    showToast('Solicitud de vacaciones aprobada y registrada en el calendario laboral.');
  };

  // Handler: Reject Vacation
  const handleRejectVacation = (id: string) => {
    setVacations(prev => prev.map(v => v.id === id ? { ...v, status: 'Rechazado' } : v));
    showToast('Solicitud de vacaciones rechazada. Se notificó al líder y colaborador.');
  };

  // Handler: Enroll course
  const handleEnrollCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, enrolled: c.enrolled + 1 } : c));
    showToast('Colaborador inscrito en el curso corporativo.');
  };

  // Handler: Add new employee
  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees(prev => [newEmp, ...prev]);
    showToast(`Colaborador ${newEmp.name} dado de alta satisfactoriamente.`);
  };

  // Handler: Add new job
  const handleAddJobOpening = (newJob: JobOpening) => {
    setJobOpenings(prev => [newJob, ...prev]);
    showToast(`Vacante "${newJob.title}" publicada en el ATS.`);
  };

  // Handler: Add 360 evaluation
  const handleAddEvaluation = (evaluation: Evaluation360) => {
    setEvaluations360(prev => [evaluation, ...prev]);
    showToast(`Evaluación 360° de ${evaluation.employeeName} registrada exitosamente.`);
  };

  // Handler: Export report
  const handleExportReport = () => {
    setActiveModule('reports');
    showToast('Generando informe ejecutivo de Talento Humano...');
  };

  const pendingApprovalsCount = vacations.filter(v => v.status === 'Pendiente').length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl text-xs font-bold border border-slate-700 dark:border-slate-200 animate-bounce flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Global Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          alerts={alerts}
          onOpenNewEmployee={() => setIsNewEmployeeModalOpen(true)}
          onOpenNewJob={() => setIsNewJobModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExportReport={handleExportReport}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-12">
            {activeModule === 'dashboard' && (
              <DashboardModule
                employees={employees}
                alerts={alerts}
                onNavigate={setActiveModule}
                onSelectEmployee={setSelectedEmployee}
              />
            )}

            {activeModule === 'employees' && (
              <EmployeesModule
                employees={employees}
                onSelectEmployee={setSelectedEmployee}
                onOpenNewEmployee={() => setIsNewEmployeeModalOpen(true)}
                searchFilter={searchQuery}
              />
            )}

            {activeModule === 'ats' && (
              <RecruitmentModule
                jobOpenings={jobOpenings}
                candidates={candidates}
                onOpenNewJob={() => setIsNewJobModalOpen(true)}
                onUpdateCandidateStage={handleUpdateCandidateStage}
              />
            )}

            {activeModule === 'performance' && (
              <PerformanceModule
                employees={employees}
                okrs={okrs}
                evaluations={evaluations360}
                onSelectEmployee={setSelectedEmployee}
                onToggleKeyResult={handleToggleKeyResult}
                onAddEvaluation={handleAddEvaluation}
              />
            )}

            {activeModule === 'training' && (
              <TrainingModule
                courses={courses}
                onEnroll={handleEnrollCourse}
              />
            )}

            {activeModule === 'wellbeing' && (
              <WellbeingModule
                vacations={vacations}
                onApproveVacation={handleApproveVacation}
                onRejectVacation={handleRejectVacation}
              />
            )}

            {activeModule === 'payroll' && (
              <PayrollModule
                employees={employees}
                onExport={() => showToast('Descargando archivo Excel (.xlsx)...')}
              />
            )}

            {activeModule === 'erp' && (
              <ERPConnectorsModule />
            )}

            {activeModule === 'reports' && (
              <ReportsModule />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />

      <NewEmployeeModal
        isOpen={isNewEmployeeModalOpen}
        onClose={() => setIsNewEmployeeModalOpen(false)}
        onSave={handleAddEmployee}
      />

      <NewJobModal
        isOpen={isNewJobModalOpen}
        onClose={() => setIsNewJobModalOpen(false)}
        onSave={handleAddJobOpening}
      />
    </div>
  );
}
