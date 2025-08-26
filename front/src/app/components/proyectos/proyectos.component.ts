import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

// 1. Modificar la interfaz Proyecto para incluir galería de imágenes Y propiedad de despliegue
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
  urlProyecto: string;
  urlCodigo: string;
  duracion: string;
  tieneDespliegue: boolean; // ← AÑADIDO: Para controlar si mostrar el botón de ver proyecto
  tieneCodigoDisponible: boolean; // ← AÑADIDO: Para controlar si mostrar el botón de ver código
}

@Component({
  selector: 'app-proyectos',
  standalone: false,
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit {

  expandedProject: number | null = null;
  isAnimating = false;

  // Propiedades para controlar la galería
  selectedImageIndex: number = 0;
  isGalleryOpen: boolean = false;

  // Añadir TranslateService al constructor
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translateService: TranslateService
  ) { }

  // 2. Actualizar el array de proyectos con la propiedad tieneDespliegue
  proyectos: Proyecto[] = [
    {
      id: 1,
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
      imagen: 'assets/images/zuvo0.jpg',
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
      fechaInicio: '2024-02-01',
      fechaFin: '2024-06-01',
      estado: 'Completado',
      urlProyecto: 'https://zuvopetmvcazure.azurewebsites.net',
      urlCodigo: 'https://github.com/marsett/ZuvoPetMvcAzure',
      duracion: '4 meses',
      tieneDespliegue: true, // ← AÑADIDO: Tiene despliegue activo
      tieneCodigoDisponible: true // ← AÑADIDO: Tiene código disponible
    },
    {
      id: 2,
      titulo: 'Gestión de Charlas Tajamar',
      descripcion: `Este proyecto de desarrollo web frontend fue creado colaborativamente por tres compañeras de mi máster y yo, siendo reconocido como el mejor trabajo y seleccionado para su implementación en producción. La aplicación está actualmente desplegada en Azure y accesible.

Desarrollamos la solución utilizando VS Code y aplicando metodologías de trabajo en equipo mediante gestión de ramas en GitHub, lo que nos permitió coordinar eficazmente el desarrollo. Implementamos tecnologías frontend modernas como Vue.js, HTML5 y Bootstrap, complementadas con librerías especializadas como ChartJS para visualización de datos y FullCalendar para la gestión de eventos temporales.

El objetivo principal del proyecto fue optimizar la gestión de charlas impartidas por alumnos, proporcionando una plataforma intuitiva que mejora significativamente el proceso de programación, organización y seguimiento de estas actividades formativas. La implementación exitosa demuestra nuestra capacidad para entregar soluciones funcionales que resuelven necesidades reales del entorno educativo.

Esta experiencia no solo reforzó mis conocimientos técnicos, sino también mis habilidades de colaboración en proyectos de desarrollo ágil y orientados a resultados tangibles.`,
      imagen: 'assets/images/charlas0.jpg',
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
      urlProyecto: 'https://charlasalumnostajamar.azurewebsites.net',
      urlCodigo: 'https://github.com/marsett/GestionCharlas',
      duracion: '4 meses',
      tieneDespliegue: true, // ← AÑADIDO: Tiene despliegue activo
      tieneCodigoDisponible: true // ← AÑADIDO: Tiene código disponible
    },
    {
      id: 3,
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
      imagen: 'assets/images/daw0.jpg',
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
      urlProyecto: '',
      urlCodigo: 'https://github.com/tu-usuario/fitness',
      duracion: '4 meses',
      tieneDespliegue: false, // ← AÑADIDO: No tiene despliegue activo
      tieneCodigoDisponible: true // ← AÑADIDO: Tiene código disponible
    },
    {
      id: 4,
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
      imagen: 'assets/images/dam9.jpg',
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
      urlProyecto: '',
      urlCodigo: 'https://github.com/tu-usuario/gestion',
      duracion: '4 meses',
      tieneDespliegue: false, // ← AÑADIDO: No tiene despliegue (es una app móvil)
      tieneCodigoDisponible: false // ← CAMBIADO: Como ejemplo, este proyecto no tiene código disponible
    },
    {
      id: 5,
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
      imagen: 'assets/images/causa1.png',
      galeria: [
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
      urlProyecto: 'https://ashy-bay-0e29e4a03.1.azurestaticapps.net',
      urlCodigo: 'https://github.com/marsett/Causality360',
      duracion: '1 mes',
      tieneDespliegue: true,
      tieneCodigoDisponible: true
    }
  ];

  ngOnInit() {
    this.initializeAnimations();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mosaic-tile') && this.expandedProject !== null) {
      this.collapseProject();
    }
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
    this.selectedImageIndex = 0;

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  collapseProject() {
    this.isAnimating = true;
    this.expandedProject = null;
    this.isGalleryOpen = false;

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isGalleryOpen) {
      this.closeGallery();
    }
  }

  // 3. MODIFICAR: Añadir validación para mostrar botón solo si tiene despliegue
  verProyecto(proyecto: Proyecto, event: Event) {
    event.stopPropagation();

    // Validar que el proyecto tenga despliegue activo
    if (!proyecto.tieneDespliegue) {
      return;
    }

    const button = event.target as HTMLElement;
    button.classList.add('clicked');

    setTimeout(() => {
      window.open(proyecto.urlProyecto, '_blank');
      button.classList.remove('clicked');
    }, 300);
  }

  verCodigo(proyecto: Proyecto, event: Event) {
    event.stopPropagation();

    // Validar que el proyecto tenga código disponible
    if (!proyecto.tieneCodigoDisponible) {
      return;
    }

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

  openGallery(index: number, event: Event) {
    event.stopPropagation();
    this.selectedImageIndex = index;
    this.isGalleryOpen = true;
  }

  closeGallery(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isGalleryOpen = false;
  }

  nextImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const currentProject = this.getCurrentProject();
    if (currentProject && currentProject.galeria && currentProject.galeria.length > 0) {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % currentProject.galeria.length;
    }
  }

  prevImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const currentProject = this.getCurrentProject();
    if (currentProject && currentProject.galeria && currentProject.galeria.length > 0) {
      this.selectedImageIndex = this.selectedImageIndex === 0
        ? currentProject.galeria.length - 1
        : this.selectedImageIndex - 1;
    }
  }

  getCurrentProject(): Proyecto | undefined {
    return this.proyectos.find(p => p.id === this.expandedProject);
  }

  formatDescription(description: string): string {
    return description.replace(/\\n/g, '\n').replace(/\n/g, '<br>');
  }

  getCurrentImageSrc(): string {
    const currentProject = this.getCurrentProject();
    if (!currentProject || !currentProject.galeria || !currentProject.galeria[this.selectedImageIndex]) {
      return '';
    }
    return currentProject.galeria[this.selectedImageIndex];
  }

  // Actualizar el método getCurrentImageAlt para usar traducción
  getCurrentImageAlt(): string {
    const currentProject = this.getCurrentProject();
    if (!currentProject) {
      return '';
    }
    const imageOf = this.translateService.instant('PROJECTS.IMAGE_OF');
    return `${imageOf} ${this.selectedImageIndex + 1} ${currentProject.titulo}`;
  }

  selectImage(index: number, event: Event) {
    event.stopPropagation();
    this.selectedImageIndex = index;
  }

  // Método para traducir estados
  getTranslatedStatus(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'completado':
        return this.translateService.instant('PROJECTS.COMPLETED');
      case 'en desarrollo':
        return this.translateService.instant('PROJECTS.IN_DEVELOPMENT');
      case 'pausado':
        return this.translateService.instant('PROJECTS.PAUSED');
      default:
        return estado;
    }
  }

  // Método para traducir duraciones
  getTranslatedDuration(duracion: string): string {
    // Extraer número y unidad
    const match = duracion.match(/(\d+)\s*(mes|meses|año|años)/i);
    if (match) {
      const number = match[1];
      const unit = match[2].toLowerCase();

      let translatedUnit = '';
      if (unit.includes('mes')) {
        translatedUnit = this.translateService.instant('PROJECTS.MONTHS');
      } else if (unit.includes('año')) {
        translatedUnit = this.translateService.instant('PROJECTS.YEARS');
      }

      return `${number} ${translatedUnit}`;
    }

    return duracion;
  }

  // Método para obtener título traducido
  getTranslatedTitle(projectId: number): string {
    switch (projectId) {
      case 1:
        return this.translateService.instant('PROJECTS.TITLES.ZUVO_PET');
      case 2:
        return this.translateService.instant('PROJECTS.TITLES.CHARLAS_TAJAMAR');
      case 3:
        return this.translateService.instant('PROJECTS.TITLES.SERVICIOS_INFORMATICOS_2');
      case 4:
        return this.translateService.instant('PROJECTS.TITLES.SERVICIOS_INFORMATICOS_1');
      case 5:
        return this.translateService.instant('PROJECTS.TITLES.CAUSALITY360');
      default:
        return '';
    }
  }

  // Método para obtener descripción traducida
  getTranslatedDescription(projectId: number): string {
    switch (projectId) {
      case 1:
        return this.translateService.instant('PROJECTS.DESCRIPTIONS.ZUVO_PET');
      case 2:
        return this.translateService.instant('PROJECTS.DESCRIPTIONS.CHARLAS_TAJAMAR');
      case 3:
        return this.translateService.instant('PROJECTS.DESCRIPTIONS.SERVICIOS_INFORMATICOS_2');
      case 4:
        return this.translateService.instant('PROJECTS.DESCRIPTIONS.SERVICIOS_INFORMATICOS_1');
      case 5:
        return this.translateService.instant('PROJECTS.DESCRIPTIONS.CAUSALITY360');
      default:
        return '';
    }
  }

  // Método para obtener tecnología traducida
  getTranslatedTechnology(technology: string): string {
    switch (technology) {
      case 'Programación orientada a objetos (POO)':
        return this.translateService.instant('PROJECTS.POO.OBJECT_ORIENTED_PROGRAMMING');
      default:
        return technology;
    }
  }
}