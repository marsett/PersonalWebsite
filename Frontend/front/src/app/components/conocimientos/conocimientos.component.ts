import { Component } from '@angular/core';

interface Technology {
  name: string;
  logo: string;
  level: string;
  projects: string[];
  color: string;
  description: string;
  experience: string;
  detailedProjects: ProjectDetail[];
  certifications?: string[];
  strengths: string[];
  category: string;
}

interface ProjectDetail {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  duration: string;
}

interface Certification {
  name: string;
  provider: string;
  image: string;
  link: string;
  category: string;
}

@Component({
  selector: 'app-conocimientos',
  standalone: false,
  templateUrl: './conocimientos.component.html',
  styleUrl: './conocimientos.component.css'
})
export class ConocimientosComponent {

  selectedTechnology: Technology | null = null;
  isModalOpen = false;

  technologies: Technology[] = [
    // FRONTEND
    {
      name: 'Angular',
      logo: 'fab fa-angular',
      level: 'Avanzado',
      projects: ['SPA Applications', 'Component Architecture', 'Services'],
      color: '#DD0031',
      description: '"Mi arquitectura empieza en componentes y termina en experiencias." — Anónimo',
      experience: '3+ años de experiencia',
      category: 'FRONTEND',
      detailedProjects: [
        {
          name: 'Plataforma de Gestión Empresarial',
          description: 'Aplicación completa para gestión de recursos humanos con módulos de empleados, nóminas y reportes',
          technologies: ['Angular 15+', 'TypeScript', 'RxJS', 'Angular Material'],
          role: 'Angular Developer',
          duration: '6 meses'
        }
      ],
      certifications: ['Angular - The Complete Guide', 'NgRx Store + Effects'],
      strengths: ['Component Architecture', 'RxJS', 'State Management', 'Testing']
    },
    {
      name: 'React',
      logo: 'fab fa-react',
      level: 'Avanzado',
      projects: ['SPA Development', 'Component Libraries', 'State Management'],
      color: '#61DAFB',
      description: '"Piensa en React como un conjunto de componentes reutilizables." — Dan Abramov',
      experience: '2+ años de experiencia',
      category: 'FRONTEND',
      detailedProjects: [
        {
          name: 'Dashboard Interactivo',
          description: 'Panel de control con gráficos y métricas en tiempo real',
          technologies: ['React', 'Redux', 'Chart.js', 'Material-UI'],
          role: 'Frontend Developer',
          duration: '4 meses'
        }
      ],
      certifications: ['React - The Complete Guide', 'Redux Essentials'],
      strengths: ['Hooks', 'Context API', 'Redux', 'Component Design']
    },
    {
      name: 'Vue.js',
      logo: 'fab fa-vuejs',
      level: 'Intermedio',
      projects: ['Progressive Web Apps', 'Vue Router', 'Vuex'],
      color: '#4FC08D',
      description: '"Vue.js es progresivo por diseño." — Evan You',
      experience: '1+ años de experiencia',
      category: 'FRONTEND',
      detailedProjects: [
        {
          name: 'E-commerce Frontend',
          description: 'Tienda online con carrito de compras y sistema de pagos',
          technologies: ['Vue.js', 'Vuex', 'Vue Router', 'Vuetify'],
          role: 'Vue.js Developer',
          duration: '3 meses'
        }
      ],
      certifications: ['Vue.js Complete Course'],
      strengths: ['Composition API', 'Vuex', 'Vue Router', 'Single File Components']
    },
    {
      name: 'jQuery',
      logo: 'fab fa-js-square',
      level: 'Avanzado',
      projects: ['DOM Manipulation', 'AJAX Requests', 'UI Interactions'],
      color: '#0769AD',
      description: '"jQuery: Write less, do more." — John Resig',
      experience: '4+ años de experiencia',
      category: 'FRONTEND',
      detailedProjects: [
        {
          name: 'Sistema de Gestión Legacy',
          description: 'Modernización de aplicación web existente con jQuery',
          technologies: ['jQuery', 'Bootstrap', 'AJAX', 'PHP'],
          role: 'Frontend Developer',
          duration: '2 meses'
        }
      ],
      certifications: ['jQuery Fundamentals'],
      strengths: ['DOM Manipulation', 'Event Handling', 'AJAX', 'Plugin Development']
    },
    {
      name: 'JavaScript',
      logo: 'fab fa-js-square',
      level: 'Avanzado',
      projects: ['Apps Interactivas', 'APIs REST', 'Vanilla JS Projects'],
      color: '#F7DF1E',
      description: '"JavaScript es el único lenguaje que la gente cree que no necesita aprender antes de usarlo." — Douglas Crockford',
      experience: '4+ años de experiencia',
      category: 'FRONTEND',
      detailedProjects: [
        {
          name: 'Dashboard Analytics',
          description: 'Aplicación SPA completa para análisis de datos con gráficos interactivos',
          technologies: ['ES6+', 'Fetch API', 'Chart.js', 'WebSockets'],
          role: 'JavaScript Developer',
          duration: '5 meses'
        }
      ],
      certifications: ['JavaScript Algorithms and Data Structures', 'ES6 Complete Course'],
      strengths: ['ES6+', 'Async/Await', 'DOM Manipulation', 'API Integration']
    },
    {
      name: 'Ionic',
      logo: 'fas fa-mobile-alt',
      level: 'Intermedio',
      projects: ['Mobile Apps', 'Hybrid Development', 'Capacitor'],
      color: '#3880FF',
      description: '"Una plataforma, múltiples dispositivos." — Ionic Team',
      experience: '1+ años de experiencia',
      category: 'FRONTEND',
      detailedProjects: [
        {
          name: 'App Móvil Corporativa',
          description: 'Aplicación híbrida para gestión de empleados',
          technologies: ['Ionic', 'Angular', 'Capacitor', 'TypeScript'],
          role: 'Mobile Developer',
          duration: '3 meses'
        }
      ],
      certifications: ['Ionic Framework Complete Guide'],
      strengths: ['Cross-platform', 'Capacitor', 'Angular Integration', 'Native Features']
    },

    // BACKEND
    {
      name: 'C#',
      logo: 'fas fa-code',
      level: 'Avanzado',
      projects: ['.NET Applications', 'Web APIs', 'Desktop Apps'],
      color: '#239120',
      description: '"C# combina la potencia de C++ con la simplicidad de Visual Basic." — Anders Hejlsberg',
      experience: '3+ años de experiencia',
      category: 'BACKEND',
      detailedProjects: [
        {
          name: 'API REST Corporativa',
          description: 'Sistema de gestión empresarial con arquitectura microservicios',
          technologies: ['C#', '.NET Core', 'Entity Framework', 'SQL Server'],
          role: 'Backend Developer',
          duration: '6 meses'
        }
      ],
      certifications: ['C# Programming Certificate', '.NET Core Specialist'],
      strengths: ['OOP', 'LINQ', 'Entity Framework', 'Web API']
    },
    {
      name: 'Java',
      logo: 'fab fa-java',
      level: 'Intermedio',
      projects: ['Spring Boot', 'REST APIs', 'Enterprise Applications'],
      color: '#ED8B00',
      description: '"Write once, run anywhere." — Sun Microsystems',
      experience: '2+ años de experiencia',
      category: 'BACKEND',
      detailedProjects: [
        {
          name: 'Sistema de Inventario',
          description: 'Aplicación empresarial con Spring Boot y microservicios',
          technologies: ['Java', 'Spring Boot', 'JPA', 'MySQL'],
          role: 'Java Developer',
          duration: '4 meses'
        }
      ],
      certifications: ['Java SE 11 Developer', 'Spring Framework'],
      strengths: ['Spring Boot', 'JPA/Hibernate', 'Maven', 'RESTful Services']
    },
    {
      name: 'Python',
      logo: 'fab fa-python',
      level: 'Intermedio',
      projects: ['Django Apps', 'Data Analysis', 'Automation Scripts'],
      color: '#3776AB',
      description: '"Python es un lenguaje de programación que te permite trabajar rápidamente." — Python.org',
      experience: '2+ años de experiencia',
      category: 'BACKEND',
      detailedProjects: [
        {
          name: 'Sistema de Análisis de Datos',
          description: 'Plataforma de análisis con Django y visualización de datos',
          technologies: ['Python', 'Django', 'Pandas', 'PostgreSQL'],
          role: 'Python Developer',
          duration: '3 meses'
        }
      ],
      certifications: ['Python Complete Course', 'Django Framework'],
      strengths: ['Django', 'Data Analysis', 'Automation', 'Web Scraping']
    },
    {
      name: '.NET',
      logo: 'fas fa-circle',
      level: 'Avanzado',
      projects: ['Web Applications', 'APIs', 'Enterprise Solutions'],
      color: '#512BD4',
      description: '".NET es una plataforma para desarrolladores gratuita y de código abierto." — Microsoft',
      experience: '3+ años de experiencia',
      category: 'BACKEND',
      detailedProjects: [
        {
          name: 'Plataforma E-commerce',
          description: 'Sistema completo de comercio electrónico con .NET Core',
          technologies: ['.NET Core', 'C#', 'Entity Framework', 'Azure'],
          role: '.NET Developer',
          duration: '5 meses'
        }
      ],
      certifications: ['.NET Core Fundamentals', 'ASP.NET Core Developer'],
      strengths: ['ASP.NET Core', 'Entity Framework', 'Dependency Injection', 'Middleware']
    },
    {
      name: 'SQL',
      logo: 'fas fa-database',
      level: 'Avanzado',
      projects: ['Database Design', 'Stored Procedures', 'Data Analysis'],
      color: '#CC2927',
      description: '"Los datos son el nuevo petróleo." — Clive Humby',
      experience: '4+ años de experiencia',
      category: 'BACKEND',
      detailedProjects: [
        {
          name: 'Sistema de Reporting',
          description: 'Base de datos optimizada para reportes empresariales',
          technologies: ['SQL Server', 'T-SQL', 'SSRS', 'Power BI'],
          role: 'Database Developer',
          duration: '2 meses'
        }
      ],
      certifications: ['SQL Server Specialist', 'Database Design'],
      strengths: ['Query Optimization', 'Stored Procedures', 'Database Design', 'Performance Tuning']
    },
    {
      name: 'Django',
      logo: 'fab fa-python',
      level: 'Intermedio',
      projects: ['Web Applications', 'REST APIs', 'Admin Panels'],
      color: '#092E20',
      description: '"Django hace que sea más fácil crear mejores aplicaciones web más rápido." — Django Team',
      experience: '2+ años de experiencia',
      category: 'BACKEND',
      detailedProjects: [
        {
          name: 'Portal de Noticias',
          description: 'Sistema de gestión de contenido con Django',
          technologies: ['Django', 'Python', 'PostgreSQL', 'Redis'],
          role: 'Django Developer',
          duration: '3 meses'
        }
      ],
      certifications: ['Django Complete Course', 'Django REST Framework'],
      strengths: ['ORM', 'Admin Interface', 'Authentication', 'REST Framework']
    },

    // CLOUD
    {
      name: 'Azure',
      logo: 'fab fa-microsoft',
      level: 'Avanzado',
      projects: ['Cloud Applications', 'DevOps', 'Microservices'],
      color: '#0078D4',
      description: '"La nube es el futuro de la computación." — Satya Nadella',
      experience: '2+ años de experiencia',
      category: 'CLOUD',
      detailedProjects: [
        {
          name: 'Migración a Cloud',
          description: 'Migración de aplicaciones legacy a Azure con CI/CD',
          technologies: ['Azure', 'Docker', 'Kubernetes', 'DevOps'],
          role: 'Cloud Developer',
          duration: '4 meses'
        }
      ],
      certifications: ['AZ-204 Developing Solutions for Microsoft Azure'],
      strengths: ['App Services', 'Functions', 'Storage', 'DevOps']
    },
    {
      name: 'Power Platform',
      logo: 'fas fa-bolt',
      level: 'Avanzado',
      projects: ['Power Apps', 'Power Automate', 'Power BI'],
      color: '#742774',
      description: '"Democratizando el desarrollo de aplicaciones." — Microsoft',
      experience: '2+ años de experiencia',
      category: 'CLOUD',
      detailedProjects: [
        {
          name: 'Automatización Empresarial',
          description: 'Suite de aplicaciones low-code para gestión empresarial',
          technologies: ['Power Apps', 'Power Automate', 'Dataverse', 'Power BI'],
          role: 'Power Platform Developer',
          duration: '3 meses'
        }
      ],
      certifications: ['PL-400 Microsoft Power Platform Developer'],
      strengths: ['Power Apps', 'Power Automate', 'Dataverse', 'Custom Connectors']
    },
    {
      name: 'AWS',
      logo: 'fab fa-aws',
      level: 'Intermedio',
      projects: ['Lambda Functions', 'S3 Storage', 'EC2 Instances'],
      color: '#FF9900',
      description: '"AWS es la plataforma de nube más completa del mundo." — Amazon',
      experience: '1+ años de experiencia',
      category: 'CLOUD',
      detailedProjects: [
        {
          name: 'Arquitectura Serverless',
          description: 'Aplicación serverless con Lambda y API Gateway',
          technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3'],
          role: 'AWS Developer',
          duration: '2 meses'
        }
      ],
      certifications: ['DVA-C02 AWS Certified Developer'],
      strengths: ['Lambda', 'API Gateway', 'DynamoDB', 'S3']
    },
    {
      name: 'Inteligencia Artificial',
      logo: 'fas fa-brain',
      level: 'Intermedio',
      projects: ['Cognitive Services', 'Machine Learning', 'AI Solutions'],
      color: '#00BCF2',
      description: '"La IA es la nueva electricidad." — Andrew Ng',
      experience: '1+ años de experiencia',
      category: 'CLOUD',
      detailedProjects: [
        {
          name: 'Chatbot Inteligente',
          description: 'Bot conversacional con procesamiento de lenguaje natural',
          technologies: ['Azure AI', 'Bot Framework', 'LUIS', 'QnA Maker'],
          role: 'AI Developer',
          duration: '3 meses'
        }
      ],
      certifications: ['AI-102 Designing and Implementing a Microsoft Azure AI Solution'],
      strengths: ['Cognitive Services', 'Bot Framework', 'Machine Learning', 'NLP']
    }
  ];

