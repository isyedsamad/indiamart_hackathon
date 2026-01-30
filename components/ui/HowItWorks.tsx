import {
  Search,
  ListChecks,
  MessageCircle,
  ArrowRight
} from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Search products",
    desc: "Find the exact product or service you need from verified suppliers."
  },
  {
    icon: ListChecks,
    title: "Compare suppliers",
    desc: "Evaluate suppliers based on ratings, location, and response speed."
  },
  {
    icon: MessageCircle,
    title: "Connect & get quotes",
    desc: "Contact suppliers directly and receive competitive quotes."
  }
];

export default function HowItWorks() {
  return (
    <section className="section bg-[var(--bg-soft)] rounded-3xl mx-6 my-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold">
          How it works
        </h2>
        <p className="text-muted mt-2">
          A simple buyer journey designed for speed and clarity.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {STEPS.map(({ icon: Icon, title, desc }, index) => (
          <div key={title} className="card text-center">
            <span className="mx-auto inline-flex items-center justify-center
                             w-9 h-9 rounded-full
                             bg-[var(--primary)] text-white text-sm font-medium">
              {index + 1}
            </span>

            <div className="mt-5 mx-auto w-fit p-4 rounded-full
                            bg-[var(--primary-soft)]">
              <Icon size={24} className="text-[var(--primary)]" />
            </div>

            <h3 className="mt-4 font-semibold">
              {title}
            </h3>
            <p className="text-muted mt-2 text-sm">
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="btn-outline inline-flex gap-2">
          Explore buyer features
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
