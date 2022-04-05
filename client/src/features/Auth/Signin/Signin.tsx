import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Signin.module.scss";
import AuthenticationLayout from "Layout/Authentication";
import AuthInput from "components/AuthInput/AuthInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().required("required").email("not emial"),
  password: yup.string().required("required"),
});

const Signin = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(schema) });
  console.log(errors);

  const onSubmit = () => {
    console.log("submit");
  };
  return (
    <AuthenticationLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.helper}>
            Don't have an account? <a className={styles.link}>Sign up</a>
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <AuthInput
              label="E-mail or username"
              inputProps={register("email")}
            />
          </div>
          <div className={styles.field}>
            <AuthInput label="Password" inputProps={register("password")} />
          </div>
          <button type="submit">go</button>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default Signin;
