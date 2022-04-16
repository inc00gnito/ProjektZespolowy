import React, { useEffect } from "react";
import HomeLayout from "Layout/Home/Home";
import styles from "./Payment.module.scss";
import * as yup from "yup";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BiCalendar } from "react-icons/bi";
import cx from "classnames";
import { MobileDatePicker } from "@mui/x-date-pickers";

const schema = yup.object({
  cardNumber: yup
    .string()
    .trim()
    .min(19, "Numer musi składać sie z 16 cyfr")
    .max(19, "Numer musi składać sie z 16 cyfr")
    .required("Podaj number karty")
    .matches(
      /(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)/,
      "Numer musi skladać sie z cyfr"
    ),
  expirationDate: yup
    .date()
    .typeError("Nieprawidłowy format")
    .required("Wybierz date"),
  cvv: yup
    .string()
    .min(3, "Kod musi byc 3 cyframi")
    .max(3, "Kod musi byc 3 cyframi")
    .matches(/^[0-9]*$/, "Kod musi byc 3 cyframi")
    .required("Podaj cvv2/cvc2"),
});

const Payment = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      expirationDate: null,
      cardNumber: "",
      cvv: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("submit");
    console.log(data);
  };
  useEffect(() => {
    console.log(errors);
    console.log(creditCard);
    console.log(creditCard?.replace(/\s/g, ""));
    console.log(creditCard?.trim()?.length);
    console.log(getValues());
  }, [errors]);

  const creditCard = useWatch({
    control,
    name: "cardNumber",
  });

  useEffect(() => {
    if (!creditCard) return;
    const cardNumberWithSpace = creditCard
      .replace(/\W/gi, "")
      .replace(/(.{4})/g, "$1 ");
    if (cardNumberWithSpace.length > 19) return;
    setValue("cardNumber", cardNumberWithSpace);
  }, [creditCard]);

  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.leftEmptySpace} />
        <div className={styles.content}>
          <h1 className={styles.title}>PAY BY CARD</h1>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.row}>
              <div className={styles.field}>
                <input
                  className={cx(styles.input, {
                    [styles.inputError]: errors.cardNumber,
                  })}
                  placeholder="CARD NUMBER"
                  maxLength={19}
                  type="text"
                  {...register("cardNumber")}
                />
                {errors.cardNumber ? (
                  <p className={styles.error}>{errors.cardNumber.message}</p>
                ) : null}
              </div>
            </div>
            <div className={styles.row}>
              <div className={cx(styles.field, styles.fieldDesktop)}>
                <Controller
                  name="expirationDate"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Custom input"
                        views={["year", "month"]}
                        {...field}
                        className={styles.picker}
                        PaperProps={{
                          style: {
                            backgroundColor: "#111",
                            color: "white",
                          },
                        }}
                        components={{
                          OpenPickerIcon: () => <BiCalendar color="white" />,
                        }}
                        inputFormat="MM/yy"
                        rifmFormatter={(str: string) => "aa"}
                        componentsProps={{
                          switchViewButton: {
                            style: {
                              color: "white",
                            },
                          },
                        }}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                          <>
                            <div className={styles.dateContainer}>
                              <input
                                ref={inputRef}
                                {...inputProps}
                                className={cx(styles.input, {
                                  [styles.inputError]: errors.expirationDate,
                                })}
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                              {InputProps?.endAdornment}
                            </div>
                            {errors.expirationDate ? (
                              <p className={styles.error}>
                                {errors.expirationDate.message}
                              </p>
                            ) : null}
                          </>
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
              <div className={cx(styles.field, styles.fieldMobile)}>
                <Controller
                  name="expirationDate"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="For mobile"
                        inputFormat="mm/yy"
                        views={["month", "year"]}
                        DialogProps={{
                          PaperProps: {
                            sx: {
                              background: "#111",
                              color: "white",
                            },
                          },
                        }}
                        componentsProps={{
                          switchViewButton: {
                            style: {
                              color: "white",
                            },
                          },
                        }}
                        {...field}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                          <input
                            ref={inputRef}
                            {...inputProps}
                            className={cx(styles.input, {
                              [styles.inputError]: errors.expirationDate,
                            })}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
              <div className={styles.field}>
                <input
                  className={cx(styles.input, {
                    [styles.inputError]: errors.cvv,
                  })}
                  placeholder="CVV2/CVC2"
                  maxLength={3}
                  type="text"
                  {...register("cvv")}
                />
                {errors.cvv ? (
                  <p className={styles.error}>{errors.cvv.message}</p>
                ) : null}
              </div>
            </div>
            <button className={styles.button}>Confirm</button>
          </form>
        </div>
        <div className={styles.rightEmptySpace} />
      </div>
    </HomeLayout>
  );
};

export default Payment;
