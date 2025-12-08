import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { EMPTY, finalize, switchMap } from 'rxjs';

import { ProcessTextResponse } from '@/pages/extract/extract.models';
import { ExtractService } from '@/pages/extract/extract.service';

@Component({
  selector: 'app-extract-result',
  imports: [NzFlexModule, NzSkeletonModule, NzTagModule, NzTypographyModule],
  templateUrl: './extract-result.component.html',
  styleUrl: './extract-result.component.scss',
})
export class ExtractResultComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private messageService = inject(NzMessageService);
  private extractService = inject(ExtractService);

  isLoading = signal<boolean>(false);
  response = signal<ProcessTextResponse | null>(null);

  ngOnInit(): void {
    const textIdSubscription = this.extractService.textId$
      .pipe(
        switchMap((textId) => {
          if (textId) {
            this.isLoading.set(true);

            return this.extractService.processText({ textId }).pipe(finalize(() => this.isLoading.set(false)));
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

    this.destroyRef.onDestroy(() => textIdSubscription.unsubscribe());
  }
}
