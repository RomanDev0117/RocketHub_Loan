export const Gradient = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="170"
      height="119"
      viewBox="0 0 170 119"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_f_554_39919)">
        <ellipse
          cx="84.5"
          cy="67"
          rx="74.5"
          ry="27"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_554_39919"
          x="-30"
          y="0"
          width="229"
          height="134"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="20"
            result="effect1_foregroundBlur_554_39919"
          />
        </filter>
      </defs>
    </svg>
  );
};
