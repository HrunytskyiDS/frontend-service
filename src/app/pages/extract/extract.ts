import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NzSegmentedModule, NzSegmentedOption } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'app-extract',
  imports: [FormsModule, RouterOutlet, NzSegmentedModule],
  templateUrl: './extract.html',
  styleUrl: './extract.scss',
})
export class Extract {
  private router = inject(Router);

  segmentedValue = signal(this.router.url);

  segmentedOptions: NzSegmentedOption[] = [
    { label: 'Завантажити файл', value: '/extract', icon: 'file-text' },
    { label: 'Вставити посилання', value: '/extract/url', icon: 'link' },
  ];

  onSegmentedChange(route: string) {
    this.router.navigate([route]);
  }
}
