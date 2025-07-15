import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Si el usuario ya está autenticado, redirigir al home
    if (this.authService.isAuthenticated()) {
      console.log('Usuario ya autenticado, redirigiendo al home');
      return this.router.createUrlTree(['/home']);
    }

    // Si no está autenticado, permitir acceso a login/register
    return true;
  }
}
