import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

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
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
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