import { Router, Response as ExpressResponse } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

const clients = new Map<string, Set<ExpressResponse>>();

export function broadcastLog(projectId: string, log: object) {
  clients.get(projectId)?.forEach((res) => {
    res.write(`data: ${JSON.stringify(log)}\n\n`);
  });
}

// POST /logs — reçoit un log via API key
router.post("/", async (req, res) => {
  const apiKey = req.headers["x-api-key"] as string;

  if (!apiKey) {
    res.status(401).json({ error: "Missing API key" });
    return;
  }

  const project = await prisma.project.findUnique({
    where: { apiKey },
  });

  if (!project) {
    res.status(401).json({ error: "Invalid API key" });
    return;
  }

  const { level, status, host, request, message } = req.body;

  if (!level || !message) {
    res.status(400).json({ error: "level and message are required" });
    return;
  }

  const log = await prisma.log.create({
    data: {
      projectId: project.id,
      level,
      status,
      host,
      request,
      message,
    },
  });

  broadcastLog(project.id, log);

  res.status(201).json(log);
});

// GET /logs/:projectId/stream — SSE live stream
router.get("/:projectId/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const projectId = req.params["projectId"] as string;

  // Enregistre le client
  if (!clients.has(projectId)) {
    clients.set(projectId, new Set());
  }
  clients.get(projectId)!.add(res);

  // Cleanup quand le client se déconnecte
  req.on("close", () => {
    clients.get(projectId)?.delete(res);
  });
});

export default router;

// GET /logs/:projectId — historique des logs
router.get("/:projectId", async (req, res) => {
  const logs = await prisma.log.findMany({
    where: { projectId: req.params.projectId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  res.json(logs);
});
