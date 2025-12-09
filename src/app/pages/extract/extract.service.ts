import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  ProcessTextRequest,
  ProcessTextResponse,
  UploadFileRequest,
  UploadFileResponse,
  UploadInputRequest,
  UploadInputResponse,
  UploadUrlRequest,
  UploadUrlResponse,
} from '@/pages/extract/extract.models';
import { SERVICE_PREFIXES } from '@/shared/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ExtractService {
  private httpClient = inject(HttpClient);
  private textId = new BehaviorSubject<number | null>(null);

  textId$ = this.textId.asObservable();

  changeTextId(textId: number | null): void {
    this.textId.next(textId);
  }

  uploadFile(request: UploadFileRequest): Observable<UploadFileResponse> {
    const formData = new FormData();
    formData.append('file', request.file as Blob);

    return this.httpClient.post<UploadFileResponse>(`${SERVICE_PREFIXES.TEXT_EXTRACTOR}/extractors/file`, formData);
  }

  uploadUrl(request: UploadUrlRequest): Observable<UploadUrlResponse> {
    return this.httpClient.post<UploadUrlResponse>(`${SERVICE_PREFIXES.TEXT_EXTRACTOR}/extractors/url`, null, {
      params: { url: request.url },
    });
  }

  uploadInput(request: UploadInputRequest): Observable<UploadInputResponse> {
    return this.httpClient.post<UploadInputResponse>(`${SERVICE_PREFIXES.TEXT_EXTRACTOR}/extractors/input`, request);
  }

  processText({ textId, ...request }: ProcessTextRequest): Observable<ProcessTextResponse> {
    return this.httpClient.post<ProcessTextResponse>(
      `${SERVICE_PREFIXES.TEXT_ANALYSIS}/analysis/${textId}/process`,
      request,
    );
  }
}
