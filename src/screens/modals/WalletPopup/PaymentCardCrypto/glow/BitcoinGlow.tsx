
export function BitcoinGlow(props: any) {
  return (
    <svg
      width="160"
      height="148"
      fill="none"
      viewBox="0 0 160 148"
      {...props}
    >
      <g filter="url(#filter0_f_2119_60602)">
        <ellipse cx="79.5" cy="147" fill="#FF6B00" rx="61.5" ry="27"></ellipse>
      </g>
      <g filter="url(#filter1_f_2119_60602)">
        <path
          fill="url(#paint0_linear_2119_60602)"
          d="M18 147H141V149H18z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_f_2119_60602"
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
            result="effect1_foregroundBlur_2119_60602"
            stdDeviation="60"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter1_f_2119_60602"
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
            result="effect1_foregroundBlur_2119_60602"
            stdDeviation="1"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_2119_60602"
          x1="141"
          x2="18"
          y1="149"
          y2="149"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB051" stopOpacity="0"></stop>
          <stop offset="0.49" stopColor="#FFB051"></stop>
          <stop offset="1" stopColor="#FFB051" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}