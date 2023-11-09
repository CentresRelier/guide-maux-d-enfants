import { defineStore } from 'pinia';

export const useSearchBarStore = defineStore({
  id: 'searchBar',
  state: () => ({
    finalSearch: {},
    inputQuery: '',
  }),

  getters: {
    getSearchResult: (state) => state.finalSearch,
    getInputQuery: (state) => state.inputQuery,
  },

  actions: {
    setSearchResult(search) {
      this.finalSearch = search;
    },
    setInputQuery(query) {
      this.inputQuery = query;
    },
    removeSearch() {
      this.finalSearch = {};
    },
  },
});
