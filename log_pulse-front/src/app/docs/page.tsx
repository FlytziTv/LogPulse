"use client";

import NavBar, { SidebarProvider } from "@/components/layout/NavBar";
import { BookOpen, Copy, Check } from "lucide-react";
import { useState } from "react";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-background border border-border-card rounded-lg p-4 text-sm text-[#cccccc] overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded bg-bg-card border border-border-card text-text-secondary hover:text-foreground transition-all"
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-bg-card border border-border-card text-xs font-bold text-foreground shrink-0 mt-0.5">
        {number}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {children}
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarProvider>
        <div className="flex flex-col h-full p-2 shrink-0">
          <NavBar />
        </div>
      </SidebarProvider>

      <main className="flex-1 h-full overflow-y-auto px-8 pt-3 pb-10 gap-10 flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <BookOpen size={24} className="text-[#646464]" />
            <h1 className="text-2xl font-bold text-foreground">
              Documentation
            </h1>
          </div>
          <p className="text-sm text-text-secondary">
            Tout ce dont vous avez besoin pour connecter votre projet à LogPulse
            et recevoir vos logs en temps réel.
          </p>
        </div>

        {/* C'est quoi LogPulse */}
        <Section
          title="C'est quoi LogPulse ?"
          description="LogPulse est une plateforme qui centralise les logs de vos projets en un seul endroit. Au lieu de chercher les erreurs dans votre terminal ou vos fichiers de logs, vous les recevez en temps réel dans un dashboard clair et organisé."
        >
          <div className="flex flex-col gap-2">
            {[
              {
                title: "Envoi simple",
                desc: "Vos projets envoient leurs logs via une simple requête HTTP. Pas besoin d'installer de librairie.",
              },
              {
                title: "Temps réel",
                desc: "Les logs apparaissent instantanément dans votre dashboard dès qu'ils sont envoyés.",
              },
              {
                title: "Par projet",
                desc: "Chaque projet a sa propre clé API. Vous pouvez connecter autant de projets que vous voulez.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-0.5 p-3 rounded-lg border border-border-card bg-bg-card"
              >
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Démarrer en 3 étapes */}
        <Section
          title="Démarrer en 3 étapes"
          description="Connectez votre premier projet à LogPulse en moins de 5 minutes."
        >
          <div className="flex flex-col gap-5">
            <Step number={1} title="Créez un projet sur LogPulse">
              <p className="text-sm text-text-secondary">
                Allez sur la page{" "}
                <span className="text-foreground font-medium">Projects</span> et
                cliquez sur{" "}
                <span className="text-foreground font-medium">
                  Nouveau projet
                </span>
                . Donnez-lui le nom de votre application (ex: FluxCore,
                MonSite...). Une clé API unique sera générée automatiquement.
              </p>
            </Step>

            <Step number={2} title="Copiez votre clé API">
              <p className="text-sm text-text-secondary">
                Sur la page Projects, cliquez sur l'icône de copie à côté de
                votre projet. Cette clé est unique à votre projet — gardez-la
                secrète et ne la partagez pas publiquement.
              </p>
              <CodeBlock code={`LOGPULSE_API_KEY=votre_cle_api_ici`} />
            </Step>

            <Step number={3} title="Envoyez vos premiers logs">
              <p className="text-sm text-text-secondary">
                Dans votre projet, appelez l'endpoint LogPulse à chaque
                événement important que vous voulez tracker (erreur, connexion,
                action utilisateur...).
              </p>
            </Step>
          </div>
        </Section>

        {/* Exemples de code */}
        <Section
          title="Exemples de code"
          description="Copiez-collez ces exemples dans votre projet. Remplacez VOTRE_API_KEY par la clé de votre projet."
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">
                JavaScript / TypeScript (fetch)
              </p>
              <p className="text-xs text-text-secondary">
                La méthode la plus simple, fonctionne dans n'importe quel projet
                Node.js ou navigateur.
              </p>
              <CodeBlock
                code={`await fetch("http://localhost:4000/api/logs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "VOTRE_API_KEY"
  },
  body: JSON.stringify({
    level: "INFO",
    status: "GET",
    host: "monapp.com",
    request: "/api/users",
    message: "Utilisateurs récupérés avec succès"
  })
});`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">
                JavaScript / TypeScript (axios)
              </p>
              <p className="text-xs text-text-secondary">
                Si votre projet utilise déjà axios.
              </p>
              <CodeBlock
                code={`await axios.post("http://localhost:4000/api/logs", {
  level: "ERROR",
  status: "POST",
  host: "monapp.com",
  request: "/api/auth/login",
  message: "Identifiants incorrects"
}, {
  headers: { "x-api-key": "VOTRE_API_KEY" }
});`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">
                Créer une fonction helper (recommandé)
              </p>
              <p className="text-xs text-text-secondary">
                Créez un fichier{" "}
                <code className="bg-background px-1.5 py-0.5 rounded text-[#cccccc]">
                  logger.ts
                </code>{" "}
                dans votre projet pour éviter de répéter le code partout.
              </p>
              <CodeBlock
                code={`// logger.ts
const LOGPULSE_URL = "http://localhost:4000/api/logs";
const LOGPULSE_KEY = process.env.LOGPULSE_API_KEY;

type Level = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "FATAL";

export async function log(
  level: Level,
  message: string,
  options?: {
    status?: string;
    host?: string;
    request?: string;
  }
) {
  await fetch(LOGPULSE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": LOGPULSE_KEY!
    },
    body: JSON.stringify({ level, message, ...options })
  });
}

// Utilisation dans votre projet :
// await log("INFO", "Utilisateur connecté", { status: "POST", request: "/api/login" });
// await log("ERROR", "Erreur base de données");`}
              />
            </div>
          </div>
        </Section>

        {/* Champs */}
        <Section
          title="Champs disponibles"
          description="Voici tous les champs que vous pouvez envoyer avec chaque log."
        >
          <div className="border border-border-card rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[120px_100px_1fr] px-4 py-2 border-b border-border-card bg-background">
              <span className="text-xs font-medium text-text-secondary">
                Champ
              </span>
              <span className="text-xs font-medium text-text-secondary">
                Requis
              </span>
              <span className="text-xs font-medium text-text-secondary">
                Description
              </span>
            </div>

            {/* Rows */}
            {[
              {
                field: "level",
                required: true,
                desc: "Niveau de gravité du log. Valeurs possibles : DEBUG, INFO, WARNING, ERROR, FATAL",
              },
              {
                field: "message",
                required: true,
                desc: "Description de l'événement. Ex: 'Utilisateur connecté', 'Erreur base de données'",
              },
              {
                field: "status",
                required: false,
                desc: "Méthode HTTP de la requête. Ex: GET, POST, PUT, DELETE",
              },
              {
                field: "host",
                required: false,
                desc: "Nom de domaine ou adresse de votre serveur. Ex: monapp.com",
              },
              {
                field: "request",
                required: false,
                desc: "Route ou endpoint concerné. Ex: /api/users, /api/auth/login",
              },
            ].map((row, i) => (
              <div
                key={row.field}
                className={`grid grid-cols-[120px_100px_1fr] px-4 py-3 text-sm ${i % 2 === 0 ? "bg-bg-card" : "bg-background"}`}
              >
                <code className="text-[#cccccc]">{row.field}</code>
                <span
                  className={`text-xs self-center px-1.5 py-0.5 rounded w-fit ${row.required ? "bg-red-400/10 text-red-400" : "bg-gray-400/10 text-gray-400"}`}
                >
                  {row.required ? "Requis" : "Optionnel"}
                </span>
                <span className="text-text-secondary">{row.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Niveaux */}
        <Section
          title="Niveaux de logs"
          description="Utilisez le bon niveau pour chaque événement. Cela vous permet de filtrer et de prioriser vos logs facilement."
        >
          <div className="flex flex-col gap-2">
            {[
              {
                level: "DEBUG",
                color: "bg-gray-400/10 text-gray-400",
                desc: "Informations de débogage. À utiliser pendant le développement pour tracer l'exécution de votre code.",
              },
              {
                level: "INFO",
                color: "bg-blue-400/10 text-blue-400",
                desc: "Événements normaux et importants. Ex: utilisateur connecté, fichier uploadé, email envoyé.",
              },
              {
                level: "WARNING",
                color: "bg-yellow-400/10 text-yellow-400",
                desc: "Situations anormales mais non bloquantes. Ex: tentative de connexion échouée, quota presque atteint.",
              },
              {
                level: "ERROR",
                color: "bg-red-400/10 text-red-400",
                desc: "Erreurs qui impactent l'utilisateur. Ex: erreur base de données, API externe indisponible.",
              },
              {
                level: "FATAL",
                color: "bg-red-600/10 text-red-600",
                desc: "Erreurs critiques qui font planter l'application. Nécessite une intervention immédiate.",
              },
            ].map(({ level, color, desc }) => (
              <div
                key={level}
                className="flex flex-row items-start gap-3 p-3 rounded-lg border border-border-card bg-bg-card"
              >
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 mt-0.5 ${color}`}
                >
                  {level}
                </span>
                <p className="text-sm text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
