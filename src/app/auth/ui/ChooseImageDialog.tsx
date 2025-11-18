import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { UploadUserImageAction } from "../actions/UploadUserImageAction";
import { redirect } from "next/navigation";

type ChooseImageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirect: string;
  initialPreview?: string;
};

export default function ChooseImageDialog({
  open,
  onOpenChange,
  redirect: redirectUrl,
  initialPreview
}: ChooseImageDialogProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialPreview) setPreview(initialPreview);
  }, [initialPreview])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  const handleSendImage = async () => {
    setIsLoading(true);
    UploadUserImageAction(file!, redirectUrl);
    setIsLoading(false);

    onOpenChange(false);
  }

  const handleClose = (openState: boolean) => {
    onOpenChange(openState);

    if (!openState && !isLoading) {
      redirect(redirectUrl);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm p-16 ">
        <DialogHeader className="text-center space-y-1">
          <DialogTitle className="text-xl font-semibold text-center">
            Escolha sua imagem de perfil
          </DialogTitle>
          <DialogDescription className="text-sm text-center">
            Selecione uma imagem para representar você na plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-12 items-center mt-3">
          <div className="flex flex-col gap-6 items-center">
            {preview ? (
                <Image
                src={preview}
                alt="Preview"
                width={140}
                height={140}
                className="rounded-full object-cover h-36 w-36 border shadow-md transition-all"
                />
            ) : (
                <div className="h-36 w-36 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border shadow-sm text-sm">
                Nenhuma imagem
                </div>
            )}

            <Button asChild className="w-full font-medium" variant={"secondary"} disabled={isLoading}>
                <Label className="cursor-pointer flex items-center justify-center gap-2 py-2">
                Selecionar imagem
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
                </Label>
            </Button>
          </div>

          <DialogFooter className="w-full flex gap-3 justify-end">
            <Button
              disabled={!file || isLoading}
              onClick={handleSendImage}
              className="font-medium"
            >
              Salvar imagem
            </Button>

            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                setFile(null);
                setPreview(null);
              }}
              className="font-medium"
            >
              Remover
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
