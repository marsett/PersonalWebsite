import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-menu-navegacion',
  standalone: false,
  templateUrl: './menu-navegacion.component.html',
  styleUrl: './menu-navegacion.component.css'
})
export class MenuNavegacionComponent implements OnInit {
  
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
    // Ya no necesitamos configurar el scroll listener
  }

  scrollToSection(sectionId: string) {
    const element = document.querySelector(`app-${sectionId}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}