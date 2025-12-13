export interface LoadAnalysisResultsRequest {
  page: number;
  pageSize: number;
}

export interface AnalysisResultItemResponse {
  id: number;
  title: string;
  content: string;
  n_final: number;
  diversity: number;
  use_semantic_n: boolean;
  created_at: string;
}

export interface AnalysisResultResponse {
  id: number;
  title: string;
  content: string;
  keywords: string[];
  summary_text: string;
  n_final: number;
  diversity: number;
  use_semantic_n: boolean;
  source_type: string;
  created_at: string;
}
