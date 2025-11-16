import { Component, OnInit, Inject, PLATFORM_ID, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  galeria: string[];
  tecnologias: string[];
  rating: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  urlCodigo: string;
  duracion: string;
  tieneCodigoDisponible: boolean;
}

@Component({
  selector: 'app-proyectos',
  standalone: false,
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0', opacity: '0', overflow: 'hidden' }),
        animate('400ms ease-out', style({ height: '*', opacity: '1' }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('400ms ease-in', style({ height: '0', opacity: '0' }))
      ])
    ])
  ]
})
export class ProyectosComponent implements OnInit, OnDestroy {

  expandedProject: number | null = null;
  isAnimating = false;

  // Mapa para guardar el índice de imagen seleccionada por proyecto
  private projectImageIndices: Map<number, number> = new Map();

  // Cache para traducciones
  private translationCache: Map<string, string> = new Map();
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) { 
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.translationCache.clear();
      this.cdr.markForCheck();
    });

    // Detectar cambios de tema para forzar re-render
    if (isPlatformBrowser(this.platformId)) {
      const observer = new MutationObserver(() => {
        this.cdr.markForCheck();
      });
      
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  proyectos: Proyecto[] = [
    {
      id: 1,
      titulo: 'Causality360 - Análisis Inteligente de Noticias',
      descripcion: `Aplicación web desarrollada con Angular que proporciona análisis automatizado de noticias españolas mediante inteligencia artificial. Procesa diariamente 5 noticias seleccionadas, generando análisis de origen, impacto y predicciones fundamentadas.

Desarrollada con Angular y TypeScript, utiliza SCSS para estilos avanzados y consume una API .NET backend (ApiCausality360). Implementa Server-Side Rendering con Angular Universal y Express para optimización SEO, además de CI/CD con GitHub Actions.

Características principales:
• 5 noticias diarias procesadas automáticamente
• Análisis IA generado por Groq con origen, impacto y predicciones
• Eventos similares históricos para contexto adicional
• Diseño completamente responsivo (Desktop, Tablet, Mobile)
• Panel lateral deslizable para análisis detallado
• Carruseles interactivos con controles adaptativos
• Estados de carga y error manejados elegantemente
• Workflow explicativo del procesamiento de noticias
• Server-Side Rendering para mejor SEO

Funcionalidades principales incluyen análisis automático diario a las 12:00 AM, carruseles interactivos con workflow de 4 pasos, panel lateral deslizable con análisis completo y diseño totalmente adaptativo para todos los dispositivos.

🔗 Ver Proyecto en Vivo: https://ashy-bay-0e29e4a03.1.azurestaticapps.net`,
      imagen: 'assets/images/abstract5.jpg',
      galeria: [
        'assets/images/causa1.png',
        'assets/images/causa2.png',
        'assets/images/causa3.png',
        'assets/images/causa4.png',
        'assets/images/causa5.png',
        'assets/images/causa6.png',
        'assets/images/causa7.png',
        'assets/images/causa8.png',
        'assets/images/causa9.png',
        'assets/images/causa10.png'
      ],
      tecnologias: ['Angular', 'TypeScript', 'SCSS', 'HTML5', '.NET API', 'Angular Universal', 'Express', 'GitHub Actions', 'Groq IA', 'UptimeRobot'],
      rating: 9,
      fechaInicio: '2025-08-01',
      fechaFin: '2025-08-31',
      estado: 'Completado',
      urlCodigo: 'https://github.com/marsett/Causality360',
      duracion: '1 mes',
      tieneCodigoDisponible: true
    },
    {
      id: 2,
      titulo: 'Zuvo Pet - Plataforma de Adopción de Mascotas',
      descripcion: `ZuvoPet es una plataforma desarrollada como Trabajo Final del MÁSTER DESARROLLO WEB FULL STACK + MULTICLOUD de Tajamar Tech. Su propósito es conectar refugios de animales con personas interesadas en adoptar, facilitando el proceso mediante una experiencia intuitiva y funcionalidades adaptadas a cada tipo de usuario (refugios y adoptantes).

La aplicación fue desarrollada individualmente con .NET Core MVC y C#, siguiendo el patrón de diseño MVC y empleando una arquitectura basada en servicios. Incluye una API propia, un paquete NuGet personalizado para modelos y DTOs, y fue complementada con tecnologías frontend como HTML, CSS, Bootstrap, JavaScript y Razor. El despliegue original se realizó en Microsoft Azure, incluyendo la migración de base de datos local a la nube.

Posteriormente, se llevó a cabo una migración completa a Amazon Web Services (AWS) en colaboración con dos compañeros del máster, adaptando la arquitectura al entorno cloud de AWS. Este proceso incluyó:

• Rediseño de la API como aplicación serverless usando AWS Lambda y API Gateway.
• Sustitución de SQL Server por MySQL y ajustes en la capa de datos.
• Despliegue sobre una instancia EC2 con Portainer, uso de Amazon S3 para archivos estáticos y configuración de dominio con DuckDNS y Nginx como proxy inverso.
• Coordinación en infraestructura, seguridad, contenedores y servicios cloud.

Este proyecto supuso una experiencia integral, abarcando desde el diseño y desarrollo hasta el despliegue real en producción sobre Azure y AWS, y consolidando competencias en desarrollo backend, arquitectura escalable y soluciones cloud multiplataforma.

🔗 URL del proyecto (AWS – ya inactivo): https://zuvopet.duckdns.org`,
      imagen: 'assets/images/abstract4.jpg',
      galeria: [
        'assets/images/zuvo1.jpg',
        'assets/images/zuvo2.jpg',
        'assets/images/zuvo3.jpg',
        'assets/images/zuvo4.jpg',
        'assets/images/zuvo5.jpg',
        'assets/images/zuvo6.jpg',
        'assets/images/zuvo7.jpg',
        'assets/images/zuvo8.jpg',
        'assets/images/zuvo9.jpg',
        'assets/images/zuvo10.jpg',
        'assets/images/zuvo11.jpg',
        'assets/images/zuvo12.jpg',
        'assets/images/zuvo13.jpg',
        'assets/images/zuvo14.jpg',
        'assets/images/zuvo15.jpg',
        'assets/images/zuvo16.jpg',
        'assets/images/zuvo17.jpg',
        'assets/images/zuvo18.jpg',
        'assets/images/zuvo19.jpg',
        'assets/images/zuvo20.jpg',
      ],
      tecnologias: ['.NET', 'ASP.NET MVC', 'Azure', 'ASP.NET Web Api', 'SQL Server', 'C#', 'AWS', 'AWS Serverless Application', 'MySql'],
      rating: 8.5,
      fechaInicio: '2025-02-01',
      fechaFin: '2025-06-01',
      estado: 'Completado',
      urlCodigo: 'https://github.com/marsett/ZuvoPetMvcAzure',
      duracion: '4 meses',
      tieneCodigoDisponible: true
    },
    {
      id: 3,
      titulo: 'Gestión de Charlas Tajamar',
      descripcion: `Este proyecto de desarrollo web frontend fue creado colaborativamente por tres compañeras de mi máster y yo, siendo reconocido como el mejor trabajo y seleccionado para su implementación en producción. La aplicación está actualmente desplegada en Azure y accesible.

Desarrollamos la solución utilizando VS Code y aplicando metodologías de trabajo en equipo mediante gestión de ramas en GitHub, lo que nos permitió coordinar eficazmente el desarrollo. Implementamos tecnologías frontend modernas como Vue.js, HTML5 y Bootstrap, complementadas con librerías especializadas como ChartJS para visualización de datos y FullCalendar para la gestión de eventos temporales.

El objetivo principal del proyecto fue optimizar la gestión de charlas impartidas por alumnos, proporcionando una plataforma intuitiva que mejora significativamente el proceso de programación, organización y seguimiento de estas actividades formativas. La implementación exitosa demuestra nuestra capacidad para entregar soluciones funcionales que resuelven necesidades reales del entorno educativo.

Esta experiencia no solo reforzó mis conocimientos técnicos, sino también mis habilidades de colaboración en proyectos de desarrollo ágil y orientados a resultados tangibles.`,
      imagen: 'assets/images/abstract3.jpg',
      galeria: [
        'assets/images/charlas1.jpg',
        'assets/images/charlas2.jpg',
        'assets/images/charlas3.jpg',
        'assets/images/charlas4.jpg',
        'assets/images/charlas5.jpg'
      ],
      tecnologias: ['Vue', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
      rating: 10,
      fechaInicio: '2024-11-01',
      fechaFin: '2025-02-1',
      estado: 'Completado',
      urlCodigo: 'https://github.com/marsett/GestionCharlas',
      duracion: '4 meses',
      tieneCodigoDisponible: true
    },
    {
      id: 4,
      titulo: 'Servicios Informáticos 2.0',
      descripcion: `Esta es la segunda versión de mi idea de proyecto, realizado en 2024 como TFG para mi CFGS DAW. La aplicación está desarrollada con ASP .NET Core utilizando C#, implementando el patrón de diseño MVC y Entity Framework. Complementariamente, se han aplicado tecnologías frontend como HTML, CSS, Bootstrap, JavaScript, jQuery y AJAX para crear una experiencia de usuario dinámica y responsive.

La aplicación, denominada "Servicios Informáticos", proporciona una plataforma integral donde los usuarios pueden localizar y contratar servicios informáticos de manera eficiente. El sistema está estructurado para dos tipos de usuarios: clientes que buscan soluciones informáticas y profesionales que ofrecen sus servicios, cada uno con funcionalidades específicas adaptadas a sus necesidades particulares.

Este proyecto representa una significativa evolución respecto a mi trabajo anterior, demostrando una notable progresión en mis habilidades de desarrollo. La comparación entre ambas versiones evidencia mejoras sustanciales tanto en diseño como en arquitectura y funcionalidades.

Funcionalidades principales:
• Autenticación y registro seguro de usuarios
• Gestión completa de perfiles profesionales y personales
• Sistema avanzado de búsqueda de profesionales por especialidad
• Visualización detallada de perfiles con información relevante
• Gestión integral del ciclo de solicitudes de servicio
• Mensajería instantánea entre clientes y profesionales
• Sistema de valoración para profesionales
• Trabajos valorados para profesionales

El desarrollo de "Servicios Informáticos" ha consolidado mis conocimientos en desarrollo web empresarial con C# y el ecosistema ASP.NET, resultando en una plataforma robusta que facilita efectivamente la interacción entre clientes y profesionales del sector informático.`,
      imagen: 'assets/images/abstract2.jpg',
      galeria: [
        'assets/images/daw1.jpg',
        'assets/images/daw2.jpg',
        'assets/images/daw3.jpg',
        'assets/images/daw4.jpg',
        'assets/images/daw5.jpg',
        'assets/images/daw6.jpg',
        'assets/images/daw7.jpg',
        'assets/images/daw8.jpg',
        'assets/images/daw9.jpg',
        'assets/images/daw10.jpg',
        'assets/images/daw11.jpg',
        'assets/images/daw12.jpg',
        'assets/images/daw13.jpg'
      ],
      tecnologias: ['.NET', 'Entity Framework', 'C#', 'JavaScript', 'Ajax', 'jQuery', 'SQL Server'],
      rating: 9,
      fechaInicio: '2024-03-01',
      fechaFin: '2024-06-01',
      estado: 'Completado',
      urlCodigo: 'https://github.com/marsett/ServiciosInformaticos2.0',
      duracion: '4 meses',
      tieneCodigoDisponible: false
    },
    {
      id: 5,
      titulo: 'Servicios Informáticos 1.0',
      descripcion: `Esta es la primera versión de mi idea de proyecto, realizado en 2023 como TFG para mi CFGS DAM. La aplicación está desarrollada con Android Studio (con Java), implementando consultas SQL para interactuar con la base de datos SQLite, la cual se genera de manera independiente en cada dispositivo.

También se establece comunicación con Firebase para realizar operaciones en tiempo real. El objetivo principal de este proyecto es establecer una relación de beneficio mutuo entre los clientes y los profesionales, donde los clientes obtengan resultados satisfactorios al recibir los servicios de los profesionales, y estos últimos puedan promocionarse y establecerse para futuros trabajos o emprendimientos.

Funcionalidades principales:
• Inicio de sesión y creación de cuentas
• Edición de perfiles personalizados
• Creación y gestión de anuncios de servicios
• Búsqueda avanzada de profesionales
• Sistema de notificaciones
• Mensajería instantánea entre usuarios`,
      imagen: 'assets/images/abstract1.jpg',
      galeria: [
        'assets/images/dam1.jpg',
        'assets/images/dam2.jpg',
        'assets/images/dam3.jpg',
        'assets/images/dam4.jpg',
        'assets/images/dam5.jpg',
        'assets/images/dam6.jpg',
        'assets/images/dam7.jpg',
        'assets/images/dam8.jpg'
      ],
      tecnologias: ['Android Studio', 'Java', 'Programación orientada a objetos (POO)', 'SQLite', 'Firebase'],
      rating: 9,
      fechaInicio: '2023-03-01',
      fechaFin: '2023-06-01',
      estado: 'Completado',
      urlCodigo: 'https://github.com/marsett/ServiciosInformaticos1.0',
      duracion: '4 meses',
      tieneCodigoDisponible: false
    }
  ];

  ngOnInit() {
    this.initializeAnimations();
    // Inicializar índices de imágenes para todos los proyectos
    this.proyectos.forEach(proyecto => {
      this.projectImageIndices.set(proyecto.id, 0);
    });
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
  }

  // Método para verificar si está en modo claro
  isLightMode(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return document.body.classList.contains('light-mode');
    }
    return false;
  }

  private getCachedTranslation(key: string): string {
    if (!this.translationCache.has(key)) {
      this.translationCache.set(key, this.translateService.instant(key));
    }
    return this.translationCache.get(key) || '';
  }

  initializeAnimations() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const tiles = document.querySelectorAll('.mosaic-tile');
        tiles.forEach((tile, index) => {
          setTimeout(() => {
            tile.classList.add('animate-in');
          }, index * 100);
        });
      }, 500);
    }
  }

  toggleProject(projectId: number, event: Event) {
    event.stopPropagation();

    if (this.isAnimating) return;

    if (this.expandedProject === projectId) {
      this.collapseProject();
    } else {
      this.expandProject(projectId);
    }
  }

  expandProject(projectId: number) {
    this.isAnimating = true;
    this.expandedProject = projectId;
    
    // Resetear índice de imagen al expandir
    this.projectImageIndices.set(projectId, 0);
    
    this.cdr.markForCheck();

    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }

  collapseProject() {
    this.isAnimating = true;
    this.expandedProject = null;
    
    this.cdr.markForCheck();

    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }

  verCodigo(proyecto: Proyecto, event: Event) {
    event.stopPropagation();

    const button = event.target as HTMLElement;
    button.classList.add('clicked');

    setTimeout(() => {
      window.open(proyecto.urlCodigo, '_blank');
      button.classList.remove('clicked');
    }, 300);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short'
    });
  }

  getStatusColor(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'completado': return '#00ff80';
      case 'en desarrollo': return '#ff8c00';
      case 'pausado': return '#ff0080';
      default: return '#888';
    }
  }

  // Métodos para manejar la galería por proyecto
  nextImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.expandedProject !== null) {
      const proyecto = this.proyectos.find(p => p.id === this.expandedProject);
      if (proyecto && proyecto.galeria && proyecto.galeria.length > 0) {
        const currentIndex = this.projectImageIndices.get(this.expandedProject) || 0;
        const newIndex = (currentIndex + 1) % proyecto.galeria.length;
        this.projectImageIndices.set(this.expandedProject, newIndex);
        this.cdr.markForCheck();
      }
    }
  }

  prevImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.expandedProject !== null) {
      const proyecto = this.proyectos.find(p => p.id === this.expandedProject);
      if (proyecto && proyecto.galeria && proyecto.galeria.length > 0) {
        const currentIndex = this.projectImageIndices.get(this.expandedProject) || 0;
        const newIndex = currentIndex === 0 ? proyecto.galeria.length - 1 : currentIndex - 1;
        this.projectImageIndices.set(this.expandedProject, newIndex);
        this.cdr.markForCheck();
      }
    }
  }

  selectImageForProject(projectId: number, index: number, event: Event) {
    event.stopPropagation();
    this.projectImageIndices.set(projectId, index);
    this.cdr.markForCheck();
  }

  getImageIndexForProject(projectId: number): number {
    return this.projectImageIndices.get(projectId) || 0;
  }

  getCurrentImageForProject(projectId: number): string {
    const proyecto = this.proyectos.find(p => p.id === projectId);
    if (!proyecto || !proyecto.galeria || proyecto.galeria.length === 0) {
      return '';
    }
    const index = this.projectImageIndices.get(projectId) || 0;
    return proyecto.galeria[index];
  }

  getCurrentImageAlt(projectId: number): string {
    const proyecto = this.proyectos.find(p => p.id === projectId);
    if (!proyecto) {
      return '';
    }
    const index = this.projectImageIndices.get(projectId) || 0;
    const imageOf = this.getCachedTranslation('PROJECTS.IMAGE_OF');
    return `${imageOf} ${index + 1} ${this.getTranslatedTitle(projectId)}`;
  }

  formatDescription(description: string): string {
    return description.replace(/\\n/g, '\n').replace(/\n/g, '<br>');
  }

  getTranslatedStatus(estado: string): string {
    const cacheKey = `status_${estado.toLowerCase()}`;
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey) || estado;
    }

    let translation: string;
    switch (estado.toLowerCase()) {
      case 'completado':
        translation = this.getCachedTranslation('PROJECTS.COMPLETED');
        break;
      case 'en desarrollo':
        translation = this.getCachedTranslation('PROJECTS.IN_DEVELOPMENT');
        break;
      case 'pausado':
        translation = this.getCachedTranslation('PROJECTS.PAUSED');
        break;
      default:
        translation = estado;
    }
    
    this.translationCache.set(cacheKey, translation);
    return translation;
  }

  getTranslatedDuration(duracion: string): string {
    const cacheKey = `duration_${duracion}`;
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey) || duracion;
    }

    const match = duracion.match(/(\d+)\s*(mes|meses|año|años)/i);
    let result: string;
    
    if (match) {
      const number = match[1];
      const unit = match[2].toLowerCase();

      let translatedUnit = '';
      if (unit.includes('mes')) {
        translatedUnit = this.getCachedTranslation('PROJECTS.MONTHS');
      } else if (unit.includes('año')) {
        translatedUnit = this.getCachedTranslation('PROJECTS.YEARS');
      }

      result = `${number} ${translatedUnit}`;
    } else {
      result = duracion;
    }

    this.translationCache.set(cacheKey, result);
    return result;
  }

  getTranslatedTitle(projectId: number): string {
    const cacheKey = `title_${projectId}`;
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey) || '';
    }

    let translation: string;
    switch (projectId) {
      case 1:
        translation = this.getCachedTranslation('PROJECTS.TITLES.CAUSALITY360');
        break;
      case 2:
        translation = this.getCachedTranslation('PROJECTS.TITLES.ZUVO_PET');
        break;
      case 3:
        translation = this.getCachedTranslation('PROJECTS.TITLES.CHARLAS_TAJAMAR');
        break;
      case 4:
        translation = this.getCachedTranslation('PROJECTS.TITLES.SERVICIOS_INFORMATICOS_2');
        break;
      case 5:
        translation = this.getCachedTranslation('PROJECTS.TITLES.SERVICIOS_INFORMATICOS_1');
        break;
      default:
        translation = '';
    }
    
    this.translationCache.set(cacheKey, translation);
    return translation;
  }

  getTranslatedDescription(projectId: number): string {
    const cacheKey = `description_${projectId}`;
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey) || '';
    }

    let translation: string;
    switch (projectId) {
      case 1:
        translation = this.getCachedTranslation('PROJECTS.DESCRIPTIONS.CAUSALITY360');
        break;
      case 2:
        translation = this.getCachedTranslation('PROJECTS.DESCRIPTIONS.ZUVO_PET');
        break;
      case 3:
        translation = this.getCachedTranslation('PROJECTS.DESCRIPTIONS.CHARLAS_TAJAMAR');
        break;
      case 4:
        translation = this.getCachedTranslation('PROJECTS.DESCRIPTIONS.SERVICIOS_INFORMATICOS_2');
        break;
      case 5:
        translation = this.getCachedTranslation('PROJECTS.DESCRIPTIONS.SERVICIOS_INFORMATICOS_1');
        break;
      default:
        translation = '';
    }
    
    this.translationCache.set(cacheKey, translation);
    return translation;
  }

  getTranslatedTechnology(technology: string): string {
    const cacheKey = `tech_${technology}`;
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey) || technology;
    }

    let translation: string;
    switch (technology) {
      case 'Programación orientada a objetos (POO)':
        translation = this.getCachedTranslation('PROJECTS.POO.OBJECT_ORIENTED_PROGRAMMING');
        break;
      default:
        translation = technology;
    }
    
    this.translationCache.set(cacheKey, translation);
    return translation;
  }
}