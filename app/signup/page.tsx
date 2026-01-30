"use client";

import { useState } from "react";
import { Mail, Lock, UserPlus, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";
import AuthRoleToggle from "@/components/auth/AuthRoleToggle";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Signup failed");
        setLoading(false);
        return;
      }
      toast.success("Account created");
      if (role === "seller") {
        router.push("/dashboard/seller");
      } else {
        router.push("/dashboard/buyer");
      }
    } catch(err: any) {
      toast.error("Failed: " + err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading && <Loading />}
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="card shadow-lg">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 rounded-xl bg-[var(--primary-soft)] flex items-center justify-center">
              <ShieldCheck className="text-[var(--primary)]" size={26} />
            </div>
            <h1 className="text-xl font-semibold mt-4">Create Account</h1>
            <p className="text-muted text-sm">Join as a {role}</p>
          </div>
          <AuthRoleToggle role={role} setRole={setRole} />
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
                placeholder="Create strong password"
                className="border-none bg-transparent p-0 focus:ring-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn-primary w-full mt-6 inline-flex items-center justify-center gap-2"
          >
            {!loading && <><UserPlus size={18} /> Create Account</>}
          </button>

          <p className="text-sm text-muted mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--primary)] font-medium">
              Login
            </Link>
          </p>
        </div>

        <p className="text-xs text-muted mt-6 text-center">
          🔐 Secure onboarding with role-based access
        </p>
      </div>
    </main>
    </>
  );
}
