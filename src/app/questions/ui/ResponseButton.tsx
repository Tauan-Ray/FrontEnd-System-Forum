"use client"

import { getUser } from "@/app/auth/lib/sessions";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseButtonProps = {
    idQuestion: string;
    onOpenModal?: () => void;
}

export default function ResponseButton ({ idQuestion, onOpenModal }: ResponseButtonProps) {
    const router = useRouter();
    const pathname = usePathname();

    async function handleOpenResponseBox() {
        const user = await getUser();

        if (user?.message) {
            toast.warning("Você precisa estar logado para responder uma pergunta", {
                description: "Faça login para continuar.",
            });
            return;
        }

        if (pathname.includes(`/questions/${idQuestion}`)) {
            onOpenModal?.();
            return
        }

        router.push(`/questions/${idQuestion}?response=true`);

    }

    return (
        <div className="flex justify-end">
            <Button onClick={handleOpenResponseBox} className="p-4 text-sm sm:text-base w-full sm:w-auto">
                Responder
            </Button>
        </div>
    )
}
