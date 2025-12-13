import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { AnalysisService } from '@/shared/services/analysis.service';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-analysis-params',
  imports: [FormsModule, NzCheckboxModule, NzFormModule, NzInputNumberModule],
  templateUrl: './analysis-params.component.html',
  styleUrl: './analysis-params.component.scss',
})
export class AnalysisParamsComponent {
  analysisService = inject(AnalysisService);
}
