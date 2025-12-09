import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

import { ExtractService } from '@/pages/extract/extract.service';

@Component({
  selector: 'app-extract-input',
  imports: [FormsModule, NzButtonModule, NzInputModule],
  templateUrl: './extract-input.component.html',
  styleUrl: './extract-input.component.scss',
})
export class ExtractInputComponent {
  private destroyRef = inject(DestroyRef);
  private messageService = inject(NzMessageService);
  private extractService = inject(ExtractService);

  value = signal('');
  isUploadInputLoading = signal(false);

  onSubmitClick(): void {
    this.isUploadInputLoading.set(true);

    const subscription = this.extractService
      .uploadInput({ input: this.value() })
      .pipe(finalize(() => this.isUploadInputLoading.set(false)))
      .subscribe({
        next: (response) => this.extractService.changeTextId(response.text_id),
        error: () => {
          this.extractService.changeTextId(null);
          this.messageService.error('Не вдалося обробити введений текст.');
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
