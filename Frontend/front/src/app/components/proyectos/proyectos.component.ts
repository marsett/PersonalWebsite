import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// 1. Modificar la interfaz Proyecto para incluir galería de imágenes
interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  galeria: string[]; // ← AÑADIDO: Array de imágenes para la galería
  tecnologias: string[];
  rating: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  urlProyecto: string;
  urlCodigo: string;
  duracion: string;
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

  // ← AÑADIDO: Propiedades para controlar la galería
  selectedImageIndex: number = 0;
  isGalleryOpen: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // 3. Actualizar el array de proyectos con imágenes de galería
  proyectos: Proyecto[] = [
    {
      id: 1,
      titulo: 'E-Commerce Futurista',
      descripcion: 'Plataforma de comercio electrónico con IA integrada y experiencia de usuario inmersiva. Incluye recomendaciones personalizadas, procesamiento de pagos avanzado y análisis de comportamiento del usuario.',
      imagen: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      galeria: [ // ← AÑADIDO: Galería de imágenes
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742208-999815fca738?w=800&h=600&fit=crop'
      ],
      tecnologias: ['Angular', 'Node.js', 'MongoDB', 'AI', 'TypeScript'],
      rating: 4.9,
      fechaInicio: '2024-01-15',
      fechaFin: '2024-06-30',
      estado: 'Completado',
      urlProyecto: 'https://example.com/ecommerce',
      urlCodigo: 'https://github.com/tu-usuario/ecommerce',
      duracion: '5 meses'
    },
    {
      id: 2,
      titulo: 'Gestión de Charlas Tajamar',
      descripcion: 'Este proyecto de desarrollo web frontend fue creado colaborativamente por tres compañeras de mi máster y yo, siendo reconocido como el mejor trabajo y seleccionado para su implementación en producción.\n\nLa aplicación está actualmente desplegada en Azure y accesible en: https://charlasalumnostajamar.azurewebsites.net \nDesarrollamos la solución utilizando VS Code y aplicando metodologías de trabajo en equipo mediante gestión de ramas en GitHub, lo que nos permitió coordinar eficazmente el desarrollo. Implementamos tecnologías frontend modernas como Vue.js, HTML5 y Bootstrap, complementadas con librerías especializadas como ChartJS para visualización de datos y FullCalendar para la gestión de eventos temporales.\n\nEl objetivo principal del proyecto fue optimizar la gestión de charlas impartidas por alumnos, proporcionando una plataforma intuitiva que mejora significativamente el proceso de programación, organización y seguimiento de estas actividades formativas. La implementación exitosa demuestra nuestra capacidad para entregar soluciones funcionales que resuelven necesidades reales del entorno educativo.\n\nEsta experiencia no solo reforzó mis conocimientos técnicos, sino también mis habilidades de colaboración en proyectos de desarrollo ágil y orientados a resultados tangibles.',
      imagen: 'assets/images/charlas0.jpg',
      galeria: [ // ← AÑADIDO: Galería de imágenes
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
      ],
      tecnologias: ['Vue', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
      rating: 10,
      fechaInicio: '2024-11-01',
      fechaFin: '2025-02-1',
      estado: 'Completado',
      urlProyecto: 'https://charlasalumnostajamar.azurewebsites.net',
      urlCodigo: 'https://github.com/marsett/GestionCharlas',
      duracion: '4 meses'
    },
    {
      id: 3,
      titulo: 'Servicios Informáticos 2.0',
      descripcion: 'Esta es la segunda versión de mi idea de proyecto, realizado en 2024 como TFG para mi CFGS DAW. La aplicación está desarrollada con ASP .NET Core utilizando C#, implementando el patrón de diseño MVC y Entity Framework. Complementariamente, se han aplicado tecnologías frontend como HTML, CSS, Bootstrap, JavaScript, jQuery y AJAX para crear una experiencia de usuario dinámica y responsive.\n\nLa aplicación, denominada "Servicios Informáticos", proporciona una plataforma integral donde los usuarios pueden localizar y contratar servicios informáticos de manera eficiente. \nEl sistema está estructurado para dos tipos de usuarios: clientes que buscan soluciones informáticas y profesionales que ofrecen sus servicios, cada uno con funcionalidades específicas adaptadas a sus necesidades particulares.\n\nEste proyecto representa una significativa evolución respecto a mi trabajo anterior, demostrando una notable progresión en mis habilidades de desarrollo. La comparación entre ambas versiones evidencia mejoras sustanciales tanto en diseño como en arquitectura y funcionalidades.\n\nFuncionalidades principales:\n- Autenticación y registro seguro de usuarios\n- Gestión completa de perfiles profesionales y personales\n- Sistema avanzado de búsqueda de profesionales por especialidad\n- Visualización detallada de perfiles con información relevante\n- Gestión integral del ciclo de solicitudes de servicio\n- Mensajería instantánea entre clientes y profesionales\n- Sistema de valoración para profesionales\n- Trabajos valorados para profesionales\n\nEl desarrollo de "Servicios Informáticos" ha consolidado mis conocimientos en desarrollo web empresarial con C# y el ecosistema ASP.NET, resultando en una plataforma robusta que facilita efectivamente la interacción entre clientes y profesionales del sector informático.',
      imagen: 'assets/images/daw0.jpg',
      galeria: [ // ← AÑADIDO: Galería de imágenes
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=600&fit=crop'
      ],
      tecnologias: ['.NET', 'Entity Framework', 'C#', 'JavaScript', 'Ajax', 'jQuery', 'SQL Server'],
      rating: 9,
      fechaInicio: '2024-03-01',
      fechaFin: '2024-06-01',
      estado: 'Completado',
      urlProyecto: 'https://example.com/fitness',
      urlCodigo: 'https://github.com/tu-usuario/fitness',
      duracion: '4 meses'
    },
    {
      id: 4,
      titulo: 'Servicios Informáticos 1.0',
      descripcion: 'Esta es la primera versión de mi idea de proyecto, realizado en 2023 como TFG para mi CFGS DAM. La aplicación está desarrollada con Android Studio (con Java), implementando consultas SQL para interactuar con la base de datos SQLite, la cual se genera de manera independiente en cada dispositivo.\n\nTambién se establece comunicación con Firebase para realizar operaciones en tiempo real.\nEl objetivo principal de este proyecto es establecer una relación de beneficio mutuo entre los clientes y los profesionales, donde los clientes obtengan resultados satisfactorios al recibir los servicios de los profesionales, y estos últimos puedan promocionarse y establecerse para futuros trabajos o emprendimientos.\n\nFuncionalidades principales:\n- Inicio de sesión y creación de cuentas\n- Edición de perfiles personalizados\n- Creación y gestión de anuncios de servicios\n- Búsqueda avanzada de profesionales\n- Sistema de notificaciones\n- Mensajería instantánea entre usuarios',
      imagen: 'assets/images/dam9.jpg',
      galeria: [ // ← AÑADIDO: Galería de imágenes
        'assets/images/dam1.jpg',
        'assets/images/dam2.jpg',
        'assets/images/dam3.jpg',
        'assets/images/dam4.jpg',
        'assets/images/dam5.jpg',
        'assets/images/dam6.jpg',
        'assets/images/dam7.jpg',
        'assets/images/dam8.jpg',
      ],
      tecnologias: ['Android Studio', 'Java', 'Programación orientada a objetos (POO)', 'SQLite', 'Firebase'],
      rating: 9,
      fechaInicio: '2023-03-01',
      fechaFin: '2023-06-01',
      estado: 'Completado',
      urlProyecto: 'https://example.com/gestion',
      urlCodigo: 'https://github.com/tu-usuario/gestion',
      duracion: '4 meses'
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
    this.selectedImageIndex = 0; // ← AÑADIDO: Resetear índice

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  // 6. MODIFICAR: Cerrar galería al colapsar proyecto
  collapseProject() {
    this.isAnimating = true;
    this.expandedProject = null;
    this.isGalleryOpen = false; // ← AÑADIDO: Cerrar galería

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  // 7. AÑADIR: Listener para cerrar galería con ESC
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isGalleryOpen) {
      this.closeGallery();
    }
  }

  verProyecto(proyecto: Proyecto, event: Event) {
    event.stopPropagation();
    const button = event.target as HTMLElement;
    button.classList.add('clicked');

    setTimeout(() => {
      window.open(proyecto.urlProyecto, '_blank');
      button.classList.remove('clicked');
    }, 300);
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

  // 4. AÑADIR: Nuevos métodos para controlar la galería
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

  // Y también actualiza el método nextImage y prevImage para mayor seguridad:
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

  getCurrentImageSrc(): string {
    const currentProject = this.getCurrentProject();
    if (!currentProject || !currentProject.galeria || !currentProject.galeria[this.selectedImageIndex]) {
      return '';
    }
    return currentProject.galeria[this.selectedImageIndex];
  }

  getCurrentImageAlt(): string {
    const currentProject = this.getCurrentProject();
    if (!currentProject) {
      return '';
    }
    return `Imagen ${this.selectedImageIndex + 1} de ${currentProject.titulo}`;
  }

  // Añadir este método nuevo para los indicadores:
  selectImage(index: number, event: Event) {
    event.stopPropagation();
    this.selectedImageIndex = index;
  }
}