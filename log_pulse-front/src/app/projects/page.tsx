"use client";

import NavBar, { SidebarProvider } from "@/components/layout/NavBar";
import { FolderOpen, Plus, Trash2, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const API_URL = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:4000";

type Project = {
  id: string;
  name: string;
  apiKey: string;
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const loadProjects = () => {
    const token = Cookies.get("token");
    fetch(`${API_URL}/api/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: "http://localhost:3000",
      },
    })
      .then((r) => r.json())
      .then(setProjects);
  };

  useEffect(() => {
    loadProjects();
    /// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createProject = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    const token = Cookies.get("token");

    await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({ name: newName }),
    });

    setNewName("");
    setLoading(false);
    loadProjects();
  };

  const deleteProject = async (id: string) => {
    const token = Cookies.get("token");
    await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: "http://localhost:3000",
      },
    });
    loadProjects();
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarProvider>
        <div className="flex flex-col h-full p-2 shrink-0">
          <NavBar />
        </div>
      </SidebarProvider>

      <main className="flex-1 h-full overflow-y-auto px-4 pt-3 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex flex-row items-center gap-2">
          <FolderOpen size={24} className="text-[#646464]" />
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        </div>

        {/* Créer un projet */}
        <div className="flex flex-row gap-2">
          <input
            type="text"
            placeholder="Nom du projet..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createProject()}
            className="px-3 py-2 rounded-lg bg-bg-card border border-border-input text-foreground text-sm outline-none w-64"
          />
          <button
            onClick={createProject}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-bg-button text-text-button text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Plus size={16} />
            Nouveau projet
          </button>
        </div>

        {/* Liste des projets */}
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-row items-center justify-between p-4 rounded-lg border border-border-card bg-bg-card"
            >
              <div className="flex flex-col gap-1">
                <Link
                  href={`/projects/${project.id}/logs`}
                  className="text-sm font-medium text-foreground hover:text-text-secondary transition-colors"
                >
                  {project.name}
                </Link>
                <div className="flex flex-row items-center gap-2">
                  <code className="text-xs text-text-secondary bg-background px-2 py-0.5 rounded">
                    {project.apiKey}
                  </code>
                  <button
                    onClick={() => copyKey(project.apiKey)}
                    className="text-text-secondary hover:text-foreground transition-colors"
                  >
                    {copied === project.apiKey ? (
                      <Check size={14} className="text-green-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => deleteProject(project.id)}
                className="text-text-secondary hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
