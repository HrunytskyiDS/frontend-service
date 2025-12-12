import { Component, computed, input, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-show-more',
  imports: [NzButtonModule],
  templateUrl: './show-more.component.html',
  styleUrl: './show-more.component.scss',
})
export class ShowMoreComponent {
  text = input.required<string>();
  limit = input(512);

  isExpanded = signal(false);

  isLong = computed(() => this.text().length > this.limit());

  visibleText = computed(() =>
    this.isExpanded() || !this.isLong() ? this.text() : this.text().substring(0, this.limit()) + '...',
  );

  toggle() {
    this.isExpanded.update((prevIsExpanded) => !prevIsExpanded);
  }
}
