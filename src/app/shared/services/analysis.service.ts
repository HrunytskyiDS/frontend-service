import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SERVICE_PREFIXES } from '@/shared/constants/api.constants';

export interface ProcessTextRequest {
  textId: number;
}

export interface ProcessTextResponse {
  text_id: number;
  keywords: string[];
  summary: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private httpClient = inject(HttpClient);
  private textId = new BehaviorSubject<number | null>(null);

  textId$ = this.textId.asObservable();

  changeTextId(textId: number | null): void {
    this.textId.next(textId);
  }

  processText({ textId, ...request }: ProcessTextRequest): Observable<ProcessTextResponse> {
    return this.httpClient.post<ProcessTextResponse>(
      `${SERVICE_PREFIXES.TEXT_ANALYSIS}/analysis/${textId}/process`,
      request,
    );
  }
}
