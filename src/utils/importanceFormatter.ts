import { ImportanceLevel } from '../models/enums/importanceLevel';

const importanceDisplayMap = new Map<number, string>([
  [ImportanceLevel.Low, 'Low'],
  [ImportanceLevel.Medium, 'Medium'],
  [ImportanceLevel.High, 'High'],
  [ImportanceLevel.Critical, 'Critical'],
]);

export const formatImportanceLevelName = (importanceLevel: number | null | undefined): string => {
  if (!importanceLevel && importanceLevel !== 0) return 'No Gender';

  return importanceDisplayMap.get(importanceLevel) || importanceLevel.toString();
};
