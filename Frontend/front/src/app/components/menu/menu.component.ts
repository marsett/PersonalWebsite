import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  currentLanguage = 'es';
  private languageSubscription?: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Suscribirse a cambios de idioma
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
      }
    );

    // Obtener idioma actual
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}