import { useEffect, useState } from "react";
import { useAvatarStore } from "@/store/useAvatarStore";

export function useAvatar(userId: string) {
  const { avatars, setAvatar } = useAvatarStore();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setUrl(null);
      return;
    }

    const cached = avatars[userId];
    if (cached && cached.expiresAt > Date.now()) {
      setUrl(cached.url);
      return;
    }

    fetch(`/api/avatar/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.url) {
          setUrl(data.url);
          setAvatar(userId, data.url, Date.now() + 3600 * 1000);
        } else {
          setUrl(null);
        }
      })
      .catch(() => setUrl(null));
  }, [userId, avatars, setAvatar]);

  return url;
}
