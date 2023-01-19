"use client";

import React from "react";

import { signOut, useSession } from "next-auth/react";

export const Header: React.FC<{}> = () => {
  const { data } = useSession();

  return (
    <header className="h-14 bg-neutral-800 drop-shadow-md flex justify-end items-center px-6 gap-4">
      <p>{data?.user?.email}</p>
      <button
        className="text-stone-400 hover:text-stone-200 transition-all"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </header>
  );
};
