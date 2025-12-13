import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

import { ExtractService } from '@/pages/extract/extract.service';
import { AnalysisService } from '@/shared/services/analysis.service';

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
  private analysisService = inject(AnalysisService);

  value = signal('');
  isUploadUrlLoading = signal(false);

  onSearch({ value, source }: NzInputSearchEvent): void {
    this.value.set(value);

    if (source === 'clear') {
      return;
    }

    this.isUploadUrlLoading.set(true);
    this.analysisService.resetTextId();

    const subscription = this.extractService
      .uploadUrl({ url: value })
      .pipe(finalize(() => this.isUploadUrlLoading.set(false)))
      .subscribe({
        next: (response) => this.analysisService.changeTextId(response.text_id),
        error: () => {
          this.analysisService.resetTextId();
          this.messageService.error('Не вдалося обробити текст за посиланням.');
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
