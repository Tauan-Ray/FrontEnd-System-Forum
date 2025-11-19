import TabsActivity from "./ui/desktop/activity/TabsActivity";
import ProfileUser from "./ui/desktop/profile/ProfileUser";

export default function PerfilPage() {
  return (
    <div>
      {/* Versão Desktop */}
      <div className="hidden min-[900px]:flex flex-row min-h-screen w-full p-10 gap-10">
        <ProfileUser />

        <div className="flex-1">
          <TabsActivity />
        </div>
      </div>

      {/* Versão mobile */}
      <div className="flex min-[900px]:hidden flex-row justify-center min-h-screen max-w-lg p-10">
        <ProfileUser />
      </div>
    </div>
  );
}