// import coinIcon from '../../assets/images/icons/coin.svg';

export type TCoinIconProps = {
  shine?: boolean;
} & React.HTMLAttributes<SVGElement>;

export const CoinIcon = ({ shine, ...rest }: TCoinIconProps) => {
  const _Icon = shine ? IconShine : Icon;

  return (
    // <img src={coinIcon} alt="Rocket Coin" {...props} />
    <_Icon {...rest} />
  );
};

function IconShine(props: React.HTMLAttributes<SVGElement>) {
  return (
    <span
      style={{
        display: 'block',
        width: 22,
        height: 22,
        position: 'relative',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="none"
        viewBox="0 0 36 36"
        {...props}
        style={{
          position: 'absolute',
          top: -3,
          left: -7,
        }}
      >
        <g filter="url(#filter0_f_1683_65247)">
          <circle cx="18.456" cy="17.95" r="6.186" fill="#FFB74B"></circle>
        </g>
        <mask
          id="mask0_1683_65247"
          style={{ maskType: 'alpha' }}
          width="17"
          height="18"
          x="10"
          y="5"
          maskUnits="userSpaceOnUse"
        >
          <circle cx="18.457" cy="14.219" r="8.418" fill="#FFE24B"></circle>
        </mask>
        <g mask="url(#mask0_1683_65247)">
          <circle cx="18.457" cy="14.219" r="8.418" fill="#FFE24B"></circle>
          <circle cx="18.457" cy="14.219" r="8.418" fill="#9C5E14"></circle>
          <circle cx="18.456" cy="17.816" r="9.491" fill="#FFE24B"></circle>
          <path
            fill="#9C5E14"
            fillRule="evenodd"
            d="M14.922 11.23c0-.058.047-.105.105-.105h5.606l.001.001v.004c.853 0 1.98.704 1.98 1.979 0 1.148-.656 1.793-1.356 1.799a.004.004 0 00-.003.005l1.47 2.236a.106.106 0 01-.089.163h-2.135a.106.106 0 01-.09-.05l-1.169-1.866a.106.106 0 00-.09-.05H16.96a.106.106 0 00-.105.106v1.743a.106.106 0 01-.106.106h-1.72a.106.106 0 01-.106-.105V11.23zm5.018 2.675c.25 0 .484-.229.484-.637 0-.452-.4-.702-.702-.702h-4.8v1.34H19.939z"
            clipRule="evenodd"
          ></path>
          <circle
            cx="18.457"
            cy="14.219"
            r="7.856"
            stroke="#FFE24B"
            strokeWidth="1.124"
          ></circle>
        </g>
        <defs>
          <filter
            id="filter0_f_1683_65247"
            width="35.077"
            height="35.078"
            x="0.917"
            y="0.411"
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
              result="effect1_foregroundBlur_1683_65247"
              stdDeviation="5.676"
            ></feGaussianBlur>
          </filter>
        </defs>
      </svg>
    </span>
  );
}

function Icon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="none"
      viewBox="0 0 22 22"
      {...props}
    >
      <g clipPath="url(#clip0_1758_55921)">
        {/* <g filter="url(#filter0_f_1758_55921)">
          <path
            fill="#52350A"
            fillOpacity="0.58"
            d="M18.213 14.418a6.783 6.783 0 01-6.786 6.78 6.783 6.783 0 01-6.786-6.78 6.783 6.783 0 016.786-6.781 6.783 6.783 0 016.786 6.78z"
          ></path>
        </g> */}
        <mask
          id="mask0_1758_55921"
          style={{ maskType: 'alpha' }}
          width="19"
          height="19"
          x="2"
          y="1"
          maskUnits="userSpaceOnUse"
        >
          <path
            fill="#FFE24B"
            d="M20.668 10.328c0 5.097-4.134 9.228-9.234 9.228s-9.235-4.131-9.235-9.228c0-5.096 4.135-9.227 9.235-9.227s9.234 4.131 9.234 9.227z"
          ></path>
        </mask>
        <g mask="url(#mask0_1758_55921)">
          <path
            fill="#FFE24B"
            d="M20.668 10.328c0 5.097-4.134 9.228-9.234 9.228s-9.235-4.131-9.235-9.228c0-5.096 4.135-9.227 9.235-9.227s9.234 4.131 9.234 9.227z"
          ></path>
          <path
            fill="#9C5E14"
            d="M20.668 10.328c0 5.097-4.134 9.228-9.234 9.228s-9.235-4.131-9.235-9.228c0-5.096 4.135-9.227 9.235-9.227s9.234 4.131 9.234 9.227z"
          ></path>
          <path
            fill="#FFE24B"
            d="M21.846 14.27c0 5.746-4.662 10.404-10.411 10.404-5.75 0-10.412-4.658-10.412-10.403 0-5.746 4.662-10.404 10.412-10.404 5.75 0 10.41 4.658 10.41 10.404z"
          ></path>
          <path
            fill="#9C5E14"
            fillRule="evenodd"
            d="M7.559 7.053c0-.064.051-.115.115-.115H13.823l.002.001v.004c.935 0 2.171.771 2.171 2.17 0 1.258-.719 1.965-1.487 1.97a.004.004 0 00-.004.005v.002l1.613 2.45a.116.116 0 01-.097.18h-2.342a.116.116 0 01-.098-.055l-1.283-2.046a.116.116 0 00-.098-.054H9.794a.116.116 0 00-.116.116v1.91a.116.116 0 01-.116.116H7.674a.116.116 0 01-.115-.115V7.053zm5.504 2.932c.274 0 .531-.25.531-.699 0-.495-.438-.769-.77-.769H7.56v1.468h5.505z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#FFE24B"
            fillRule="evenodd"
            d="M11.434 18.672c4.613 0 8.35-3.736 8.35-8.344 0-4.607-3.737-8.344-8.35-8.344-4.613 0-8.351 3.737-8.351 8.344 0 4.608 3.738 8.345 8.35 8.345zm0 .884c5.1 0 9.234-4.131 9.234-9.228 0-5.096-4.134-9.227-9.234-9.227s-9.235 4.131-9.235 9.227c0 5.097 4.135 9.228 9.235 9.228z"
            clipRule="evenodd"
          ></path>
        </g>
      </g>
      {/* <defs>
        <filter
          id="filter0_f_1758_55921"
          width="31.41"
          height="31.402"
          x="-4.279"
          y="-1.283"
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
            result="effect1_foregroundBlur_1758_55921"
            stdDeviation="4.46"
          ></feGaussianBlur>
        </filter>
        <clipPath id="clip0_1758_55921">
          <path fill="#fff" d="M0 0H22V22H0z"></path>
        </clipPath>
      </defs> */}
    </svg>
  );
}
