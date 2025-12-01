import { Routes } from '@angular/router';

import { ExtractFile } from '@/pages/extract/extract-file/extract-file';
import { ExtractUrl } from '@/pages/extract/extract-url/extract-url';

import { Extract } from './extract';

export const EXTRACT_ROUTES: Routes = [
  {
    path: '',
    component: Extract,
    children: [
      { path: '', component: ExtractFile },
      { path: 'file', pathMatch: 'full', redirectTo: '' },
      { path: 'url', component: ExtractUrl },
    ],
  },
];
