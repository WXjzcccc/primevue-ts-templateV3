import { defineStore } from 'pinia';

interface PageDataState {
  dashboardStore: any | null;
  isCardCollapsed: boolean | null;
}

export const usePageDataStore = defineStore('pageData', {
  state: (): PageDataState => ({
    dashboardStore: null,
    isCardCollapsed: null,
  }),
  actions: {
    setCardCollapsed(collapsed: boolean) {
      this.isCardCollapsed = collapsed;
    },

    getCardCollapsed(): boolean {
      return this.isCardCollapsed || false;
    }
  },
});