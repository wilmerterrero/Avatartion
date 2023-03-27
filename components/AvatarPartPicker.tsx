import React from 'react';
import { AvatarPart } from './AvatarPart';

type Props = {
  path: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const AvatarPartPicker = ({ path, ...rest }: Props) => {
  return (
    <button
      type="button"
      className="w-12 h-12 p-6 border-2 border-black rounded-full overflow-hidden flex-col items-center justify-center"
      {...rest}
    >
      <AvatarPart path={path} />
    </button>
  );
};
