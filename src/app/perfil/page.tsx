import ProfileUser from "./ui/desktop/profile/ProfileUser";

export default function PerfilPage() {
  return (
    <div>
      {/* Versão Desktop */}
      <div className="hidden sm:flex flex-row justify-center min-h-screen max-w-lg p-10">
          <ProfileUser />
      </div>

      {/* Versão mobile */}
      <div>

      </div>
    </div>
  );
}