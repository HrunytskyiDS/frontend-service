import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
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

  topN = signal<number>(10);
  diversity = signal<number>(1.0);
  useSemanticN = signal<boolean>(false);

  changeTextId(textId: number | null): void {
    this.textId.next(textId);
  }

  resetTextId(): void {
    this.changeTextId(null);
  }

  processText({ textId, ...request }: ProcessTextRequest): Observable<ProcessTextResponse> {
    return this.httpClient.post<ProcessTextResponse>(
      `${SERVICE_PREFIXES.TEXT_ANALYSIS}/analysis/${textId}/process`,
      request,
      {
        params: {
          top_n: this.topN(),
          diversity: this.diversity(),
          use_semantic_n: this.useSemanticN(),
        },
      },
    );
  }
}
