import { Component, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-sider',
  imports: [RouterLink, NzIconModule, NzMenuModule],
  templateUrl: './sider.component.html',
  styleUrl: './sider.component.scss',
})
export class SiderComponent {
  isCollapsed = model.required<boolean>();
}
