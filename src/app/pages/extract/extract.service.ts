import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  UploadFileRequest,
  UploadFileResponse,
  UploadInputRequest,
  UploadInputResponse,
  UploadUrlRequest,
  UploadUrlResponse,
} from '@/pages/extract/extract.models';
import { SERVICE_PREFIXES } from '@/shared/constants/api.constants';
import { CACHE_TAGS } from '@/shared/constants/cache.constants';
import { buildHttpContextWithCache } from '@/shared/interceptors/cache.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ExtractService {
  private httpClient = inject(HttpClient);

  uploadFile(request: UploadFileRequest): Observable<UploadFileResponse> {
    const formData = new FormData();
    formData.append('file', request.file as Blob);

    return this.httpClient.post<UploadFileResponse>(`${SERVICE_PREFIXES.TEXT_EXTRACTOR}/extractors/file`, formData, {
      context: buildHttpContextWithCache({ invalidatesTags: [CACHE_TAGS.TEXTS] }),
    });
  }

  uploadUrl(request: UploadUrlRequest): Observable<UploadUrlResponse> {
    return this.httpClient.post<UploadUrlResponse>(`${SERVICE_PREFIXES.TEXT_EXTRACTOR}/extractors/url`, null, {
      context: buildHttpContextWithCache({ invalidatesTags: [CACHE_TAGS.TEXTS] }),
      params: { url: request.url },
    });
  }

  uploadInput(request: UploadInputRequest): Observable<UploadInputResponse> {
    return this.httpClient.post<UploadInputResponse>(`${SERVICE_PREFIXES.TEXT_EXTRACTOR}/extractors/input`, request, {
      context: buildHttpContextWithCache({ invalidatesTags: [CACHE_TAGS.TEXTS] }),
    });
  }
}
