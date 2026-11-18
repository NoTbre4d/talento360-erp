import { Employee, Candidate, JobOpening, OKR, Course, VacationRequest, AlertItem, Evaluation360 } from '../types/hr';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'EMP-001',
    name: 'Carolina Gómez Soto',
    email: 'c.gomez@talento360.com',
    role: 'Directora de Talento Humano',
    department: 'Talento Humano',
    modality: 'Híbrido',
    contractType: 'Indefinido',
    status: 'Activo',
    hireDate: '2021-03-15',
    salary: 4200,
    performanceScore: 95,
    potentialScore: 92,
    flightRisk: 'Bajo',
    manager: 'Gerencia General',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'People Analytics', level: 5 },
      { name: 'Gestión del Cambio', level: 5 },
      { name: 'Negociación Colectiva', level: 4 },
      { name: 'Liderazgo Estratégico', level: 5 }
    ],
    certifications: ['SHRM-SCP', 'Certificación Internacional People Analytics'],
    education: 'Maestría en Dirección de Recursos Humanos',
    bio: 'Más de 10 años liderando transformación cultural, analítica de talento y bienestar organizacional en empresas de tecnología y servicios.',
    tenureYears: 5.2,
    phone: '+57 312 849 2011',
    location: 'Bogotá, Colombia'
  },
  {
    id: 'EMP-002',
    name: 'Mateo Restrepo Silva',
    email: 'm.restrepo@talento360.com',
    role: 'Líder Técnico de Software',
    department: 'Tecnología',
    modality: 'Remoto',
    contractType: 'Indefinido',
    status: 'Activo',
    hireDate: '2022-01-10',
    salary: 4800,
    performanceScore: 92,
    potentialScore: 88,
    flightRisk: 'Medio',
    manager: 'VP de Tecnología',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'Arquitectura Cloud', level: 5 },
      { name: 'React & Next.js', level: 5 },
      { name: 'DevOps & CI/CD', level: 4 },
      { name: 'Mentoring Técnico', level: 4 }
    ],
    certifications: ['AWS Certified Solutions Architect', 'Scrum Master'],
    education: 'Ingeniería de Sistemas y Computación',
    bio: 'Experto en escalabilidad de plataformas SaaS, liderazgo de células ágiles y optimización de arquitectura de datos.',
    tenureYears: 4.5,
    phone: '+57 301 928 3741',
    location: 'Medellín, Colombia'
  },
  {
    id: 'EMP-003',
    name: 'Valentina Morales Duque',
    email: 'v.morales@talento360.com',
    role: 'Directora Financiera (CFO)',
    department: 'Finanzas',
    modality: 'Presencial',
    contractType: 'Indefinido',
    status: 'Activo',
    hireDate: '2020-07-01',
    salary: 5200,
    performanceScore: 89,
    potentialScore: 85,
    flightRisk: 'Bajo',
    manager: 'Gerencia General',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'Control Presupuestal', level: 5 },
      { name: 'Planificación Fiscal', level: 5 },
      { name: 'Análisis de Costos RRHH', level: 4 },
      { name: 'Modelación Financiera', level: 5 }
    ],
    certifications: ['CFA Charterholder', 'Especialista en Finanzas Corporativas'],
    education: 'Economía y Finanzas',
    bio: 'Enfocada en sostenibilidad presupuestaria, estructuración de costo laboral e impacto de la productividad en el EBITDA.',
    tenureYears: 6.0,
    phone: '+57 315 442 8190',
    location: 'Bogotá, Colombia'
  },
  {
    id: 'EMP-004',
    name: 'Andrés Felipe Caicedo',
    email: 'a.caicedo@talento360.com',
    role: 'Gerente Comercial de Cuentas Clave',
    department: 'Ventas y Mercadeo',
    modality: 'Híbrido',
    contractType: 'Indefinido',
    status: 'Activo',
    hireDate: '2023-04-18',
    salary: 3600,
    performanceScore: 96,
    potentialScore: 90,
    flightRisk: 'Bajo',
    manager: 'Director Comercial',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'Ventas B2B Enterprise', level: 5 },
      { name: 'Negociación Estratégica', level: 5 },
      { name: 'Gestión de CRM', level: 4 },
      { name: 'Cierre de Contratos', level: 5 }
    ],
    certifications: ['Inbound Sales Certified', 'Metodología Challenger Sale'],
    education: 'Administración de Empresas',
    bio: 'Top performer comercial durante 4 trimestres consecutivos. Líder en atracción de grandes cuentas corporativas.',
    tenureYears: 3.5,
    phone: '+57 318 630 1928',
    location: 'Cali, Colombia'
  },
  {
    id: 'EMP-005',
    name: 'Camila Ospina Rivas',
    email: 'c.ospina@talento360.com',
    role: 'Especialista en Atracción y Selección',
    department: 'Talento Humano',
    modality: 'Híbrido',
    contractType: 'Término Fijo',
    status: 'Activo',
    hireDate: '2023-11-01',
    contractEndDate: '2026-11-01',
    salary: 2200,
    performanceScore: 84,
    potentialScore: 78,
    flightRisk: 'Bajo',
    manager: 'Carolina Gómez Soto',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed22be0d?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'Reclutamiento IT', level: 4 },
      { name: 'Entrevistas por Competencias', level: 5 },
      { name: 'Employer Branding', level: 4 },
      { name: 'Evaluaciones Psicotécnicas', level: 4 }
    ],
    certifications: ['Tech Recruiter Expert', 'Certificación DISC'],
    education: 'Psicología Organizacional',
    bio: 'Especialista en procesos ágiles de atracción de perfiles tecnológicos y programas de inclusión laboral.',
    tenureYears: 2.9,
    phone: '+57 304 551 2289',
    location: 'Bogotá, Colombia'
  },
  {
    id: 'EMP-006',
    name: 'Santiago Benítez V.',
    email: 's.benitez@talento360.com',
    role: 'Ingeniero de Operaciones & Logística',
    department: 'Operaciones',
    modality: 'Presencial',
    contractType: 'Indefinido',
    status: 'En Vacaciones',
    hireDate: '2022-06-15',
    salary: 2800,
    performanceScore: 78,
    potentialScore: 70,
    flightRisk: 'Bajo',
    manager: 'Director de Operaciones',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'Lean Manufacturing', level: 4 },
      { name: 'Optimización de Rutas', level: 4 },
      { name: 'Control de Despachos', level: 5 },
      { name: 'Seguridad en Bodega', level: 4 }
    ],
    certifications: ['Six Sigma Green Belt'],
    education: 'Ingeniería Industrial',
    bio: 'Responsable de la eficiencia de distribución regional y disminución de mermas operativas.',
    tenureYears: 4.1,
    phone: '+57 311 729 4401',
    location: 'Barranquilla, Colombia'
  },
  {
    id: 'EMP-007',
    name: 'Daniela Salazar Pardo',
    email: 'd.salazar@talento360.com',
    role: 'Desarrolladora Frontend Senior',
    department: 'Tecnología',
    modality: 'Remoto',
    contractType: 'Indefinido',
    status: 'Activo',
    hireDate: '2024-02-15',
    salary: 3900,
    performanceScore: 94,
    potentialScore: 95,
    flightRisk: 'Alto',
    manager: 'Mateo Restrepo Silva',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'TypeScript & Next.js', level: 5 },
      { name: 'UI/UX Design Systems', level: 5 },
      { name: 'Accesibilidad Web (a11y)', level: 4 },
      { name: 'Microfrontends', level: 4 }
    ],
    certifications: ['Meta Frontend Professional'],
    education: 'Ingeniería de Software',
    bio: 'Talento clave de alto desempeño y alto potencial. Identificada con riesgo de fuga por ofertas externas de empresas multinacionales.',
    tenureYears: 2.6,
    phone: '+57 320 889 1234',
    location: 'Medellín, Colombia'
  },
  {
    id: 'EMP-008',
    name: 'Julián Castro Moreno',
    email: 'j.castro@talento360.com',
    role: 'Analista de Nómina y Compensación',
    department: 'Talento Humano',
    modality: 'Presencial',
    contractType: 'Indefinido',
    status: 'Activo',
    hireDate: '2022-09-01',
    salary: 2100,
    performanceScore: 82,
    potentialScore: 72,
    flightRisk: 'Bajo',
    manager: 'Carolina Gómez Soto',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'Liquidación de Nómina', level: 5 },
      { name: 'Seguridad Social & ARL', level: 5 },
      { name: 'Legislación Laboral', level: 4 },
      { name: 'Análisis de Equidad', level: 3 }
    ],
    certifications: ['Especialista en Derecho Laboral y Nómina'],
    education: 'Contaduría Pública',
    bio: 'Encargado de la puntualidad y exactitud en la dispersión salarial, parafiscales y análisis de bandas compensatorias.',
    tenureYears: 3.9,
    phone: '+57 316 774 9012',
    location: 'Bogotá, Colombia'
  },
  {
    id: 'EMP-009',
    name: 'Mariana Vega Henao',
    email: 'm.vega@talento360.com',
    role: 'Coordinadora de Seguridad y Salud en el Trabajo (SST)',
    department: 'Talento Humano',
    modality: 'Híbrido',
    contractType: 'Indefinido',
    status: 'Activo',
    hireDate: '2023-01-20',
    salary: 2500,
    performanceScore: 88,
    potentialScore: 80,
    flightRisk: 'Bajo',
    manager: 'Carolina Gómez Soto',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'SG-SST Normativo', level: 5 },
      { name: 'Ergonomía & Riesgo Psicosocial', level: 5 },
      { name: 'Investigación de Accidentes', level: 4 },
      { name: 'Primeros Auxilios & Brigadas', level: 5 }
    ],
    certifications: ['Licencia Nacional SST', 'Auditor Interno ISO 45001'],
    education: 'Fisioterapia y Esp. en Seguridad Laboral',
    bio: 'Lidera la reducción sistemática del ausentismo por causas ergonómicas y programas preventivos de salud mental.',
    tenureYears: 3.7,
    phone: '+57 313 490 8821',
    location: 'Bogotá, Colombia'
  },
  {
    id: 'EMP-010',
    name: 'Carlos Mario Londoño',
    email: 'c.londono@talento360.com',
    role: 'Analista de Logística y Abastecimiento',
    department: 'Logística',
    modality: 'Presencial',
    contractType: 'Término Fijo',
    status: 'Incapacidad',
    hireDate: '2024-05-10',
    contractEndDate: '2026-11-10',
    salary: 1950,
    performanceScore: 73,
    potentialScore: 65,
    flightRisk: 'Medio',
    manager: 'Santiago Benítez V.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    skills: [
      { name: 'Gestión de Inventarios ERP', level: 4 },
      { name: 'Control de Envíos', level: 4 },
      { name: 'Negociación con Transportadoras', level: 3 },
      { name: 'Manejo de WMS', level: 4 }
    ],
    certifications: ['Técnico en Cadena de Suministro'],
    education: 'Tecnología en Logística',
    bio: 'Actualmente con incapacidad médica de 4 días por lumbalgia no laboral. Seguimiento continuo por equipo SST.',
    tenureYears: 2.4,
    phone: '+57 300 661 7733',
    location: 'Barranquilla, Colombia'
  }
];

