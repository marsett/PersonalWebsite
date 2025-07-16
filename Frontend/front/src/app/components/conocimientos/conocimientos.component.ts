import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface Technology {
  name: string;
  logo: string;
  color: string;
  description: string; // Solo mantenemos la frase inspiradora
  category: string;
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
export class ConocimientosComponent implements AfterViewInit {
  @ViewChildren('description') descriptions!: QueryList<ElementRef>;

  selectedTechnology: Technology | null = null;
  isModalOpen = false;

  // Añadir al constructor
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) { }

  ngAfterViewInit() {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Observar cuando las tarjetas se voltean para activar la animación
      this.setupFlipCardObserver();
    }
  }

  technologies: Technology[] = [
    // FRONTEND
    {
      name: 'Angular',
      logo: 'fab fa-angular',
      color: '#DD0031',
      description: 'SKILLS.TECH_DESCRIPTIONS.ANGULAR',
      category: 'FRONTEND'
    },
    {
      name: 'React',
      logo: 'fab fa-react',
      color: '#61DAFB',
      description: 'SKILLS.TECH_DESCRIPTIONS.REACT',
      category: 'FRONTEND'
    },
    {
      name: 'Vue.js',
      logo: 'fab fa-vuejs',
      color: '#4FC08D',
      description: 'SKILLS.TECH_DESCRIPTIONS.VUE',
      category: 'FRONTEND'
    },
    {
      name: 'jQuery',
      logo: 'fab fa-js-square',
      color: '#0769AD',
      description: 'SKILLS.TECH_DESCRIPTIONS.JQUERY',
      category: 'FRONTEND'
    },
    {
      name: 'JavaScript',
      logo: 'fab fa-js-square',
      color: '#F7DF1E',
      description: 'SKILLS.TECH_DESCRIPTIONS.JAVASCRIPT',
      category: 'FRONTEND'
    },
    {
      name: 'Ionic',
      logo: 'fas fa-mobile-alt',
      color: '#3880FF',
      description: 'SKILLS.TECH_DESCRIPTIONS.IONIC',
      category: 'FRONTEND'
    },

    // BACKEND
    {
      name: 'C#',
      logo: 'fas fa-code',
      color: '#239120',
      description: 'SKILLS.TECH_DESCRIPTIONS.CSHARP',
      category: 'BACKEND'
    },
    {
      name: 'Java',
      logo: 'fab fa-java',
      color: '#ED8B00',
      description: 'SKILLS.TECH_DESCRIPTIONS.JAVA',
      category: 'BACKEND'
    },
    {
      name: 'Python',
      logo: 'fab fa-python',
      color: '#3776AB',
      description: 'SKILLS.TECH_DESCRIPTIONS.PYTHON',
      category: 'BACKEND'
    },
    {
      name: '.NET',
      logo: 'fas fa-circle',
      color: '#512BD4',
      description: 'SKILLS.TECH_DESCRIPTIONS.DOTNET',
      category: 'BACKEND'
    },
    {
      name: 'SQL',
      logo: 'fas fa-database',
      color: '#CC2927',
      description: 'SKILLS.TECH_DESCRIPTIONS.SQL',
      category: 'BACKEND'
    },
    {
      name: 'Django',
      logo: 'fab fa-python',
      color: '#092E20',
      description: 'SKILLS.TECH_DESCRIPTIONS.DJANGO',
      category: 'BACKEND'
    },

    // CLOUD
    {
      name: 'Azure',
      logo: 'fab fa-microsoft',
      color: '#0078D4',
      description: 'SKILLS.TECH_DESCRIPTIONS.AZURE',
      category: 'CLOUD'
    },
    {
      name: 'Power Platform',
      logo: 'fas fa-bolt',
      color: '#742774',
      description: 'SKILLS.TECH_DESCRIPTIONS.POWER_PLATFORM',
      category: 'HERRAMIENTAS'
    },
    {
      name: 'AWS',
      logo: 'fab fa-aws',
      color: '#FF9900',
      description: 'SKILLS.TECH_DESCRIPTIONS.AWS',
      category: 'CLOUD'
    },
    {
      name: 'IA',
      logo: 'fas fa-brain',
      color: '#00BCF2',
      description: 'SKILLS.TECH_DESCRIPTIONS.AI',
      category: 'HERRAMIENTAS'
    }
  ];

  certifications: Certification[] = [
    {
      name: 'AZ-204',
      provider: 'Azure Developer Associate',
      image: 'assets/images/azure-developer-associate.png',
      link: 'https://learn.microsoft.com/es-es/users/mariojimenezmarset-5547/credentials/c0a404bd8891e1b1?ref=https%3A%2F%2Fgithub.com%2F',
      category: 'CLOUD'
    },
    {
      name: 'PL-400',
      provider: 'Power Platform Developer Associate',
      image: 'assets/images/power-platform-developer.png',
      link: 'https://learn.microsoft.com/es-es/users/mariojimenezmarset-5547/credentials/49fe011e61bf1ec8?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      category: 'CLOUD'
    },
    {
      name: 'DVA-C02',
      provider: 'AWS Certified Developer Associate',
      image: 'assets/images/aws-certified-developer-associate-dva-c02.png',
      link: 'https://www.credly.com/badges/07057379-d3cc-44a1-abf4-7055b8eb8a54',
      category: 'CLOUD'
    },
    {
      name: 'AI-102',
      provider: 'Azure AI Engineer Associate',
      image: 'assets/images/ai-engineer-associate.png',
      link: 'https://learn.microsoft.com/api/credentials/share/es-es/MarioJimenezMarset-5547/9F6B4692A8B7C08A?sharingId=1C9169A92F4DA389',
      category: 'CLOUD'
    }
  ];

  // Método para obtener tecnologías por categoría
  getTechnologiesByCategory(category: string): Technology[] {
    return this.technologies.filter(tech => tech.category === category);
  }

  private setupFlipCardObserver() {
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const description = card.querySelector('.tech-description') as HTMLElement;
        if (description && !description.classList.contains('animated')) {
          this.animateText(description);
        }
      });
    });
  }

  // MODIFICAR - Actualizar el método animateText
  private animateText(element: HTMLElement) {
    const text = element.textContent || '';
    element.textContent = '';
    element.classList.add('animated');
    element.classList.add('typing'); // Añadir clase para mostrar cursor

    let index = 0;
    const speed = 30; // Velocidad de escritura en ms

    const typeWriter = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      } else {
        // AÑADIR - Cuando termine la animación, quitar el cursor
        element.classList.remove('typing');
      }
    };

    // Pequeño retraso antes de empezar la animación
    setTimeout(typeWriter, 200);
  }
}