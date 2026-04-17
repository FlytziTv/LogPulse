"use client";

import NavBar, { SidebarProvider } from "@/components/layout/NavBar";
import Table from "@/components/table/Table";
import { ListTree } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarProvider>
        <div className="flex flex-col h-full p-2 shrink-0">
          <NavBar />
        </div>
      </SidebarProvider>

      <main className="flex-1 h-full overflow-y-auto px-4 pt-3 gap-4 flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <ListTree size={24} className="text-[#646464]" />
          <h1 className="text-2xl font-bold text-foreground">Logs</h1>
        </div>

        <Table />
      </main>
    </div>
  );
}
