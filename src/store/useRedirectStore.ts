import { create } from "zustand";

type RedirectState = {
  openDialog: boolean;
  setOpenDialog: (state: boolean) => void;
};

export const useRedirectStore = create<RedirectState>((set) => ({
  openDialog: false,
  setOpenDialog: (openDialog) => set({ openDialog }),
}));
