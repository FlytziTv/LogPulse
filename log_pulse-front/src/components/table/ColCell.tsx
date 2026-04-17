export function ColCell({
  size,
  flex,
  children,
}: {
  size?: string;
  flex?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="px-2 py-1.5 text-[13px]"
      style={{
        width: flex ? undefined : size,
        flex: flex ? 1 : "none",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}
