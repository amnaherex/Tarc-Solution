"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [newuser,setuser] = useState(false)
  function handleredirect(){
    if(!newuser)
    {
        setuser(true)
        redirect("/signup")
    }
  }


  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-300 to-white px-4 ">
      <section className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-md">
            Welcome Back
          </h2>
          <p className="text-center text-white/80 mt-2 mb-8">
            Enter your credentials to access your dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 ml-1">Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-none bg-white/20 px-5 py-4 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/50 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border-none bg-white/20 px-5 py-4 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/50 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-200 bg-red-500/20 py-2 px-3 rounded-lg text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-white text-indigo-600 py-4 font-bold shadow-lg hover:bg-indigo-50 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login In"}
            </button>
          </form>
          <div className="flex text-gray-600 gap-4 justify-center py-2 align-center font-bold">
           <p className="">New User?</p>
           <button onClick={handleredirect}>Sign In</button>
          </div>
        </div>
      </section>
    </main>
  );
}