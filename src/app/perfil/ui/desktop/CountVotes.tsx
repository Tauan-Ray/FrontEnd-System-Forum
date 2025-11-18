import { ThumbsDown, ThumbsUp } from "lucide-react";
import InfoCard from "./InfoCards";
import { useEffect, useState } from "react";
import { getAllVotesUser } from "../../lib/sessions";
import { useAuthStore } from "@/store/useAuthStore";

export default function CountVotes() {
  const user = useAuthStore((prev) => prev.user);
  const [votes, setVotes] = useState<{
    likes: number;
    dislikes: number;
  } | null>(null);

  useEffect(() => {
    if (!user) return;
    getAllVotesUser(user.ID_USER).then((res) => {
      if (res?.data) {
        setVotes(res.data);
      }
    });
  }, [user]);

  return (
    <>
      <InfoCard
        title="Likes"
        value={votes?.likes ?? 0}
        icon={<ThumbsUp className="w-6 h-6 text-blue-primary" />}
      />

      <InfoCard
        title="Dislikes"
        value={votes?.dislikes ?? 0}
        icon={<ThumbsDown className="w-6 h-6 text-blue-dark" />}
      />
    </>
  );
}
