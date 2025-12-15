import FormChangeEmail from "@/app/auth/ui/FormChangeEmail";

export default async function ChangeEmail({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex items-center justify-center pt-10">
      <div className="w-full max-w-lg">
        <FormChangeEmail token={token} />
      </div>
    </div>
  );
}
