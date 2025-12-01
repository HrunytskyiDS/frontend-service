import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/extract' },
  {
    path: 'extract',
    loadChildren: () => import('./pages/extract/extract.routes').then((m) => m.EXTRACT_ROUTES),
    title: 'ExtractLab',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Сторінку не знайдено',
  },
];
