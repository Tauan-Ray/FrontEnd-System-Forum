import { UserProps } from "@/app/auth/lib/sessions";
import { MessageSquare, HelpCircle } from "lucide-react";
import InfoCard from "./InfoCards";
import CountVotes from "./CountVotes";

export default function StatisticsCards({ user }: { user: UserProps | null }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-6">
      <InfoCard
        title="Perguntas criadas"
        value={user?._count.Question ?? 0}
        icon={<HelpCircle className="w-6 h-6 text-blue-primary" />}
      />

      <InfoCard
        title="Respostas enviadas"
        value={user?._count.Answers ?? 0}
        icon={<MessageSquare className="w-6 h-6 text-blue-dark" />}
      />

      <CountVotes />
    </div>
  );
}
