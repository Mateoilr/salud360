import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'couple',
    loadComponent: () => import('./pages/couple/couple.page').then( m => m.CouplePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'content',
    loadComponent: () => import('./pages/content/content.page').then( m => m.ContentPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'reminders',
    loadComponent: () => import('./pages/reminders/reminders.page').then( m => m.RemindersPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats.page').then( m => m.StatsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'stats-women',
    loadComponent: () => import('./pages/stats-women/stats-women.page').then( m => m.StatsWomenPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'stats-men',
    loadComponent: () => import('./pages/stats-men/stats-men.page').then( m => m.StatsMenPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'personalization',
    loadComponent: () => import('./pages/personalization/personalization.page').then( m => m.PersonalizationPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'syn-couple',
    loadComponent: () => import('./pages/syn-couple/syn-couple.page').then( m => m.SynCouplePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage),
    canActivate: [PublicGuard]
  },
  {
    path: 'genero',
    loadComponent: () => import('./pages/genero/genero.page').then( m => m.GeneroPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate: [PublicGuard]
  },
  // Ruta comodín para páginas no encontradas
  {
    path: '**',
    redirectTo: 'login'
  }

];
