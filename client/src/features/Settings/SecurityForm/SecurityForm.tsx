import React from "react";
import styles from "./SecurityForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryInput from "components/Input/Input";
import Button from "components/Button/Button";

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

  const onSubmit = (values: IFormValues) => {};

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
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <PrimaryInput
              label="NEW PASSWORD"
              inputProps={register("newPassword")}
              error={errors?.newPassword?.message}
            />
          </div>
          <div className={styles.field}>
            <PrimaryInput
              label="CONFIRM NEW PASSWORD"
              inputProps={register("confirmNewPassword")}
              error={errors?.confirmNewPassword?.message}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.button}>
            <Button>Update secuirty information</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecuirtyForm;
