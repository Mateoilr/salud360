import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-genero',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './genero.page.html',
  styleUrls: ['./genero.page.scss'],
})
export class GeneroPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      genero: ['', Validators.required],
    });
  }

  async continuar() {
    if (this.form.valid) {
      const generoSeleccionado = this.form.value.genero;
      console.log('Género seleccionado:', generoSeleccionado);

      // Guardar género en localStorage para persistencia
      localStorage.setItem('salud360_gender', generoSeleccionado);

      // Mostrar confirmación
      await this.showToast(`Género "${generoSeleccionado}" seleccionado exitosamente`);

      // Redirigir a personalización para completar el onboarding
      this.router.navigate(['/personalization']);

    } else {
      this.form.markAllAsTouched();
      await this.showToast('Por favor selecciona una opción', 'warning');
    }
  }

  clearSelection() {
    this.form.get('genero')?.reset();
  }

  goBack() {
    // Si viene del registro, ir a login para cambiar de cuenta
    // Si viene de configuración, ir al perfil
    this.router.navigate(['/login']);
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  // Método para obtener el género seleccionado (útil para otros componentes)
  static getSelectedGender(): string | null {
    return localStorage.getItem('salud360_gender');
  }
}
