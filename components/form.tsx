"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import LoadingDots from "@/components/loading-dots";
import { Input } from "@/components/shared";

export const Form: React.FC<{ type: "login" | "register" }> = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (type === "login") {
      // const res = await signIn("credentials", {
      //   redirect: false,
      //   email: e.currentTarget.email.value,
      //   password: e.currentTarget.password.value,
      // });

      const res = await signIn("google");

      setLoading(false);

      if (res?.ok) {
        router.push("/home");
      } else {
        toast.error(res?.error as string);
      }
    } else {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        }),
      });

      setLoading(false);

      if (res.status === 200) {
        toast.success("Account created! Redirecting to login...");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error(await res.text());
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      {/* <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="Joe@gmail.com"
        autoComplete="off"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="***"
        required
      /> */}

      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
        )}
      </button>

      {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};
