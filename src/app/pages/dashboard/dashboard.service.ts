import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { StatsResponse } from '@/pages/dashboard/dashboard.models';
import { SERVICE_PREFIXES } from '@/shared/constants/api.constants';
import { CACHE_TAGS } from '@/shared/constants/cache.constants';
import { buildHttpContextWithCache } from '@/shared/interceptors/cache.interceptor';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private httpClient = inject(HttpClient);

  loadStats(): Observable<StatsResponse> {
    return this.httpClient.get<StatsResponse>(`${SERVICE_PREFIXES.TEXT_ANALYSIS}/stats`, {
      context: buildHttpContextWithCache({ providesTags: [CACHE_TAGS.ANALYSIS, CACHE_TAGS.TEXTS] }),
    });
  }
}
