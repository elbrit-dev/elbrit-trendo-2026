/**
 * "Visit us here" — replaces the countdown. Shows the TRENDO 2026 venue floor
 * plan (framed on a light card so it reads cleanly against the dark theme).
 */
export default function VisitUs() {
  return (
    <section className="section" id="visit">
      <div className="container">
        <div className="reveal" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            Visit us here
          </span>
          <h2 className="section-title">Find our stall on the floor</h2>
          <p className="section-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>
            TRENDO 2026 · Hotel Radisson, Salem. Here&apos;s the floor plan — come say hello.
          </p>
        </div>

        <div className="floor-plan reveal">
          <img
            src="/floor-plan.jpg"
            alt="TRENDO 2026 venue floor plan showing the stall layout"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
