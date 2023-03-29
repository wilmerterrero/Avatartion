import React from 'react';
import { AvatarPart } from './AvatarPart';
import { AvatarButtonPickerContainer } from './AvatarButtonPickerContainer';

type Props = {
  path: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const AvatarPartPicker = ({ path, ...rest }: Props) => {
  return (
    <AvatarButtonPickerContainer {...rest}>
      <div className="absolute inset-0 flex items-center justify-center">
        <AvatarPart path={path} />
      </div>
    </AvatarButtonPickerContainer>
  );
};
