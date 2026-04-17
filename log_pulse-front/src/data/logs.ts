"use client";

import { useEffect, useState } from "react";
import { Log } from "@/types/log";
import Cookies from "js-cookie";

const API_URL = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:4000";
const PROJECT_ID = "cmntejd1q0000g4a04ghld7sr"; // temporaire

export function useLogs() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    fetch(`${API_URL}/api/logs/${PROJECT_ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: "http://localhost:3000",
      },
    })
      .then((r) => r.json())
      .then(setLogs);

    const es = new EventSource(`${API_URL}/api/logs/${PROJECT_ID}/stream`);
    es.onmessage = (e) => {
      const log = JSON.parse(e.data) as Log;
      setLogs((prev) => [log, ...prev]);
    };

    return () => es.close();
  }, []);

  return logs;
}
