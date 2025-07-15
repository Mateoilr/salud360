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

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      genero: ['', Validators.required],
    });
  }

  continuar() {
    if (this.form.valid) {
      console.log('Género seleccionado:', this.form.value.genero);
      // Aquí puedes redirigir a la siguiente pantalla
    } else {
      this.form.markAllAsTouched();
    }
  }

  clearSelection() {
    this.form.get('genero')?.reset();
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
