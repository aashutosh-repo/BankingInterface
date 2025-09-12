export interface FileMetadata {
  id: number;
  fileName: string;
  uploadedBy: string;
  status: string;
  fileSizeBytes: number;
  uploadedAt: Date;
  paginator?: any;
}
