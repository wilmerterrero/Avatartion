import React from 'react';

type Props = {
  path: string;
};
export const AvatarPart = ({ path }: Props) => {
  const Part = require(`~/components/parts/${path}`).default;

  return (
    <div className="w-12 h-12 relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-[0.2]">
        <Part />
      </div>
    </div>
  );
};
