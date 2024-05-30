import { HTMLAttributes } from 'react';

export const EthereumCircleIcon = (props: HTMLAttributes<SVGElement>) => {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="14.5" cy="14.5" r="14.5" fill="white" />
      <g clipPath="url(#clip0_290_33778)">
        <path
          d="M13.9979 3L13.845 3.52414V18.7321L13.9979 18.886L20.9957 14.7133L13.9979 3Z"
          fill="#343434"
        />
        <path
          d="M13.9979 3L7 14.7133L13.9979 18.886V11.5045V3Z"
          fill="#8C8C8C"
        />
        <path
          d="M13.998 20.2224L13.9117 20.3284V25.7457L13.998 25.9996L21 16.0518L13.998 20.2224Z"
          fill="#3C3C3B"
        />
        <path
          d="M13.9979 25.9996V20.2224L7 16.0518L13.9979 25.9996Z"
          fill="#8C8C8C"
        />
        <path
          d="M13.9979 18.8864L20.9957 14.7136L13.9979 11.5049V18.8864Z"
          fill="#141414"
        />
        <path
          d="M7 14.7136L13.9979 18.8864V11.5049L7 14.7136Z"
          fill="#393939"
        />
      </g>
      <defs>
        <clipPath id="clip0_290_33778">
          <rect
            width="14"
            height="23"
            fill="white"
            transform="translate(7 3)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
