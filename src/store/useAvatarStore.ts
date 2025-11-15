import { create } from "zustand";

type AvatarCacheType = {
  [userId: string]: { url: string; expiresAt: number };
};

type AvatarStore = {
  avatars: AvatarCacheType;
  setAvatar: (userId: string, url: string, expiresAt: number) => void;
};

export const useAvatarStore = create<AvatarStore>((set) => ({
  avatars: {},
  setAvatar: (userId, url, expiresAt) =>
    set((state) => ({
      avatars: {
        ...state.avatars,
        [userId]: { url, expiresAt },
      },
    })),
}));
