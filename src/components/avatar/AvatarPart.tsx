import { Suspense } from "react";
import { Part } from "../parts/Part";

type Props = {
  path: string;
};
export const AvatarPart = ({ path }: Props) => {
  return (
    <div className="w-12 h-12 relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 scale-[0.2]">
        <Suspense>
          <Part src={path} />
        </Suspense>
      </div>
    </div>
  );
};
