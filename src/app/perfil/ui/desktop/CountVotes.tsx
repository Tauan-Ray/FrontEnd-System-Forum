import { ThumbsDown, ThumbsUp } from "lucide-react";
import InfoCard from "./InfoCards";

export default function CountVotes() {
  return (
    <>
      <InfoCard
        title="Likes"
        value={0}
        icon={<ThumbsUp className="w-6 h-6 text-blue-primary" />}
      />

      <InfoCard
        title="Dislikes"
        value={0}
        icon={<ThumbsDown className="w-6 h-6 text-blue-dark" />}
      />
    </>
  );
}
