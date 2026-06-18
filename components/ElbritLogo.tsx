interface ElbritLogoProps {
  /** Rendered height of the logo image in px. */
  height?: number;
  /** Kept for backwards-compatibility; no longer used. */
  color?: string;
  showWord?: boolean;
}

/**
 * Official Elbrit Life Sciences brand logo (raster asset in /public).
 * The artwork is dark-on-transparent, so it sits on a white chip to stay
 * crisp and legible against the site's dark sections.
 */
export default function ElbritLogo({ height = 36 }: ElbritLogoProps) {
  return (
    <span className="elbrit-logo">
      <img src="/elbrit-logo-asset30.png" alt="Elbrit" style={{ height }} />
    </span>
  );
}
