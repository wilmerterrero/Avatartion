import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import { Transition } from '@headlessui/react';
import { useMediaQuery } from '@react-hook/media-query';

type Props = {
  text: string;
  width?: number;
  children: ReactNode;
};

const Tooltip = ({ text, width = 20, children }: Props) => {
  const [showPopover, setShowPopover] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handlePopoverToggle = () => {
    setShowPopover(!showPopover);
  };

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block">
      <div
        className="inline-block"
        onMouseEnter={handlePopoverToggle}
        onMouseLeave={handlePopoverToggle}
      >
        {children}
      </div>
      <Transition
        show={showPopover}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        {(ref) => (
          <div
            className={`absolute z-10 w-${width} p-2 bg-black rounded-lg shadow-lg -top-28 left-1/2 transform -translate-x-1/2`}
            ref={ref}
          >
            <p className="text-white">{text}</p>
          </div>
        )}
      </Transition>
    </div>
  );
};

export const AvatarTooltip = dynamic(() => Promise.resolve(Tooltip), {
    ssr: false
});