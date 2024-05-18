import { Navbar } from "@/components/navbar/Navbar";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
}
