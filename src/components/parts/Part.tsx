import { lazy } from "react";

export const Part = (src: string) =>
  lazy(() => import(`/src/components/parts/${src}.jsx`));