export const INITIAL_JOB_OPENINGS: JobOpening[] = [
  {
    id: 'JOB-101',
    title: 'Senior DevOps & Platform Engineer',
    department: 'Tecnología',
    openings: 2,
    applicantsCount: 42,
    daysOpen: 18,
    budgetMax: 4500,
    status: 'Activa',
    priority: 'Alta'
  },
  {
    id: 'JOB-102',
    title: 'Analista de People Analytics & BI',
    department: 'Talento Humano',
    openings: 1,
    applicantsCount: 29,
    daysOpen: 12,
    budgetMax: 2600,
    status: 'Activa',
    priority: 'Media'
  },
  {
    id: 'JOB-103',
    title: 'Ejecutivo de Ventas Enterprise B2B',
    department: 'Ventas y Mercadeo',
    openings: 2,
    applicantsCount: 38,
    daysOpen: 25,
    budgetMax: 3200,
    status: 'Activa',
    priority: 'Alta'
  },
  {
    id: 'JOB-104',
    title: 'Coordinador de Almacén y Despacho',
    department: 'Logística',
    openings: 1,
    applicantsCount: 15,
    daysOpen: 8,
    budgetMax: 2200,
    status: 'Activa',
    priority: 'Baja'
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'CAN-201',
    name: 'Alejandro Ruiz Cárdenas',
    email: 'a.ruiz.dev@gmail.com',
    roleApplied: 'Senior DevOps & Platform Engineer',
    department: 'Tecnología',
    stage: 'Oferta',
    appliedDate: '2026-09-28',
    matchScore: 94,
    expectedSalary: 4300,
    phone: '+57 311 200 4455',
    rating: 5
  },
  {
    id: 'CAN-202',
    name: 'Sofía Montaño Lara',
    email: 'sofia.montano.hr@outlook.com',
    roleApplied: 'Analista de People Analytics & BI',
    department: 'Talento Humano',
    stage: 'Prueba Técnica',
    appliedDate: '2026-10-02',
    matchScore: 89,
    expectedSalary: 2500,
    phone: '+57 315 908 1122',
    rating: 4
  },
  {
    id: 'CAN-203',
    name: 'Esteban Morales Peña',
    email: 'e.morales.sales@yahoo.com',
    roleApplied: 'Ejecutivo de Ventas Enterprise B2B',
    department: 'Ventas y Mercadeo',
    stage: 'Entrevista RRHH',
    appliedDate: '2026-10-05',
    matchScore: 86,
    expectedSalary: 3100,
    phone: '+57 320 441 9900',
    rating: 4
  },
  {
    id: 'CAN-204',
    name: 'Natalia Villegas Ríos',
    email: 'naty.villegas@gmail.com',
    roleApplied: 'Senior DevOps & Platform Engineer',
    department: 'Tecnología',
    stage: 'Filtro Curricular',
    appliedDate: '2026-10-08',
    matchScore: 78,
    expectedSalary: 4200,
    phone: '+57 302 559 8811',
    rating: 3
  },
  {
    id: 'CAN-205',
    name: 'Jorge Eliécer Quintero',
    email: 'jorge.quintero.log@gmail.com',
    roleApplied: 'Coordinador de Almacén y Despacho',
    department: 'Logística',
    stage: 'Postulado',
    appliedDate: '2026-10-11',
    matchScore: 82,
    expectedSalary: 2100,
    phone: '+57 318 772 3344',
    rating: 4
  },
  {
    id: 'CAN-206',
    name: 'María Fernanda Jaramillo',
    email: 'mafe.jaramillo.it@gmail.com',
    roleApplied: 'Senior DevOps & Platform Engineer',
    department: 'Tecnología',
    stage: 'Contratado',
    appliedDate: '2026-09-15',
    matchScore: 96,
    expectedSalary: 4400,
    phone: '+57 319 880 2211',
    rating: 5
  }
];

