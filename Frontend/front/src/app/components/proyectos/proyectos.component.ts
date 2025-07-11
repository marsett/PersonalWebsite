import { Component, OnInit } from '@angular/core';

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias: string[];
  rating: number;
  fecha: string;
  estado: string;
  urlProyecto: string;
  urlCodigo: string;
}

@Component({
  selector: 'app-proyectos',
  standalone: false,
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit {
  
  proyectos: Proyecto[] = [
    {
      id: 1,
      titulo: 'E-Commerce Futurista',
      descripcion: 'Plataforma de comercio electrónico con IA integrada y experiencia de usuario inmersiva.',
      imagen: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      tecnologias: ['Angular', 'Node.js', 'MongoDB', 'AI'],
      rating: 4.9,
      fecha: '2024',
      estado: 'Activo',
      urlProyecto: 'https://example.com/ecommerce',
      urlCodigo: 'https://github.com/tu-usuario/ecommerce'
    },
    {
      id: 2,
      titulo: 'Dashboard Analytics',
      descripcion: 'Dashboard interactivo con visualizaciones de datos en tiempo real y métricas avanzadas.',
      imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      tecnologias: ['React', 'D3.js', 'Python', 'AWS'],
      rating: 4.8,
      fecha: '2024',
      estado: 'Activo',
      urlProyecto: 'https://example.com/dashboard',
      urlCodigo: 'https://github.com/tu-usuario/dashboard'
    },
    {
      id: 3,
      titulo: 'App Móvil Social',
      descripcion: 'Red social móvil con funciones de AR y comunicación en tiempo real.',
      imagen: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      tecnologias: ['React Native', 'Firebase', 'AR', 'WebRTC'],
      rating: 4.7,
      fecha: '2023',
      estado: 'Beta',
      urlProyecto: 'https://example.com/social-app',
      urlCodigo: 'https://github.com/tu-usuario/social-app'
    },
    {
      id: 4,
      titulo: 'Sistema de Gestión',
      descripcion: 'ERP completo con módulos de inventario, ventas y recursos humanos.',
      imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      tecnologias: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
      rating: 4.6,
      fecha: '2023',
      estado: 'Mantenimiento',
      urlProyecto: 'https://example.com/erp',
      urlCodigo: 'https://github.com/tu-usuario/erp'
    },
    {
      id: 5,
      titulo: 'Plataforma EdTech',
      descripcion: 'Plataforma educativa con gamificación y seguimiento de progreso personalizado.',
      imagen: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop',
      tecnologias: ['Next.js', 'GraphQL', 'PostgreSQL', 'Redis'],
      rating: 4.9,
      fecha: '2024',
      estado: 'Desarrollo',
      urlProyecto: 'https://example.com/edtech',
      urlCodigo: 'https://github.com/tu-usuario/edtech'
    },
    {
      id: 6,
      titulo: 'IoT Monitoring',
      descripcion: 'Sistema de monitoreo IoT para smart cities con análisis predictivo.',
      imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      tecnologias: ['Angular', 'Node.js', 'InfluxDB', 'MQTT'],
      rating: 4.8,
      fecha: '2024',
      estado: 'Piloto',
      urlProyecto: 'https://example.com/iot',
      urlCodigo: 'https://github.com/tu-usuario/iot'
    }
  ];

  ngOnInit() {
    this.initializeAnimations();
  }

  initializeAnimations() {
    // Animaciones de entrada escalonadas
    setTimeout(() => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-in');
        }, index * 150);
      });
    }, 500);
  }

  onCardHover(index: number) {
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card) {
      card.classList.add('hovered');
      
      // Efecto de las tarjetas adyacentes
      const allCards = document.querySelectorAll('.project-card');
      allCards.forEach((c, i) => {
        if (i !== index) {
          c.classList.add('dimmed');
        }
      });
    }
  }

  onCardLeave(index: number) {
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card) {
      card.classList.remove('hovered');
      
      // Remover efecto de las tarjetas adyacentes
      const allCards = document.querySelectorAll('.project-card');
      allCards.forEach((c) => {
        c.classList.remove('dimmed');
      });
    }
  }

  verProyecto(proyecto: Proyecto) {
    // Animación de salida
    const button = event?.target as HTMLElement;
    button.classList.add('clicked');
    
    setTimeout(() => {
      window.open(proyecto.urlProyecto, '_blank');
    }, 300);
  }

  verCodigo(proyecto: Proyecto) {
    // Animación de salida
    const button = event?.target as HTMLElement;
    button.classList.add('clicked');
    
    setTimeout(() => {
      window.open(proyecto.urlCodigo, '_blank');
    }, 300);
  }

  scrollToContact() {
    // Implementar scroll suave a la sección de contacto
    const contactSection = document.querySelector('#contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}