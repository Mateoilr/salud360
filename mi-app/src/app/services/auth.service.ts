import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name?: string;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Verificar si hay una sesión guardada al inicializar
    this.checkStoredAuth();
  }

  // Verificar autenticación almacenada
  private checkStoredAuth() {
    const storedUser = localStorage.getItem('salud360_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.isAuthenticated) {
          this.currentUserSubject.next(user);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('salud360_user');
      }
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser !== null && currentUser.isAuthenticated === true;
  }

  // Obtener el usuario actual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Simular login (reemplazar con Firebase Auth más tarde)
  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      // Simulación de login - reemplazar con Firebase Auth
      if (email && password) {
        const user: User = {
          id: Date.now().toString(),
          email: email,
          name: email.split('@')[0],
          isAuthenticated: true
        };

        // Guardar en localStorage
        localStorage.setItem('salud360_user', JSON.stringify(user));

        // Actualizar el subject
        this.currentUserSubject.next(user);

        return { success: true, message: 'Login exitoso' };
      } else {
        return { success: false, message: 'Email y contraseña requeridos' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error en el login' };
    }
  }

  // Simular registro
  async register(email: string, password: string, name?: string): Promise<{ success: boolean; message: string }> {
    try {
      // Simulación de registro - reemplazar con Firebase Auth
      if (email && password) {
        const user: User = {
          id: Date.now().toString(),
          email: email,
          name: name || email.split('@')[0],
          isAuthenticated: true
        };

        // Guardar en localStorage
        localStorage.setItem('salud360_user', JSON.stringify(user));

        // Actualizar el subject
        this.currentUserSubject.next(user);

        return { success: true, message: 'Registro exitoso' };
      } else {
        return { success: false, message: 'Email y contraseña requeridos' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Error en el registro' };
    }
  }

  // Cerrar sesión
  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem('salud360_user');

    // Actualizar el subject
    this.currentUserSubject.next(null);
  }

  // Verificar token (para usar con backend más tarde)
  async verifyToken(): Promise<boolean> {
    // Aquí puedes verificar el token con tu backend
    return this.isAuthenticated();
  }
}
