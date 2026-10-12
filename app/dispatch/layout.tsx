import type { Metadata } from "next";
import { DispatchProvider } from "./context";

export const metadata: Metadata = {
  title: "Dispatch | CampusMart Admin",
  description: "CampusMart Dispatch and Operations Management",
};

export default function DispatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-muted selection:bg-main selection:text-white">
      <div className="max-w-md mx-auto min-h-screen relative flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.03)] bg-surface-muted">
        <DispatchProvider>{children}</DispatchProvider>
      </div>
    </div>
  );
}
