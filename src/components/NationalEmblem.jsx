import React from "react";

/**
 * State Emblem of India (Lion Capital of Ashoka)
 * Official emblem used across Government of Gujarat and Government of India portals.
 */
export function NationalEmblem({ size = 46, className = "" }) {
  return (
    <div
      className={`nationalEmblemContainer ${className}`}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }}
      title="ભારત સરકાર / ગુજરાત સરકાર રાષ્ટ્રીય પ્રતીક (State Emblem of India)"
    >
      <svg
        viewBox="0 0 100 120"
        width={size}
        height={size * 1.2}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="State Emblem of India"
      >
        <defs>
          <linearGradient id="emblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="emblemNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c2340" />
            <stop offset="100%" stopColor="#031020" />
          </linearGradient>
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Central Crown / Lion Mane backdrops */}
        <g filter="url(#subtleGlow)">
          {/* Central Lion Head */}
          <path
            d="M50 10 C46 10 44 14 44 18 C41 19 39 23 40 27 C38 29 37 32 38 35 C39 39 42 42 45 44 C46 47 48 49 50 49 C52 49 54 47 55 44 C58 42 61 39 62 35 C63 32 62 29 60 27 C61 23 59 19 56 18 C56 14 54 10 50 10 Z"
            fill="url(#emblemGold)"
          />
          {/* Central Lion Face detail */}
          <ellipse cx="50" cy="24" rx="5" ry="6" fill="#78350f" opacity="0.6" />
          <path d="M47 22 Q50 20 53 22 Q50 25 47 22 Z" fill="#fff" />
          <circle cx="48.5" cy="22" r="1.1" fill="#1e293b" />
          <circle cx="51.5" cy="22" r="1.1" fill="#1e293b" />
          <path d="M48 26 Q50 28 52 26" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M50 27 L50 31 M48 31 Q50 33 52 31" stroke="#451a03" strokeWidth="1.2" fill="none" />

          {/* Left Lion Profile */}
          <path
            d="M37 20 C34 19 31 22 30 25 C27 26 25 30 26 34 C25 37 26 40 28 43 C31 46 35 48 39 49 C39 45 38 41 38 38 C37 34 37 30 38 26 C38 23 37 21 37 20 Z"
            fill="url(#emblemGold)"
          />
          {/* Left Lion eye and nose */}
          <ellipse cx="32" cy="28" rx="1.5" ry="1.2" fill="#fff" />
          <circle cx="31.8" cy="28" r="0.8" fill="#1e293b" />
          <path d="M29 32 Q32 32 34 35" stroke="#451a03" strokeWidth="1" fill="none" />

          {/* Right Lion Profile */}
          <path
            d="M63 20 C66 19 69 22 70 25 C73 26 75 30 74 34 C75 37 74 40 72 43 C69 46 65 48 61 49 C61 45 62 41 62 38 C63 34 63 30 62 26 C62 23 63 21 63 20 Z"
            fill="url(#emblemGold)"
          />
          {/* Right Lion eye and nose */}
          <ellipse cx="68" cy="28" rx="1.5" ry="1.2" fill="#fff" />
          <circle cx="68.2" cy="28" r="0.8" fill="#1e293b" />
          <path d="M71 32 Q68 32 66 35" stroke="#451a03" strokeWidth="1" fill="none" />

          {/* Lion Manes & Chest Pillars */}
          <path
            d="M40 48 Q37 57 38 65 L62 65 Q63 57 60 48 Q50 51 40 48 Z"
            fill="url(#emblemGold)"
          />
          {/* Mane texture strokes */}
          <path
            d="M43 51 Q42 58 44 64 M47 50 Q48 57 48 64 M50 50 L50 64 M53 50 Q52 57 52 64 M57 51 Q58 58 56 64"
            stroke="#78350f"
            strokeWidth="0.8"
            opacity="0.7"
          />

          {/* Capital Abacus (Pedestal base) */}
          <rect x="22" y="65" width="56" height="15" rx="2" fill="url(#emblemGold)" stroke="#78350f" strokeWidth="0.8" />
          <line x1="22" y1="79" x2="78" y2="79" stroke="#78350f" strokeWidth="1.2" />

          {/* Central Ashoka Chakra on Abacus */}
          <circle cx="50" cy="72" r="5.5" stroke="#0c2340" strokeWidth="1.2" fill="#fff" />
          <circle cx="50" cy="72" r="1.3" fill="#0c2340" />
          {/* Chakra spokes */}
          <path
            d="M50 66.8 L50 77.2 M44.8 72 L55.2 72 M46.3 68.3 L53.7 75.7 M46.3 75.7 L53.7 68.3 M48 67.2 L52 76.8 M48 76.8 L52 67.2 M45.2 70 L54.8 74 M45.2 74 L54.8 70"
            stroke="#0c2340"
            strokeWidth="0.6"
          />

          {/* Bull on right side of Abacus */}
          <path
            d="M62 74 C64 71 67 71 69 73 C71 73 73 74 74 76 C73 77 71 77 69 76 C67 77 64 77 62 74 Z"
            fill="#451a03"
            opacity="0.8"
          />
          {/* Horse on left side of Abacus */}
          <path
            d="M38 74 C36 71 33 71 31 73 C29 73 27 74 26 76 C27 77 29 77 31 76 C33 77 36 77 38 74 Z"
            fill="#451a03"
            opacity="0.8"
          />

          {/* Inverted Lotus Base */}
          <path
            d="M26 80 C32 87 40 89 50 89 C60 89 68 87 74 80 L26 80 Z"
            fill="url(#emblemGold)"
            stroke="#78350f"
            strokeWidth="0.8"
          />
          {/* Lotus petal fluting */}
          <path
            d="M31 81 Q34 86 37 87 M40 81 Q42 87 44 88 M50 81 L50 89 M60 81 Q58 87 56 88 M69 81 Q66 86 63 87"
            stroke="#78350f"
            strokeWidth="0.8"
          />

          {/* Plinth Base */}
          <rect x="20" y="89" width="60" height="4" rx="1" fill="#b45309" />
          <rect x="17" y="93" width="66" height="3" rx="1" fill="#78350f" />
        </g>

        {/* Official Motto: Satyameva Jayate (सत्यमेવ जयते) */}
        <text
          x="50"
          y="108"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="bold"
          fontFamily="'Noto Sans Devanagari', 'Nirmala UI', sans-serif"
          fill="#0c2340"
          letterSpacing="0.8"
        >
          सत्यमेવ जयते
        </text>
      </svg>
    </div>
  );
}

export default NationalEmblem;
