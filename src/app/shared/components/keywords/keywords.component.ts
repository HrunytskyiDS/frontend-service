import { Component, input } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-keywords',
  imports: [NzFlexModule, NzTagModule],
  templateUrl: './keywords.component.html',
  styleUrl: './keywords.component.scss',
})
export class KeywordsComponent {
  keywords = input.required<string[]>();
}
