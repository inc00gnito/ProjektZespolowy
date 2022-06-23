import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/ResetPassword.module.scss";
import AuthenticationLayout from "Layout/Authentication/Authentication";
import AuthInput from "components/AuthInput/AuthInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticationStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";
import { CircularProgress } from "@mui/material";

const sendEmailSchema = yup.object({
  email: yup.string().required("To pole jest wymagane"),
});

const resetPaswordSchema = yup.object({
  code: yup.string().required("To pole jest wymagane"),
  password: yup.string().required("To pole jest wymagane"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

interface ISendEmailProps {
  onSent: () => void;
}

const SendEmail = observer(({ onSent }: ISendEmailProps) => {
  const { openPopUp, isSubmitting, sendResetCode } = useAuthenticationStore();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(sendEmailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: { email: string }) => {
    sendResetCode(values.email);
    onSent();
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.helper}>Enter your email.</p>
        <p className={styles.helper}>
          We will send you an email with password reset link.
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <AuthInput
            label="E-mail"
            inputProps={register("email")}
            error={errors.email?.message}
          />
        </div>

        <button type="submit" className={styles.button}>
          {isSubmitting ? (
            <CircularProgress size={14} sx={{ color: "#800760" }} />
          ) : (
            "Send"
          )}
        </button>
      </form>
      <div className={styles.back}>
        <span className={styles.text}>Back to </span>
        <button className={styles.button} onClick={() => openPopUp("signin")}>
          Sign In
        </button>
      </div>
    </div>
  );
});

interface IResetPasswordWithCodeProps {
  onBack: () => void;
}
const ResetPasswordWithCode = observer(
  ({ onBack }: IResetPasswordWithCodeProps) => {
    const { isSubmitting, resetPassword, openPopUp } = useAuthenticationStore();
    const {
      handleSubmit,
      formState: { errors },
      register,
    } = useForm({
      resolver: yupResolver(resetPaswordSchema),
      defaultValues: { password: "", confirmPassword: "", code: "" },
    });

    const onSubmit = (values: {
      password: string;
      code: string;
      confirmPassword: String;
    }) => {
      resetPassword(values.code, values.password).then(() => {
        openPopUp("signin");
      });
    };
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.helper}>Enter new password</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <AuthInput
              label="Kod"
              inputProps={register("code")}
              error={errors.code?.message}
            />
          </div>
          <div className={styles.field}>
            <AuthInput
              label="Nowe hasło"
              inputProps={register("password")}
              type="password"
              error={errors.password?.message}
            />
          </div>
          <div className={styles.field}>
            <AuthInput
              label="Powtórz hasło"
              inputProps={register("confirmPassword")}
              type="password"
              error={errors.confirmPassword?.message}
            />
          </div>

          <button type="submit" className={styles.button}>
            {isSubmitting ? (
              <CircularProgress size={14} sx={{ color: "#800760" }} />
            ) : (
              "Reset"
            )}
          </button>
        </form>
        <div className={styles.back}>
          <button className={styles.button} onClick={onBack}>
            Back
          </button>
        </div>
      </div>
    );
  }
);

const ResetPassword = () => {
  const [code, setCode] = useState<boolean>(false);

  const onResetPaswordPopUpClick = () => setCode(false);
  const onSendEmail = () => setCode(true);

  return (
    <AuthenticationLayout>
      {code ? (
        <ResetPasswordWithCode onBack={onResetPaswordPopUpClick} />
      ) : (
        <SendEmail onSent={onSendEmail} />
      )}
    </AuthenticationLayout>
  );
};

export default ResetPassword;
