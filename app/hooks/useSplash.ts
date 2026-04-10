import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useSplash() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/splash");
  }, [router]);
}