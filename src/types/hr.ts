export type Department = 
  | 'Tecnología' 
  | 'Operaciones' 
  | 'Ventas y Mercadeo' 
  | 'Finanzas' 
  | 'Talento Humano' 
  | 'Logística';

export type Modality = 'Presencial' | 'Híbrido' | 'Remoto';

export type ContractType = 'Indefinido' | 'Término Fijo' | 'Prestación de Servicios' | 'Aprendizaje';

export type EmployeeStatus = 'Activo' | 'En Vacaciones' | 'Incapacidad' | 'En Prueba';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: Department;
  modality: Modality;
  contractType: ContractType;
  status: EmployeeStatus;
  hireDate: string;
  contractEndDate?: string;
  salary: number; // monthly in USD/local currency
  performanceScore: number; // 1 to 100
  potentialScore: number; // 1 to 100 (for 9-box)
  flightRisk: 'Bajo' | 'Medio' | 'Alto';
  manager: string;
  avatar: string;
  skills: { name: string; level: number }[]; // 1 to 5
  certifications: string[];
  education: string;
  bio: string;
  tenureYears: number;
  phone: string;
  location: string;
}

export type CandidateStage = 'Postulado' | 'Filtro Curricular' | 'Entrevista RRHH' | 'Prueba Técnica' | 'Oferta' | 'Contratado';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  roleApplied: string;
  department: Department;
  stage: CandidateStage;
  appliedDate: string;
  matchScore: number; // 0 to 100%
  expectedSalary: number;
  phone: string;
  rating: number; // 1 to 5
}

export interface JobOpening {
  id: string;
  title: string;
  department: Department;
  openings: number;
  applicantsCount: number;
  daysOpen: number;
  budgetMax: number;
  status: 'Activa' | 'Pausada' | 'Cerrada';
  priority: 'Alta' | 'Media' | 'Baja';
}

export interface OKR {
  id: string;
  objective: string;
  owner: string;
  department: Department;
  progress: number; // 0 to 100%
  quarter: string;
  status: 'En curso' | 'En riesgo' | 'Alcanzado';
  keyResults: { text: string; completed: boolean }[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  departmentTarget: Department | 'Toda la Empresa';
  hours: number;
  enrolled: number;
  completed: number;
  satisfactionScore: number; // 1 to 5
  status: 'Activo' | 'Próximo' | 'Finalizado';
}

export interface VacationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  startDate: string;
  endDate: string;
  daysRequested: number;
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
  requestDate: string;
}

export interface AlertItem {
  id: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  time: string;
  module: string;
  actionText?: string;
  resolved?: boolean;
}

export type EvaluatorRelation = 'Líder Directo' | 'Par / Colega' | 'Subordinado' | 'Autoevaluación';

export interface EvaluationCompetency {
  name: string;
  score: number; // 1 to 5
}

export interface Evaluation360 {
  id: string;
  employeeId: string;
  employeeName: string;
  evaluatorName: string;
  relation: EvaluatorRelation;
  competencies: EvaluationCompetency[];
  overallScore: number; // average 1 to 5
  comments: string;
  date: string;
  period: string;
}
