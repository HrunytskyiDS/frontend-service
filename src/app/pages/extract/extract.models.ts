export interface UploadFileRequest {
  file: File | undefined;
}

export interface UploadFileResponse {
  text_id: number;
}

export interface ProcessTextRequest {
  textId: number;
}

export interface ProcessTextResponse {
  text_id: number;
  keywords: string[];
  summary: string;
}
