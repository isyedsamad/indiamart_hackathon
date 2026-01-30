type Props = {
  role: "buyer" | "seller";
  setRole: (r: "buyer" | "seller") => void;
};

export default function AuthRoleToggle({ role, setRole }: Props) {
  return (
    <div className="flex bg-[var(--bg-soft)] rounded-md p-1 mb-6">
      {["buyer", "seller"].map((r) => (
        <button
          key={r}
          onClick={() => setRole(r as any)}
          className={`flex-1 py-2 rounded-md text-sm font-medium
            ${role === r
              ? "bg-[var(--bg-card)] shadow"
              : "text-muted"}`}
        >
          {r === "buyer" ? "Buyer" : "Seller"}
        </button>
      ))}
    </div>
  );
}
