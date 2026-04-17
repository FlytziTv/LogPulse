export function Badge({ label, colors }: { label: string; colors: string }) {
  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${colors}`}>
      {label}
    </span>
  );
}
