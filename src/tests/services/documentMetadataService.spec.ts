import { describe, expect, it, vi } from 'vitest';
import { apiClient } from '@/api/apiClient';
import { documentMetadataService } from '@/services/documentMetadataService';

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('documentMetadataService', () => {
  it('returns paginated document metadata', async () => {
    const response = {
      data: {
        items: [
          {
            id: 1,
            title: 'AML Guidelines',
            description: 'Test document',
            responsibleUnit: 'Compliance Department',
            createdAt: '2026-10-01T10:00:00Z',
            url: 'https://example.com/document.pdf',
            fileType: 'PDF',
            estimatedReadingMinutes: 15,
            importance: 3,
            category: 2,
            isActive: true,
          },
        ],
        pageNumber: 1,
        totalPages: 1,
        totalCount: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    };

    vi.mocked(apiClient.get).mockResolvedValue(response);

    const filter = {
      search: 'AML',
    };

    const pagination = {
      pageNumber: 1,
      pageSize: 10,
      sortBy: 'title',
      isDescending: false,
    };

    const result = await documentMetadataService.getDocuments(filter, pagination);

    expect(apiClient.get).toHaveBeenCalledExactlyOnceWith(
      '/api/v1/documents',
      expect.objectContaining({
        params: {
          ...filter,
          ...pagination,
        },
      }),
    );

    expect(result).toEqual(response.data);
  });
});
