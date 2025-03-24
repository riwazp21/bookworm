import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || session?.user?.email || "Guest";

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <h1 className="text-4xl font-bold text-green-800">Welcome, {name} 👋</h1>
    </div>
  );
}
