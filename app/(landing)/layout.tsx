export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full text-neutral-800 bg-slate-200 p-16">{children}</div>
  );
}
