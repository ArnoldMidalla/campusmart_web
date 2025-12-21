import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-dmSans flex justify-center w-dvw min-h-screen bg-zinc-50 text-black">
      <main className="flex flex-col max-w-sm w-full pt-16">
        <div className="border flex w-full h-12 rounded-full justify-between pl-4">
          <input
            type="search"
            placeholder="Search for a product"
            className="text-sm font-dmSans w-full"
          />
          <button className="bg-main flex justify-center items-center px-4 rounded-full">
            <Search color="white" size={17} strokeWidth={3} />
          </button>
        </div>
        
      </main>
    </div>
  );
}
