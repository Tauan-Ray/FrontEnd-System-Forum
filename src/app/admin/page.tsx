import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabUser from "./ui/tabs/TabUser";

export default function AdminPanel() {
  return (
    <Tabs
      defaultValue="users"
      className="flex h-full w-full flex-col items-center rounded-2xl p-4"
    >
      <TabsList className="flex flex-col sm:flex-row h-auto w-full rounded-xl bg-blue-primary/20 p-1">
        <TabsTrigger
          value="users"
          className="flex-1 w-full rounded-lg px-4 py-2 text-sm transition-all hover:bg-blue-primary/10 data-[state=active]:bg-blue-primary data-[state=active]:text-white data-[state=active]:shadow"
        >
          Usuários
        </TabsTrigger>

        <TabsTrigger
          value="questions"
          className="flex-1 w-full rounded-lg px-4 py-2 text-sm transition-all hover:bg-blue-primary/10 data-[state=active]:bg-blue-primary data-[state=active]:text-white data-[state=active]:shadow"
        >
          Perguntas
        </TabsTrigger>

        <TabsTrigger
          value="answers"
          className="flex-1 w-full rounded-lg px-4 py-2 text-sm transition-all hover:bg-blue-primary/10 data-[state=active]:bg-blue-primary data-[state=active]:text-white data-[state=active]:shadow"
        >
          Respostas
        </TabsTrigger>

        <TabsTrigger
          value="categories"
          className="flex-1 w-full rounded-lg px-4 py-2 text-sm transition-all hover:bg-blue-primary/10 data-[state=active]:bg-blue-primary data-[state=active]:text-white data-[state=active]:shadow"
        >
          Categorias
        </TabsTrigger>
      </TabsList>

      <div className="mt-4 flex-1 w-full">
        <TabsContent value="users" className="h-full">
          <TabUser />
        </TabsContent>

        <TabsContent value="questions" className="h-full"></TabsContent>

        <TabsContent value="answers" className="h-full"></TabsContent>

        <TabsContent value="categories" className="h-full"></TabsContent>
      </div>
    </Tabs>
  );
}
