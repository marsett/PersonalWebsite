import { Component } from '@angular/core';

interface Technology {
  name: string;
  logo: string;
  level: string;
  projects: string[];
  color: string;
}

@Component({
  selector: 'app-conocimientos',
  standalone: false,
  templateUrl: './conocimientos.component.html',
  styleUrl: './conocimientos.component.css'
})
export class ConocimientosComponent {

  technologies: Technology[] = [
    {
      name: 'HTML5',
      logo: 'fab fa-html5',
      level: 'Avanzado',
      projects: ['Portfolio Personal', 'Web Corporativa', 'Landing Pages'],
      color: '#E34F26'
    },
    {
      name: 'CSS3',
      logo: 'fab fa-css3-alt',
      level: 'Avanzado',
      projects: ['Diseño Responsivo', 'Animaciones CSS', 'Grid & Flexbox'],
      color: '#1572B6'
    },
    {
      name: 'JavaScript',
      logo: 'fab fa-js-square',
      level: 'Avanzado',
      projects: ['Apps Interactivas', 'APIs REST', 'Vanilla JS Projects'],
      color: '#F7DF1E'
    },
    {
      name: 'TypeScript',
      logo: 'fab fa-js-square',
      level: 'Intermedio',
      projects: ['Angular Apps', 'Type Safety', 'Interfaces'],
      color: '#3178C6'
    },
    {
      name: 'Angular',
      logo: 'fab fa-angular',
      level: 'Avanzado',
      projects: ['SPA Applications', 'Component Architecture', 'Services'],
      color: '#DD0031'
    },
    {
      name: 'Node.js',
      logo: 'fab fa-node-js',
      level: 'Intermedio',
      projects: ['REST APIs', 'Express Server', 'Database Integration'],
      color: '#339933'
    },
    {
      name: 'React',
      logo: 'fab fa-react',
      level: 'Intermedio',
      projects: ['Component Libraries', 'State Management', 'Hooks'],
      color: '#61DAFB'
    },
    {
      name: 'Python',
      logo: 'fab fa-python',
      level: 'Intermedio',
      projects: ['Data Analysis', 'Web Scraping', 'Automation'],
      color: '#3776AB'
    },
    {
      name: 'Git',
      logo: 'fab fa-git-alt',
      level: 'Avanzado',
      projects: ['Version Control', 'Branching', 'Collaboration'],
      color: '#F05032'
    }
  ];

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