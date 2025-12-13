import { Routes } from '@angular/router';

import { AnalysisResultPage } from '@/pages/saved/analysis-result/analysis-result.page';
import { SavedPage } from '@/pages/saved/saved.page';

export const SAVED_ROUTES: Routes = [
  {
    path: '',
    component: SavedPage,
  },
  {
    path: ':analysisResultId',
    component: AnalysisResultPage,
  },
];
