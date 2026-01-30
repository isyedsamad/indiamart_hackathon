"use client";

import { useState } from "react";
import { Mail, Lock, LogIn, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        setLoading(false);
        return;
      }

      toast.success("Login successful");

      if (data.role === "seller") {
        router.push("/dashboard/seller");
      } else {
        router.push("/dashboard/buyer");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="card shadow-lg">
          <div className="text-center mb-5">
            <div className="mx-auto w-12 h-12 rounded-xl bg-[var(--primary-soft)] flex items-center justify-center">
              <ShieldCheck className="text-[var(--primary)]" size={26} />
            </div>
            <h1 className="text-xl font-semibold mt-4">Welcome Back!</h1>
            <p className="text-muted text-sm">Access your account</p>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium">Email</label>
            <div className="mt-1 flex items-center gap-2 border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg-card)] focus-within:border-[var(--primary)]">
              <Mail size={18} className="text-[var(--text-muted)]" />
              <input
                type="email"
                placeholder="you@company.com"
                className="border-none bg-transparent p-0 focus:ring-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium">Password</label>
            <div className="mt-1 flex items-center gap-2 border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg-card)] focus-within:border-[var(--primary)]">
              <Lock size={18} className="text-[var(--text-muted)]" />
              <input
                type="password"
                placeholder="••••••••"
                className="border-none bg-transparent p-0 focus:ring-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn-primary w-full mt-6 inline-flex items-center justify-center gap-2"
          >
            {loading ? <Loading /> : <><LogIn size={18} /> Login</>}
          </button>

          <p className="text-sm text-muted mt-6 text-center">
            New here?{" "}
            <Link href="/signup" className="text-[var(--primary)] font-medium">
              Create account
            </Link>
          </p>
        </div>

        <p className="text-xs text-muted mt-6 text-center">
          🔒 Secure authentication with encrypted credentials
        </p>
      </div>
    </main>
  );
}
