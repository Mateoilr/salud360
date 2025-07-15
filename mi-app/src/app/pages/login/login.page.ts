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
import { AuthService } from '../../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...'
      });
      await loading.present();

      const { email, password } = this.loginForm.value;

      try {
        const result = await this.authService.login(email, password);

        if (result.success) {
          await this.showToast('¡Bienvenido!', 'success');
          this.router.navigate(['/home']); // Redirigir al home después del login
        } else {
          await this.showToast(result.message, 'danger');
        }
      } catch (error) {
        await this.showToast('Error de conexión', 'danger');
      } finally {
        await loading.dismiss();
        this.isLoading = false;
      }
    } else {
      this.loginForm.markAllAsTouched();
      await this.showToast('Por favor completa todos los campos correctamente', 'warning');
    }
  }

  async loginWithFacebook() {
    await this.showToast('Login con Facebook próximamente disponible', 'medium');
  }

  async loginWithGoogle() {
    await this.showToast('Login con Google próximamente disponible', 'medium');
  }

  async recoverPassword() {
    await this.showToast('Recuperación de contraseña próximamente disponible', 'medium');
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}
