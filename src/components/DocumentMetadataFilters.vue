<template>
    <v-card class="mb-6" variant="outlined">
        <v-card-text>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="filter.search" label="Search by Title" clearable hide-details />
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="filter.responsibleUnit" label="Responsible unit" clearable hide-details />
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="filter.fileType" label="File type" clearable hide-details />
                </v-col>

                <v-col cols="12" md="4">
                    <v-select v-model="filter.importance" :items="importanceOptions" label="Importance" clearable
                        hide-details />
                </v-col>

                <v-col cols="12" md="4">
                    <v-select v-model="filter.category" :items="categoryOptions" label="Category" clearable
                        hide-details />
                </v-col>

                <v-col cols="12" md="4">
                    <v-select v-model="filter.isActive" :items="activeOptions" label="Status" clearable hide-details />
                </v-col>
            </v-row>

            <div class="d-flex justify-end ga-2 mt-4">
                <v-btn variant="text" @click="clearFilters">
                    Clear
                </v-btn>

                <v-btn color="primary" @click="applyFilters">
                    Apply
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import type { DocumentMetadataFilter } from '@/models/filters/documentMetadataFilter';
import { ImportanceLevel } from '@/models/enums/importanceLevel';
import { DocumentCategory } from '@/models/enums/documentCategory';

const emit = defineEmits<{
    apply: [filter: DocumentMetadataFilter];
    clear: [];
}>();

const filter = reactive<DocumentMetadataFilter>({
    search: undefined,
    responsibleUnit: undefined,
    fileType: undefined,
    importance: undefined,
    category: undefined,
    isActive: undefined,
});

const importanceOptions = [
    { title: 'Low', value: ImportanceLevel.Low },
    { title: 'Medium', value: ImportanceLevel.Medium },
    { title: 'High', value: ImportanceLevel.High },
    { title: 'Critical', value: ImportanceLevel.Critical },
];

const categoryOptions = [
    { title: 'Public', value: DocumentCategory.Public },
    { title: 'Internal', value: DocumentCategory.Internal },
    { title: 'Restricted', value: DocumentCategory.Restricted },
    { title: 'Confidential', value: DocumentCategory.Confidential },
];

const activeOptions = [
    { title: 'Active', value: true },
    { title: 'Inactive', value: false },
];

function applyFilters(): void {
    emit('apply', { ...filter });
}

function clearFilters(): void {
    filter.search = undefined;
    filter.responsibleUnit = undefined;
    filter.fileType = undefined;
    filter.importance = undefined;
    filter.category = undefined;
    filter.isActive = undefined;

    emit('clear');
}
</script>