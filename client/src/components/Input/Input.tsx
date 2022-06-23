import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import cx from "classnames";

interface IProps {
  label: string;
  type?: "password" | "text" | "number";
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}

const PrimaryInput: React.FC<IProps> = ({
  label,
  type = "text",
  inputProps,
  error,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={label} className={styles.name}>
        {label}
      </label>
      <input
        id={label}
        type={type}
        className={cx(styles.input, styles.inputNumber, {
          [styles.inputError]: !!error,
          [styles.inputNumber]: type === "number",
        })}
        {...inputProps}
        aria-describedby={label + "error"}
      />
      {error ? (
        <p className={styles.error} id={label + "error"} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default PrimaryInput;
