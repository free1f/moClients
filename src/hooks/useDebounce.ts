// source: https://stackblitz.com/github/Bwca/demo__use-debounce-hook?file=src%2Fdebounce%2Fdebounce.ts

import { useEffect } from "react";
import { debounce } from "../utils";

export const useDebounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): ((args: A) => Promise<R>) => {
  const [debouncedFun, teardown] = debounce<A, R>(fn, ms);

  useEffect(() => () => teardown(), []);

  return debouncedFun;
};
