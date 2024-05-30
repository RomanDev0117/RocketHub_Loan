
export function LitecoinGlow(props: any) {
  return (
    <svg
      width="160"
      height="108"
      fill="none"
      viewBox="0 0 160 108"
      {...props}
    >
      <g filter="url(#filter0_f_2119_60657)">
        <ellipse cx="79.5" cy="107" fill="#3C5A9A" rx="61.5" ry="27"></ellipse>
      </g>
      <g filter="url(#filter1_f_2119_60657)">
        <path
          fill="url(#paint0_linear_2119_60657)"
          d="M18 107H141V109H18z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_f_2119_60657"
          width="283"
          height="214"
          x="-62"
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
            result="effect1_foregroundBlur_2119_60657"
            stdDeviation="40"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter1_f_2119_60657"
          width="127"
          height="6"
          x="16"
          y="105"
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
            result="effect1_foregroundBlur_2119_60657"
            stdDeviation="1"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_2119_60657"
          x1="141"
          x2="18"
          y1="109"
          y2="109"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3C5A9A" stopOpacity="0"></stop>
          <stop offset="0.49" stopColor="#547FDA"></stop>
          <stop offset="1" stopColor="#3C5A9A" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}