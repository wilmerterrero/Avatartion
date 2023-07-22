import { FC } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as parts from ".";

type Props = {
  src: string;
} & React.HTMLAttributes<SVGAElement>;

export const Part: FC<Props> = ({ src, ...rest }) => {
  const splitSrc = src.split("/");
  src = splitSrc[1];

  const PartComponent = parts[src];
  if (!PartComponent) {
    console.error(`No part named "${src}" was found.`);
    return null;
  }
  
  return <PartComponent {...rest} />;
}
