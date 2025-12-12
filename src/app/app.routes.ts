import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/extract' },
  {
    path: 'extract',
    loadChildren: () => import('./pages/extract/extract.routes').then((m) => m.EXTRACT_ROUTES),
    title: 'ExtractLab',
  },
  {
    path: 'saved',
    loadChildren: () => import('./pages/saved/saved.routes').then((m) => m.SAVED_ROUTES),
    title: 'Збережене',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
    title: 'Сторінку не знайдено',
  },
];
