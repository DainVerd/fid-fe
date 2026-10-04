import type { DocumentCategory } from '../enums/documentCategory';
import type { ImportanceLevel } from '../enums/importanceLevel';

export interface DocumentMetadataFilter {
  search?: string;
  responsibleUnit?: string;
  fileType?: string;
  importance?: ImportanceLevel;
  category?: DocumentCategory;
  isActive?: boolean;
}
