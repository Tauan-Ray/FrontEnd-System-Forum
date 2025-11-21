import TabsActivity from "./ui/tabs/TabsActivity";
import ProfileUser from "./ui/profile/ProfileUser";
import TabsUserProfileMobile from "./ui/TabsUserProfileMobile";

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
      <div className="flex min-[900px]:hidden flex-col min-h-screen w-full p-4">
        <TabsUserProfileMobile />
      </div>
    </div>
  );
}