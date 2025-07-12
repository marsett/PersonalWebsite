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

  // Status & Time
  isAvailable = true;
  currentTime = '';
  currentTimezone = 'Madrid, Spain';
  
  // Location & Weather
  currentLocation = 'Madrid, España';
  weatherData?: WeatherData;
  
  // Quick Stats
  yearsOfExperience = this.calculateYearsOfExperience();
  totalProjects = 25;
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
        this.updateActivityFeed();
      }
    );

    // Obtener idioma actual
    this.currentLanguage = this.languageService.getCurrentLanguage();

    if (this.isBrowser) {
      this.initParticleInterval();
      this.initGlitchEffect();
      this.initTimeUpdate();
      this.initWeatherData();
      this.initActivityFeed();
      this.checkAvailabilityStatus();
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
  private calculateYearsOfExperience(): number {
    const startYear = 2020; // Ajusta según tu fecha de inicio
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
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

  // Inicializar datos del clima (simulado)
  private initWeatherData(): void {
    // En un caso real, harías una llamada a una API de clima
    this.weatherData = {
      temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
      description: this.getWeatherDescription(),
      icon: this.getWeatherIcon()
    };
  }

  private getWeatherDescription(): string {
    const descriptions = ['Soleado', 'Parcialmente nublado', 'Nublado', 'Lluvioso'];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  private getWeatherIcon(): string {
    const icons = ['☀️', '🌤️', '☁️', '🌧️'];
    return icons[Math.floor(Math.random() * icons.length)];
  }

  // Verificar estado de disponibilidad
  private checkAvailabilityStatus(): void {
    const now = new Date();
    const hour = now.getHours();
    // Disponible entre las 9:00 y 18:00
    this.isAvailable = hour >= 9 && hour <= 18;
  }

  // Inicializar feed de actividades
  private initActivityFeed(): void {
    this.updateActivityFeed();
  }

  private updateActivityFeed(): void {
    const activities: Activity[] = [
      {
        icon: 'icon-code',
        text: this.currentLanguage === 'es' ? 'Actualizó el repositorio principal' : 'Updated main repository',
        time: '2h ago'
      },
      {
        icon: 'icon-coffee',
        text: this.currentLanguage === 'es' ? 'Tomando un café ☕' : 'Having a coffee ☕',
        time: '4h ago'
      },
      {
        icon: 'icon-rocket',
        text: this.currentLanguage === 'es' ? 'Desplegó nueva función' : 'Deployed new feature',
        time: '1d ago'
      },
      {
        icon: 'icon-book',
        text: this.currentLanguage === 'es' ? 'Publicó nuevo artículo' : 'Published new article',
        time: '2d ago'
      }
    ];
    
    this.recentActivities = activities.slice(0, 3);
  }

  // Descargar CV
  downloadCV(): void {
    if (this.isBrowser) {
      const link = document.createElement('a');
      link.href = 'assets/cv/CV_Mario_Jimenez_Marset_Desarrollo.pdf';
      link.download = 'CV_Mario_Jimenez_Marset.pdf';
      link.click();
      
      this.showToast('success', 'CV descargado correctamente', 'icon-check');
    }
  }

  // Scroll a contacto
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Scroll a siguiente sección
  scrollToNext(): void {
    const nextSection = document.getElementById('about') || document.getElementById('skills');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Mostrar notificación toast
  private showToast(type: 'success' | 'error', message: string, icon: string): void {
    this.notificationType = type;
    this.notificationMessage = message;
    this.notificationIcon = icon;
    this.showNotification = true;
    
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
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
    
    this.showToast('success', '¡Hola! 👋', 'icon-wave');
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