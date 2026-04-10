import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user: { id: string; email: string };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      authorization: req.headers["authorization"] || "",
      origin: req.headers["origin"] || "http://localhost:3000",
    }),
  });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.user = session.user;
  next();
};
