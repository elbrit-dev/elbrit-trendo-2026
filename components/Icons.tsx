interface IconProps {
  name:
    | "calendar"
    | "pin"
    | "check"
    | "arrow"
    | "science"
    | "speakers"
    | "network"
    | "launch"
    | "mail"
    | "phone"
    | "globe";
  size?: number;
}

/** Lightweight stroke-based icon set (uses currentColor). */
export default function Icon({ name, size = 20 }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M3 9h18M8 2v4M16 2v4" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "science":
      return (
        <svg {...common}>
          <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
          <path d="M7 14h10" />
        </svg>
      );
    case "speakers":
      return (
        <svg {...common}>
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" />
        </svg>
      );
    case "network":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="18" r="2.5" />
          <circle cx="19" cy="18" r="2.5" />
          <path d="M12 7.5 6.5 16M12 7.5 17.5 16M7.5 18h9" />
        </svg>
      );
    case "launch":
      return (
        <svg {...common}>
          <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4s4 0 6 2 2 6 2 6l-9 6-5-5 6-9Z" />
          <circle cx="15" cy="9" r="1.6" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
      );
  }
}