  certifications: Certification[] = [
    {
      name: 'AZ-204',
      provider: 'Microsoft Azure',
      image: 'assets/images/azure-developer-associate.png',
      link: 'https://learn.microsoft.com/es-es/users/mariojimenezmarset-5547/credentials/c0a404bd8891e1b1?ref=https%3A%2F%2Fgithub.com%2F',
      category: 'CLOUD'
    },
    {
      name: 'PL-400',
      provider: 'Microsoft Power Platform',
      image: 'assets/images/power-platform-developer.png',
      link: 'https://learn.microsoft.com/es-es/users/mariojimenezmarset-5547/credentials/49fe011e61bf1ec8?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      category: 'CLOUD'
    },
    {
      name: 'DVA-C02',
      provider: 'Amazon Web Services',
      image: 'assets/images/aws-certified-developer-associate-dva-c02.png',
      link: 'https://www.credly.com/badges/07057379-d3cc-44a1-abf4-7055b8eb8a54',
      category: 'CLOUD'
    },
    {
      name: 'AI-102',
      provider: 'Microsoft Azure AI',
      image: 'assets/images/ai-engineer-associate.png',
      link: 'https://learn.microsoft.com/api/credentials/share/es-es/MarioJimenezMarset-5547/9F6B4692A8B7C08A?sharingId=1C9169A92F4DA389',
      category: 'CLOUD'
    }
  ];

  // Método para obtener tecnologías por categoría
  getTechnologiesByCategory(category: string): Technology[] {
    return this.technologies.filter(tech => tech.category === category);
  }

  openModal(technology: Technology): void {
    this.selectedTechnology = technology;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTechnology = null;
    document.body.style.overflow = 'auto';
  }

  getLevelColor(level: string): string {
    switch (level) {
      case 'Avanzado':
        return '#4CAF50';
      case 'Intermedio':
        return '#FF9800';
      case 'Básico':
        return '#2196F3';
      default:
        return '#757575';
    }
  }
}