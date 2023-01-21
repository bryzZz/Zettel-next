"use client";

import React from "react";

import { signOut, useSession } from "next-auth/react";

export const Header: React.FC<{}> = () => {
  const { data } = useSession();

  return (
    <header className="flex h-14 items-center justify-end gap-4 border-b border-b-base-content border-opacity-10 px-6">
      <p>{data?.user?.email}</p>
      <button className="transition-all" onClick={() => signOut()}>
        Sign out
      </button>
    </header>
  );
};