export const INITIAL_OKRS: OKR[] = [
  {
    id: 'OKR-01',
    objective: 'Fortalecer la cultura de retención y disminuir la rotación voluntaria en roles críticos',
    owner: 'Carolina Gómez Soto',
    department: 'Talento Humano',
    progress: 78,
    quarter: 'Q3 - 2026',
    status: 'En curso',
    keyResults: [
      { text: 'Mantener la rotación trimestral por debajo del 3.5%', completed: true },
      { text: 'Implementar planes de carrera individuales para el 100% del equipo tech', completed: true },
      { text: 'Aumentar el eNPS organizacional a +55 puntos', completed: true },
      { text: 'Revisar la equidad de bandas salariales con benchmarks de mercado', completed: false }
    ]
  },
  {
    id: 'OKR-02',
    objective: 'Acelerar el ciclo de atracción y selección de talento IT de 38 a 24 días',
    owner: 'Camila Ospina Rivas',
    department: 'Talento Humano',
    progress: 85,
    quarter: 'Q3 - 2026',
    status: 'Alcanzado',
    keyResults: [
      { text: 'Rediseñar la prueba técnica reduciendo tiempos de revisión a 48h', completed: true },
      { text: 'Lanzar el programa de referidos internos con incentivo económico', completed: true },
      { text: 'Cerrar el 90% de las vacantes dentro del presupuesto asignado', completed: true }
    ]
  },
  {
    id: 'OKR-03',
    objective: 'Consolidar la arquitectura tecnológica y elevar la resiliencia operativa al 99.9%',
    owner: 'Mateo Restrepo Silva',
    department: 'Tecnología',
    progress: 64,
    quarter: 'Q3 - 2026',
    status: 'En curso',
    keyResults: [
      { text: 'Migración de microservicios críticos a contenedores Kubernetes', completed: true },
      { text: 'Implementación de pruebas automatizadas con cobertura > 85%', completed: false },
      { text: 'Capacitar a todo el equipo frontend en Web Vitals y Accesibilidad', completed: true }
    ]
  },
  {
    id: 'OKR-04',
    objective: 'Maximizar el valor de vida del cliente corporativo y acelerar nuevas ventas',
    owner: 'Andrés Felipe Caicedo',
    department: 'Ventas y Mercadeo',
    progress: 92,
    quarter: 'Q3 - 2026',
    status: 'Alcanzado',
    keyResults: [
      { text: 'Superar meta de ingresos trimestrales en un 12%', completed: true },
      { text: 'Cierre de 4 contratos marco de más de $150k USD', completed: true },
      { text: 'Mantener tasa de satisfacción de clientes > 94%', completed: true }
    ]
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'CRS-01',
    title: 'Liderazgo Emocional & Feedback Continuo',
    instructor: 'Dra. Claudia Lozano (Consultora Externa)',
    departmentTarget: 'Toda la Empresa',
    hours: 24,
    enrolled: 45,
    completed: 39,
    satisfactionScore: 4.8,
    status: 'Activo'
  },
  {
    id: 'CRS-02',
    title: 'People Analytics: De los Datos a la Decisión',
    instructor: 'Lic. Carolina Gómez Soto',
    departmentTarget: 'Talento Humano',
    hours: 32,
    enrolled: 12,
    completed: 10,
    satisfactionScore: 4.9,
    status: 'Activo'
  },
  {
    id: 'CRS-03',
    title: 'Arquitectura Cloud Resiliente & Seguridad AWS',
    instructor: 'Ing. Mateo Restrepo Silva',
    departmentTarget: 'Tecnología',
    hours: 40,
    enrolled: 28,
    completed: 21,
    satisfactionScore: 4.7,
    status: 'Activo'
  },
  {
    id: 'CRS-04',
    title: 'Prevención Ergonómica y Manejo del Estrés Laboral (SST)',
    instructor: 'Mariana Vega Henao',
    departmentTarget: 'Toda la Empresa',
    hours: 16,
    enrolled: 110,
    completed: 98,
    satisfactionScore: 4.6,
    status: 'Activo'
  }
];

