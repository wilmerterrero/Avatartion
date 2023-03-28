import React from 'react';
import styles from '~/styles/AvatarCanvas.module.css';

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
} & React.HTMLAttributes<HTMLDivElement>;

// eslint-disable-next-line react/display-name
export const AvatarCanvas = React.forwardRef<HTMLDivElement, AvatarCanvasProps>(
  (
    {
      bg = 'bg-red-300',
      hair,
      eyes,
      mouth,
      head,
      outfit,
      body,
      accessories,
      ...rest
    },
    ref
  ) => {
    const renderAvatarPart = (part: AvatarPart, type: string) => {
      const Part = require(`~/components/parts/${part.src}`).default;
      return (
        <Part
          className={`${styles['avatar-part']} ${styles[type]}`}
          alt={`${part.src}-${type}`}
        />
      );
    };

    return (
      <div
        ref={ref}
        className={`absolute w-80 h-[294px] overflow-hidden ${bg} rounded-2xl`}
        {...rest}
      >
        {renderAvatarPart(body, 'body')}
        {renderAvatarPart(hair, 'hair')}
        {renderAvatarPart(eyes, 'eyes')}
        {renderAvatarPart(mouth, 'mouth')}
        {renderAvatarPart(head, 'head')}
        {renderAvatarPart(outfit, 'outfit')}
        {renderAvatarPart(accessories, 'accessories')}
      </div>
    );
  }
);
