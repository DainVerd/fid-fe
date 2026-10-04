<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <h1 class="text-h4 mb-6">
          Document Metadata
        </h1>

        <v-alert v-if="error" type="error" class="mb-4">
          {{ error }}
        </v-alert>

        <v-data-table-server :headers="headers" :items="documents" :items-length="totalCount" :loading="loading"
          :page="pagination.pageNumber" :items-per-page="pagination.pageSize" @update:page="handlePageChange"
          @update:sort-by="handleSortChange" @update:items-per-page="handleItemsPerPageChange">
          <template #item.createdAt="{ item }">
            {{ formatDate(item.createdAt, true) }}
          </template>

          <template #item.estimatedReadingMinutes="{ item }">
            {{ formatEstimateReadingMinutes(item.estimatedReadingMinutes) }}
          </template>

          <template #item.isActive="{ item }">
            <v-chip :color="item.isActive ? 'success' : 'grey'" size="small">
              {{ item.isActive ? 'Active' : 'Inactive' }}
            </v-chip>
          </template>

          <template #item.url="{ item }">
            <v-btn :href="item.url" target="_blank" variant="text" size="small">
              Open
            </v-btn>
          </template>

          <template #item.importance="{ item }">
            {{ formatImportanceLevelName(item.importance) }}
          </template>

          <template #item.category="{ item }">
            {{ formatCategoryName(item.category) }}
          </template>
        </v-data-table-server>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { documentMetadataService } from '@/services/documentMetadataService';
import type { DocumentMetadata } from '@/models/documentMetadata';
import type { DocumentMetadataFilter } from '@/models/filters/documentMetadataFilter';
import type { PaginationParams } from '@/models/paginationParams';
import { formatDate } from './utils/dateFormatter';
import { formatImportanceLevelName } from './utils/importanceformatter';
import { formatCategoryName } from './utils/categoryFormatter';
import { formatEstimateReadingMinutes } from './utils/estimateREadingMinutesFormatter';

const documents = ref<DocumentMetadata[]>([]);
const totalCount = ref(0);
const loading = ref(false);
const error = ref<string | null>(null);
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([
  {
    key: 'createdAt',
    order: 'desc',
  },
]);

const pagination = ref<PaginationParams>({
  pageNumber: 1,
  pageSize: 10,
  sortBy: 'createdAt',
  isDescending: true,
});

const filter = ref<DocumentMetadataFilter>({});

const headers = [
  {
    title: 'Title',
    key: 'title',
    sortable: true
  },
  {
    title: 'Responsible unit',
    key: 'responsibleUnit',
    sortable: true
  },
  {
    title: 'Created at',
    key: 'createdAt',
    sortable: true
  },
  {
    title: 'File type',
    key: 'fileType',
    sortable: true
  },
  {
    title: 'Reading time',
    key: 'estimatedReadingMinutes',
    sortable: true
  },
  {
    title: 'Importance',
    key: 'importance',
    sortable: true
  },
  {
    title: 'Category',
    key: 'category',
    sortable: true
  },
  {
    title: 'Active',
    key: 'isActive',
    sortable: false
  },
  { title: 'Document', key: 'url', sortable: false },
];

async function loadDocuments(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const result = await documentMetadataService.getDocuments(
      filter.value,
      pagination.value,
    );

    documents.value = result.items;
    totalCount.value = result.totalCount;
  } catch {
    error.value = 'Failed to load documents.';
  } finally {
    loading.value = false;
  }
}

function handlePageChange(page: number): void {
  pagination.value.pageNumber = page;
  loadDocuments();
}

function handleItemsPerPageChange(pageSize: number): void {
  pagination.value.pageSize = pageSize;
  pagination.value.pageNumber = 1;

  loadDocuments();
}

function handleSortChange(
  value: { key: string; order: 'asc' | 'desc' }[],
): void {
  const sort = value[0];

  if (!sort) {
    pagination.value.sortBy = undefined;
    pagination.value.isDescending = false;
  } else {
    pagination.value.sortBy = sort.key;
    pagination.value.isDescending = sort.order === 'desc';
  }

  pagination.value.pageNumber = 1;

  loadDocuments();
}

onMounted(loadDocuments);
</script>