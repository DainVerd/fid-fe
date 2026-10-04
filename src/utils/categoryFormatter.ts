import { DocumentCategory } from '../models/enums/documentCategory';

const categoryDisplayMap = new Map<number, string>([
  [DocumentCategory.Public, 'Public'],
  [DocumentCategory.Restricted, 'Restricted'],
  [DocumentCategory.Internal, 'Internal'],
  [DocumentCategory.Confidential, 'Confidential'],
]);

export const formatCategoryName = (category: number | null | undefined): string => {
  if (!category && category !== 0) return 'No Category';

  return categoryDisplayMap.get(category) || category.toString();
};
