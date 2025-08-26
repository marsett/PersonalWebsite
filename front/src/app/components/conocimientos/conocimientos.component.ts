import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
export class ConocimientosComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('description') descriptions!: QueryList<ElementRef>;

  selectedTechnology: Technology | null = null;
  isModalOpen = false;

  // AÑADIR - Suscripción para cambios de idioma
  private langChangeSubscription: Subscription;
  // AÑADIR - Mapa para trackear elementos animados
  private animatedElements: Map<HTMLElement, string> = new Map();

  // Añadir al constructor
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) {
    // AÑADIR - Suscribirse a cambios de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.resetAnimatedElements();
    });
  }

  // AÑADIR - Implementar OnDestroy
  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

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
      name: 'SQL - MySQL - Oracle',
      logo: 'fas fa-database',
      color: '#CC2927',
      description: 'SKILLS.TECH_DESCRIPTIONS.SQL',
      category: 'BASES_DE_DATOS'
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
      name: 'Git',
      logo: 'fab fa-git-alt',
      color: '#F05032',
      description: 'SKILLS.TECH_DESCRIPTIONS.GIT',
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

  // AÑADIR - Método para resetear elementos animados
  private resetAnimatedElements() {
    this.animatedElements.forEach((translationKey, element) => {
      // Limpiar el elemento
      element.textContent = '';
      element.classList.remove('animated', 'typing');

      // Obtener la traducción actual
      const translatedText = this.translate.instant(translationKey);
      element.textContent = translatedText;
    });

    // Limpiar el mapa
    this.animatedElements.clear();
  }

  private setupFlipCardObserver() {
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const description = card.querySelector('.tech-description') as HTMLElement;
        if (description && !description.classList.contains('animated')) {
          // MODIFICAR - Obtener la clave de traducción del elemento
          const translationKey = this.getTranslationKeyFromElement(description);
          if (translationKey) {
            this.animateText(description, translationKey);
          }
        }
      });
    });
  }

  // AÑADIR - Método para obtener la clave de traducción
  private getTranslationKeyFromElement(element: HTMLElement): string | null {
    // Buscar la tarjeta padre y obtener la tecnología correspondiente
    const flipCard = element.closest('.flip-card');
    if (!flipCard) return null;

    const techName = flipCard.querySelector('.tech-name')?.textContent?.trim();
    if (!techName) return null;

    // Buscar la tecnología en el array
    const tech = this.technologies.find(t =>
      t.name === techName ||
      (t.name === 'IA' && techName === this.translate.instant('SKILLS.TECH_NAMES.AI'))
    );

    return tech?.description || null;
  }

  // MODIFICAR - Actualizar el método animateText para recibir la clave de traducción
  private animateText(element: HTMLElement, translationKey: string) {
    // Guardar la referencia en el mapa
    this.animatedElements.set(element, translationKey);

    // Obtener el texto traducido actual
    const text = this.translate.instant(translationKey);
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
        // Cuando termine la animación, quitar el cursor
        element.classList.remove('typing');
      }
    };

    // Pequeño retraso antes de empezar la animación
    setTimeout(typeWriter, 200);
  }

  // MODIFICAR - Actualizar el método getGridClasses para incluir verificación de plataforma
  getGridClasses(category: string): string {
    const techCount = this.getTechnologiesByCategory(category).length;

    // Solo aplicar clases especiales en pantallas grandes Y en el navegador
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 1200) {
      if (techCount === 1) {
        return 'technologies-grid one-item';
      } else if (techCount === 2) {
        return 'technologies-grid two-items';
      }
    }

    return 'technologies-grid';
  }
}