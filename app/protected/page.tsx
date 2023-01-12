"use client";

import { Sidebar } from "@/components/Sidebar";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <>
      <header className="header">
        <p>{data?.user?.email}</p>
      </header>
      <div>
        <Sidebar />
      </div>

      <button
        className="text-stone-400 hover:text-stone-200 transition-all"
        onClick={() => signOut()}
      >
        Goddammit, sign me out!
      </button>
    </>
  );
}
