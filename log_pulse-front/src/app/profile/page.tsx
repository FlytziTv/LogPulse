"use client";

import NavBar, { SidebarProvider } from "@/components/layout/NavBar";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const API_URL = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:4000";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = Cookies.get("token");

  const handleUpdateName = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch(`${API_URL}/api/auth/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({ name }),
    });

    setLoading(false);
    if (res.ok) setSuccess("Nom mis à jour !");
    else setError("Erreur lors de la mise à jour");
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch(`${API_URL}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess("Mot de passe mis à jour !");
      setCurrentPassword("");
      setNewPassword("");
    } else setError("Mot de passe actuel incorrect");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarProvider>
        <div className="flex flex-col h-full p-2 shrink-0">
          <NavBar />
        </div>
      </SidebarProvider>

      <main className="flex-1 h-full overflow-y-auto px-4 pt-3 gap-6 flex flex-col max-w-lg">
        {/* Header */}
        <div className="flex flex-row items-center gap-2">
          <UserCircle size={24} className="text-[#646464]" />
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        </div>

        {success && <p className="text-sm text-green-400">{success}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Changer le nom */}
        <div className="flex flex-col gap-2 p-4 rounded-lg border border-border-card bg-bg-card">
          <p className="text-sm font-medium text-foreground">Changer le nom</p>
          <input
            type="text"
            placeholder="Nouveau nom..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-lg bg-background border border-border-input text-foreground text-sm outline-none"
          />
          <button
            onClick={handleUpdateName}
            disabled={loading}
            className="px-3 py-2 rounded-lg bg-bg-button text-text-button text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Mettre à jour
          </button>
        </div>

        {/* Changer le mot de passe */}
        <div className="flex flex-col gap-2 p-4 rounded-lg border border-border-card bg-bg-card">
          <p className="text-sm font-medium text-foreground">
            Changer le mot de passe
          </p>
          <input
            type="password"
            placeholder="Mot de passe actuel..."
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="px-3 py-2 rounded-lg bg-background border border-border-input text-foreground text-sm outline-none"
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-3 py-2 rounded-lg bg-background border border-border-input text-foreground text-sm outline-none"
          />
          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="px-3 py-2 rounded-lg bg-bg-button text-text-button text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Mettre à jour
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-lg border border-red-400/20 text-red-400 text-sm font-medium hover:bg-red-400/10 transition-colors"
        >
          Se déconnecter
        </button>
      </main>
    </div>
  );
}
