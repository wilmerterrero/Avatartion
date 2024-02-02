import { ConfettiProps } from "@neoconfetti/react";
import { useEffect, useState } from "react";

export const useConfetti = () => {
  const [confettiOptions, setConfettiOptions] = useState<ConfettiProps>({
    destroyAfterDone: false,
    colors: ["#FFC700", "#FF0000", "#2E3191", "#41BBC7"],
    particleShape: "mix",
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiToggle = () => {
    setShowConfetti(!showConfetti);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showConfetti]);

  return {
    showConfetti,
    confettiOptions,
    confettiToggle,
    setConfettiOptions,
  };
};
