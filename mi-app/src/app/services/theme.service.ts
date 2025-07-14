import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private isDarkMode: boolean = false;

  constructor() {
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // Usar la preferencia del sistema
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  setTheme(isDark: boolean) {
    this.isDarkMode = isDark;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme() {
    const body = document.body;
    if (this.isDarkMode) {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.isDarkMode ? 'dark' : 'light';
  }

  isDark(): boolean {
    return this.isDarkMode;
  }
}