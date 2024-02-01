import * as React from "react";

const SvgShare = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M3 12a3 3 0 106 0 3 3 0 10-6 0M15 6a3 3 0 106 0 3 3 0 10-6 0M15 18a3 3 0 106 0 3 3 0 10-6 0M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4" />
    </svg>
  );
};

export default SvgShare;