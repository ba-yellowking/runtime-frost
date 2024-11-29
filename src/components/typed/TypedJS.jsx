import Typed from "typed.js";
import { useEffect, useRef } from "react";

function TypedJS() {
  const el = useRef();

  useEffect(() => {
    const options = {
      strings: [
        "once upon a time",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    };

    const typed = new Typed(el.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div><span ref={el}></span></div>
  );
}

export default TypedJS;