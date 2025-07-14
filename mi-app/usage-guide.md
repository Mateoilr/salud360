# 🎨 Sistema de Temas para Ionic + Angular

## 📋 Instalación y Configuración

### 1. Archivos Necesarios
```
src/
├── app/
│   ├── services/
│   │   └── theme.service.ts
│   ├── mi-ciclo/
│   │   ├── mi-ciclo.page.html
│   │   ├── mi-ciclo.page.scss
│   │   └── mi-ciclo.page.ts
│   └── app.module.ts
└── global.scss
```

### 2. Importar en tu Módulo
```typescript
// app.module.ts
import { ThemeService } from './services/theme.service';

@NgModule({
  providers: [ThemeService]
})
export class AppModule {}
```

### 3. Inyectar en tu Componente
```typescript
// cualquier-pagina.page.ts
import { ThemeService } from '../services/theme.service';

constructor(private themeService: ThemeService) {}
```

## 🎯 Cómo Usar el Sistema de Temas

### 1. Cambiar Tema Programáticamente
```typescript
// Alternar entre claro y oscuro
this.themeService.toggleTheme();

// Establecer tema específico
this.themeService.setTheme(true);  // Oscuro
this.themeService.setTheme(false); // Claro

// Obtener tema actual
const currentTheme = this.themeService.getCurrentTheme(); // 'light' | 'dark'
const isDark = this.themeService.isDark(); // boolean
```

### 2. En el Template HTML
```html
<!-- Botón para cambiar tema -->
<ion-button (click)="toggleTheme()">
  <ion-icon name="sunny-outline" *ngIf="themeService.isDark()"></ion-icon>
  <ion-icon name="moon-outline" *ngIf="!themeService.isDark()"></ion-icon>
</ion-button>

<!-- Usar clases utilitarias -->
<div class="theme-bg theme-text">
  <p class="theme-text-secondary">Texto secundario</p>
</div>
```

### 3. Variables CSS Disponibles
```scss
// En cualquier archivo .scss
.mi-componente {
  background: var(--app-background);
  color: var(--app-text-color);
  border: 1px solid var(--app-border-color);
  
  &:hover {
    background: var(--app-hover-color);
  }
}

// Variables disponibles:
--app-background          // Fondo principal
--app-card-background     // Fondo de tarjetas
--app-text-color         // Color de texto principal
--app-text-secondary     // Color de texto secundario
--app-border-color       // Color de bordes
--app-hover-color        // Color de hover
--app-shadow             // Sombras
```

## 🔧 Personalización Avanzada

### 1. Agregar Nuevos Colores al Tema
```scss
// En global.scss
:root {
  // Tema claro
  --app-accent-color: #ff6b6b;
  --app-success-color: #51cf66;
  --app-warning-color: #ffd43b;
}

[data-theme="dark"] {
  // Tema oscuro
  --app-accent-color: #ff8787;
  --app-success-color: #69db7c;
  --app-warning-color: #ffe066;
}
```

### 2. Crear Componente de Configuración de Tema
```typescript
// theme-settings.component.ts
import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-settings',
  template: `
    <ion-item>
      <ion-label>Tema Oscuro</ion-label>
      <ion-toggle 
        [checked]="themeService.isDark()" 
        (ionChange)="onThemeChange($event)">
      </ion-toggle>
    </ion-item>
  `
})
export class ThemeSettingsComponent {
  constructor(public themeService: ThemeService) {}

  onThemeChange(event: any) {
    this.themeService.setTheme(event.detail.checked);
  }
}
```

### 3. Aplicar Temas a Nuevas Páginas
```scss
// nueva-pagina.page.scss
ion-content {
  --background: var(--app-background);
  --color: var(--app-text-color);
}

.mi-tarjeta {
  background: var(--app-card-background);
  color: var(--app-text-color);
  border: 1px solid var(--app-border-color);
  box-shadow: var(--app-shadow);
  
  .titulo {
    color: var(--app-text-color);
  }
  
  .subtitulo {
    color: var(--app-text-secondary);
  }
}
```

## 🎨 Clases Utilitarias

### Usar en HTML
```html
<!-- Fondos -->
<div class="theme-bg">Fondo principal</div>
<div class="theme-card-bg">Fondo de tarjeta</div>

<!-- Textos -->
<p class="theme-text">Texto principal</p>
<p class="theme-text-secondary">Texto secundario</p>

<!-- Bordes -->
<div class="theme-border">Con borde temático</div>

<!-- Efectos hover -->
<div class="theme-hover">Con efecto hover</div>
```

## 🔄 Funcionalidades Automáticas

### 1. Persistencia
- El tema se guarda automáticamente en `localStorage`
- Se restaura al reiniciar la aplicación

### 2. Detección del Sistema
- Detecta automáticamente la preferencia del sistema operativo
- Aplica tema oscuro si el sistema lo tiene activado

### 3. Transiciones Suaves
- Cambios de tema con animaciones CSS
- Transiciones de 0.3s para colores y fondos

## 🛠️ Extensión a Otras Páginas

### 1. Crear Nueva Página con Temas
```typescript
// nueva-pagina.page.ts
import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-nueva-pagina',
  templateUrl: './nueva-pagina.page.html',
  styleUrls: ['./nueva-pagina.page.scss']
})
export class NuevaPaginaPage {
  constructor(public themeService: ThemeService) {}
}
```

### 2. Template con Soporte de Temas
```html
<!-- nueva-pagina.page.html -->
<ion-header>
  <ion-toolbar>
    <ion-title>Nueva Página</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="themeService.toggleTheme()">
        <ion-icon name="contrast-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="content-container">
    <div class="theme-card-bg card">
      <h2 class="theme-text">Título</h2>
      <p class="theme-text-secondary">Contenido</p>
    </div>
  </div>
</ion-content>
```

### 3. Estilos con Variables de Tema
```scss
// nueva-pagina.page.scss
.content-container {
  padding: 16px;
}

.card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--app-shadow);
  margin-bottom: 16px;
  
  h2 {
    margin-top: 0;
    color: var(--app-text-color);
  }
  
  p {
    color: var(--app-text-secondary);
  }
}
```

## 🎯 Mejores Prácticas

1. **Siempre usa variables CSS** en lugar de colores hardcodeados
2. **Importa ThemeService** en componentes que necesiten cambiar temas
3. **Usa clases utilitarias** para elementos comunes
4. **Testa en ambos temas** durante el desarrollo
5. **Mantén consistencia** en el uso de variables

## 🔧 Resolución de Problemas

### Problema: Los colores no cambian
```scss
// ❌ Incorrecto
.mi-elemento {
  color: #000000;
}

// ✅ Correcto
.mi-elemento {
  color: var(--app-text-color);
}
```

### Problema: Componentes Ionic no respetan el tema
```scss
// Forzar tema en componentes específicos
ion-item {
  --background: var(--app-card-background);
  --color: var(--app-text-color);
}
```

¡Con esta configuración tendrás un sistema de temas robusto y fácil de usar en toda tu aplicación! 🚀