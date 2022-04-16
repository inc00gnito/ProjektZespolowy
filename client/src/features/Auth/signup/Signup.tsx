import React from "react";
import styles from "./styles/Signup.module.scss";
import AuthenticationLayout from "Layout/Authentication/Authentication";
import AuthInput from "components/AuthInput/AuthInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticationStore } from "app/provider/Provider";

const schema = yup.object({
  email: yup.string().required("To pole jest wymagane"),
  password: yup.string().required("To pole jest wymagane"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła są różne"),
});

const Signup = () => {
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
          <p className={styles.helper}>Don't have an account?</p>
          <h1 className={styles.title}>Sign up</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <AuthInput
              label="E-mail or username"
              inputProps={register("email")}
              error={errors.email?.message}
            />
          </div>
          <div className={styles.field}>
            <AuthInput
              label="Password"
              inputProps={register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className={styles.field}>
            <AuthInput
              label="Confirm Password"
              inputProps={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        <p className={styles.helper}>
          Already have an account?{" "}
          <a className={styles.link} onClick={() => openPopUp("signin")}>
            Sign In
          </a>
        </p>
      </div>
    </AuthenticationLayout>
  );
};

export default Signup;
