import React from 'react';

type Props = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const AvatarButtonPickerContainer = ({ children, ...rest }: Props) => {
  return (
    <button
      type="button"
      className="p-6 border-2 border-black rounded-full overflow-hidden relative"
      {...rest}
    >
      {children}
    </button>
  );
};
