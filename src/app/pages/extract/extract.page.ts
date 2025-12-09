import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NzSegmentedModule, NzSegmentedOption } from 'ng-zorro-antd/segmented';
import { filter } from 'rxjs';

import { ExtractResultComponent } from '@/pages/extract/extract-result/extract-result.component';

@Component({
  selector: 'app-extract',
  imports: [FormsModule, RouterOutlet, NzSegmentedModule, ExtractResultComponent],
  templateUrl: './extract.page.html',
  styleUrl: './extract.page.scss',
})
export class ExtractPage implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  segmentedOptions: NzSegmentedOption[] = [
    { label: 'Ввести текст', value: '/extract/input', icon: 'edit' },
    { label: 'Завантажити файл', value: '/extract', icon: 'file-text' },
    { label: 'Вставити посилання', value: '/extract/url', icon: 'link' },
  ];

  segmentedValue = signal(this.router.url);

  ngOnInit(): void {
    const subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => this.segmentedValue.set(event.urlAfterRedirects));

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSegmentedChange(route: string) {
    this.router.navigate([route]);
  }
}
