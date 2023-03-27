import React from 'react';
import styles from '~/styles/AvatarCanvas.module.css';

interface AvatarPart {
  src: string;
}

interface AvatarCanvasProps {
  bg: AvatarPart;
  hair: AvatarPart;
  eyes: AvatarPart;
  mouth: AvatarPart;
  head: AvatarPart;
  outfit: AvatarPart;
  body: AvatarPart;
  accessories: AvatarPart;
}

const AvatarCanvas: React.FC<AvatarCanvasProps> = ({
  hair,
  eyes,
  mouth,
  head,
  outfit,
  body,
  accessories,
}) => {
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
    <div className="absolute w-80 h-[294px] overflow-hidden bg-red-300 rounded-2xl">
      {renderAvatarPart(body, 'body')}
      {renderAvatarPart(hair, 'hair')}
      {renderAvatarPart(eyes, 'eyes')}
      {renderAvatarPart(mouth, 'mouth')}
      {renderAvatarPart(head, 'head')}
      {renderAvatarPart(outfit, 'outfit')}
      {renderAvatarPart(accessories, 'accessories')}
    </div>
  );
};

export default AvatarCanvas;
