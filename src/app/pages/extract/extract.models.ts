interface BaseUploadResponse {
  text_id: number;
}

export interface UploadFileRequest {
  file: File | undefined;
}

export interface UploadFileResponse extends BaseUploadResponse {}

export interface UploadUrlRequest {
  url: string;
}

export interface UploadUrlResponse extends BaseUploadResponse {}

export interface UploadInputRequest {
  input: string;
}

export interface UploadInputResponse extends BaseUploadResponse {}
