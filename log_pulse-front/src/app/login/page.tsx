"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const API_URL = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:4000";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const res = await fetch(`${API_URL}/api/auth/sign-in/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Erreur de connexion");
      return;
    }

    Cookies.set("token", data.token, { expires: 7 });

    router.push("/");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col gap-4 w-full max-w-sm p-6 border border-border-card rounded-lg bg-bg-card">
        <h1 className="text-xl font-bold text-foreground">LogPulse</h1>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-lg bg-background border border-border-input text-foreground text-sm outline-none"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-lg bg-background border border-border-input text-foreground text-sm outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-bg-button text-text-button text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </div>
    </div>
  );
}
