import { ShoppingCart, Factory, ArrowRight } from "lucide-react";

export default function IntentSection() {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold">
          Choose how you want to use IndiaMART
        </h2>
        <p className="text-muted mt-2">
          We personalize the experience based on your goal.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

        <div className="card relative overflow-hidden border-[var(--primary)]">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary-soft)] rounded-full blur-3xl" />

          <div className="relative">
            <div className="p-3 w-fit rounded-md bg-[var(--primary-soft)]">
              <ShoppingCart className="text-[var(--primary)]" size={26} />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              I want to buy products
            </h3>

            <p className="text-muted mt-2">
              Discover verified suppliers, compare options,
              and connect with confidence — faster.
            </p>

            <ul className="mt-4 space-y-2 text-sm">
              <li>✔ Verified suppliers</li>
              <li>✔ Transparent pricing & ratings</li>
              <li>✔ Faster response times</li>
            </ul>

            <button className="btn-primary mt-6 inline-flex gap-2">
              Find Suppliers
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="card bg-[var(--bg-soft)]">
          <div className="p-3 w-fit rounded-md bg-[var(--bg-card)]">
            <Factory className="text-[var(--text-muted)]" size={26} />
          </div>

          <h3 className="mt-5 text-xl font-semibold">
            I want to sell products
          </h3>

          <p className="text-muted mt-2">
            Reach high-intent buyers and grow your business online.
          </p>

          <button className="btn-outline mt-6">
            Explore Seller Tools
          </button>
        </div>
      </div>
    </section>
  );
}
