import React, { useState, useEffect } from "react";

export const CategoryTick = (props: any) => {
  const [size, setSize] = useState(40);

  const updateSize = () => {
    if (window.innerWidth >= 1500) {
      setSize(35); // xl and up
    } else if (window.innerWidth >= 1280) {
      setSize(30); // lg
    } else if (window.innerWidth >= 1024) {
      setSize(25); // lg
    } else if (window.innerWidth >= 768) {
      setSize(20); // md
    } else if (window.innerWidth >= 640) {
      setSize(14); // sm
    } else {
      setSize(10); // smaller
    }
  };

  useEffect(() => {
    // Set the initial size
    updateSize();

    // Update size on window resize
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
      <img src={props.payload.value} />
    </foreignObject>
  );
};