export const INITIAL_VACATION_REQUESTS: VacationRequest[] = [
  {
    id: 'VAC-01',
    employeeId: 'EMP-007',
    employeeName: 'Daniela Salazar Pardo',
    department: 'Tecnología',
    startDate: '2026-11-03',
    endDate: '2026-11-17',
    daysRequested: 10,
    status: 'Pendiente',
    requestDate: '2026-10-10'
  },
  {
    id: 'VAC-02',
    employeeId: 'EMP-004',
    employeeName: 'Andrés Felipe Caicedo',
    department: 'Ventas y Mercadeo',
    startDate: '2026-12-20',
    endDate: '2027-01-05',
    daysRequested: 12,
    status: 'Pendiente',
    requestDate: '2026-10-09'
  },
  {
    id: 'VAC-03',
    employeeId: 'EMP-006',
    employeeName: 'Santiago Benítez V.',
    department: 'Operaciones',
    startDate: '2026-10-05',
    endDate: '2026-10-19',
    daysRequested: 10,
    status: 'Aprobado',
    requestDate: '2026-09-20'
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-1',
    type: 'danger',
    title: 'Riesgo de Fuga en Talento Crítico',
    description: 'Daniela Salazar (Senior Frontend) reporta nivel alto de riesgo de fuga según encuesta de pulso y ofertas externas detectadas.',
    time: 'Hace 2 horas',
    module: 'Retención de Talento',
    actionText: 'Revisar Plan de Retención'
  },
  {
    id: 'ALT-2',
    type: 'warning',
    title: 'Contrato Próximo a Vencer (30 días)',
    description: 'Contrato a término fijo de Camila Ospina vence el 01/11/2026. Requiere notificación de prórroga o preaviso.',
    time: 'Hace 5 horas',
    module: 'Contratación & Legal',
    actionText: 'Gestionar Prórroga'
  },
  {
    id: 'ALT-3',
    type: 'warning',
    title: 'Solicitud de Vacaciones Pendiente',
    description: 'Daniela Salazar solicitó 10 días hábiles de descanso. Pendiente de aprobación de Mateo Restrepo.',
    time: 'Ayer',
    module: 'Vacaciones & Ausencias',
    actionText: 'Ver Solicitud'
  },
  {
    id: 'ALT-4',
    type: 'info',
    title: 'Meta de eNPS Superada (+58 pts)',
    description: 'La medición trimestral de Clima Laboral arrojó +58 puntos, superando el benchmark de la industria (+42).',
    time: 'Hace 2 días',
    module: 'Clima & Cultura'
  }
];

