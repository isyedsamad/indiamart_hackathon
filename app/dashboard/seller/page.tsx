"use client";

import { useEffect, useState } from "react";
import {
  Package,
  ClipboardList,
  Plus,
  LogOut,
  TrendingUp,
  MessageSquare,
  IndianRupee,
  Send,
} from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseAuth";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  category: string;
  price?: string;
};

type Requirement = {
  id: string;
  title: string;
  category: string;
  budget?: string;
  status?: "new" | "responded";
};

export default function SellerDashboard() {
  const router = useRouter();
  const sellerId = "demo-seller-id";

  const [products, setProducts] = useState<Product[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);

  const [productModal, setProductModal] = useState(false);
  const [respondModal, setRespondModal] = useState<Requirement | null>(null);

  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pPrice, setPPrice] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const prodSnap = await getDocs(
        query(collection(db, "products"), where("sellerId", "==", sellerId))
      );

      const reqSnap = await getDocs(collection(db, "requirements"));

      setProducts(prodSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
      setRequirements(
        reqSnap.docs.map(d => ({
          id: d.id,
          ...(d.data() as any),
          status: "new",
        }))
      );

      setLoading(false);
    };
    load();
  }, []);

  const analytics = {
    totalProducts: products.length,
    totalRequirements: requirements.length,
    responded: requirements.filter(r => r.status === "responded").length,
    pending: requirements.filter(r => r.status === "new").length,
  };

  const addProduct = async () => {
    if (!pName || !pCategory) {
      toast.error("Name & category required");
      return;
    }

    await fetch("/api/seller/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: pName,
        category: pCategory,
        price: pPrice,
        sellerId,
      }),
    });

    toast.success("Product added");
    setProductModal(false);
    location.reload();
  };

  const respondRequirement = () => {
    toast.success("Response sent to buyer");
    setRespondModal(null);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-[var(--bg)]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[var(--bg-card)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <div>
            <h1 className="text-xl font-semibold">Seller Workspace</h1>
            <p className="text-muted text-sm">
              Manage products & respond to buyer needs
            </p>
          </div>

          <button onClick={logout} className="btn-outline flex gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* ANALYTICS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard label="Products" value={analytics.totalProducts} icon={Package} />
          <AnalyticsCard label="Buyer Requests" value={analytics.totalRequirements} icon={ClipboardList} />
          <AnalyticsCard label="Responded" value={analytics.responded} icon={Send} />
          <AnalyticsCard label="Pending" value={analytics.pending} icon={TrendingUp} />
        </div>

        {/* TODAY FOCUS */}
        <div className="card flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Today Focus</h2>
            <p className="text-muted text-sm">
              {analytics.pending} buyer requirements awaiting your response
            </p>
          </div>
          <span className="badge-primary">
            Action Needed
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* REQUIREMENTS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex gap-2">
              <ClipboardList size={18} /> Buyer Requirements
            </h2>

            <div className="space-y-4">
              {requirements.map(r => (
                <div key={r.id} className="card flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="text-muted text-sm">{r.category}</p>
                    {r.budget && (
                      <p className="mt-2 text-sm flex gap-1">
                        <IndianRupee size={14} /> {r.budget}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setRespondModal(r)}
                    className="btn-primary text-sm"
                  >
                    Respond
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex gap-2">
                <Package size={18} /> Your Products
              </h2>
              <button
                onClick={() => setProductModal(true)}
                className="btn-primary flex gap-2"
              >
                <Plus size={16} /> Add
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="card">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-muted text-sm">{p.category}</p>
                  {p.price && (
                    <p className="mt-2 text-sm">
                      ₹ {p.price}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ADD PRODUCT MODAL */}
      {productModal && (
        <Modal title="Add Product" onClose={() => setProductModal(false)}>
          <input placeholder="Product name" onChange={e => setPName(e.target.value)} />
          <input placeholder="Category" onChange={e => setPCategory(e.target.value)} />
          <input placeholder="Price (optional)" onChange={e => setPPrice(e.target.value)} />
          <ModalActions
            onCancel={() => setProductModal(false)}
            onConfirm={addProduct}
          />
        </Modal>
      )}

      {/* RESPOND MODAL */}
      {respondModal && (
        <Modal title="Respond to Requirement" onClose={() => setRespondModal(null)}>
          <textarea
            placeholder="Write your response to the buyer..."
            rows={4}
            onChange={e => setMessage(e.target.value)}
          />
          <ModalActions
            onCancel={() => setRespondModal(null)}
            onConfirm={respondRequirement}
            confirmText="Send Response"
          />
        </Modal>
      )}

    </main>
  );
}

function AnalyticsCard({ label, value, icon: Icon }: any) {
  return (
    <div className="card flex items-center gap-4">
      <div className="p-3 rounded-md bg-[var(--primary-soft)]">
        <Icon size={20} className="text-[var(--primary)]" />
      </div>
      <div>
        <p className="text-muted text-sm">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-xl">
        <div className="px-6 py-4 border-b border-[var(--border)] font-semibold">
          {title}
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
        <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3">
          <button onClick={onClose} className="btn-outline">Cancel</button>
          <button className="btn-primary">Confirm</button>
        </div>
      </div>
    </div>
  );
}

function ModalActions({ onCancel, onConfirm, confirmText = "Save" }: any) {
  return (
    <div className="flex justify-end gap-3">
      <button onClick={onCancel} className="btn-outline">Cancel</button>
      <button onClick={onConfirm} className="btn-primary">{confirmText}</button>
    </div>
  );
}
