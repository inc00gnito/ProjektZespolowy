import React from "react";
import styles from "./Button.module.scss";
import cx from "classnames";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "big" | "medium" | "small";
  children: React.ReactNode | React.ReactNode[];
}

const Button: React.FC<IProps> = ({
  size = "medium",
  children,
  ...buttonProps
}) => {
  return (
    <button
      className={cx(styles.button, {
        [styles.big]: size === "big",
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
      })}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
