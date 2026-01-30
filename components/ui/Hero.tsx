import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="section pt-20 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Find verified suppliers.
            <br />
            Faster. Smarter. Safer.
          </h1>
          <p className="text-muted mt-4 max-w-xl">
            A buyer-first B2B marketplace redesigned to reduce confusion,
            build trust, and help you connect with the right suppliers—quickly.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="btn-primary inline-flex gap-2">
              Find Products
              <ArrowRight size={16} />
            </button>
            <button className="btn-outline">
              I’m a Seller
            </button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--success)]" />
              Verified suppliers
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[var(--warning)]" />
              Faster responses
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <p className="text-sm text-muted">Suppliers</p>
            <p className="text-2xl font-semibold mt-1">8M+</p>
          </div>
          <div className="card">
            <p className="text-sm text-muted">Categories</p>
            <p className="text-2xl font-semibold mt-1">56K+</p>
          </div>
          <div className="card col-span-2">
            <p className="text-sm text-muted">
              Built for first-time buyers
            </p>
            <p className="mt-2">
              Clear paths, fewer distractions, and trust-first design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
