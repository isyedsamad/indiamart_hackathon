import {
  Cpu,
  Factory,
  Wrench,
  Package,
  Shirt,
  Truck,
  ChevronRight
} from "lucide-react";

const CATEGORIES = [
  { icon: Cpu, label: "Electronics" },
  { icon: Wrench, label: "Machinery" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Package, label: "Packaging" },
  { icon: Shirt, label: "Textiles" },
  { icon: Truck, label: "Logistics" }
];

export default function Categories() {
  return (
    <section className="section">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold">
            Popular categories
          </h2>
          <p className="text-muted mt-1">
            Curated categories businesses source the most from.
          </p>
        </div>

        <button className="btn-outline hidden sm:inline-flex gap-1">
          View all
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {CATEGORIES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="card text-center
                       hover:bg-[var(--bg-soft)]
                       hover:-translate-y-1
                       transition cursor-pointer"
          >
            <Icon size={26} className="mx-auto text-[var(--primary)]" />
            <p className="mt-3 text-sm font-medium">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
