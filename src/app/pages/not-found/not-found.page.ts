import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, NzButtonModule, NzResultModule],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
})
export class NotFoundPage {}
