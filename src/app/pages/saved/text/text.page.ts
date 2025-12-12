import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { finalize } from 'rxjs';

import { TextResponse } from '@/pages/saved/saved.models';
import { SavedService } from '@/pages/saved/saved.service';
import { ShowMoreComponent } from '@/shared/components/show-more/show-more.component';

@Component({
  selector: 'app-text',
  imports: [
    DatePipe,
    RouterLink,
    NzButtonModule,
    NzResultModule,
    NzSkeletonModule,
    NzTypographyModule,
    ShowMoreComponent,
  ],
  templateUrl: './text.page.html',
  styleUrl: './text.page.scss',
})
export class TextPage implements OnInit {
  private destroyRef = inject(DestroyRef);
  savedService = inject(SavedService);

  textId = input.required<number>();

  isTextLoading = signal<boolean>(true);
  isNotFound = signal<boolean>(false);
  text = signal<TextResponse | null>(null);

  ngOnInit(): void {
    const subscription = this.savedService
      .loadTextById(this.textId())
      .pipe(finalize(() => this.isTextLoading.set(false)))
      .subscribe({
        next: (response) => (response ? this.text.set(response) : this.isNotFound.set(true)),
        error: () => this.isNotFound.set(true),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
