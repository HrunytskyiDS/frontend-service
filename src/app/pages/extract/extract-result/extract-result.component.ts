import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { EMPTY, filter, finalize, switchMap, takeUntil } from 'rxjs';

import { KeywordsComponent } from '@/shared/components/keywords/keywords.component';
import { AnalysisService, ProcessTextResponse } from '@/shared/services/analysis.service';

@Component({
  selector: 'app-extract-result',
  imports: [NzSkeletonModule, NzTypographyModule, KeywordsComponent],
  templateUrl: './extract-result.component.html',
  styleUrl: './extract-result.component.scss',
})
export class ExtractResultComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(NzMessageService);
  private analysisService = inject(AnalysisService);

  isLoading = signal<boolean>(false);
  response = signal<ProcessTextResponse | null>(null);

  ngOnInit(): void {
    const routeChange$ = this.router.events.pipe(filter((event) => event instanceof NavigationStart));

    const routeSubscription = routeChange$.subscribe(() => this.analysisService.changeTextId(null));

    const textIdSubscription = this.analysisService.textId$
      .pipe(
        switchMap((textId) => {
          if (textId) {
            this.isLoading.set(true);

            return this.analysisService.processText({ textId }).pipe(
              takeUntil(routeChange$),
              finalize(() => this.isLoading.set(false)),
            );
          }

          this.response.set(null);
          this.isLoading.set(false);

          return EMPTY;
        }),
      )
      .subscribe({
        next: (response) => this.response.set(response),
        error: () => {
          this.response.set(null);
          this.messageService.error('Не вдалося обробити текст.');
        },
      });

    this.destroyRef.onDestroy(() => {
      routeSubscription.unsubscribe();
      textIdSubscription.unsubscribe();
    });
  }
}
