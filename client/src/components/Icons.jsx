// Небольшой набор линейных иконок в стиле прототипа.

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function Icon({ name, size }) {
  const style = size ? { width: size, height: size } : undefined;

  switch (name) {
    case "monitor":
      return (
        <svg {...base} style={style}>
          <rect x="2.5" y="4" width="19" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    case "wifi":
      return (
        <svg {...base} style={style}>
          <path d="M3.5 9a12 12 0 0 1 17 0" />
          <path d="M7 12.5a7.5 7.5 0 0 1 10 0" />
          <path d="M10.5 16a3 3 0 0 1 3 0" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      );
    case "moon":
      return (
        <svg {...base} style={style}>
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...base} style={style}>
          <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
          <path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3" />
          <path d="M12 13v4M9 20h6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...base} width="20" height="20" style={style}>
          <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...base} width="20" height="20" style={style}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "phone":
      return (
        <svg {...base} width="20" height="20" style={style}>
          <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...base} width="20" height="20" style={style}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "users":
      return (
        <svg {...base} width="20" height="20" style={style}>
          <circle cx="9" cy="9" r="3.2" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 5.8M17.5 19a5.4 5.4 0 0 0-2-4.2" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...base} width="18" height="18" style={style}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
