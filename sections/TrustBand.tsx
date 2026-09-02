const stats = [
  { value: "50+", label: "Professional Templates" },
  { value: "100+", label: "Resume Sections" },
  { value: "ATS", label: "Optimized" },
  { value: "PDF", label: "Export" }
];

export function TrustBand() {
  return (
    <section className="trust-section" aria-label="Trust statistics">
      <div className="container trust-grid">
        {stats.map((item) => (
          <div className="trust-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
