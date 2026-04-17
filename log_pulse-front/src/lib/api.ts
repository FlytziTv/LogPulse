const API_URL = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:4000";

export async function getLogs(projectId: string, token: string) {
  const res = await fetch(`${API_URL}/api/logs/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Origin: "http://localhost:3000",
    },
  });
  return res.json();
}
