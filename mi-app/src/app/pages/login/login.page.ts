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

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Login exitoso:', this.loginForm.value);
      this.router.navigate(['/genero']);  // ← Redirige a la página de selección de género
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithFacebook() {
    console.log('Login con Facebook');
  }

  loginWithGoogle() {
    console.log('Login con Google');
  }

  recoverPassword() {
    console.log('Recuperar contraseña');
  }
}
