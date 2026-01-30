"use client";

import Link from "next/link";
import { ShoppingCart, Package, ClipboardList, LayoutGrid } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseAuth";

const nav = [
  { label: "Dashboard", href: "/dashboard/buyer", icon: LayoutGrid },
  { label: "Products", href: "/products", icon: Package },
  { label: "My Requirements", href: "/dashboard/buyer#requirements", icon: ClipboardList },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function BuyerHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-card)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <div className="flex items-center gap-8">
          <span className="font-semibold text-lg">IndiaMART</span>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map(({ label, href, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm flex items-center gap-2
                    ${active
                      ? "bg-[var(--primary-soft)] text-[var(--primary)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-soft)]"
                    }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex gap-3">
        <Link
          href="/cart"
          className="btn-outline inline-flex items-center gap-2"
        >
          <ShoppingCart size={16} />
          Cart
        </Link>
        <button className="btn-outline" onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </header>
  );
}
