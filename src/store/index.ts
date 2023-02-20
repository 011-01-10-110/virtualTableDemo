import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
  }),
  getters: {
    getName(state) {
      return state.name;
    },
  },
  actions: {
    setName() {
      this.name = '123';
    },
  },
});
