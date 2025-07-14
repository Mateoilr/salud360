import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-stats-women',
  templateUrl: './stats-women.page.html',
  styleUrls: ['./stats-women.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StatsWomenPage implements OnInit {
  // Estados actuales
  currentMood: string = 'happy';
  currentEnergy: string = 'high';
  currentLibido: string = 'medium';

  // Síntomas
  symptoms = {
    cramps: true,
    bloating: true
  };

  // Datos del usuario
  userData = {
    name: 'Sophia',
    cycleDay: 12,
    energyLevel: 'Alta Energía',
    avatar: 'assets/images/sophia-avatar.jpg'
  };

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  // Cargar datos del usuario
  loadUserData() {
    // Aquí cargarías los datos del usuario desde un servicio
    console.log('Cargando datos del usuario...');
  }

  // Actualizar estado de ánimo
  updateMood(mood: string) {
    this.currentMood = mood;
    this.showToast('Estado de ánimo actualizado');
  }

  // Actualizar energía
  updateEnergy(energy: string) {
    this.currentEnergy = energy;
    this.showToast('Nivel de energía actualizado');
  }

  // Actualizar libido
  updateLibido(libido: string) {
    this.currentLibido = libido;
    this.showToast('Libido actualizado');
  }

  // Alternar síntoma
  toggleSymptom(symptom: string) {
    if (symptom === 'cramps') {
      this.symptoms.cramps = !this.symptoms.cramps;
    } else if (symptom === 'bloating') {
      this.symptoms.bloating = !this.symptoms.bloating;
    }
    this.showToast('Síntoma actualizado');
  }

  // Obtener texto del estado de ánimo
  getMoodText(): string {
    switch (this.currentMood) {
      case 'happy':
        return 'Feliz';
      case 'sad':
        return 'Triste';
      case 'anxious':
        return 'Ansiosa';
      case 'calm':
        return 'Tranquila';
      default:
        return 'Feliz';
    }
  }

  // Obtener texto de energía
  getEnergyText(): string {
    switch (this.currentEnergy) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return 'Alta';
    }
  }

  // Obtener texto de libido
  getLibidoText(): string {
    switch (this.currentLibido) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return 'Media';
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
      mood: this.currentMood,
      energy: this.currentEnergy,
      libido: this.currentLibido,
      symptoms: this.symptoms
    };

    // Aquí guardarías los datos en un servicio
    console.log('Guardando datos del día:', dailyData);
  }

  // Obtener recomendaciones basadas en el estado actual
  getRecommendations(): string[] {
    const recommendations = [];

    if (this.currentEnergy === 'high') {
      recommendations.push('Es un buen momento para hacer ejercicio');
    }

    if (this.symptoms.cramps) {
      recommendations.push('Considera tomar té de manzanilla para los cólicos');
    }

    if (this.currentMood === 'sad') {
      recommendations.push('Prueba con meditación o ejercicios de respiración');
    }

    return recommendations;
  }

  // Lifecycle hook para guardar datos al salir
  ionViewWillLeave() {
    this.saveData();
  }

}
