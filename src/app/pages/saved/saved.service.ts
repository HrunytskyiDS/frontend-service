import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadTextsRequest, TextItemResponse, TextResponse } from '@/pages/saved/saved.models';
import { SERVICE_PREFIXES } from '@/shared/constants/api.constants';
import { CACHE_TAGS } from '@/shared/constants/cache.constants';
import { buildHttpContextWithCache } from '@/shared/interceptors/cache.interceptor';
import { PagedList } from '@/shared/models/pagination.models';

@Injectable({
  providedIn: 'root',
})
export class SavedService {
  private httpClient = inject(HttpClient);

  loadTexts({ pageSize, ...request }: LoadTextsRequest): Observable<PagedList<TextItemResponse>> {
    return this.httpClient.get<PagedList<TextItemResponse>>(`${SERVICE_PREFIXES.TEXT_ANALYSIS}/texts`, {
      context: buildHttpContextWithCache({ providesTags: [CACHE_TAGS.TEXTS] }),
      params: { page_size: pageSize, ...request },
    });
  }

  loadTextById(id: number): Observable<TextResponse> {
    return this.httpClient.get<TextResponse>(`${SERVICE_PREFIXES.TEXT_ANALYSIS}/texts/${id}`, {
      context: buildHttpContextWithCache(),
    });
  }
}
