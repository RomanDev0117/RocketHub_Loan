
export function EthereumGlow(props: any) {
  return (
    <svg
      width="160"
      height="109"
      fill="none"
      viewBox="0 0 160 109"
      {...props}
    >
      <g filter="url(#filter0_f_2119_60613)">
        <ellipse cx="79.5" cy="107" fill="#6F76A9" rx="61.5" ry="27"></ellipse>
      </g>
      <g filter="url(#filter1_f_2119_60613)">
        <path
          fill="url(#paint0_linear_2119_60613)"
          d="M18 108H141V110H18z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_f_2119_60613"
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
            result="effect1_foregroundBlur_2119_60613"
            stdDeviation="40"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter1_f_2119_60613"
          width="127"
          height="6"
          x="16"
          y="106"
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
            result="effect1_foregroundBlur_2119_60613"
            stdDeviation="1"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_2119_60613"
          x1="141"
          x2="18"
          y1="110"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6F76A9" stopOpacity="0"></stop>
          <stop offset="0.49" stopColor="#949EE4"></stop>
          <stop offset="1" stopColor="#6F76A9" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}