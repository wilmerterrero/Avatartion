import React from 'react';

type Props = {
  path: string;
  scale?: number;
};
export const AvatarPart = ({ path, scale = 0.2 }: Props) => {
  const Part = require(`~/components/parts/${path}`).default;

  return (
    <div className="w-12 h-12 relative">
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-[${scale}]`}
      >
        <Part />
      </div>
    </div>
  );
};
