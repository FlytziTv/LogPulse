"use client";

import Link from "next/link";
import {
  Activity,
  ChevronLeft,
  CircleQuestionMark,
  LayoutDashboard,
  ListTree,
  Settings,
  UserCircle,
  BookOpen,
} from "lucide-react";

import { useSidebar, SidebarProvider } from "./NavBarContext";
import { Logo } from "../icons/logo";

export default function NavBar() {
  const { collapsed } = useSidebar();

  return (
    <div
      data-slot="nav"
      className={`group h-full bg-[#171717] flex flex-col border border-[#222323] rounded-lg text-white text-lg relative ${
        collapsed ? "w-12.5" : "w-60"
      }`}
    >
      <NavSize />
      <SideBarHeader>
        <ItemSidebar
          Icon={Logo}
          href="/dashboard"
          label="Dashboard"
          ClassName="font-semibold"
        />
      </SideBarHeader>

      <SideBarContent>
        <ItemSidebar
          Icon={LayoutDashboard}
          href="/dashboard"
          label="Dashboard"
        />
        <ItemSidebar Icon={ListTree} href="/logs" label="Logs" />
        <ItemSidebar Icon={Settings} href="/settings" label="Settings" />
        <ItemSidebar Icon={BookOpen} href="/docs" label="Docs" />
      </SideBarContent>

      <SideBarFooter>
        <ItemSidebar
          Icon={CircleQuestionMark}
          href="/logs"
          label="Aide & Support"
          ClassName="text-[#a1a1a1] text-xs"
        />
        <ItemSidebar
          Icon={Activity}
          href="/settings"
          label="Status App"
          ClassName="text-[#a1a1a1] text-xs"
        />
        <ItemSidebar
          Icon={UserCircle}
          href="/profile"
          label="Profil"
          ClassName="text-[#a1a1a1] text-xs"
        />
      </SideBarFooter>
    </div>
  );
}

function NavSize() {
  const { toggle, collapsed } = useSidebar();

  return (
    <button
      data-slot="nav-button-size"
      onClick={toggle}
      className="absolute opacity-0 group-hover:opacity-100 bg-[#171717] hover:bg-[#262626] border border-[#222323] rounded-full text-[#a1a1a1] hover:text-white p-1 -right-3 top-1/2 -translate-y-1/2 transition-all duration-300"
    >
      <ChevronLeft
        size={16}
        className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
      />{" "}
    </button>
  );
}

function SideBarHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start p-2 pb-0 gap-1 w-full">
      {children}
    </div>
  );
}

function SideBarContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-2 gap-1 w-full h-full">{children}</div>
  );
}

function SideBarFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-end p-2 gap-1 w-full">{children}</div>
  );
}

function ItemSidebar({
  Icon,
  href,
  label,
  ClassName,
}: {
  Icon: React.ElementType;
  href: string;
  label?: string;
  ClassName?: string;
}) {
  const { collapsed } = useSidebar();

  return (
    <Link
      href={href}
      className={`flex items-center text-sm gap-2 p-2 w-full rounded-lg hover:bg-[#262626] transition-colors duration-200 ${ClassName || "text-[#fafafa]"}`}
    >
      <Icon size={16} className="shrink-0" />
      {!collapsed && label && <span className="truncate">{label}</span>}
    </Link>
  );
}

export { SidebarProvider };