// Historical charts data for Dashboard
export const TURNOVER_VS_TRAINING_HISTORY = [
  { month: 'Nov 25', rotacion: 4.8, horasCapacitacion: 18, inversionUsd: 12000 },
  { month: 'Dic 25', rotacion: 4.5, horasCapacitacion: 14, inversionUsd: 10500 },
  { month: 'Ene 26', rotacion: 5.1, horasCapacitacion: 22, inversionUsd: 16000 },
  { month: 'Feb 26', rotacion: 4.2, horasCapacitacion: 28, inversionUsd: 19500 },
  { month: 'Mar 26', rotacion: 3.9, horasCapacitacion: 35, inversionUsd: 24000 },
  { month: 'Abr 26', rotacion: 3.7, horasCapacitacion: 34, inversionUsd: 23500 },
  { month: 'May 26', rotacion: 3.5, horasCapacitacion: 38, inversionUsd: 27000 },
  { month: 'Jun 26', rotacion: 3.4, horasCapacitacion: 41, inversionUsd: 29000 },
  { month: 'Jul 26', rotacion: 3.3, horasCapacitacion: 40, inversionUsd: 28000 },
  { month: 'Ago 26', rotacion: 3.1, horasCapacitacion: 44, inversionUsd: 31000 },
  { month: 'Sep 26', rotacion: 3.0, horasCapacitacion: 46, inversionUsd: 32500 },
  { month: 'Oct 26', rotacion: 2.8, horasCapacitacion: 48, inversionUsd: 34000 }
];

