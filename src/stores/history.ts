import { IHistory } from "@/types";
import { defineStore } from "pinia";

interface IState {
  histories: IHistory[];
}

export const useHistoryStore = defineStore("history", {
  state: (): IState => ({
    histories: [],
  }),
  actions: {
    addHistory(history: IHistory) {
      this.histories.push(history);
    },
  },
  persist: true,
});
