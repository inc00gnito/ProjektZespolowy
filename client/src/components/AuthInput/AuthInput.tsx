import React, { InputHTMLAttributes } from "react";
import styles from "./styles/AuthInput.module.scss";
import cx from "classnames";

interface IProps {
  label: string;
  type?: "password" | "text";
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}

const AuthInput: React.FC<IProps> = ({
  label,
  type = "text",
  inputProps,
  error,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}*
        <input
          placeholder={label}
          type={type}
          {...inputProps}
          className={cx(styles.input, {
            [styles.inputError]: !!error,
          })}
        />
      </label>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default AuthInput;
