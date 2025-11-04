import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon } from "lucide-react";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl">
        <div className="flex items-center justify-center border-b md:border-b-0 md:border-r flex-1">
          <Image
            src="/image-login.png"
            alt="Imagem de login"
            width={500}
            height={500}
            className="w-full h-auto max-w-[500px]"
          />
        </div>

        <div className="flex flex-col bg-[#E0E0E0] p-6 md:p-10 flex-1 items-center justify-center">
          <h1 className="text-3xl text-gray-dark text-center font-mono font-bold mb-12">
            Entrar
          </h1>

          <div className="flex flex-col items-center w-full px-4 md:px-0">
            <div className="flex flex-col gap-5 w-full text-sm md:text-md">
              <Input
                placeholder="E-mail"
                className="w-full font-mono font-bold text-md"
              />

              <div className="relative w-full">
                <Input
                  type="password"
                  placeholder="Senha"
                  className="w-full pr-12 font-mono font-bold text-md"
                />
                <EyeIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer w-6 h-6" />
              </div>
              <div className="flex flex-col w-full items-center">
                <Button className="text-white py-5 w-4/5 md:w-2/5 text-md md:text-lg md:py-6">
                  Login
                </Button>

                <div className="flex flex-col md:flex-row text-md font-sans font-bold gap-2 mt-3 text-center">
                  <span>Não tem uma conta?</span>
                  <span className="text-blue-primary hover:underline">
                    Crie Agora!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
