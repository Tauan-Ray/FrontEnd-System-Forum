import HomeActionsSection from "./ui/home/HomeActionsSection";
import OneQuestion from "./questions/ui/OneQuestion";

export default function HomePage() {
  return (
    <div className="pt-20 md:pt-28 flex flex-col items-center gap-8 px-4 sm:px-0">
      <HomeActionsSection />

      <div className="flex flex-col pt-16 md:pt-32 gap-9 w-full sm:w-8/12">
        <h2 className="text-center font-mono font-bold text-3xl sm:text-4xl text-gray-dark">
          Perguntas Recentes
        </h2>

        <div className="flex flex-col gap-6">
          <OneQuestion
            username="_tauankk"
            DT_CR={new Date()}
            title="Como criar uma API segura com Node.js e JWT"
            category="Des. Backend"
            description="Estou desenvolvendo uma API em Node.js e quero implementar autenticação usando JSON Web Tokens (JWT). Gostaria de saber quais são as melhores práticas para proteger as rotas, armazenar o token de forma segura e evitar vulnerabilidades. Também aceito dicas sobre middleware e bibliotecas recomendadas."
          />
        </div>
      </div>
    </div>
  );
}
