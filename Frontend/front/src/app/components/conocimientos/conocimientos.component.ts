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
}

interface ProjectDetail {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  duration: string;
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
    {
      name: 'HTML5',
      logo: 'fab fa-html5',
      level: 'Avanzado',
      projects: ['Portfolio Personal', 'Web Corporativa', 'Landing Pages'],
      color: '#E34F26',
      description: '“La estructura no es solo semántica, es narrativa.” — Anónimo',
      experience: '3+ años de experiencia',
      detailedProjects: [
        {
          name: 'Portfolio Personal Responsivo',
          description: 'Desarrollo completo de portfolio personal con diseño responsivo, optimizado para SEO y accesibilidad WCAG 2.1',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'SASS'],
          role: 'Desarrollador Full-Stack',
          duration: '2 meses'
        },
        {
          name: 'Plataforma E-commerce',
          description: 'Estructura HTML semántica para plataforma de comercio electrónico con más de 50 páginas',
          technologies: ['HTML5', 'CSS Grid', 'Flexbox', 'Web Components'],
          role: 'Frontend Developer',
          duration: '4 meses'
        }
      ],
      certifications: ['HTML5 Application Development', 'Web Accessibility Specialist'],
      strengths: ['Semántica avanzada', 'Optimización SEO', 'Accesibilidad', 'Performance']
    },
    {
      name: 'CSS3',
      logo: 'fab fa-css3-alt',
      level: 'Avanzado',
      projects: ['Diseño Responsivo', 'Animaciones CSS', 'Grid & Flexbox'],
      color: '#1572B6',
      description: '“La estética es funcionalidad en silencio.” — Jacob Lett',
      experience: '3+ años de experiencia',
      detailedProjects: [
        {
          name: 'Sistema de Componentes UI',
          description: 'Desarrollo de librería de componentes reutilizables con CSS puro, incluyendo dark mode y temas personalizables',
          technologies: ['CSS3', 'SASS', 'PostCSS', 'CSS Custom Properties'],
          role: 'UI/UX Developer',
          duration: '3 meses'
        },
        {
          name: 'Animaciones Interactivas',
          description: 'Implementación de animaciones complejas y micro-interacciones para mejorar UX',
          technologies: ['CSS Animations', 'Keyframes', 'Transform', 'Transition'],
          role: 'Frontend Specialist',
          duration: '1 mes'
        }
      ],
      certifications: ['Advanced CSS and Sass', 'CSS Grid Complete Guide'],
      strengths: ['Grid & Flexbox', 'Animaciones', 'Responsive Design', 'Performance CSS']
    },
    {
      name: 'JavaScript',
      logo: 'fab fa-js-square',
      level: 'Avanzado',
      projects: ['Apps Interactivas', 'APIs REST', 'Vanilla JS Projects'],
      color: '#F7DF1E',
      description: '“JavaScript es el único lenguaje que la gente cree que no necesita aprender antes de usarlo.” — Douglas Crockford',
      experience: '4+ años de experiencia',
      detailedProjects: [
        {
          name: 'Dashboard Analytics',
          description: 'Aplicación SPA completa para análisis de datos con gráficos interactivos y tiempo real',
          technologies: ['ES6+', 'Fetch API', 'Chart.js', 'WebSockets'],
          role: 'JavaScript Developer',
          duration: '5 meses'
        },
        {
          name: 'Sistema de Gestión',
          description: 'Aplicación de gestión empresarial con CRUD completo y autenticación',
          technologies: ['JavaScript', 'Local Storage', 'REST APIs', 'JSON'],
          role: 'Full-Stack Developer',
          duration: '3 meses'
        }
      ],
      certifications: ['JavaScript Algorithms and Data Structures', 'ES6 Complete Course'],
      strengths: ['ES6+', 'Async/Await', 'DOM Manipulation', 'API Integration']
    },
    {
      name: 'Angular',
      logo: 'fab fa-angular',
      level: 'Avanzado',
      projects: ['SPA Applications', 'Component Architecture', 'Services'],
      color: '#DD0031',
      description: '“Mi arquitectura empieza en componentes y termina en experiencias.” — Anónimo',
      experience: '2+ años de experiencia',
      detailedProjects: [
        {
          name: 'Plataforma de Gestión Empresarial',
          description: 'Aplicación completa para gestión de recursos humanos con módulos de empleados, nóminas y reportes',
          technologies: ['Angular 15+', 'TypeScript', 'RxJS', 'Angular Material'],
          role: 'Angular Developer',
          duration: '6 meses'
        },
        {
          name: 'E-commerce Dashboard',
          description: 'Panel de administración para tienda online con gestión de productos, pedidos y estadísticas',
          technologies: ['Angular', 'NgRx', 'Angular Universal', 'PWA'],
          role: 'Frontend Lead',
          duration: '4 meses'
        }
      ],
      certifications: ['Angular - The Complete Guide', 'NgRx Store + Effects'],
      strengths: ['Component Architecture', 'RxJS', 'State Management', 'Testing']
    },
    {
      name: 'Node.js',
      logo: 'fab fa-node-js',
      level: 'Intermedio',
      projects: ['REST APIs', 'Express Server', 'Database Integration'],
      color: '#339933',
      description: '“Node.js es como un cuchillo afilado: puedes hacer cualquier cosa con él, pero también puedes cortarte.” — Nick Morgan',
      experience: '2+ años de experiencia',
      detailedProjects: [
        {
          name: 'API RESTful E-commerce',
          description: 'API completa para tienda online con autenticación JWT, pagos y gestión de inventario',
          technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
          role: 'Backend Developer',
          duration: '3 meses'
        },
        {
          name: 'Microservicios Architecture',
          description: 'Sistema distribuido con múltiples servicios para aplicación empresarial',
          technologies: ['Node.js', 'Docker', 'Redis', 'PostgreSQL'],
          role: 'DevOps Engineer',
          duration: '4 meses'
        }
      ],
      certifications: ['Node.js Complete Course', 'MongoDB Developer'],
      strengths: ['Express.js', 'API Design', 'Database Integration', 'Authentication']
    }
  ];

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