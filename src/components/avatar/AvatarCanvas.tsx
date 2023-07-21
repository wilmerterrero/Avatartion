import React, { Suspense } from "react";
import styles from "../../styles/AvatarCanvas.module.css";
import { Part } from "../parts/Part";

type AvatarPart = {
  src: string;
};

type AvatarCanvasProps = {
  bg: string;
  hair: AvatarPart;
  eyes: AvatarPart;
  mouth: AvatarPart;
  head: AvatarPart;
  outfit: AvatarPart;
  body: AvatarPart;
  accessories: AvatarPart;
  facialHair: AvatarPart;
} & React.HTMLAttributes<HTMLDivElement>;

export const AvatarCanvas = React.forwardRef<HTMLDivElement, AvatarCanvasProps>(
  (
    {
      bg = "bg-red-300",
      hair,
      eyes,
      mouth,
      head,
      outfit,
      body,
      accessories,
      facialHair,
      ...rest
    },
    ref
  ) => {
    const renderAvatarPart = (part: AvatarPart, type: string) => {
      const PartComponent = Part(part.src)
      return (
        <Suspense>
          <PartComponent
            className={`${styles["avatar-part"]} ${styles[type]}`}
            alt={`${part.src}-${type}`}
          />
        </Suspense>
      );
    };

    return (
      <div
        ref={ref}
        className={`absolute w-80 h-[294px] overflow-hidden ${bg} rounded-2xl`}
        {...rest}
      >
        {renderAvatarPart(body, "body")}
        {renderAvatarPart(hair, "hair")}
        {renderAvatarPart(eyes, "eyes")}
        {renderAvatarPart(mouth, "mouth")}
        {renderAvatarPart(head, "head")}
        {renderAvatarPart(outfit, "outfit")}
        {renderAvatarPart(accessories, "accessories")}
        {renderAvatarPart(facialHair, "facial-hair")}
      </div>
    );
  }
);
