import React from "react";

const CustomSvg = ({
  fill = "#472647",
  ...props
}: {
  fill?: string;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    {...props}
    className={`w-8 h-8 ${props.className}`}
  >
    <g clipPath="url(#clip0_4_344)">
      <circle cx="16.5" cy="16.5" r="16.5" fill="#472647" />
      <path
        d="M16.9159 5.23779L27.1104 22.8952H6.72138L16.9159 5.23779Z"
        fill="#F2ADF1"
      />
      <path
        d="M27.2747 11.1945L17.0802 28.8519L6.88569 11.1945L27.2747 11.1945Z"
        fill="#F2ADF1"
      />
    </g>
    <defs>
      <clipPath id="clip0_4_344">
        <rect width="33" height="33" rx="16.5" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default CustomSvg;
