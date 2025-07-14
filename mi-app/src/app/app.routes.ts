import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'couple',
    loadComponent: () => import('./pages/couple/couple.page').then( m => m.CouplePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'content',
    loadComponent: () => import('./pages/content/content.page').then( m => m.ContentPage)
  },
  {
    path: 'reminders',
    loadComponent: () => import('./pages/reminders/reminders.page').then( m => m.RemindersPage)
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats.page').then( m => m.StatsPage)
  },
  {
    path: 'stats-women',
    loadComponent: () => import('./pages/stats-women/stats-women.page').then( m => m.StatsWomenPage)
  },
  {
    path: 'stats-men',
    loadComponent: () => import('./pages/stats-men/stats-men.page').then( m => m.StatsMenPage)
  },
  {
    path: 'personalization',
    loadComponent: () => import('./pages/personalization/personalization.page').then( m => m.PersonalizationPage)
  },
  {
    path: 'syn-couple',
    loadComponent: () => import('./pages/syn-couple/syn-couple.page').then( m => m.SynCouplePage)
  }
];
