import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DocumentMetadataFilters from '@/components/DocumentMetadataFilters.vue';

describe('DocumentMetadataFilters', () => {
  it('emits apply event when Apply button is clicked', async () => {
    const wrapper = mount(DocumentMetadataFilters, {
      global: {
        stubs: {
          VCard: {
            template: '<div><slot /></div>',
          },
          VCardText: {
            template: '<div><slot /></div>',
          },
          VRow: {
            template: '<div><slot /></div>',
          },
          VCol: {
            template: '<div><slot /></div>',
          },
          VTextField: true,
          VSelect: true,
          VBtn: {
            emits: ['click'],
            template: '<button @click="$emit(\'click\')"><slot /></button>',
          },
        },
      },
    });

    const buttons = wrapper.findAll('button');

    await buttons.at(-1)!.trigger('click');

    expect(wrapper.emitted('apply')).toHaveLength(1);
  });
  it('emits clear event when Clear button is clicked', async () => {
    const wrapper = mount(DocumentMetadataFilters, {
      global: {
        stubs: {
          VCard: {
            template: '<div><slot /></div>',
          },
          VCardText: {
            template: '<div><slot /></div>',
          },
          VRow: {
            template: '<div><slot /></div>',
          },
          VCol: {
            template: '<div><slot /></div>',
          },
          VTextField: true,
          VSelect: true,
          VBtn: {
            emits: ['click'],
            template: '<button @click="$emit(\'click\')"><slot /></button>',
          },
        },
      },
    });

    const buttons = wrapper.findAll('button');

    await buttons[0].trigger('click');

    expect(wrapper.emitted('clear')).toHaveLength(1);
  });
});
