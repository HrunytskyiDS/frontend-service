import { Component, inject } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-extract-file',
  imports: [NzIconModule, NzUploadModule],
  templateUrl: './extract-file.html',
  styleUrl: './extract-file.scss',
})
export class ExtractFile {
  private messageService = inject(NzMessageService);

  onChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;

    console.log('status:', status);

    if (status !== 'uploading') {
      console.log(file, fileList);
    }

    if (status === 'done') {
      this.messageService.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.messageService.error(`${file.name} file upload failed.`);
    }
  }
}
