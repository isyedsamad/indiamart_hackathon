"use client";

import { Search, Plus } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[var(--primary)] text-white flex items-center justify-center font-semibold">
            IM
          </div>
          <span className="font-semibold text-lg">
            IndiaMART
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2
                        bg-[var(--bg-card)]
                        border border-[var(--border)]
                        rounded-md px-3 py-1.5
                        w-[360px]">
          <Search size={16} className="text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search products or suppliers"
            className="border-none bg-transparent p-0 focus:ring-0 text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href={'/login'}>
          <button className="btn-outline hidden sm:inline-flex">
            Login
          </button>
          </Link>
          <a href="https://hop2hop.lovable.app/auth" target="_blank" rel="noopener noreferrer" className="btn-outline hidden sm:inline-flex">
            SignUp
          </a>
          <button className="btn-primary inline-flex gap-1">
            <Plus size={16} />
            Post Requirement
          </button>
        </div>
      </div>
    </header>
  );
}
