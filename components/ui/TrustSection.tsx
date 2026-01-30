import {
  ShieldCheck,
  BadgeCheck,
  Star,
  MapPin,
  Clock,
  Users
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified suppliers only",
    desc: "Every supplier goes through a verification process to ensure authenticity."
  },
  {
    icon: Star,
    title: "Transparent ratings",
    desc: "Real reviews from real buyers help you make informed decisions."
  },
  {
    icon: Clock,
    title: "Faster response times",
    desc: "Smart matching ensures quicker replies from relevant suppliers."
  },
  {
    icon: MapPin,
    title: "Pan-India reach",
    desc: "Source products locally or from anywhere across India."
  },
  {
    icon: BadgeCheck,
    title: "Quality assurance",
    desc: "Suppliers are evaluated based on performance and reliability."
  },
  {
    icon: Users,
    title: "Buyer-first experience",
    desc: "Designed specifically to reduce confusion for first-time buyers."
  }
];

export default function TrustSection() {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold">
          Built on trust, not noise
        </h2>
        <p className="text-muted mt-3">
          We redesigned IndiaMART to focus on credibility, transparency,
          and confidence at every step.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="card hover:-translate-y-1 hover:shadow-md transition"
          >
            <div className="w-11 h-11 flex items-center justify-center
                            rounded-lg bg-[var(--primary-soft)]">
              <Icon size={22} className="text-[var(--primary)]" />
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

      {/* Metrics */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          ["8M+", "Suppliers"],
          ["56K+", "Categories"],
          ["97%", "Response Rate"],
          ["4.6★", "Avg. Rating"]
        ].map(([value, label]) => (
          <div key={label} className="card">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-muted text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
