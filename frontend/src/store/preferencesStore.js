import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const preferencesStore = create((set, get) => ({
  userProfile: null,
  isSaving: false,

  getUserPreferences: async () => {
    try {
      const res = await axiosInstance.get("/preferences/get-preferences");
      set({ userProfile: res.data.message });
      return res.data.message;
    } catch (error) {
      console.log("Error getUserPreferences (front):", error);
      return;
    }
  },

  setPreferences: async (data) => {
    set({ isSaving: true });
    try {
      const res = await axiosInstance.post(
        "/preferences/add-preferences",
        data
      );
      console.log(res);
    } catch (error) {
      console.log("Error setUserPreferences (front): ", error);
      set({ isSaving: false });
      return;
    } finally {
      set({ isSaving: false });
    }
  },
}));
