import React, { InputHTMLAttributes } from "react";
import styles from "./styles/AuthInput.module.scss";

interface IProps {
  label: string;
  type?: "password" | "text";
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

const AuthInput: React.FC<IProps> = ({ label, type = "text", inputProps }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}*
        <input
          placeholder={label}
          type={type}
          {...inputProps}
          className={styles.input}
        />
      </label>
    </div>
  );
};

export default AuthInput;
