import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-menu-navegacion',
  standalone: false,
  templateUrl: './menu-navegacion.component.html',
  styleUrl: './menu-navegacion.component.css'
})
export class MenuNavegacionComponent implements OnInit, OnDestroy {
  
  activeSection = 'inicio';
  private scrollTimeout: any;
  private isScrolling = false;
  
  navigationItems = [
    { id: 'inicio', icon: 'fas fa-home', labelKey: 'NAV.HOME' },
    { id: 'conocimientos', icon: 'fas fa-brain', labelKey: 'NAV.SKILLS' },
    { id: 'experiencia', icon: 'fas fa-briefcase', labelKey: 'NAV.EXPERIENCE' },
    { id: 'proyectos', icon: 'fas fa-folder-open', labelKey: 'NAV.PROJECTS' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleScroll);
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
    }
  }

  private setupScrollListener() {
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }

  private handleScroll() {
    if (this.isScrolling) return;
    
    // Throttle scroll events para mejor rendimiento
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    this.scrollTimeout = setTimeout(() => {
      this.updateActiveSection();
    }, 50);
  }

  private updateActiveSection() {
    const sections = this.navigationItems.map(item => item.id);
    const scrollPosition = window.scrollY + window.innerHeight / 3; // Mejor offset dinámico
    
    let currentSection = 'inicio';
    
    for (const sectionId of sections) {
      const element = document.querySelector(`app-${sectionId}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        
        if (scrollPosition >= offsetTop) {
          currentSection = sectionId;
        }
      }
    }
    
    if (this.activeSection !== currentSection) {
      this.activeSection = currentSection;
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.querySelector(`app-${sectionId}`);
    if (element) {
      this.isScrolling = true;
      this.activeSection = sectionId; // Inmediatamente actualiza el estado activo
      
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Resetea el flag después de la animación
      setTimeout(() => {
        this.isScrolling = false;
      }, 1000);
    }
  }
}