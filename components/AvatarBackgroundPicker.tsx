import React from 'react';

type Props = {
  color: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const AvatarBackgroundPicker = ({ color, ...rest }: Props) => {
  return (
    <button
      type="button"
      className="w-12 h-12 p-6 border-2 border-black rounded-full overflow-hidden flex-col items-center justify-center"
      {...rest}
    >
      <div className={`w-12 h-12 ${color}`} />
    </button>
  );
};
