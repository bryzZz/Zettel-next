export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const res = await fetch("/api/notes/names", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email: "asd@mail.ru",
  //   }),
  // });

  // console.log(res);

  return <div className="h-screen bg-black text-white">{children}</div>;
}
