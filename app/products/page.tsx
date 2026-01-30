"use client";

import { useEffect, useState } from "react";
import BuyerHeader from "@/components/buyer/BuyerHeader";
import { ShoppingCart, IndianRupee, Package } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseAuth";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const buyerId = "demo-buyer-id";
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getDocs(collection(db, "products")).then(snap =>
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const addToCart = async (p: any) => {
    await fetch("/api/buyer/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyerId, product: p }),
    });
    toast.success("Added to cart");
  };

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <BuyerHeader />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-6">Products</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div
              key={p.id}
              className="group card hover:-translate-y-1 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-md bg-[var(--bg-soft)]">
                  <Package size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-muted text-sm">{p.category}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <p className="font-medium flex items-center gap-1">
                  <IndianRupee size={14} />
                  {p.price || "On request"}
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="btn-primary text-sm"
                >
                  <ShoppingCart size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
