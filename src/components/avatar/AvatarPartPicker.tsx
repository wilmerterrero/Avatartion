import React from 'react';
import { AvatarPart } from './AvatarPart';
import { AvatarButtonPickerContainer } from './AvatarButtonPickerContainer';

type Props = {
  path: string;
  withBorder?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const AvatarPartPicker = ({ path, withBorder = true, ...rest }: Props) => {
  return (
    <AvatarButtonPickerContainer withBorder={withBorder} {...rest}>
      <div className="absolute inset-0 flex items-center justify-center">
        <AvatarPart path={path} />
      </div>
    </AvatarButtonPickerContainer>
  );
};
