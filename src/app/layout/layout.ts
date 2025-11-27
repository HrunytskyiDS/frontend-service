import { Component, signal } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { Header } from './header/header';
import { Main } from './main/main';
import { Sider } from './sider/sider';

@Component({
  selector: 'app-layout',
  imports: [NzLayoutModule, Header, Main, Sider],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  isCollapsed = signal(true);
}
