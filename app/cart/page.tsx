"use client";

import { useEffect, useState } from "react";
import BuyerHeader from "@/components/buyer/BuyerHeader";
import { ShoppingCart } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseAuth";

export default function CartPage() {
  const buyerId = "demo-buyer-id";
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getDoc(doc(db, "carts", buyerId)).then(snap => {
      if (snap.exists()) setItems(snap.data().items || []);
    });
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <BuyerHeader />

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ShoppingCart size={20} /> Cart
        </h1>

        {items.length === 0 ? (
          <div className="card text-center py-12 text-muted">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((i, idx) => (
              <div key={idx} className="card flex justify-between">
                <div>
                  <h3 className="font-semibold">{i.name}</h3>
                  <p className="text-muted text-sm">{i.category}</p>
                </div>
                <p>₹ {i.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
