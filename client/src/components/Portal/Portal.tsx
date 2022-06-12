import React from "react";
import { useState, useLayoutEffect, RefObject } from "react";
import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (wrapperId: any) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  wrapperElement.classList.add("react__modal");

  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  anchorEl: RefObject<any>;
  onClick: () => void;
}

const ReactPortal: React.FC<IProps> = ({ children, anchorEl, onClick }) => {
  const { height, width, top, left } =
    anchorEl.current?.getBoundingClientRect() || {
      height: 0,
      width: 0,
      top: 0,
      left: 0,
    };
  const [wrapperElement, setWrapperElement] = useState(null);

  const wrapperId = "react-portal-wrapper";
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element as any);
    const handleClick = (e: any) => {
      if (!e.target.classList.contains("react__modal")) return;
      onClick();
    };
    element.addEventListener("click", handleClick);

    return () => {
      // delete the programatically created element
      element?.removeEventListener("click", onClick);
      if (element && systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null;

  children = children || <div></div>;
  console.log(children);
  return createPortal(
    React.cloneElement(children as any, {
      style: {
        position: "fixed",
        zIndex: 2,
        top: top + height,
        left,
        width,
        height: "fit-content",
      },
    }),
    wrapperElement
  );
};

export default ReactPortal;
