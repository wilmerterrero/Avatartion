import React from "react";

type Props = {
  children: React.ReactNode;
  withBorder?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const AvatarButtonPickerContainer = ({
  children,
  withBorder = true,
  ...rest
}: Props) => {
  return (
    <button
      type="button"
      className={`p-6 ${
        withBorder ? "border-2 border-black" : ""
      } rounded-full overflow-hidden relative`}
      {...rest}
    >
      {children}
    </button>
  );
};
