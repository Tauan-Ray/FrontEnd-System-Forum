"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type PasswordChecklistProps = {
  password: string;
};

export default function PasswordChecklist({ password }: PasswordChecklistProps) {
  const hasMinLength = password.length >= 8;
  const hasMaxLength = password.length <= 20;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const requirements = [
    { label: "Entre 8 e 20 caracteres", met: hasMinLength && hasMaxLength },
    { label: "Pelo menos 1 letra", met: hasLetter },
    { label: "Pelo menos 1 número", met: hasNumber },
  ];

  return (
    <div className="mt-2 text-sm space-y-1 font-mono ml-2">
      {requirements.map((req) => (
        <div
          key={req.label}
          className={cn(
            "flex items-center gap-2 transition-colors",
            req.met ? "text-green-600" : "text-zinc-500"
          )}
        >
          {req.met ? (
            <CheckCircle2 size={16} className="text-green-600" />
          ) : (
            <Circle size={16} className="text-zinc-400" />
          )}
          <span>{req.label}</span>
        </div>
      ))}
    </div>
  );
}
