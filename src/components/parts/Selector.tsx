type Props = {
  onSelectorClick: () => void;
};
export const Selector = ({ onSelectorClick }: Props) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onSelectorClick()}
      className="cursor-pointer"
    >
      <g stroke-width="0"></g>
      <g stroke-linecap="round" stroke-linejoin="round"></g>
      <g>
        <path
          d="M7 15L12 20L17 15M7 9L12 4L17 9"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  );
};
