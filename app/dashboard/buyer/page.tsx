"use client";

import { useEffect, useState } from "react";
import BuyerHeader from "@/components/buyer/BuyerHeader";
import {
  ClipboardList,
  Plus,
  MessageSquare,
} from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebaseAuth";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";

export default function BuyerDashboard() {
  const buyerId = "demo-buyer-id";

  const [requirements, setRequirements] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const load = async () => {
      const reqSnap = await getDocs(
        query(collection(db, "requirements"), where("buyerId", "==", buyerId))
      );
      const reqs = reqSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      const resSnap = await getDocs(collection(db, "responses"));
      setResponses(resSnap.docs.map(d => d.data()));

      setRequirements(reqs);
      setLoading(false);
    };
    load();
  }, []);

  const postRequirement = async () => {
    if (!title || !category) {
      toast.error("Title & category required");
      return;
    }

    await fetch("/api/buyer/requirement/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, budget, buyerId }),
    });

    toast.success("Requirement posted");
    setShowModal(false);
    location.reload();
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <BuyerHeader />

      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold flex gap-2">
            <ClipboardList size={18} /> My Requirements
          </h1>

          <button
            className="btn-primary inline-flex gap-2"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            Post Requirement
          </button>
        </div>

        {/* REQUIREMENT LIST */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map(r => {
            const reqResponses = responses.filter(
              res => res.requirementId === r.id
            );

            return (
              <div
                key={r.id}
                className="card space-y-3 hover:-translate-y-1 transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{r.title}</h3>
                  <StatusChip status={r.status} />
                </div>

                <p className="text-muted text-sm">{r.category}</p>

                {r.budget && (
                  <p className="text-sm">Budget: ₹ {r.budget}</p>
                )}

                {reqResponses.length > 0 && (
                  <div className="pt-3 border-t border-[var(--border)]">
                    <p className="text-sm font-medium flex gap-2 items-center">
                      <MessageSquare size={14} />
                      Seller Responses
                    </p>

                    <div className="mt-2 space-y-2 text-sm text-muted">
                      {reqResponses.map((res, idx) => (
                        <p key={idx}>• {res.message}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* POST REQUIREMENT MODAL */}
      {showModal && (
        <Modal
          title="Post New Requirement"
          onClose={() => setShowModal(false)}
          onConfirm={postRequirement}
        >
          <input
            placeholder="Requirement title"
            onChange={e => setTitle(e.target.value)}
          />
          <input
            placeholder="Category"
            onChange={e => setCategory(e.target.value)}
          />
          <input
            placeholder="Budget (optional)"
            onChange={e => setBudget(e.target.value)}
          />
        </Modal>
      )}
    </main>
  );
}

function StatusChip({ status }: { status: string }) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-md font-medium
        ${
          status === "responded"
            ? "bg-[var(--status-p-bg)] text-[var(--status-p-text)]"
            : "bg-[var(--warning-soft)] text-[var(--warning)]"
        }`}
    >
      {status === "responded" ? "Responded" : "Open"}
    </span>
  );
}

function Modal({
  title,
  children,
  onClose,
  onConfirm,
}: any) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-xl">
        <div className="px-6 py-4 border-b border-[var(--border)] font-semibold">
          {title}
        </div>

        <div className="px-6 py-5 space-y-4">
          {children}
        </div>

        <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3">
          <button onClick={onClose} className="btn-outline">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-primary">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
