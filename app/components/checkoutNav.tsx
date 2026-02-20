import { useRouter } from "next/navigation";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";

export default function CheckoutNav({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  const router = useRouter();
  const { cart } = useCartStore();
  const totalPrice = useCartStore((state) => state.getTotalPrice());

    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <main className="fixed bottom-0 left-0 w-dvw flex justify-center pb-6 font-dmSans tracking-tight z-50">
      <div className="backdrop-blur-xs flex justify-center items-center py-2 px-2 rounded-full border border-neutral-200 w-[80%] bg-white/30 max-w-sm gap-2">
        <div className="w-full flex justify-center">
          <p className="text-main font-semibold text-lg">N{totalPrice}</p>
        </div>
        <button
          className="w-full h-10 rounded-full border bg-main border-neutral-200 disabled:opacity-40 transition-all duration-300"
          onClick={() => router.push("/"+link)}
          disabled={cart.length <= 0}
        >
          <p className="font-medium text-sm text-white">
            {text} ({cart.length})
          </p>
        </button>
      </div>
    </main>
  );
}
