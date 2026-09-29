import SellersNav from "./components/sellersNav";

export default function SellersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-background-subtle text-black font-dmSans tracking-tight">
      {children}
      <SellersNav />
    </div>
  );
}
