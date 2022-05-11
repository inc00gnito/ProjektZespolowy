import React from "react";
import styles from "./styles/Signup.module.scss";
import AuthenticationLayout from "Layout/Authentication/Authentication";
import AuthInput from "components/AuthInput/AuthInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticationStore } from "app/provider/Provider";
import { ISignup } from "app/model/authentication";

interface IFormValues extends ISignup {
  confirmPassword: String;
}

const schema = yup.object({
  email: yup
    .string()
    .required("This field is requried")
    .email("Email is invalid"),
  username: yup
    .string()
    .required("This field is required")
    .matches(/^[^@]*$/, "Username cannot contains @ char"),
  password: yup.string().required("This field is requried"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

const Signup = () => {
  const { openPopUp, signUp } = useAuthenticationStore();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      confirmPassword: "",
      password: "",
    },
  });

  const onSubmit = async (values: IFormValues) => {
    const { confirmPassword, ...signupValues } = values;
    const resp = await signUp(signupValues);
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
          <p className={styles.helper}>Don't have an account?</p>
          <h1 className={styles.title}>Sign up</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <AuthInput
              label="E-mail"
              inputProps={register("email")}
              error={errors.email?.message}
            />
          </div>
          <div className={styles.field}>
            <AuthInput
              label="Username"
              inputProps={register("username")}
              error={errors.username?.message}
            />
          </div>
          <div className={styles.field}>
            <AuthInput
              label="Password"
              type="password"
              inputProps={register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className={styles.field}>
            <AuthInput
              label="Confirm Password"
              type="password"
              inputProps={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            data-testid="submitButton"
          >
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
