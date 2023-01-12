import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <Link
        className="text-stone-400 underline hover:text-stone-200 transition-all"
        href="/protected"
      >
        Protected Page
      </Link>
    </div>
  );
}
