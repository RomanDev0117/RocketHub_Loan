import { HTMLAttributes } from 'react';

export const XCircleIcon = (props: HTMLAttributes<SVGElement>) => {
  return (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" {...props}>
      <ellipse
        cx="14.9978"
        cy="14.3174"
        rx="14.0017"
        ry="14"
        fill="currentColor"
      />
      <path
        d="M11.0195 10.3389L14.9983 14.3172M18.9772 18.2955L14.9983 14.3172M14.9983 14.3172L11.0195 18.2955M14.9983 14.3172L18.9772 10.3389"
        stroke="#9CA3AF"
        strokeWidth="1.5"
      />
    </svg>
  );
};
