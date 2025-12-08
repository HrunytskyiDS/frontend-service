import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-extract-url',
  imports: [FormsModule, NzIconModule, NzInputModule],
  templateUrl: './extract-url.component.html',
  styleUrl: './extract-url.component.scss',
})
export class ExtractUrlComponent {
  readonly value = signal('');

  onSearch(event: NzInputSearchEvent): void {
    console.log(event);
  }
}
