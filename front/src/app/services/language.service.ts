import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('es');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Configurar idiomas disponibles
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    
    // Cargar idioma guardado al inicializar el servicio
    this.loadSavedLanguage();
  }

  private loadSavedLanguage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
          this.setLanguage(savedLanguage);
        } else {
          this.setLanguage('es');
        }
      } catch (error) {
        this.setLanguage('es');
      }
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguageSubject.next(lang);
    
    // Guardar en localStorage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('language', lang);
      } catch (error) {
        console.warn('No se pudo guardar el idioma en localStorage');
      }
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getAvailableLanguages(): string[] {
    return ['es', 'en'];
  }
}