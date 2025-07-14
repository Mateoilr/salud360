import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';

export interface UserProfile {
  id: string;
  name: string;
  displayName: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  language: string;
  notificationsEnabled: boolean;
  privacySettings: {
    visibility: string;
    coupleCode: string;
  };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  userProfile: UserProfile | null = null;
  isLoading = false;
  isDarkMode = false;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
    this.isDarkMode = this.themeService.isDark();
  }

  ionViewWillEnter() {
    // Recargar datos cuando la vista se active
    this.loadUserProfile();
  }

  async loadUserProfile() {
    this.isLoading = true;
    
    try {
      // Simular llamada a la API
      //this.userProfile = await this.userProfileService.getUserProfile();
      
      // Si no hay datos, mostrar datos de ejemplo
      if (!this.userProfile) {
        this.userProfile = {
          id: '1',
          name: 'Sofía Galindo',
          displayName: 'Sophia Carter',
          username: '@sophiacarter',
          email: 'sofia.cas@gmail.com',
          phone: '+593 99 865 1237',
          avatar: 'assets/images/profile-avatar.png',
          language: 'Español',
          notificationsEnabled: true,
          privacySettings: {
            visibility: 'friends',
            coupleCode: 'ABC123'
          }
        };
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      await this.showErrorToast('Error al cargar el perfil de usuario');
    } finally {
      this.isLoading = false;
    }
  }

  async refreshProfile() {
    const loading = await this.loadingController.create({
      message: 'Actualizando perfil...',
      duration: 2000
    });
    
    await loading.present();
    
    try {
      await this.loadUserProfile();
      await this.showSuccessToast('Perfil actualizado correctamente');
    } catch (error) {
      await this.showErrorToast('Error al actualizar el perfil');
    } finally {
      await loading.dismiss();
    }
  }

  // Navegación a otras pantallas
  goToNotifications() {
    this.router.navigate(['/notifications-settings']);
  }

  goToVisibility() {
    this.router.navigate(['/privacy-settings']);
  }

  goToCoupleCode() {
    this.router.navigate(['/couple-code']);
  }

  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      message: '¿Deseas editar tu información personal?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Editar',
          handler: () => {
            this.router.navigate(['/edit-profile']);
          }
        }
      ]
    });

    await alert.present();
  }

  async changeLanguage() {
    const alert = await this.alertController.create({
      header: 'Cambiar Idioma',
      inputs: [
        {
          name: 'language',
          type: 'radio',
          label: 'Español',
          value: 'es',
          checked: this.userProfile?.language === 'Español'
        },
        {
          name: 'language',
          type: 'radio',
          label: 'English',
          value: 'en',
          checked: this.userProfile?.language === 'English'
        },
        {
          name: 'language',
          type: 'radio',
          label: 'Português',
          value: 'pt',
          checked: this.userProfile?.language === 'Português'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cambiar',
          handler: (data) => {
            this.updateLanguage(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async updateLanguage(languageCode: string) {
    this.isLoading = true;
    
    try {
      const languageMap: { [key: string]: string } = {
        'es': 'Español',
        'en': 'English',
        'pt': 'Português'
      };

      if (this.userProfile) {
        this.userProfile.language = languageMap[languageCode] || 'Español';
        //await this.userProfileService.updateUserProfile(this.userProfile);
        await this.showSuccessToast('Idioma actualizado correctamente');
      }
    } catch (error) {
      await this.showErrorToast('Error al actualizar el idioma');
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.performLogout();
          }
        }
      ]
    });

    await alert.present();
  }

  async performLogout() {
    this.isLoading = true;
    
    try {
      //await this.userProfileService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      await this.showErrorToast('Error al cerrar sesión');
    } finally {
      this.isLoading = false;
    }
  }

  // Métodos auxiliares
  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle'
    });
    
    await toast.present();
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
      icon: 'alert-circle'
    });
    
    await toast.present();
  }

  // Métodos para manejo de errores de red
  async retryConnection() {
    await this.refreshProfile();
  }

  onImageError(event: any) {
    // Fallback para imagen de avatar
    event.target.src = 'assets/images/default-avatar.png';
  }

  get currentTheme(): 'light' | 'dark' {
    return this.themeService.getCurrentTheme();
  }

  toggleTheme() {
    this.themeService.setTheme(this.isDarkMode);
  }
}
