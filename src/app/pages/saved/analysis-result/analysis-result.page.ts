import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { finalize } from 'rxjs';

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
  savedService = inject(SavedService);

  analysisResultId = input.required<number>();

  isAnalysisResultLoading = signal<boolean>(true);
  isNotFound = signal<boolean>(false);
  analysisResult = signal<AnalysisResultResponse | null>(null);

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
