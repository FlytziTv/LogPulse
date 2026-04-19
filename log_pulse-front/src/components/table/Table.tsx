"use client";

import { Badge } from "@/components/table/Badge";
import { ColCell } from "@/components/table/ColCell";
import { LEVEL_COLORS, STATUS_COLORS } from "@/data/colors";
import { useLogs } from "@/data/logs";
import { LABELS } from "@/data/table";

export default function Table({ projectId }: { projectId: string }) {
  const logs = useLogs(projectId);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center w-full border-b border-[#1F1F1F]">
        {LABELS.map((label) => (
          <p
            key={label.name}
            className="px-2 py-1.5 text-sm font-medium text-[#888888]"
            style={{
              width: label.flex ? undefined : label.size,
              flex: label.flex ? 1 : "none",
              flexShrink: 0,
            }}
          >
            {label.name}
          </p>
        ))}
      </div>

      <div className="flex flex-col">
        {logs.map((log, index) => (
          <div
            key={log.id}
            className="flex flex-row items-center w-full cursor-pointer transition-colors"
            style={{ backgroundColor: index % 2 === 0 ? "#111111" : "#0A0A0A" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1A1A1A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                index % 2 === 0 ? "#111111" : "#0A0A0A")
            }
          >
            <ColCell size="120px">
              <span className="text-[#888888]">
                {/* {log.createdAt.split("T")[0]} */}
                {new Date(log.createdAt).toLocaleDateString()}
              </span>
            </ColCell>
            <ColCell size="100px">
              <span className="text-[#888888]">
                {/* {log.createdAt.split("T")[1].split(".")[0]} */}
                {new Date(log.createdAt).toLocaleTimeString()}
              </span>
            </ColCell>
            <ColCell size="90px">
              {log.status && (
                <Badge
                  label={log.status}
                  colors={STATUS_COLORS[log.status] ?? ""}
                />
              )}
            </ColCell>
            <ColCell size="100px">
              <Badge label={log.level} colors={LEVEL_COLORS[log.level] ?? ""} />
            </ColCell>
            <ColCell size="200px">
              <span className="text-[#888888]">{log.host}</span>
            </ColCell>
            <ColCell size="380px">
              <span className="text-[#cccccc]">{log.request}</span>
            </ColCell>
            <ColCell flex>
              <span className="text-[#888888] truncate block">
                {log.message}
              </span>
            </ColCell>
          </div>
        ))}
      </div>
    </div>
  );
}
