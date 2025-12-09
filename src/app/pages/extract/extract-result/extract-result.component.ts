import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { EMPTY, filter, finalize, switchMap, takeUntil } from 'rxjs';

import { ProcessTextResponse } from '@/pages/extract/extract.models';
import { ExtractService } from '@/pages/extract/extract.service';

@Component({
  selector: 'app-extract-result',
  imports: [NzFlexModule, NzSkeletonModule, NzTagModule, NzTypographyModule],
  templateUrl: './extract-result.component.html',
  styleUrl: './extract-result.component.scss',
})
export class ExtractResultComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(NzMessageService);
  private extractService = inject(ExtractService);

  isLoading = signal<boolean>(false);
  response = signal<ProcessTextResponse | null>(null);

  ngOnInit(): void {
    const routeChange$ = this.router.events.pipe(filter((event) => event instanceof NavigationStart));

    const routeSubscription = routeChange$.subscribe(() => {
      this.response.set(null);
      this.isLoading.set(false);
    });

    const textIdSubscription = this.extractService.textId$
      .pipe(
        switchMap((textId) => {
          if (textId) {
            this.isLoading.set(true);

            return this.extractService.processText({ textId }).pipe(
              takeUntil(routeChange$),
              finalize(() => this.isLoading.set(false)),
            );
          }

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
