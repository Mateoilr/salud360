import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-stats-men',
  templateUrl: './stats-men.page.html',
  styleUrls: ['./stats-men.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StatsMenPage implements OnInit {
  // Estados actuales
  currentEnergy: string = 'high';
  currentMood: string = 'content';
  currentSexualHealth: string = 'normal';
  physicalActivity: number = 30;

  // Estadísticas
  weeklyGoal: number = 75;
  sleepHours: number = 7.5;
  workoutStreak: number = 5;
  showStats: boolean = true;

  // Datos del usuario
  userData = {
    name: 'Ethan',
    avatar: 'assets/images/ethan-avatar.jpg'
  };

  // Consejos disponibles
  availableTips = [
    {
      title: 'Hidratación',
      description: 'Bebe al menos 8 vasos de agua al día para mantener tu energía y concentración.',
      icon: 'water-outline',
      color: '#3498db'
    },
    {
      title: 'Ejercicio Regular',
      description: 'Mantén una rutina de ejercicio constante para mejorar tu estado físico y mental.',
      icon: 'fitness-outline',
      color: '#e74c3c'
    },
    {
      title: 'Alimentación Balanceada',
      description: 'Consume proteínas magras, carbohidratos complejos y grasas saludables.',
      icon: 'restaurant-outline',
      color: '#27ae60'
    },
    {
      title: 'Manejo del Estrés',
      description: 'Practica técnicas de relajación como meditación o respiración profunda.',
      icon: 'leaf-outline',
      color: '#f39c12'
    }
  ];

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.loadUserData();
    this.loadDailyStats();
  }

  // Cargar datos del usuario
  loadUserData() {
    console.log('Cargando datos del usuario...');
    // Aquí cargarías los datos desde un servicio
  }

  // Cargar estadísticas diarias
  loadDailyStats() {
    // Simular carga de estadísticas
    setTimeout(() => {
      this.weeklyGoal = Math.floor(Math.random() * 100);
      this.sleepHours = Math.round((Math.random() * 3 + 6) * 10) / 10;
      this.workoutStreak = Math.floor(Math.random() * 10);
    }, 500);
  }

  // Actualizar nivel de energía
  async updateEnergyLevel() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona tu nivel de energía',
      buttons: [
        {
          text: 'Alto',
          handler: () => {
            this.currentEnergy = 'high';
            this.showToast('Nivel de energía actualizado: Alto');
          }
        },
        {
          text: 'Medio',
          handler: () => {
            this.currentEnergy = 'medium';
            this.showToast('Nivel de energía actualizado: Medio');
          }
        },
        {
          text: 'Bajo',
          handler: () => {
            this.currentEnergy = 'low';
            this.showToast('Nivel de energía actualizado: Bajo');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Actualizar estado de ánimo
  async updateMood() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona tu estado de ánimo',
      buttons: [
        {
          text: 'Contento',
          handler: () => {
            this.currentMood = 'content';
            this.showToast('Estado de ánimo actualizado: Contento');
          }
        },
        {
          text: 'Feliz',
          handler: () => {
            this.currentMood = 'happy';
            this.showToast('Estado de ánimo actualizado: Feliz');
          }
        },
        {
          text: 'Estresado',
          handler: () => {
            this.currentMood = 'stressed';
            this.showToast('Estado de ánimo actualizado: Estresado');
          }
        },
        {
          text: 'Tranquilo',
          handler: () => {
            this.currentMood = 'calm';
            this.showToast('Estado de ánimo actualizado: Tranquilo');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Actualizar actividad física
  async updatePhysicalActivity() {
    const alert = await this.alertCtrl.create({
      header: 'Actividad Física',
      message: 'Ingresa los minutos de actividad física de hoy',
      inputs: [
        {
          name: 'minutes',
          type: 'number',
          placeholder: 'Minutos',
          value: this.physicalActivity
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.minutes && data.minutes > 0) {
              this.physicalActivity = parseInt(data.minutes);
              this.showToast('Actividad física actualizada');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Actualizar salud sexual
  async updateSexualHealth() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Estado de Salud Sexual',
      buttons: [
        {
          text: 'Normal',
          handler: () => {
            this.currentSexualHealth = 'normal';
            this.showToast('Salud sexual actualizada: Normal');
          }
        },
        {
          text: 'Buena',
          handler: () => {
            this.currentSexualHealth = 'good';
            this.showToast('Salud sexual actualizada: Buena');
          }
        },
        {
          text: 'Excelente',
          handler: () => {
            this.currentSexualHealth = 'excellent';
            this.showToast('Salud sexual actualizada: Excelente');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Mostrar más consejos
  async showMoreTips() {
    const alert = await this.alertCtrl.create({
      header: 'Consejos Adicionales',
      message: 'Estos son algunos consejos personalizados para ti:',
      buttons: [
        {
          text: 'Ver Detalles',
          handler: () => {
            this.navCtrl.navigateForward('/consejos-detalle');
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });

    // Agregar consejos al mensaje
    const randomTips = this.getRandomTips(2);
    let message = 'Consejos recomendados para ti:<br><br>';
    randomTips.forEach((tip, index) => {
      message += `${index + 1}. <strong>${tip.title}</strong><br>${tip.description}<br><br>`;
    });
    
    alert.message = message;
    await alert.present();
  }

  // Obtener consejos aleatorios
  getRandomTips(count: number) {
    const shuffled = [...this.availableTips].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Obtener texto de energía
  getEnergyText(): string {
    switch (this.currentEnergy) {
      case 'high':
        return 'Alto';
      case 'medium':
        return 'Medio';
      case 'low':
        return 'Bajo';
      default:
        return 'Alto';
    }
  }

  // Obtener texto de estado de ánimo
  getMoodText(): string {
    switch (this.currentMood) {
      case 'content':
        return 'Contento';
      case 'happy':
        return 'Feliz';
      case 'stressed':
        return 'Estresado';
      case 'calm':
        return 'Tranquilo';
      default:
        return 'Contento';
    }
  }

  // Obtener texto de salud sexual
  getSexualHealthText(): string {
    switch (this.currentSexualHealth) {
      case 'normal':
        return 'Normal';
      case 'good':
        return 'Buena';
      case 'excellent':
        return 'Excelente';
      default:
        return 'Normal';
    }
  }

  // Navegar a tab
  navigateToTab(tab: string) {
    switch (tab) {
      case 'inicio':
        // Ya estamos en inicio
        break;
      case 'aprende':
        this.navCtrl.navigateForward('/aprende');
        break;
      case 'comunidad':
        this.navCtrl.navigateForward('/comunidad');
        break;
      case 'perfil':
        this.navCtrl.navigateForward('/perfil');
        break;
      case 'configuracion':
        this.navCtrl.navigateForward('/configuracion');
        break;
    }
  }

  // Mostrar toast
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  // Guardar datos del día
  saveData() {
    const dailyData = {
      date: new Date().toISOString(),
      energy: this.currentEnergy,
      mood: this.currentMood,
      sexualHealth: this.currentSexualHealth,
      physicalActivity: this.physicalActivity,
      stats: {
        weeklyGoal: this.weeklyGoal,
        sleepHours: this.sleepHours,
        workoutStreak: this.workoutStreak
      }
    };
    
    console.log('Guardando datos del día:', dailyData);
    // Aquí guardarías los datos en un servicio
  }

  // Alternar mostrar estadísticas
  toggleStats() {
    this.showStats = !this.showStats;
  }

  // Lifecycle hook para guardar datos al salir
  ionViewWillLeave() {
    this.saveData();
  }

}
