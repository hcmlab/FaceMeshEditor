import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/view/slider');
vi.mock('@/view/checkbox');

import Component from '../SidebarContainer.vue';

beforeAll(() => {
  setActivePinia(createPinia());
});

describe('Sidebar Component', () => {
  it('renders component', () => {
    const wrapper = mount(Component);
    expect(wrapper.exists()).toBe(true);
  });
});
