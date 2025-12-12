import { Routes } from '@angular/router';

import { SavedPage } from '@/pages/saved/saved.page';
import { TextPage } from '@/pages/saved/text/text.page';

export const SAVED_ROUTES: Routes = [
  {
    path: '',
    component: SavedPage,
  },
  {
    path: ':textId',
    component: TextPage,
  },
];
