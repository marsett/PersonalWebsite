import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-menusociales',
  standalone: false,
  templateUrl: './menusociales.component.html',
  styleUrl: './menusociales.component.css'
})
export class MenusocialesComponent implements OnInit, OnDestroy {
  
  isDarkMode = true;
  currentLanguage = 'es';
  isLanguageMenuOpen = false;
  private languageSubscription?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // Cargar tema guardado
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
      } else {
        this.isDarkMode = true;
      }
    } catch (error) {
      this.isDarkMode = true;
    }

    // Suscribirse a cambios de idioma
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
      }
    );

    // Obtener idioma actual
    this.currentLanguage = this.languageService.getCurrentLanguage();
    
    this.applyTheme();
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    
    try {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    } catch (error) {
      // localStorage no disponible
    }
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.isLanguageMenuOpen = false;
  }

  private applyTheme() {
    try {
      if (this.isDarkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
      }
    } catch (error) {
      // document no disponible (SSR)
    }
  }
}