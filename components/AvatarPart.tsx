import React from 'react';

type Props = {
  path: string;
};
export const AvatarPart = ({ path }: Props) => {
  const Part = require(`~/components/parts/${path}`).default;

  return <Part className="transform scale-[0.2]" />;
};
