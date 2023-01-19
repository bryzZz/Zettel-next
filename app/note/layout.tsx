import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-neutral-900 text-white">
      <Header />
      <div className="flex h-main">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
