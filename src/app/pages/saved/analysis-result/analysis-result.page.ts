import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { finalize } from 'rxjs';

import { environment } from '@/environments/environment';
import { AnalysisResultResponse } from '@/pages/saved/saved.models';
import { SavedService } from '@/pages/saved/saved.service';
import { KeywordsComponent } from '@/shared/components/keywords/keywords.component';
import { ShowMoreComponent } from '@/shared/components/show-more/show-more.component';

@Component({
  selector: 'app-analysis-result',
  imports: [
    DatePipe,
    RouterLink,
    NzButtonModule,
    NzFlexModule,
    NzIconModule,
    NzResultModule,
    NzSkeletonModule,
    NzTypographyModule,
    KeywordsComponent,
    ShowMoreComponent,
  ],
  templateUrl: './analysis-result.page.html',
  styleUrl: './analysis-result.page.scss',
})
export class AnalysisResultPage implements OnInit {
  private destroyRef = inject(DestroyRef);
  private savedService = inject(SavedService);

  analysisResultId = input.required<number>();

  isAnalysisResultLoading = signal<boolean>(true);
  isNotFound = signal<boolean>(false);
  analysisResult = signal<AnalysisResultResponse | null>(null);

  downloadSummaryPdfUrl = computed(() => `${environment.textAnalysisServiceUrl}/pdf/${this.analysisResult()?.id}`);

  ngOnInit(): void {
    const subscription = this.savedService
      .loadAnalysisResultById(this.analysisResultId())
      .pipe(finalize(() => this.isAnalysisResultLoading.set(false)))
      .subscribe({
        next: (response) => (response ? this.analysisResult.set(response) : this.isNotFound.set(true)),
        error: () => this.isNotFound.set(true),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
