import React, { useState } from "react";
import styles from "./SecurityForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryInput from "components/Input/Input";
import Button from "components/Button/Button";
import { useSettingStore } from "app/provider/Provider";
import { CircularProgress } from "@mui/material";

const schema = yup.object({
  password: yup.string().required("This field is required"),
  newPassword: yup.string().required("This field is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords don't match"),
});

interface IFormValues {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const SecuirtyForm = () => {
  const { updatePassword, isSubmitting } = useSettingStore();
  const [formUpdateStatus, setFormStatus] = useState<"idle" | "success">(
    "idle"
  );
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (values: IFormValues) => {
    updatePassword(values.password, values.newPassword).then(() => {
      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
      }, 5500);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.text}>Security</span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <div className={styles.field}>
            <PrimaryInput
              label="CURRENT PASSWORD"
              inputProps={register("password")}
              error={errors?.password?.message}
              type="password"
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <PrimaryInput
              label="NEW PASSWORD"
              inputProps={register("newPassword")}
              error={errors?.newPassword?.message}
              type="password"
            />
          </div>
          <div className={styles.field}>
            <PrimaryInput
              label="CONFIRM NEW PASSWORD"
              inputProps={register("confirmNewPassword")}
              error={errors?.confirmNewPassword?.message}
              type="password"
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.button}>
            <Button>
              {isSubmitting ? (
                <CircularProgress size={14} sx={{ color: "#800760" }} />
              ) : (
                "Update security information"
              )}
            </Button>
          </div>
        </div>
        {formUpdateStatus === "success" ? (
          <p className={styles.success}>Password has changed</p>
        ) : null}
      </form>
    </div>
  );
};

export default SecuirtyForm;
