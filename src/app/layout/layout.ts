import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { Header } from './header/header';
import { Main } from './main/main';

@Component({
  selector: 'app-layout',
  imports: [NzLayoutModule, Header, Main],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
