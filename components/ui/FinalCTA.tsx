import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section">
      <div className="max-w-5xl mx-auto
                      rounded-3xl bg-[var(--primary)]
                      text-white px-10 py-16 text-center
                      shadow-lg">
        <h2 className="text-3xl font-semibold">
          Ready to find the right supplier?
        </h2>

        <p className="mt-3 opacity-90 max-w-xl mx-auto">
          Join millions of businesses using IndiaMART to source
          products faster and with confidence.
        </p>

        <button className="mt-8 bg-white text-[var(--primary)]
                           px-6 py-3 rounded-md font-medium
                           inline-flex items-center gap-2
                           hover:opacity-90">
          Get started
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
