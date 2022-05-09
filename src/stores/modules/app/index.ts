import { defineStore } from "pinia";
import defaultSettings from "@/config/settings.json";
import { AppState } from "./types";

const useAppStore = defineStore("app", {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
  },
});

export default useAppStore;
