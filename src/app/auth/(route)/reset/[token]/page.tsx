import FormResetPassword from "@/app/auth/ui/FormResetPassword";

export default async function ResetPassword({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex items-center justify-center pt-10">
      <div className="w-full max-w-lg">
        <FormResetPassword token={token} />
      </div>
    </div>
  );
}
