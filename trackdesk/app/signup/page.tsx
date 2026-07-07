"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setSuccess("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: { data: { name: trimmedName } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // API Call
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
    });

    setLoading(false);
    if (!response.ok) {
      setError("Failed to sync user data.");
      return;
    }

    setSuccess("Account created successfully!");
    setTimeout(() => router.push("/login"), 1500);
  }

 
  const inputClass = "w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/60 outline-none focus:bg-white/20 focus:ring-2 focus:ring-blue-200 transition-all";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-600 to-blue-400 px-4">
      <section className="w-full max-w-sm">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
          <p className="text-center text-blue-100 mb-8 text-sm">Join us today!</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-blue-100 mb-1 ml-1">Name</label>
              <input type="text" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name  " />
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-100 mb-1 ml-1">Email</label>
              <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-100 mb-1 ml-1">Password</label>
              <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            {error && <p className="text-xs text-red-200 bg-red-900/30 p-2 rounded-lg text-center">{error}</p>}
            {success && <p className="text-xs text-green-200 bg-green-900/30 p-2 rounded-lg text-center">{success}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center gap-2 text-blue-100 text-sm mt-6">
            <p>Already have an account?</p>
            <button onClick={() => router.push("/login")} className="font-bold ">Login</button>
          </p>
        </div>
      </section>
    </main>
  );
}