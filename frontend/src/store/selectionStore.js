import { create } from "zustand";

export const selectionStore = create((set, get) => ({
  moodSelection: null,
  goalSelection: null,

  setMood: async (mood) => {
    set({ moodSelection: mood });
  },

  setGoal: async (goal) => {
    set({ goalSelection: goal });
  },
}));