export const HEADCOUNT_BY_DEPARTMENT = [
  { departamento: 'Tecnología', presencial: 6, hibrido: 22, remoto: 28, total: 56 },
  { departamento: 'Operaciones', presencial: 24, hibrido: 8, remoto: 0, total: 32 },
  { departamento: 'Ventas y Merc.', presencial: 5, hibrido: 16, remoto: 7, total: 28 },
  { departamento: 'Finanzas', presencial: 4, hibrido: 8, remoto: 2, total: 14 },
  { departamento: 'Talento Humano', presencial: 2, hibrido: 7, remoto: 1, total: 10 },
  { departamento: 'Logística', presencial: 12, hibrido: 3, remoto: 0, total: 15 }
];

export const CLIMATE_RADAR_DATA = [
  { area: 'Liderazgo & Comunicación', score: 88, benchmark: 75 },
  { area: 'Compensación & Beneficios', score: 79, benchmark: 72 },
  { area: 'Desarrollo Profesional', score: 85, benchmark: 70 },
  { area: 'Balance Vida / Trabajo', score: 91, benchmark: 74 },
  { area: 'Seguridad & Salud (SST)', score: 94, benchmark: 80 },
  { area: 'Reconocimiento y Sentido', score: 82, benchmark: 71 }
];

export const SALARY_EQUITY_DATA = [
  { nivel: 'Dirección / C-Level', hombres: 4950, mujeres: 5050, diferenciaPct: 2.0 },
  { nivel: 'Líderes de Área / Managers', hombres: 3900, mujeres: 3850, diferenciaPct: -1.2 },
  { nivel: 'Especialistas Senior', hombres: 3100, mujeres: 3150, diferenciaPct: 1.6 },
  { nivel: 'Profesionales Junior / Analistas', hombres: 2050, mujeres: 2080, diferenciaPct: 1.4 },
  { nivel: 'Personal Operativo', hombres: 1450, mujeres: 1460, diferenciaPct: 0.6 }
];

export const ABSENTEEISM_REASONS = [
  { motivo: 'Incapacidad Médica Común', dias: 48, porcentaje: 52, color: '#6366f1' },
  { motivo: 'Permisos Personales Justificados', dias: 21, porcentaje: 23, color: '#10b981' },
  { motivo: 'Luto / Licencia Calamidad', dias: 12, porcentaje: 13, color: '#f59e0b' },
  { motivo: 'Accidente Laboral Leve (SST)', dias: 7, porcentaje: 8, color: '#ec4899' },
  { motivo: 'Ausencias No Justificadas', dias: 4, porcentaje: 4, color: '#ef4444' }
];

export const ERP_SALES_PRODUCTIVITY = [
  { asesor: 'Andrés Caicedo', ventasMes: 128000, meta: 110000, comision: 3840, antiguedad: '3.5 años' },
  { asesor: 'Lorena Valencia', ventasMes: 115000, meta: 100000, comision: 3450, antiguedad: '2.8 años' },
  { asesor: 'David Echeverri', ventasMes: 98000, meta: 95000, comision: 2940, antiguedad: '1.9 años' },
  { asesor: 'Juliana Ríos', ventasMes: 92000, meta: 90000, comision: 2760, antiguedad: '1.2 años' },
  { asesor: 'Camilo Tobón (Nuevo)', ventasMes: 54000, meta: 60000, comision: 1620, antiguedad: '0.4 años' }
];

export const ERP_FINANCE_METRICS = {
  ingresosTotalesMes: 785000,
  costoNominaTotal: 223100,
  porcentajeNominaIngresos: 28.4,
  costoPromedioPorReemplazo: 8400, // Costo de contratar, onboarding y curva de aprendizaje
  ahorroPorRetencionMes: 33600, // 4 personas retenidas gracias a planes de carrera
  inversionCapacitacionMes: 34000,
  roiCapacitacionEstimado: '3.8x (Retorno en reducción de errores y retención de talento)'
};

