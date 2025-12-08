import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

import { ExtractService } from '@/pages/extract/extract.service';

@Component({
  selector: 'app-extract-url',
  imports: [FormsModule, NzIconModule, NzInputModule],
  templateUrl: './extract-url.component.html',
  styleUrl: './extract-url.component.scss',
})
export class ExtractUrlComponent {
  private destroyRef = inject(DestroyRef);
  private messageService = inject(NzMessageService);
  private extractService = inject(ExtractService);

  value = signal('');
  isUploadUrlLoading = signal(false);

  onSearch({ value, source }: NzInputSearchEvent): void {
    this.value.set(value);

    if (source === 'clear') {
      return;
    }

    this.isUploadUrlLoading.set(true);

    const subscription = this.extractService
      .uploadUrl({ url: value })
      .pipe(finalize(() => this.isUploadUrlLoading.set(false)))
      .subscribe({
        next: (response) => this.extractService.changeTextId(response.text_id),
        error: () => {
          this.extractService.changeTextId(null);
          this.messageService.error('Не вдалося обробити текст за посиланням.');
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
