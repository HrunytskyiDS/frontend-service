import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AnalysisResultItemResponse,
  AnalysisResultResponse,
  LoadAnalysisResultsRequest,
} from '@/pages/saved/saved.models';
import { SERVICE_PREFIXES } from '@/shared/constants/api.constants';
import { CACHE_TAGS } from '@/shared/constants/cache.constants';
import { buildHttpContextWithCache } from '@/shared/interceptors/cache.interceptor';
import { PagedList } from '@/shared/models/pagination.models';

@Injectable({
  providedIn: 'root',
})
export class SavedService {
  private httpClient = inject(HttpClient);

  loadAnalysisResults({
    pageSize,
    ...request
  }: LoadAnalysisResultsRequest): Observable<PagedList<AnalysisResultItemResponse>> {
    return this.httpClient.get<PagedList<AnalysisResultItemResponse>>(`${SERVICE_PREFIXES.TEXT_ANALYSIS}/analysis`, {
      context: buildHttpContextWithCache({ providesTags: [CACHE_TAGS.TEXTS] }),
      params: { page_size: pageSize, ...request },
    });
  }

  loadAnalysisResultById(id: number): Observable<AnalysisResultResponse> {
    return this.httpClient.get<AnalysisResultResponse>(`${SERVICE_PREFIXES.TEXT_ANALYSIS}/analysis/${id}`, {
      context: buildHttpContextWithCache(),
    });
  }
}