export const INITIAL_EVALUATIONS: Evaluation360[] = [
  {
    id: 'EVAL-001',
    employeeId: 'EMP-001',
    employeeName: 'Carolina Gómez Soto',
    evaluatorName: 'Gerencia General',
    relation: 'Líder Directo',
    competencies: [
      { name: 'Liderazgo Estratégico', score: 5 },
      { name: 'Comunicación Asertiva', score: 5 },
      { name: 'Gestión del Cambio', score: 5 },
      { name: 'Toma de Decisiones', score: 4 },
      { name: 'Orientación a Resultados', score: 5 },
      { name: 'Innovación y Mejora Continua', score: 4 }
    ],
    overallScore: 4.7,
    comments: 'Excelente liderazgo en la transformación cultural. Ha logrado reducir la rotación un 34% y elevar el eNPS a niveles de clase mundial. Recomendación: acelerar la digitalización de procesos de nómina.',
    date: '2026-09-15',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-002',
    employeeId: 'EMP-001',
    employeeName: 'Carolina Gómez Soto',
    evaluatorName: 'Camila Ospina Rivas',
    relation: 'Subordinado',
    competencies: [
      { name: 'Liderazgo Estratégico', score: 5 },
      { name: 'Comunicación Asertiva', score: 5 },
      { name: 'Gestión del Cambio', score: 4 },
      { name: 'Empatía y Desarrollo de Personas', score: 5 },
      { name: 'Delegación Efectiva', score: 4 },
      { name: 'Claridad en Retroalimentación', score: 5 }
    ],
    overallScore: 4.7,
    comments: 'Carolina es una líder inspiradora que siempre busca el desarrollo profesional de su equipo. Nos da autonomía y confianza para proponer soluciones innovadoras.',
    date: '2026-09-18',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-003',
    employeeId: 'EMP-002',
    employeeName: 'Mateo Restrepo Silva',
    evaluatorName: 'VP de Tecnología',
    relation: 'Líder Directo',
    competencies: [
      { name: 'Dominio Técnico', score: 5 },
      { name: 'Liderazgo de Equipos', score: 4 },
      { name: 'Comunicación Asertiva', score: 4 },
      { name: 'Gestión de Proyectos', score: 5 },
      { name: 'Orientación a Resultados', score: 5 },
      { name: 'Mentoring Técnico', score: 4 }
    ],
    overallScore: 4.5,
    comments: 'Mateo ha sido clave en la migración a Kubernetes y la mejora de la resiliencia operativa. Debe trabajar más en la comunicación interdepartamental y la documentación de decisiones arquitectónicas.',
    date: '2026-09-20',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-004',
    employeeId: 'EMP-002',
    employeeName: 'Mateo Restrepo Silva',
    evaluatorName: 'Daniela Salazar Pardo',
    relation: 'Subordinado',
    competencies: [
      { name: 'Dominio Técnico', score: 5 },
      { name: 'Liderazgo de Equipos', score: 5 },
      { name: 'Comunicación Asertiva', score: 4 },
      { name: 'Empatía y Desarrollo de Personas', score: 4 },
      { name: 'Delegación Efectiva', score: 5 },
      { name: 'Claridad en Retroalimentación', score: 4 }
    ],
    overallScore: 4.5,
    comments: 'Mateo es un excelente mentor técnico. Me ha ayudado a crecer en arquitectura cloud y microfrontends. A veces las reuniones de status podrían ser más concisas.',
    date: '2026-09-22',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-005',
    employeeId: 'EMP-004',
    employeeName: 'Andrés Felipe Caicedo',
    evaluatorName: 'Director Comercial',
    relation: 'Líder Directo',
    competencies: [
      { name: 'Habilidades de Negociación', score: 5 },
      { name: 'Orientación al Cliente', score: 5 },
      { name: 'Trabajo en Equipo', score: 4 },
      { name: 'Cierre de Ventas', score: 5 },
      { name: 'Pensamiento Estratégico', score: 4 },
      { name: 'Gestión del Tiempo', score: 5 }
    ],
    overallScore: 4.7,
    comments: 'Andrés es nuestro top performer indiscutible. Ha superado su meta de ventas 4 trimestres seguidos. Excelente gestión de cuentas corporativas de alto valor.',
    date: '2026-09-25',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-006',
    employeeId: 'EMP-007',
    employeeName: 'Daniela Salazar Pardo',
    evaluatorName: 'Mateo Restrepo Silva',
    relation: 'Líder Directo',
    competencies: [
      { name: 'Dominio Técnico', score: 5 },
      { name: 'Calidad del Código', score: 5 },
      { name: 'Comunicación Asertiva', score: 4 },
      { name: 'Proactividad', score: 5 },
      { name: 'Trabajo en Equipo', score: 5 },
      { name: 'Innovación y Mejora Continua', score: 5 }
    ],
    overallScore: 4.8,
    comments: 'Daniela es nuestro talento estrella en frontend. Su dominio de TypeScript, Next.js y design systems es excepcional. ALERTA: Riesgo de fuga alto por ofertas de multinacionales. Priorizar plan de retención inmediato.',
    date: '2026-09-28',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-007',
    employeeId: 'EMP-007',
    employeeName: 'Daniela Salazar Pardo',
    evaluatorName: 'Daniela Salazar Pardo',
    relation: 'Autoevaluación',
    competencies: [
      { name: 'Dominio Técnico', score: 5 },
      { name: 'Calidad del Código', score: 4 },
      { name: 'Comunicación Asertiva', score: 4 },
      { name: 'Proactividad', score: 4 },
      { name: 'Trabajo en Equipo', score: 5 },
      { name: 'Gestión del Tiempo', score: 3 }
    ],
    overallScore: 4.2,
    comments: 'Siento que he crecido mucho técnicamente pero necesito mejorar en gestión del tiempo. A veces me cuesta priorizar tareas cuando hay múltiples sprints en paralelo.',
    date: '2026-09-28',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-008',
    employeeId: 'EMP-005',
    employeeName: 'Camila Ospina Rivas',
    evaluatorName: 'Carolina Gómez Soto',
    relation: 'Líder Directo',
    competencies: [
      { name: 'Reclutamiento Efectivo', score: 5 },
      { name: 'Comunicación Asertiva', score: 4 },
      { name: 'Employer Branding', score: 4 },
      { name: 'Orientación a Resultados', score: 4 },
      { name: 'Trabajo en Equipo', score: 5 },
      { name: 'Adaptabilidad', score: 4 }
    ],
    overallScore: 4.3,
    comments: 'Camila ha demostrado gran capacidad en la reducción del tiempo de contratación IT. Su programa de referidos internos ha sido un éxito rotundo. Debe trabajar en la documentación de procesos.',
    date: '2026-10-01',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-009',
    employeeId: 'EMP-003',
    employeeName: 'Valentina Morales Duque',
    evaluatorName: 'Gerencia General',
    relation: 'Líder Directo',
    competencies: [
      { name: 'Análisis Financiero', score: 5 },
      { name: 'Liderazgo Estratégico', score: 4 },
      { name: 'Comunicación Asertiva', score: 4 },
      { name: 'Toma de Decisiones', score: 5 },
      { name: 'Orientación a Resultados', score: 5 },
      { name: 'Visión Estratégica', score: 4 }
    ],
    overallScore: 4.5,
    comments: 'Valentina mantiene un control presupuestal impecable. Su análisis de costo laboral ha permitido optimizar la inversión en talento sin sacrificar calidad.',
    date: '2026-09-30',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-010',
    employeeId: 'EMP-006',
    employeeName: 'Santiago Benítez V.',
    evaluatorName: 'Director de Operaciones',
    relation: 'Líder Directo',
    competencies: [
      { name: 'Dominio Técnico Logístico', score: 4 },
      { name: 'Orientación a Resultados', score: 3 },
      { name: 'Comunicación Asertiva', score: 3 },
      { name: 'Trabajo en Equipo', score: 4 },
      { name: 'Proactividad', score: 3 },
      { name: 'Gestión del Tiempo', score: 4 }
    ],
    overallScore: 3.5,
    comments: 'Santiago cumple con sus responsabilidades pero necesita mejorar en proactividad y comunicación con otras áreas. Ha reducido las mermas en bodega pero el ritmo de mejora ha disminuido.',
    date: '2026-10-02',
    period: 'Q3 - 2026'
  },
  {
    id: 'EVAL-011',
    employeeId: 'EMP-010',
    employeeName: 'Carlos Mario Londoño',
    evaluatorName: 'Santiago Benítez V.',
    relation: 'Líder Directo',
    competencies: [
      { name: 'Gestión de Inventarios', score: 4 },
      { name: 'Orientación a Resultados', score: 3 },
      { name: 'Comunicación Asertiva', score: 3 },
      { name: 'Trabajo en Equipo', score: 3 },
      { name: 'Puntualidad y Asistencia', score: 2 },
      { name: 'Adaptabilidad', score: 3 }
    ],
    overallScore: 3.0,
    comments: 'Carlos tiene conocimiento técnico sólido en WMS pero ha tenido dificultades de asistencia por temas de salud. Requiere seguimiento cercano del equipo SST y un plan de acompañamiento.',
    date: '2026-10-05',
    period: 'Q3 - 2026'
  }
];
