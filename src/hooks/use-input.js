import { useRef, useState } from "react";

export function useInput(initalValue) {
  const [, render] = useState({});

  const target = useRef(initalValue);

  return {
    render,
    target,
  };
}
