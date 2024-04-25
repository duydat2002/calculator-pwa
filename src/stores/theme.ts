import { defineStore } from "pinia";

interface IState {
  theme: "light" | "dark";
}

export const useThemeStore = defineStore("theme", {
  state: (): IState => ({
    theme: "light",
  }),
  actions: {
    setTheme(value: "light" | "dark") {
      this.theme = value;
    },
  },
});
