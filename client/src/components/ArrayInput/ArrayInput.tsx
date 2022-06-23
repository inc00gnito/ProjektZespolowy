import React, { InputHTMLAttributes } from "react";
import styles from "./ArrayInput.module.scss";
import cx from "classnames";
import Button from "components/Button/Button";

interface IProps {
  label: string;
  type?: "password" | "text" | "number";
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  onButtonClick: () => void;
  buttonText: string;
}

const PrimaryArrayInput: React.FC<IProps> = ({
  label,
  type = "text",
  inputProps,
  error,
  onButtonClick,
  buttonText,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={label} className={styles.name}>
        {label}
      </label>
      <div className={styles.row}>
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
        <div className={styles.button}>
          <Button type="button" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
      {error ? (
        <p className={styles.error} id={label + "error"} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default PrimaryArrayInput;
