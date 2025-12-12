import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { finalize } from 'rxjs';

import { ExtractService } from '@/pages/extract/extract.service';
import { AnalysisService } from '@/shared/services/analysis.service';

@Component({
  selector: 'app-extract-file',
  imports: [NzIconModule, NzSpinModule, NzUploadModule],
  templateUrl: './extract-file.component.html',
  styleUrl: './extract-file.component.scss',
})
export class ExtractFileComponent {
  private destroyRef = inject(DestroyRef);
  private messageService = inject(NzMessageService);
  private extractService = inject(ExtractService);
  private analysisService = inject(AnalysisService);

  isUploadFileLoading = signal(false);

  onBeforeUpload = (file: NzUploadFile): boolean => {
    this.isUploadFileLoading.set(true);

    const subscription = this.extractService
      .uploadFile({ file: file as unknown as File })
      .pipe(finalize(() => this.isUploadFileLoading.set(false)))
      .subscribe({
        next: (response) => this.analysisService.changeTextId(response.text_id),
        complete: () => this.messageService.success(`Файл "${file.name}" успішно завантажено.`),
        error: () => {
          this.analysisService.changeTextId(null);
          this.messageService.error(`Не вдалося завантажити файл "${file.name}".`);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    return false;
  };
}
