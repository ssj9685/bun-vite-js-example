import { useRef, useState } from "react";

export function useInput(initalValue) {
  const [, _render] = useState({});

  const render = () => {
    _render({});
  };

  const target = useRef(initalValue);

  return {
    render,
    target,
  };
}
