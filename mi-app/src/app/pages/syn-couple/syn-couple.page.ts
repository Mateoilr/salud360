import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-syn-couple',
  templateUrl: './syn-couple.page.html',
  styleUrls: ['./syn-couple.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SynCouplePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    // Initialize component
    console.log('Sync Partner page initialized');
  }

  ionViewWillEnter() {
    // Called when entering the page
    console.log('Sync Partner page entered');
  }

  async sendRequest() {
    // Show input dialog for partner's email or username
    const alert = await this.alertController.create({
      header: 'Enviar solicitud',
      message: 'Ingresa el email o nombre de usuario de tu pareja',
      inputs: [
        {
          name: 'partnerContact',
          type: 'email',
          placeholder: 'Email o nombre de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.partnerContact && data.partnerContact.trim() !== '') {
              this.processSendRequest(data.partnerContact);
            } else {
              this.showToast('Por favor ingresa un email o nombre de usuario válido');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async processSendRequest(partnerContact: string) {
    // Show loading
    const loading = await this.loadingController.create({
      message: 'Enviando solicitud...',
      spinner: 'crescent'
    });

    await loading.present();

    try {
      // Simulate API call
      await this.simulateApiCall(partnerContact);
      
      // Hide loading
      await loading.dismiss();
      
      // Show success message
      await this.showSuccessAlert();
      
    } catch (error) {
      // Hide loading
      await loading.dismiss();
      
      // Show error message
      await this.showToast('Error al enviar la solicitud. Intenta nuevamente.');
      console.error('Error sending request:', error);
    }
  }

  private async simulateApiCall(partnerContact: string): Promise<void> {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        const success = Math.random() > 0.2; // 80% success rate
        
        if (success) {
          console.log(`Request sent to: ${partnerContact}`);
          resolve();
        } else {
          reject(new Error('API call failed'));
        }
      }, 2000);
    });
  }

  private async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Solicitud enviada',
      message: 'Tu solicitud ha sido enviada exitosamente. Tu pareja recibirá una notificación para aceptar la sincronización.',
      buttons: [
        {
          text: 'Entendido',
          handler: () => {
            this.goBack();
          }
        }
      ]
    });

    await alert.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });

    await toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }

}
