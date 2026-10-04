import type { GenericAbortSignal } from 'axios';
import { apiClient } from '../api/apiClient';
import type { DocumentMetadata } from '@/models/documentMetadata';
import type { DocumentMetadataFilter } from '@/models/filters/documentMetadataFilter';
import type { PaginationParams } from '@/models/paginationParams';
import type { PaginatedList } from '@/models/paginatedList';

export const documentMetadataService = {
  async getDocuments(
    filter: DocumentMetadataFilter,
    pagination: PaginationParams,
    signal?: GenericAbortSignal,
  ): Promise<PaginatedList<DocumentMetadata>> {
    const response = await apiClient.get<PaginatedList<DocumentMetadata>>('/api/v1/documents', {
      params: {
        ...filter,
        ...pagination,
      },
      signal,
    });

    return response.data;
  },
};
