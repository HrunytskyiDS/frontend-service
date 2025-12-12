import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { finalize, switchMap } from 'rxjs';

import { DEFAULT_QUERY_VALUES, QUERY_PARAMS } from '@/pages/saved/saved.constants';
import { TextItemResponse } from '@/pages/saved/saved.models';
import { SavedService } from '@/pages/saved/saved.service';
import { stringToNumber } from '@/shared/common/type-converters.utils';
import { PagedList } from '@/shared/models/pagination.models';

@Component({
  selector: 'app-saved',
  imports: [DatePipe, RouterLink, NzListModule, NzTypographyModule, NzPaginationModule],
  templateUrl: './saved.page.html',
  styleUrl: './saved.page.scss',
})
export class SavedPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private savedService = inject(SavedService);

  isTextsLoading = signal(true);
  texts = signal<PagedList<TextItemResponse> | null>(null);

  page = signal<number>(DEFAULT_QUERY_VALUES.PAGE);
  pageSize = signal<number>(DEFAULT_QUERY_VALUES.PAGE_SIZE);

  ngOnInit(): void {
    const subscription = this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.isTextsLoading.set(true);

          const page = stringToNumber(params.get(QUERY_PARAMS.PAGE), this.page());
          const pageSize = stringToNumber(params.get(QUERY_PARAMS.PAGE_SIZE), this.pageSize());

          this.page.set(page);
          this.pageSize.set(pageSize);

          return this.savedService.loadTexts({ page, pageSize }).pipe(finalize(() => this.isTextsLoading.set(false)));
        }),
      )
      .subscribe((response) => this.texts.set(response));

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onPageIndexChange(page: number) {
    this.router.navigate([], { queryParams: { p: page }, queryParamsHandling: 'merge' });
  }
}
