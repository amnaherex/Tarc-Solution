"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const SignupPage = () => {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Account created successfully.");
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <main>
      <section>
        <div>
          <div>
            <h2>Sign Up</h2>
            <p>Create a new account to get started.</p>

            <form onSubmit={handleSignup}>
              <label htmlFor="name">Name</label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p>{error}</p>}

              {success && <p>{success}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};