export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12
                      grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <p className="font-semibold text-lg">IndiaMART</p>
          <p className="text-muted text-sm mt-2">
            Buyer-first B2B marketplace redesign focused on clarity and trust.
          </p>
        </div>

        <div className="text-sm">
          <p className="font-medium mb-2">Product</p>
          <ul className="space-y-1 text-muted">
            <li>Find suppliers</li>
            <li>Browse categories</li>
            <li>Buyer tools</li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-medium mb-2">About</p>
          <ul className="space-y-1 text-muted">
            <li>Why IndiaMART</li>
            <li>Trust & safety</li>
            <li>Hackathon demo</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]
                      text-center py-6 text-sm text-muted">
        © 2026 · IndiaMART Redesign · Make It Track
      </div>
    </footer>
  );
}
