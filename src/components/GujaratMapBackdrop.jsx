import React from "react";

/**
 * Translucent Gujarat Map Silhouette and Digital Network Backdrop
 * Styled after official Gujarat Government portals (Digital Gujarat, CM Dashboard, Gujarat.gov.in).
 */
export function GujaratMapBackdrop({ className = "" }) {
  return (
    <div
      className={`gujaratMapBackdrop ${className}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "-2%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "min(680px, 85vw)",
        height: "100%",
        maxHeight: "560px",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        opacity: 0.16,
        userSelect: "none"
      }}
    >
      <svg
        viewBox="0 0 800 700"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gujaratGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#0c2340" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="gujaratStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="60%" stopColor="#0c2340" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          <radialGradient id="capitalPulse" cx="58%" cy="42%" r="25%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0c2340" strokeWidth="0.5" strokeOpacity="0.18" />
            <circle cx="0" cy="0" r="1" fill="#ea580c" fillOpacity="0.4" />
          </pattern>
        </defs>

        {/* Ambient coordinate grid */}
        <rect width="800" height="700" fill="url(#gridPattern)" />

        {/* Subtle Capital Gandhinagar Radial Pulse */}
        <circle cx="490" cy="310" r="140" fill="url(#capitalPulse)" />

        {/* Gujarat State Accurate Geographic Silhouette & Contour */}
        {/*
          Coordinates breakdown:
          - North: Great Rann of Kutch (border with Rajasthan/Pakistan)
          - North-West: Lakhpat, Kori Creek
          - West: Kutch peninsula (Bhuj, Mandvi)
          - Gulf of Kutch water body
          - Saurashtra peninsula: Dwarka, Porbandar, Veraval/Gir, Diu, Bhavnagar
          - Gulf of Khambhat water body
          - Mainland Gujarat: Sabarkantha, Gandhinagar, Ahmedabad, Anand, Vadodara, Bharuch, Surat, Navsari, Valsad
        */}
        <g id="gujarat-main-map">
          {/* Main Mainland and Saurashtra / Kutch polygon */}
          <path
            d="
              M 310,95
              C 380,85 450,110 520,105
              C 555,102 590,120 620,150
              C 650,180 670,225 665,270
              C 660,310 685,345 690,385
              C 695,425 680,465 675,510
              C 670,555 650,595 640,635
              C 630,665 605,675 580,660
              C 560,645 555,605 550,570
              C 545,530 525,495 505,465
              C 495,450 480,440 470,445
              C 455,450 450,470 445,495
              C 440,520 425,550 405,565
              C 375,585 340,590 305,585
              C 270,580 235,565 210,540
              C 185,515 170,480 165,445
              C 160,410 175,375 200,350
              C 225,325 260,310 295,305
              C 320,300 350,305 375,315
              C 395,325 415,315 425,295
              C 435,275 425,250 410,235
              C 390,215 360,205 330,205
              C 290,205 245,210 210,195
              C 170,175 140,155 120,135
              C 145,115 185,100 230,95
              Z
            "
            fill="url(#gujaratGradient)"
            stroke="url(#gujaratStrokeGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Kutch Peninsula and Rann of Kutch Top Section */}
          <path
            d="
              M 115,135
              C 90,140 70,165 75,190
              C 80,215 110,225 140,230
              C 180,235 220,230 260,225
              C 290,220 320,215 340,200
              C 310,185 260,175 220,170
              C 175,165 145,150 115,135
              Z
            "
            fill="url(#gujaratGradient)"
            stroke="url(#gujaratStrokeGrad)"
            strokeWidth="2.5"
            opacity="0.8"
          />

          {/* District Digital Interconnect Lines (Symbolizing Gujarat e-Governance & Parivar ID connectivity) */}
          <g stroke="#ea580c" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.6">
            {/* Gandhinagar (Capital) hub connections */}
            <line x1="490" y1="310" x2="475" y2="335" /> {/* to Ahmedabad */}
            <line x1="490" y1="310" x2="305" y2="445" /> {/* to Rajkot */}
            <line x1="490" y1="310" x2="540" y2="430" /> {/* to Vadodara */}
            <line x1="540" y1="430" x2="570" y2="520" /> {/* to Surat */}
            <line x1="570" y1="520" x2="600" y2="620" /> {/* to Valsad */}
            <line x1="305" y1="445" x2="195" y2="420" /> {/* to Jamnagar */}
            <line x1="305" y1="445" x2="215" y2="510" /> {/* to Junagadh/Porbandar */}
            <line x1="305" y1="445" x2="395" y2="520" /> {/* to Bhavnagar */}
            <line x1="490" y1="310" x2="200" y2="210" /> {/* to Bhuj / Kutch */}
            <line x1="490" y1="310" x2="460" y2="160" /> {/* to Mehsana/Patan */}
          </g>

          {/* District Hub Nodes */}
          {/* Gandhinagar (State Capital - Highlighted) */}
          <g transform="translate(490, 310)">
            <circle r="9" fill="#ea580c" fillOpacity="0.3" />
            <circle r="5" fill="#ea580c" />
            <circle r="2" fill="#fff" />
            <text x="12" y="4" fontSize="11" fontWeight="700" fill="#0c2340" fontFamily="sans-serif">
              ગાંધીનગર (રાજધાની)
            </text>
          </g>

          {/* Ahmedabad */}
          <circle cx="475" cy="335" r="3.5" fill="#0c2340" />
          {/* Vadodara */}
          <circle cx="540" cy="430" r="3.5" fill="#0c2340" />
          {/* Surat */}
          <circle cx="570" cy="520" r="3.5" fill="#0c2340" />
          {/* Rajkot */}
          <circle cx="305" cy="445" r="3.5" fill="#0c2340" />
          {/* Bhavnagar */}
          <circle cx="395" cy="520" r="3" fill="#0c2340" />
          {/* Bhuj (Kutch) */}
          <circle cx="200" cy="210" r="3" fill="#0c2340" />
          {/* Jamnagar */}
          <circle cx="225" cy="390" r="3" fill="#0c2340" />

          {/* Official Emblem Ring Watermark Overlay */}
          <circle cx="490" cy="310" r="85" stroke="#ea580c" strokeWidth="1" strokeDasharray="5 5" opacity="0.35" />
          <circle cx="490" cy="310" r="115" stroke="#0c2340" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
}

export default GujaratMapBackdrop;
