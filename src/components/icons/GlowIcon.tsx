
export function GlowIcon({ lineColor, ...rest }: React.HtmlHTMLAttributes<SVGElement> & { lineColor: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="170"
      height="86"
      fill="none"
      viewBox="0 0 170 86"
      {...rest}
    >
      <g filter="url(#filter0_f_1621_93391)">
        <ellipse
          cx="83.5"
          cy="107"
          fill="currentColor"
          fillOpacity="0.9"
          rx="74.5"
          ry="27"
        ></ellipse>
      </g>
      {/* <g filter="url(#filter1_f_1621_93391)">
        <path
          fill="url(#paint0_linear_1621_93391)"
          d="M22 84H145V86H22z"
        ></path>
      </g> */}
      <defs>
        <filter
          id="filter0_f_1621_93391"
          width="309"
          height="214"
          x="-71"
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
            result="effect1_foregroundBlur_1621_93391"
            stdDeviation="40"
          ></feGaussianBlur>
        </filter>
        {/* <filter
          id="filter1_f_1621_93391"
          width="127"
          height="6"
          x="20"
          y="82"
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
            result="effect1_foregroundBlur_1621_93391"
            stdDeviation="1"
          ></feGaussianBlur>
        </filter> */}
        <linearGradient
          id="paint0_linear_1621_93391"
          x1="145"
          x2="22"
          y1="86"
          y2="86"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={lineColor} stopOpacity="0"></stop>
          <stop offset="0.49" stopColor={lineColor}></stop>
          <stop offset="1" stopColor={lineColor} stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
