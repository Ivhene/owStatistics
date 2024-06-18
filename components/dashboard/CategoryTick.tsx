// Place this code at the top of your main component or _app.js file

const originalWarn = console.warn;
console.warn = function (message, ...args) {
  if (typeof message === "string" && message.includes("Image with src")) {
    return;
  }
  originalWarn.apply(console, [message, ...args]);
};

// Your other imports and code
import React, { useState, useEffect } from "react";
import Image from "next/image";

export const CategoryTick = (props: any) => {
  const [size, setSize] = useState(50);

  const updateSize = () => {
    if (window.innerWidth >= 1500) {
      setSize(45); // xl and up
    } else if (window.innerWidth >= 1280) {
      setSize(40); // lg
    } else if (window.innerWidth >= 1024) {
      setSize(35); // lg
    } else if (window.innerWidth >= 768) {
      setSize(30); // md
    } else if (window.innerWidth >= 640) {
      setSize(18); // sm
    } else {
      setSize(12); // smaller
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <foreignObject
      x={props.x - size / 2}
      y={props.y}
      width={size}
      height={size}
    >
      <Image
        src={props.payload.value}
        alt={"Hero image"}
        width={size}
        height={size}
      />
    </foreignObject>
  );
};
