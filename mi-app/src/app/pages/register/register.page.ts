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
  selector: 'app-register',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar contraseña
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  async register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Creando cuenta...'
      });
      await loading.present();

      const { name, email, password } = this.registerForm.value;

      try {
        const result = await this.authService.register(email, password, name);

        if (result.success) {
          await this.showToast('¡Cuenta creada exitosamente!', 'success');
          this.router.navigate(['/genero']); // Ir a selección de género después del registro
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
      this.registerForm.markAllAsTouched();

      if (this.registerForm.hasError('passwordMismatch')) {
        await this.showToast('Las contraseñas no coinciden', 'warning');
      } else {
        await this.showToast('Por favor completa todos los campos correctamente', 'warning');
      }
    }
  }

  goBack() {
    this.router.navigate(['/login']);
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
