import React from 'react';
import { AvatarButtonPickerContainer } from './AvatarButtonPickerContainer';

type Props = {
  color: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const AvatarBackgroundPicker = ({ color, ...rest }: Props) => {
  return (
    <AvatarButtonPickerContainer {...rest}>
      <div className="absolute inset-0 flex items-center justify-center">
        {color === 'bg-transparent' ? (
          <img src="/transparent-bg.jpg" alt="transparent-bg" className='w-12 h-12' />
        ) : (
          <div className={`w-12 h-12 ${color}`} />
        )}
      </div>
    </AvatarButtonPickerContainer>
  );
};
