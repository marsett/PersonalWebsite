import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ExperienceData {
  id: string;
  type: 'professional' | 'academic';
  title: string;
  company?: string;
  position?: string;
  institution?: string;
  degree?: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  grade?: number;
  isActive: boolean;
  icon: string; // Nuevo campo para icono
}

@Component({
  selector: 'app-experiencia',
  standalone: false,
  templateUrl: './experiencia.component.html',
  styleUrl: './experiencia.component.css'
})
export class ExperienciaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('timelineContainer', { static: false }) timelineContainer!: ElementRef;
  
  private destroy$ = new Subject<void>();
  public currentLanguage: string = 'es';
  public isLoading: boolean = true;
  public animationEnabled: boolean = true;
  
  // Datos de experiencia estructurados
  public experienceData: ExperienceData[] = [
    {
      id: 'smartbits',
      type: 'professional',
      title: 'SmartBits IT Business Solutions',
      position: 'Desarrollador Web',
      startDate: 'Marzo 2024',
      endDate: 'Junio 2024',
      description: 'Desarrollo y gestión de sitios web en WordPress, trabajando en la personalización de temas y funcionalidades mediante HTML, CSS, PHP, JavaScript, jQuery y AJAX. Contribuí a la optimización de la experiencia de usuario y a la mejora del rendimiento de las páginas web, aplicando buenas prácticas de desarrollo frontend.',
      technologies: ['WordPress', 'HTML', 'CSS', 'PHP', 'JavaScript', 'jQuery', 'AJAX'],
      isActive: false,
      icon: 'fas fa-laptop-code'
    },
    {
      id: 'volteo',
      type: 'professional',
      title: 'Volteo Digital',
      position: 'Prácticas - Especialista en Automatización',
      startDate: 'Marzo 2023',
      endDate: 'Junio 2023',
      description: 'Formación y práctica en la plataforma de gestión de servicios en la nube ServiceNow, adquiriendo conocimientos en la configuración de flujos de trabajo, automatización de procesos y gestión de incidencias.',
      technologies: ['ServiceNow', 'Automatización de Procesos', 'Gestión de Flujos de Trabajo'],
      isActive: false,
      icon: 'fas fa-cloud'
    },
    {
      id: 'master',
      type: 'academic',
      title: 'Máster en Desarrollo de Aplicaciones y Servicios para la Nube',
      institution: 'Tajamar',
      startDate: '2024',
      endDate: '2025',
      description: 'Especialización avanzada en arquitecturas cloud y desarrollo Full Stack. Enfoque en Microsoft Azure y Amazon Web Services, con énfasis en microservicios y soluciones escalables.',
      technologies: ['Full Stack', 'Microsoft Azure', 'Amazon Web Services'],
      isActive: true,
      icon: 'fas fa-graduation-cap'
    },
    {
      id: 'daw',
      type: 'academic',
      title: 'Técnico Superior en Desarrollo de Aplicaciones Web',
      institution: 'Salesianas Plaza Castilla',
      startDate: '2023',
      endDate: '2024',
      description: 'Formación especializada en desarrollo web frontend y backend. Aprendizaje de frameworks modernos, bases de datos y metodologías de desarrollo ágil.',
      technologies: [],
      grade: 9,
      isActive: false,
      icon: 'fas fa-school'
    },
    {
      id: 'dam',
      type: 'academic',
      title: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
      institution: 'Santa Ana y San Rafael',
      startDate: '2021',
      endDate: '2023',
      description: 'Desarrollo de aplicaciones multiplataforma utilizando Java, C# y tecnologías móviles. Enfoque en programación orientada a objetos y desarrollo de interfaces de usuario.',
      technologies: [],
      grade: 9,
      isActive: false,
      icon: 'fas fa-university'
    }
  ];

  constructor(
    private router: Router,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.initializeComponent();
    this.setupLanguageSubscription();
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnimations();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupScrollAnimations();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Inicialización del componente
  private initializeComponent(): void {
    this.currentLanguage = this.translate.currentLang || 'es';
    this.isLoading = false;
  }

  // Configuración de suscripción al cambio de idioma
  private setupLanguageSubscription(): void {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        this.currentLanguage = event.lang;
        this.refreshAnimations();
      });
  }

  // Inicialización de animaciones AOS
  private initializeAnimations(): void {
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100,
        delay: 0
      });
    }
  }

  // Configuración del Intersection Observer para animaciones personalizadas
  private setupIntersectionObserver(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.onElementEnter(entry.target as HTMLElement);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observar todos los elementos del timeline
      setTimeout(() => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => observer.observe(item));
      }, 100);
    }
  }

  // Configuración de animaciones de scroll
  private setupScrollAnimations(): void {
    if (isPlatformBrowser(this.platformId)) {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        (item as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      });
    }
  }

  // Método para manejar la animación de entrada de elementos
  onElementEnter(element: HTMLElement): void {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.classList.add('animate-in');
  }

  // Método para obtener el año actual para el máster en curso
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  // Método para formatear fechas si es necesario
  formatDate(date: string): string {
    if (date.includes('EXPERIENCE.')) {
      return this.translate.instant(date);
    }
    return date;
  }

  // Método para manejar clicks en badges de tecnologías
  onTechBadgeClick(technology: string): void {
    console.log(`Clicked on technology: ${technology}`);
    
    // Animación visual del click
    if (isPlatformBrowser(this.platformId)) {
      const event = new CustomEvent('techBadgeClick', {
        detail: { technology }
      });
      window.dispatchEvent(event);
    }
    
    // Aquí se puede agregar lógica para mostrar más información sobre la tecnología
    this.showTechnologyInfo(technology);
  }

  // Método para mostrar información adicional sobre la tecnología
  private showTechnologyInfo(technology: string): void {
    // Implementar modal o tooltip con información de la tecnología
    console.log(`Showing info for: ${technology}`);
  }

  // Método para manejar la navegación a certificaciones o proyectos relacionados
  navigateToRelatedContent(type: string, value: string): void {
    console.log(`Navigate to ${type}: ${value}`);
    
    switch (type) {
      case 'projects':
        this.router.navigate(['/proyectos'], { queryParams: { filter: value } });
        break;
      case 'certifications':
        this.router.navigate(['/certificaciones'], { queryParams: { technology: value } });
        break;
      case 'company':
        if (isPlatformBrowser(this.platformId)) {
          window.open(`https://www.google.com/search?q=${encodeURIComponent(value)}`, '_blank');
        }
        break;
      default:
        console.warn('Navigation type not recognized:', type);
    }
  }

  // Método para obtener el color del badge según el tipo
  getBadgeColor(type: 'professional' | 'academic'): string {
    if (!isPlatformBrowser(this.platformId)) return '';
    
    const isLightMode = document.body.classList.contains('light-mode');
    
    switch (type) {
      case 'professional':
        return isLightMode 
          ? 'linear-gradient(45deg, #3498db, #2c3e50)'
          : 'linear-gradient(45deg, #667eea, #764ba2)';
      case 'academic':
        return isLightMode
          ? 'linear-gradient(45deg, #f39c12, #9b59b6)'
          : 'linear-gradient(45deg, #feca57, #ff9ff3)';
      default:
        return isLightMode
          ? 'linear-gradient(45deg, #3498db, #2c3e50)'
          : 'linear-gradient(45deg, #667eea, #764ba2)';
    }
  }

  // Método para obtener el icono según el tipo de experiencia
  getExperienceIcon(type: 'professional' | 'academic'): string {
    switch (type) {
      case 'professional':
        return 'fas fa-briefcase';
      case 'academic':
        return 'fas fa-graduation-cap';
      default:
        return 'fas fa-briefcase';
    }
  }

  // Método para manejar el hover en los elementos del timeline
  onTimelineItemHover(event: MouseEvent, isEntering: boolean): void {
    const target = event.currentTarget as HTMLElement;
    const dot = target.querySelector('.timeline-dot') as HTMLElement;
    const content = target.querySelector('.timeline-content') as HTMLElement;
    
    if (dot) {
      if (isEntering) {
        dot.style.transform = 'translateX(-50%) scale(1.3)';
        dot.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.8)';
      } else {
        dot.style.transform = 'translateX(-50%) scale(1)';
        dot.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
      }
    }

    if (content) {
      if (isEntering) {
        content.style.transform = 'translateY(-5px)';
      } else {
        content.style.transform = 'translateY(0)';
      }
    }
  }

  // Método para manejar clicks en elementos del timeline
  onTimelineItemClick(item: ExperienceData): void {
    console.log('Timeline item clicked:', item);
    
    // Agregar clase de animación de click
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(`timeline-${item.id}`);
      if (element) {
        element.classList.add('clicked');
        setTimeout(() => {
          element.classList.remove('clicked');
        }, 300);
      }
    }
    
    // Navegación basada en el tipo de experiencia
    if (item.type === 'professional') {
      this.navigateToRelatedContent('projects', item.id);
    } else if (item.type === 'academic') {
      this.navigateToRelatedContent('certifications', item.id);
    }
  }

  // Método para refrescar animaciones
  private refreshAnimations(): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.refresh();
    }
  }

  // Método para obtener experiencias profesionales
  getProfessionalExperiences(): ExperienceData[] {
    return this.experienceData.filter(exp => exp.type === 'professional');
  }

  // Método para obtener experiencias académicas
  getAcademicExperiences(): ExperienceData[] {
    return this.experienceData.filter(exp => exp.type === 'academic');
  }

  // Método para verificar si una experiencia está activa
  isExperienceActive(experience: ExperienceData): boolean {
    return experience.isActive;
  }

  // Listener para eventos de teclado
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      // Cerrar cualquier modal o tooltip abierto
      this.closeAllModals();
    }
  }

  // Método para cerrar modales
  private closeAllModals(): void {
    // Implementar lógica para cerrar modales/tooltips
    console.log('Closing all modals');
  }

  // Método para togglear animaciones
  toggleAnimations(): void {
    this.animationEnabled = !this.animationEnabled;
    
    if (this.animationEnabled) {
      this.initializeAnimations();
    } else {
      if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && (window as any).AOS) {
        (window as any).AOS.init({ disable: true });
      }
    }
  }

  // Método para obtener el estado de carga
  isComponentLoading(): boolean {
    return this.isLoading;
  }

  // Método para manejar errores
  handleError(error: any): void {
    console.error('Error in ExperienciaComponent:', error);
    // Implementar manejo de errores más robusto
  }

  // Método para generar timelines separados
  generateProfessionalTimeline(): ExperienceData[] {
    return this.experienceData.filter(exp => exp.type === 'professional');
  }

  generateAcademicTimeline(): ExperienceData[] {
    return this.experienceData.filter(exp => exp.type === 'academic');
  }

  // Método para obtener el título de la sección de tecnologías
  getTechnologiesTitle(type: 'professional' | 'academic'): string {
    return type === 'professional' ? 'Tecnologías Utilizadas' : 'Especializaciones';
  }
}