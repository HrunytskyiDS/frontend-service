import { Component, signal } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SiderComponent } from './sider/sider.component';

@Component({
  selector: 'app-layout',
  imports: [NzLayoutModule, HeaderComponent, MainComponent, SiderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isCollapsed = signal(true);
}
