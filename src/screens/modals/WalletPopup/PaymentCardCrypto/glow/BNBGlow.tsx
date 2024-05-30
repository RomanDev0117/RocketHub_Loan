
export function BNBGlow(props: any) {
  return (
    <svg
      width="160"
      height="148"
      fill="none"
      viewBox="0 0 160 148"
      {...props}
    >
      <g filter="url(#filter0_f_2119_60630)">
        <ellipse cx="79.5" cy="147" fill="#FFD84D" rx="61.5" ry="27"></ellipse>
      </g>
      <g filter="url(#filter1_f_2119_60630)">
        <path
          fill="url(#paint0_linear_2119_60630)"
          d="M18 147H141V149H18z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_f_2119_60630"
          width="363"
          height="294"
          x="-102"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_2119_60630"
            stdDeviation="60"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter1_f_2119_60630"
          width="127"
          height="6"
          x="16"
          y="145"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_2119_60630"
            stdDeviation="1"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_2119_60630"
          x1="141"
          x2="18"
          y1="149"
          y2="149"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EFB80B" stopOpacity="0"></stop>
          <stop offset="0.49" stopColor="#EFB80B"></stop>
          <stop offset="1" stopColor="#EFB80B" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}