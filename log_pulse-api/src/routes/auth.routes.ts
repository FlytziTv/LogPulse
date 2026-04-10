import { Router } from "express";
import { auth } from "../lib/auth";

const router = Router();

router.all("/{*path}", async (req, res) => {
  const response = await auth.handler(
    new Request(`http://localhost:4000/api/auth${req.url}`, {
      method: req.method,
      headers: req.headers as Record<string, string>,
      body: req.method !== "GET" ? JSON.stringify(req.body) : null,
    }),
  );

  const text = await response.text();
  res.status(response.status).json(JSON.parse(text || "null"));
});

export default router;
