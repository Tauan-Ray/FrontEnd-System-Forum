import { AlertTriangle } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Algo deu errado",
  message = "Não foi possível carregar os dados. Tente novamente em instantes.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-10 animate-fadeIn">
      <div className="bg-blue-primary/10 text-blue-primary p-4 rounded-full shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h2 className="text-lg font-semibold text-gray-dark">{title}</h2>
      <p className="text-sm text-gray-medium max-w-sm">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-blue-primary text-white font-medium rounded-md shadow-sm hover:bg-blue-hover transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
