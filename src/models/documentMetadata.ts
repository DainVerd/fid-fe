import type { DocumentCategory } from './enums/documentCategory';
import type { ImportanceLevel } from './enums/importanceLevel';

export interface DocumentMetadata {
  id: number;
  title: string;
  description?: string | null;
  responsibleUnit: string;
  createdAt: string;
  url: string;
  fileType: string;
  estimatedReadingMinutes: number;
  importance: ImportanceLevel;
  category: DocumentCategory;
  isActive: boolean;
}
