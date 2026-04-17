import { LEVEL_COLORS, STATUS_COLORS } from "@/data/colors";

export type Log = {
  id: string;
  projectId: string;
  level: keyof typeof LEVEL_COLORS;
  status?: keyof typeof STATUS_COLORS;
  host?: string;
  request?: string;
  message: string;
  createdAt: string;
};
