import Link from "next/link";

export default function Nav() {
  return (
    <main className="absolute w-full h-20 border bottom-0 flex justify-center items-center">
      <div className="h-10 w-14 bg-black">
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
