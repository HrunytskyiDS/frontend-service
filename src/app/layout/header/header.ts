import { Component, model } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-header',
  imports: [NzIconModule, NzMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isCollapsed = model.required<boolean>();

  onTriggerClick() {
    this.isCollapsed.update((prevIsCollapsed) => !prevIsCollapsed);
  }
}
