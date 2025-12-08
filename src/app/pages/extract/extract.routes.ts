import { Routes } from '@angular/router';

import { ExtractFileComponent } from '@/pages/extract/extract-file/extract-file.component';
import { ExtractUrlComponent } from '@/pages/extract/extract-url/extract-url.component';

import { ExtractPage } from './extract.page';

export const EXTRACT_ROUTES: Routes = [
  {
    path: '',
    component: ExtractPage,
    children: [
      { path: '', component: ExtractFileComponent },
      { path: 'file', pathMatch: 'full', redirectTo: '' },
      { path: 'url', component: ExtractUrlComponent },
    ],
  },
];
