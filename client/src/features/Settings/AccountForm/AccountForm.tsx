import React, { useEffect, useState } from "react";
import styles from "./AccountForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryInput from "components/Input/Input";
import Button from "components/Button/Button";
import { useAuthenticationStore, useSettingStore } from "app/provider/Provider";
import { CircularProgress } from "@mui/material";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  username: yup
    .string()
    .required("username is required")
    .matches(/^[^@]*$/, "Username cannot contains @ char")
    .min(3, "Username must be at least 3 characters"),
});

const AccountForm = () => {
  const { user } = useAuthenticationStore();
  const { updateEmail, updateUsername, isSubmitting } = useSettingStore();
  const [updateStatus, setUpdateStatus] = useState<
    "initial" | "success" | "error"
  >("initial");
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email || "",
      username: user?.username || "",
    },
  });

  const onSubmit = (values: { email: string; username: string }) => {
    if (values.email !== user?.email)
      updateEmail(values.email)
        .then(() => setUpdateStatus("success"))
        .catch((err: Error) => setError("email", { message: err.message }));
    if (values.username !== user?.username)
      updateUsername(values.username)
        .then(() => setUpdateStatus("success"))
        .catch((err: Error) => setError("username", { message: err.message }));
  };

  useEffect(() => {
    if (updateStatus !== "initial")
      setTimeout(() => {
        setUpdateStatus("initial");
      }, 5000);
  }, [updateStatus]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.text}>General </span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <div className={styles.field}>
            <PrimaryInput
              label="E-MAIL ADDRESS"
              inputProps={register("email")}
              error={errors?.email?.message}
            />
          </div>
          <div className={styles.field}>
            <PrimaryInput
              label="USERNAME"
              inputProps={register("username")}
              error={errors?.username?.message}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.button}>
            <Button>
              {isSubmitting ? (
                <CircularProgress size={15} sx={{ color: "#800760" }} />
              ) : (
                "Update account information"
              )}
            </Button>
          </div>
        </div>
        {updateStatus === "success" ? (
          <p className={styles.success}>We've updated your data</p>
        ) : null}
      </form>
    </div>
  );
};

export default AccountForm;
