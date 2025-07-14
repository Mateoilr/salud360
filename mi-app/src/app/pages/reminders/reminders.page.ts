import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';

interface Event {
  name: string;
  icon: string;
  date?: Date;
}

interface RegisterOption {
  name: string;
  icon: string;
  action: string;
}

interface CyclePhase {
  name: string;
  description: string;
  day: number;
}

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RemindersPage implements OnInit {
  viewMode: 'mes' | 'semana' = 'mes';
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  displayDays: Date[] = [];
  
  dayHeaders: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Simulación de datos del ciclo
  cycleStartDate: Date = new Date('2005-10-01'); // Inicio del último período
  cycleLength: number = 28; // Duración del ciclo en días
  periodLength: number = 5; // Duración del período en días
  
  currentPhase: CyclePhase = {
    name: 'Fase folicular',
    description: 'Día 12',
    day: 12
  };
  
  events: Event[] = [
    {
      name: 'Ventana fértil',
      icon: 'heart-outline'
    },
    {
      name: 'Día de baja energía',
      icon: 'moon-outline'
    }
  ];
  
  registerOptions: RegisterOption[] = [
    {
      name: 'Síntomas',
      icon: 'medical-outline',
      action: 'symptoms'
    },
    {
      name: 'Actividad sexual',
      icon: 'heart-outline',
      action: 'activity'
    },
    {
      name: 'Emociones',
      icon: 'happy-outline',
      action: 'emotions'
    }
  ];

  constructor(private themeService: ThemeService) {}

  // Método para manejar el cambio de vista
  onViewModeChange() {
    console.log('Cambio de vista a:', this.viewMode);
    this.updateDisplayDays();
    this.updateCurrentPhase();
    
    // Debug: verificar que se muestren todos los días
    setTimeout(() => {
      console.log('Verificación después del cambio:');
      console.log('displayDays.length:', this.displayDays.length);
      console.log('Todos los días:', this.displayDays.map(d => d.toLocaleDateString('es-ES')));
    }, 100);
  }

  ngOnInit() {
    // Asegurar que currentDate sea la fecha actual
    const today = new Date();
    this.currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    console.log('Fecha actual del sistema:', today.toLocaleDateString('es-ES'));
    console.log('currentDate inicializado:', this.currentDate.toLocaleDateString('es-ES'));
    console.log('Mes actual:', this.currentDate.getMonth() + 1); // +1 porque getMonth() devuelve 0-11
    
    this.updateDisplayDays();
    this.updateCurrentPhase();
  }

  // Navegación del calendario
  previousPeriod() {
    if (this.viewMode === 'mes') {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    } else {
      this.currentDate = new Date(this.currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
    }
    this.updateDisplayDays();
  }

  nextPeriod() {
    if (this.viewMode === 'mes') {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    } else {
      this.currentDate = new Date(this.currentDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    }
    this.updateDisplayDays();
  }

  getCurrentPeriodTitle(): string {
    console.log('getCurrentPeriodTitle - currentDate:', this.currentDate.toLocaleDateString('es-ES'));
    console.log('getCurrentPeriodTitle - mes actual:', this.currentDate.getMonth() + 1);
    
    if (this.viewMode === 'mes') {
      const title = this.currentDate.toLocaleDateString('es-ES', { 
        month: 'long', 
        year: 'numeric' 
      });
      console.log('Título del mes:', title);
      return title;
    } else {
      const startOfWeek = this.getStartOfWeek(this.currentDate);
      const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6);
      const title = `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${startOfWeek.toLocaleDateString('es-ES', { month: 'long' })}`;
      console.log('Título de la semana:', title);
      return title;
    }
  }

  // Actualizar días mostrados
  updateDisplayDays() {
    this.displayDays = [];
    
    if (this.viewMode === 'mes') {
      const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      
      // Obtener primer día de la semana del mes
      const startDate = this.getStartOfWeek(firstDay);
      
      // Llenar 6 semanas (42 días)
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        this.displayDays.push(date);
      }
    } else {
      // Vista semanal - mostrar solo la semana actual
      const startOfWeek = this.getStartOfWeek(this.currentDate);
      console.log('Vista semanal - startOfWeek:', startOfWeek.toLocaleDateString('es-ES'));
      console.log('Vista semanal - currentDate:', this.currentDate.toLocaleDateString('es-ES'));
      
      // Asegurar que siempre se muestren 7 días
      for (let i = 0; i < 7; i++) {
        const newDate = new Date(startOfWeek);
        newDate.setDate(startOfWeek.getDate() + i);
        this.displayDays.push(newDate);
        console.log(`Día ${i + 1}:`, newDate.toLocaleDateString('es-ES'));
      }
      
      console.log('Total de días en displayDays:', this.displayDays.length);
      console.log('Días mostrados:', this.displayDays.map(d => d.toLocaleDateString('es-ES')));
    }
  }

  getStartOfWeek(date: Date): Date {
    // Crear una copia de la fecha para no modificar la original
    const dateCopy = new Date(date.getTime());
    const day = dateCopy.getDay();
    const diff = dateCopy.getDate() - day;
    
    // Crear nueva fecha para el inicio de la semana
    const startOfWeek = new Date(dateCopy.getFullYear(), dateCopy.getMonth(), diff);
    
    console.log('getStartOfWeek - fecha original:', date.toLocaleDateString('es-ES'));
    console.log('getStartOfWeek - día de la semana:', day);
    console.log('getStartOfWeek - diferencia:', diff);
    console.log('getStartOfWeek - inicio de semana:', startOfWeek.toLocaleDateString('es-ES'));
    
    return startOfWeek;
  }

  // Métodos para identificar tipos de días
  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelectedDay(date: Date): boolean {
    return date.toDateString() === this.selectedDate.toDateString();
  }

  isOtherMonth(date: Date): boolean {
    if (this.viewMode === 'semana') {
      // En vista semanal, no mostrar días de otros meses como diferentes
      return false;
    }
    return date.getMonth() !== this.currentDate.getMonth();
  }

  isFertileDay(date: Date): boolean {
    // Calcular ventana fértil (días 10-16 del ciclo aproximadamente)
    const dayOfCycle = this.getDayOfCycle(date);
    return dayOfCycle >= 10 && dayOfCycle <= 16;
  }

  isOvulationDay(date: Date): boolean {
    // Día de ovulación (aproximadamente día 14 del ciclo)
    const dayOfCycle = this.getDayOfCycle(date);
    return dayOfCycle === 14;
  }

  getDayOfCycle(date: Date): number {
    const timeDiff = date.getTime() - this.cycleStartDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return (daysDiff % this.cycleLength) + 1;
  }

  selectDay(date: Date) {
    this.selectedDate = date;
    this.updateCurrentPhase();
  }

  updateCurrentPhase() {
    const currentDay = this.getDayOfCycle(this.selectedDate);
    
    if (currentDay <= 5) {
      this.currentPhase = {
        name: 'Fase menstrual',
        description: `Día ${currentDay}`,
        day: currentDay
      };
    } else if (currentDay <= 13) {
      this.currentPhase = {
        name: 'Fase folicular',
        description: `Día ${currentDay}`,
        day: currentDay
      };
    } else if (currentDay <= 16) {
      this.currentPhase = {
        name: 'Fase ovulatoria',
        description: `Día ${currentDay}`,
        day: currentDay
      };
    } else {
      this.currentPhase = {
        name: 'Fase lútea',
        description: `Día ${currentDay}`,
        day: currentDay
      };
    }
  }

  openRegister(register: RegisterOption) {
    // Aquí puedes navegar a otras páginas o abrir modales
    console.log('Abrir registro:', register.action);
    // Ejemplo: this.router.navigate(['/register', register.action]);
  }

  // Alternar tema
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
