import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/ResetPassword.module.scss";
import AuthenticationLayout from "Layout/Authentication/Authentication";
import AuthInput from "components/AuthInput/AuthInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticationStore } from "app/provider/Provider";

const schema = yup.object({
  email: yup.string().required("To pole jest wymagane"),
  password: yup.string().required("To pole jest wymagane"),
});

const ResetPassword = () => {
  const { openPopUp } = useAuthenticationStore();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = () => {
    console.log("submit");
  };
  return (
    <AuthenticationLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.helper}>Enter your email or username.</p>
          <p className={styles.helper}>
            We will send you an email with password reset link.
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <AuthInput
              label="E-mail or username"
              inputProps={register("email")}
              error={errors.email?.message}
            />
          </div>

          <button type="submit" className={styles.button}>
            Reset
          </button>
        </form>
        <div className={styles.back}>
          <span className={styles.text}>Back to </span>
          <button className={styles.button} onClick={() => openPopUp("signin")}>
            Sign In
          </button>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default ResetPassword;
