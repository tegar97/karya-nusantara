import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const FadeInAnimation = ({
  children,
  wrapperElement = "div",
  direction = null,
  delay = 0,
  itemContainerRef = null,
  ...props
}) => {
  const Component: any = wrapperElement;
  const compRef = useRef(null);
  const distance = 200;
  let fadeDirection;

  switch (direction) {
    case "left":
      fadeDirection = { x: -distance };
      break;
    case "right":
      fadeDirection = { x: distance };
      break;
    case "up":
      fadeDirection = { y: distance };
      break;
    case "down":
      fadeDirection = { y: -distance };
      break;

    default:
      fadeDirection = { x: 0 };
      break;
  }

  useEffect(() => {
    gsap.from(compRef.current, 1, {
      ...fadeDirection,
      opacity: 0,
      lazy: false,
      delay,
    });
  }, [compRef, fadeDirection, delay]);

  return (
    <Component ref={compRef} {...props}>
      {children}
    </Component>
  );
};

export default FadeInAnimation;
