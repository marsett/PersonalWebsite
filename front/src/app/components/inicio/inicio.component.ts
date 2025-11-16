import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { LanguageService } from '../../services/language.service';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

interface Activity {
  icon: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  standalone: false,
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  isBrowser: boolean;
  currentLanguage = 'es';
  private languageSubscription?: Subscription;
  private timeSubscription?: Subscription;

  isAvailable = false; // Cambiado de true a false
  currentTime = '';

  // Quick Stats
  yearsOfExperience = this.calculateYearsOfExperience();
  totalProjects = 5;
  responseTime = '< 24h';

  // Activity Feed
  recentActivities: Activity[] = [];

  // Notifications
  showNotification = false;
  notificationType: 'success' | 'error' = 'success';
  notificationMessage = '';
  notificationIcon = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private languageService: LanguageService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Suscribirse a cambios de idioma
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
      }
    );

    // Obtener idioma actual
    this.currentLanguage = this.languageService.getCurrentLanguage();

    if (this.isBrowser) {
      this.initParticleInterval();
      this.initGlitchEffect();
      this.initTimeUpdate();
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  // Calcular años de experiencia
  // Calcular años de experiencia desde que empezaste a aprender a programar
  private calculateYearsOfExperience(): number {
    const startDate = new Date('2021-09-15'); // Fecha cuando empezaste a aprender
    const currentDate = new Date();

    // Calcular la diferencia en años con decimales
    const yearsDifference = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    // Redondear a 1 decimal para mayor precisión
    return Math.round(yearsDifference * 10) / 10;
  }

  // Actualizar tiempo cada segundo
  private initTimeUpdate(): void {
    this.timeSubscription = interval(1000).subscribe(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    });
  }

  // Descargar CV según idioma
  downloadCV(): void {
    if (this.isBrowser) {
      const link = document.createElement('a');

      // Determinar el archivo y nombre según el idioma
      if (this.currentLanguage === 'en') {
        link.href = 'assets/cv/CV_Mario_Jimenez_Marset_EN.pdf';
        link.download = 'CV_Mario_Jimenez_Marset_EN.pdf';
      } else {
        // Por defecto español
        link.href = 'assets/cv/CV_Mario_Jimenez_Marset_ES.pdf';
        link.download = 'CV_Mario_Jimenez_Marset_ES.pdf';
      }

      link.click();
    }
  }

  // Generación de partículas
  private createParticle(): void {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 3000);
  }

  // Intervalo para generar partículas
  private initParticleInterval(): void {
    setInterval(() => this.createParticle(), 500);
  }

  // Efecto al hacer clic en el avatar
  triggerAvatarEffect(): void {
    const avatar = document.querySelector('.avatar-main') as HTMLElement;
    if (!avatar) return;

    avatar.style.transform = 'translate(-50%, -50%) scale(1.2) rotate(360deg)';

    for (let i = 0; i < 10; i++) {
      setTimeout(() => this.createParticle(), i * 100);
    }

    setTimeout(() => {
      avatar.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 500);
  }

  // Seguimiento del mouse para blobs
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const blobs = document.querySelectorAll('.blob');
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.1;
      const xOffset = (x - 0.5) * speed * 100;
      const yOffset = (y - 0.5) * speed * 100;
      (blob as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  }

  // Reinicio del efecto glitch
  private initGlitchEffect(): void {
    const glitchText = document.querySelector('.glitch-text') as HTMLElement;
    if (!glitchText) return;

    setInterval(() => {
      glitchText.style.animation = 'none';
      setTimeout(() => {
        glitchText.style.animation = '';
      }, 100);
    }, 3000);
  }
}