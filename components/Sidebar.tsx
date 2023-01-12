"use client";

import { Input } from "@/components/shared";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const Sidebar: React.FC<{}> = () => {
  const [newNoteName, setNewNoteName] = useState("");
  const { data: session } = useSession();
  const [noteNames, setNoteNames] = useState<string[]>([]);

  useEffect(() => {
    const getNames = async () => {
      return fetch("/api/notes/names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "asd@mail.ru",
        }),
      });
    };

    getNames()
      .then((res) => res.json())
      .then((data) => {
        setNoteNames(data.map((item: any) => item.title));
      });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      return;
    }

    const res = await fetch("/api/notes/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user?.email,
        noteName: newNoteName,
      }),
    });

    if (res.status === 200) {
      console.log("yay");
    }

    //   toast.success("Account created! Redirecting to login...");

    //   setTimeout(() => {
    //     router.push("/login");
    //   }, 1000);
    // } else {
    //   toast.error(await res.text());
    // }
  };

  return (
    <div className="max-w-xs">
      <form onSubmit={handleSubmit}>
        <Input
          label="New note Value"
          value={newNoteName}
          onChange={(e) => setNewNoteName(e.target.value)}
        />
      </form>
      {noteNames.map((name) => (
        <p key={name} className="caret-red-700">
          {name}
        </p>
      ))}
    </div>
  );
};
