export interface LoadTextsRequest {
  page: number;
  pageSize: number;
}

export interface TextItemResponse {
  id: number;
  content: string;
  created_at: string;
}

export interface TextResponse {
  id: number;
  title: string;
  content: string;
  language: string;
  source_type: string;
  created_at: string;
}
