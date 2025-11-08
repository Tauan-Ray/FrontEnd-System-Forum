import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
import HomeActionsSection from "./ui/home/HomeActionsSection";

const HomePage = () => {
  return (
    <div className="pt-20 md:pt-28 flex flex-col items-center gap-8 px-4 sm:px-0">
      <HomeActionsSection />

      <div className="flex flex-col pt-16 md:pt-32 gap-9 w-full sm:w-8/12">
        <h2 className="text-center font-mono font-bold text-3xl sm:text-4xl text-gray-dark">
          Perguntas Recentes
        </h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col border border-gray-dark rounded-md p-4 sm:p-5 gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <div className="flex flex-row gap-3 items-center">
                <UserCircle2
                  size={32}
                  className="text-blue-light hover:text-blue-hover transition"
                />
                <p className="font-sans text-base sm:text-lg text-gray-dark">
                  _tauankk
                </p>
              </div>

              <p className="font-sans text-sm sm:text-md text-gray-dark">
                Pergunta feita em: 30/06/2023
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-mono font-bold text-base sm:text-lg text-blue-primary">
                Como criar uma API segura com Node.js e JWT
              </h3>
              <p className="font-mono text-sm text-blue-primary">
                Categoria: Des. Backend
              </p>
            </div>

            <div className="text-justify">
              <p className="font-sans text-sm sm:text-base text-gray-dark text-justify">
                Estou desenvolvendo uma API em Node.js e quero implementar
                autenticação usando JSON Web Tokens (JWT). Gostaria de saber
                quais são as melhores práticas para proteger as rotas, armazenar
                o token de forma segura e evitar vulnerabilidades. Também aceito
                dicas sobre middleware e bibliotecas recomendadas.
              </p>
            </div>

            <div className="flex justify-end">
              <Button className="p-4 text-sm sm:text-base w-full sm:w-auto">
                Responder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
