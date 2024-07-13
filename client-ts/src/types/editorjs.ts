export interface ImageUploadSuccess {
  success: number;
  file: {
    url: string;
  };
}

export interface ImageUploadFailure {
  success: number;
  message: string;
}
