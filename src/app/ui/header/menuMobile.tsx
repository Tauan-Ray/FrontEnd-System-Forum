"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MenuMobile() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Menu size={28} className="text-blue-medium" />
        </button>
      </SheetTrigger>

      <SheetContent className="bg-white w-72 sm:w-80">
        <SheetHeader>
          <SheetTitle>
            <UserCircle2
              size={32}
              className="text-blue-light hover:text-blue-hover transition"
              onClick={() => setOpen(false)}
            />
          </SheetTitle>

          <SheetDescription className="text-xl font-bold text-blue-medium">
            Menu
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-6">
          <Input
            placeholder="Pesquise..."
            className="rounded-lg border border-blue-primary bg-white px-4 py-2 text-base focus:outline-none"
          />

          <Button
            onClick={() => setOpen(false)}
            className="rounded-md px-5 py-3 text-sm font-medium bg-blue-medium hover:bg-blue-hover transition"
          >
            <Link href="/auth/signin">Login</Link>
          </Button>

          <Button
            onClick={() => setOpen(false)}
            className="rounded-md px-5 py-3 text-sm font-medium bg-blue-medium hover:bg-blue-hover transition"
          >
            <Link href="/auth/signup">Cadastro</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
