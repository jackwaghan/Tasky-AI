import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Link href="/user/dashboard">Dashboard</Link>
    </div>
  );
}
