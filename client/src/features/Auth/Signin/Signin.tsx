import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Signin.module.scss";
import AuthenticationLayout from "Layout/Authentication/Authentication";
import AuthInput from "components/AuthInput/AuthInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticationStore } from "app/provider/Provider";
import { ICreds } from "app/model/authentication";

const schema = yup.object({
  login: yup.string().required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(6, "Password should contains at least 6 characters")
    .max(20, "Password cannot be longer than 20 characters"),
});

const Signin = () => {
  const { openPopUp, signIn } = useAuthenticationStore();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (values: ICreds) => {
    const resp = await signIn(values);
    if (!resp?.error) return;
    const { type, message } = resp.error;
    setError(type, {
      message,
    });
  };

  return (
    <AuthenticationLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.helper}>
            Don't have an account?{" "}
            <a className={styles.link} onClick={() => openPopUp("signup")}>
              Sign up
            </a>
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <AuthInput
              label="E-mail or username"
              inputProps={register("login")}
              error={errors.login?.message}
            />
          </div>
          <div className={styles.field}>
            <AuthInput
              label="Password"
              inputProps={register("password")}
              type="password"
              error={errors.password?.message}
            />
          </div>
          <button
            className={styles.forgetPassword}
            type="button"
            onClick={() => openPopUp("resetPassword")}
          >
            Forgot Password?
          </button>
          <button
            type="submit"
            className={styles.button}
            data-testid="submit_button"
          >
            Sign In
          </button>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default Signin;
