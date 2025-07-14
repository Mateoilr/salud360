import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

interface SummaryData {
  calendario: {
    dia: number;
  };
  estadoAnimo: {
    estado: string;
    color: string;
  };
  actividad: {
    nivel: string;
    color: string;
  };
  energia: {
    nivel: string;
    color: string;
  };
  sintomas: {
    descripcion: string;
  };
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StatsPage implements OnInit {

  summaryData: SummaryData = {
    calendario: {
      dia: 11
    },
    estadoAnimo: {
      estado: 'Triste',
      color: '#6c757d'
    },
    actividad: {
      nivel: 'Bajo',
      color: '#6c757d'
    },
    energia: {
      nivel: 'Alto',
      color: '#856404'
    },
    sintomas: {
      descripcion: 'Día 11'
    }
  };

  consejos: string[] = [
    'Escucha atentamente a tu pareja, empatiza y reconoce que las hormonas pueden afectar el estado de ánimo lo cual es completamente normal'
  ];

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.loadSummaryData();
    this.themeService.getCurrentTheme()
  }

  loadSummaryData() {
    // Aquí puedes cargar los datos desde un servicio
    // Por ejemplo: this.dataService.getDailySummary()
    console.log('Cargando datos del resumen diario');
  }

  onCalendarioClick() {
    this.router.navigate(['/calendario']);
  }

  onEstadoAnimoClick() {
    this.router.navigate(['/estado-animo']);
  }

  onActividadClick() {
    this.router.navigate(['/actividad']);
  }

  onEnergiaClick() {
    this.router.navigate(['/energia']);
  }

  onSintomasClick() {
    this.router.navigate(['/sintomas']);
  }

  // Navegación de tabs
  onTabChange(tab: string) {
    switch (tab) {
      case 'inicio':
        this.router.navigate(['/inicio']);
        break;
      case 'aprende':
        this.router.navigate(['/aprende']);
        break;
      case 'comunidad':
        this.router.navigate(['/comunidad']);
        break;
      case 'perfil':
        this.router.navigate(['/perfil']);
        break;
      case 'configuracion':
        this.router.navigate(['/configuracion']);
        break;
    }
  }

  // Método para actualizar datos
  updateSummaryData(newData: Partial<SummaryData>) {
    this.summaryData = { ...this.summaryData, ...newData };
  }

  // Método para obtener el color del estado de ánimo
  getMoodColor(mood: string): string {
    const moodColors: { [key: string]: string } = {
      'Triste': '#6c757d',
      'Feliz': '#28a745',
      'Ansioso': '#ffc107',
      'Enojado': '#dc3545',
      'Neutral': '#6c757d'
    };
    return moodColors[mood] || '#6c757d';
  }

  // Método para obtener el color del nivel de actividad
  getActivityColor(level: string): string {
    const activityColors: { [key: string]: string } = {
      'Bajo': '#6c757d',
      'Medio': '#ffc107',
      'Alto': '#28a745'
    };
    return activityColors[level] || '#6c757d';
  }

  // Método para obtener el color del nivel de energía
  getEnergyColor(level: string): string {
    const energyColors: { [key: string]: string } = {
      'Bajo': '#6c757d',
      'Medio': '#ffc107',
      'Alto': '#856404'
    };
    return energyColors[level] || '#6c757d';
  }
}
