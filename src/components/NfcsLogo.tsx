import React from 'react';

interface NfcsLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const NfcsLogo: React.FC<NfcsLogoProps> = ({
  className = '',
  size = 48,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Official NFCS UNN Logo"
    >
      <defs>
        {/* Curved text paths for top and bottom rings */}
        {/* Top Arc (Clockwise along top half) */}
        <path
          id="topArc"
          d="M 60,250 A 190,190 0 1,1 440,250"
          fill="none"
        />
        {/* Bottom Arc (Counter-clockwise along bottom half) */}
        <path
          id="bottomArc"
          d="M 440,250 A 190,190 0 0,1 60,250"
          fill="none"
        />
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Outer Blue Ring Shadow & Background Circle */}
      <circle cx="250" cy="250" r="235" fill="#ffffff" filter="url(#shadow)" />
      
      {/* Outer Royal Blue Thick Ring */}
      <circle cx="250" cy="250" r="230" fill="none" stroke="#1d3557" strokeWidth="22" />
      <circle cx="250" cy="250" r="241" fill="none" stroke="#112233" strokeWidth="3" />
      <circle cx="250" cy="250" r="219" fill="none" stroke="#112233" strokeWidth="3" />

      {/* Inner Thin Blue Ring Container */}
      <circle cx="250" cy="250" r="162" fill="#ffffff" stroke="#1d3557" strokeWidth="5" />

      {/* Circular Ring Text */}
      {/* Top Text: NIGERIA FEDERATION OF CATHOLIC STUDENTS */}
      <text fill="#1d3557" fontSize="22" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1.5">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          NIGERIA FEDERATION OF CATHOLIC STUDENTS
        </textPath>
      </text>

      {/* Bottom Text: UNIVERSITY OF NIGERIA, NSUKKA CHAPTER */}
      <text fill="#1d3557" fontSize="21" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1.2">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          UNIVERSITY OF NIGERIA, NSUKKA CHAPTER
        </textPath>
      </text>

      {/* Red Stars on Left and Right sides */}
      {/* Left Star */}
      <path
        d="M 80,250 l 4.5,-13.8 l 14.5,0 l -11.7,8.5 l 4.5,13.8 l -11.8,-8.5 l -11.8,8.5 l 4.5,-13.8 l -11.7,-8.5 l 14.5,0 z"
        fill="#e63946"
      />
      {/* Right Star */}
      <path
        d="M 420,250 l 4.5,-13.8 l 14.5,0 l -11.7,8.5 l 4.5,13.8 l -11.8,-8.5 l -11.8,8.5 l 4.5,-13.8 l -11.7,-8.5 l 14.5,0 z"
        fill="#e63946"
      />

      {/* ================= CENTER SHIELD ================= */}
      <g transform="translate(0, -10)">
        {/* Shield Outer Outline */}
        <path
          d="M 180,145 C 200,135 220,142 250,142 C 280,142 300,135 320,145 L 320,240 C 320,285 270,315 250,332 C 230,315 180,285 180,240 Z"
          fill="#ffffff"
          stroke="#1d3557"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Shield Inner Double Border */}
        <path
          d="M 188,153 C 205,145 222,150 250,150 C 278,150 295,145 312,153 L 312,236 C 312,276 268,303 250,320 C 232,303 188,276 188,236 Z"
          fill="none"
          stroke="#1d3557"
          strokeWidth="3"
        />

        {/* Shield Cross / Divider Structure */}
        {/* Vertical center divider */}
        <line x1="250" y1="150" x2="250" y2="320" stroke="#1d3557" strokeWidth="4" />
        
        {/* Inverted Chevron / V-divider */}
        <path d="M 188,190 L 250,235 L 312,190" fill="none" stroke="#1d3557" strokeWidth="4" />

        {/* Quadrant Letters: N, F, C, S */}
        {/* N - Top Left */}
        <text x="215" y="185" textAnchor="middle" fill="#1d3557" fontSize="32" fontWeight="900" fontFamily="Arial, sans-serif">
          N
        </text>

        {/* F - Top Right */}
        <text x="285" y="185" textAnchor="middle" fill="#1d3557" fontSize="32" fontWeight="900" fontFamily="Arial, sans-serif">
          F
        </text>

        {/* C - Bottom Left */}
        <text x="218" y="260" textAnchor="middle" fill="#1d3557" fontSize="32" fontWeight="900" fontFamily="Arial, sans-serif">
          C
        </text>

        {/* S - Bottom Right */}
        <text x="282" y="260" textAnchor="middle" fill="#1d3557" fontSize="32" fontWeight="900" fontFamily="Arial, sans-serif">
          S
        </text>

        {/* Holy Spirit Dove (Red) in center of shield */}
        <g transform="translate(250, 210) scale(1.1)">
          {/* Head & beak pointing down */}
          <ellipse cx="0" cy="10" rx="5" ry="7" fill="#e63946" />
          <path d="M 0,16 L -2,22 L 2,22 Z" fill="#e63946" />
          {/* Spread wings */}
          <path
            d="M 0,0 C -15,-18 -32,-12 -40,-2 C -28,3 -15,-2 0,4 C 15,-2 28,3 40,-2 C 32,-12 15,-18 0,0 Z"
            fill="#e63946"
          />
          {/* Fan Tail */}
          <path d="M -8,-6 L 0,-20 L 8,-6 Z" fill="#e63946" />
        </g>

        {/* ================= SCROLL BANNER ================= */}
        <g transform="translate(0, 10)">
          {/* Banner Fold Back Left */}
          <path d="M 145,325 L 175,310 L 175,340 L 145,350 Z" fill="#ffffff" stroke="#1d3557" strokeWidth="3" />
          <path d="M 145,350 L 175,340 L 175,348 Z" fill="#1d3557" />

          {/* Banner Fold Back Right */}
          <path d="M 355,325 L 325,310 L 325,340 L 355,350 Z" fill="#ffffff" stroke="#1d3557" strokeWidth="3" />
          <path d="M 355,350 L 325,340 L 325,348 Z" fill="#1d3557" />

          {/* Main Front Banner Ribbon */}
          <path
            d="M 160,320 C 210,335 290,335 340,320 L 340,355 C 290,370 210,370 160,355 Z"
            fill="#ffffff"
            stroke="#1d3557"
            strokeWidth="4"
          />

          {/* Curved Text on Banner: LIVING THE FAITH */}
          <path id="bannerPath" d="M 165,342 C 210,355 290,355 335,342" fill="none" />
          <text fill="#e63946" fontSize="20" fontWeight="900" fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="1">
            <textPath href="#bannerPath" startOffset="50%" textAnchor="middle">
              LIVING THE FAITH
            </textPath>
          </text>
        </g>
      </g>
    </svg>
  );
};
