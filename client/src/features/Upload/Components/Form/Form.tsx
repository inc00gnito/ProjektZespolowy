import React, { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import uploadSekeleton from "assets/uploadSkeleton.png";
import photoSkeleton from "assets/photoSkeleton.png";
import Select from "./Select/Select";
import * as yup from "yup";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cx from "classnames";
import { FaRegFileAudio } from "react-icons/fa";
import Tag from "./Tag/Tag";

const AUDIO_FILE_FORMATS_LIST = [
  "audio/wav",
  "audio/mp3",
  "audio/ogg",
  "audio/webm",
];

const IMAGE_FILE_FORMATS_LIST = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "image/gif",
];

const schema = yup.object({
  audioFile: yup
    .mixed()
    .required("Audio's file is required")
    .test(
      "fileFormat",
      "File format is invalid, we support WAV, MP3, OGG, WEBM",
      (file) => file && AUDIO_FILE_FORMATS_LIST.includes(file.type)
    )
    .test(
      "fileSize",
      "File size too large, 10MB max",
      (file) => file && file.size < 11000000
    ),
  title: yup.string().required("Please enter a title"),
  tags: yup.array().min(1, "Please enter a tag"),
  price: yup
    .number()
    .typeError("Podaj poprawną cenę")
    .required("Please enter a price"),
  imageFile: yup
    .mixed()
    .required("Track's image is required")
    .test(
      "fileFormat",
      "File format is invalid, we support JPG, PNG, GIF",
      (file) => file && IMAGE_FILE_FORMATS_LIST.includes(file.type)
    )
    .test(
      "fileSize",
      "File size too large, 1MB max",
      (file) => file && file.size < 1100000
    ),
  type: yup.string().required("select type"),
});

const Form = () => {
  const [tag, setTag] = useState("");
  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const {
    fields,
    append: appendField,
    remove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const handleAddTag = () => {
    append({ value: tag });
    setTag("");
  };

  const append = (obj: any) => {
    appendField(obj);
    trigger("tags");
  };

  const onSubmit = (values: any) => {
    console.log("submit");
  };
  useEffect(() => {
    console.log(getValues());
  }, [errors]);

  const [audioFile, imageFile] = watch(["audioFile", "imageFile"]);
  console.log(imageFile);
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <div className={styles.fileUploaderContainer}>
          <div
            className={cx(styles.fileUploader, {
              [styles.fileUploaderError]: !!errors.audioFile,
            })}
          >
            {audioFile ? (
              <div className={styles.audioFile}>
                <FaRegFileAudio className={styles.fileIcon} />
                <span className={styles.audioName}>{audioFile.name}</span>
              </div>
            ) : (
              <img
                src={uploadSekeleton}
                alt="upload file"
                className={styles.icon}
              />
            )}

            <div className={styles.button}>
              <label htmlFor="uploadFile" className={styles.label}>
                Choose file
              </label>
              <Controller
                control={control}
                name="audioFile"
                render={({ field }) => (
                  <input
                    type="file"
                    id="uploadFile"
                    className={styles.input}
                    accept="audio/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    aria-describedby="audioFileError"
                  />
                )}
              />
            </div>
          </div>
          {errors.audioFile ? (
            <p className={styles.error} id="audioFileError" role="alert">
              {errors.audioFile.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.name}>
              TITLE*
            </label>

            <input
              id="title"
              type="text"
              className={cx(styles.input, {
                [styles.inputError]: !!errors.title,
              })}
              {...register("title")}
              aria-describedby="titleError"
            />
            {errors.title ? (
              <p className={styles.error} id="titleError" role="alert">
                {errors.title.message}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.name}>
              TAGS*
            </label>
            <div className={styles.fieldRow}>
              <input
                id="title"
                type="text"
                className={cx(styles.input, {
                  [styles.inputError]: !!errors.tags,
                })}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                aria-describedby="tagsError"
              />
              <button
                className={styles.button}
                type="button"
                onClick={handleAddTag}
              >
                Add Tag +
              </button>
            </div>
            {errors.tags ? (
              <p className={styles.error} id="tagsError" role="alert">
                {errors.tags.message}
              </p>
            ) : null}
          </div>
          <div className={styles.tags}>
            {fields.map((item: any, key: number) => {
              return <Tag item={item} remove={() => remove(key)} />;
            })}
          </div>
          <div className={styles.field}>
            <label htmlFor="price" className={styles.name}>
              PRICE*
            </label>
            <input
              id="price"
              type="number"
              className={cx(styles.input, styles.inputNumber, {
                [styles.inputError]: !!errors.price,
              })}
              {...register("price")}
              aria-describedby="priceError"
            />
            {errors.price ? (
              <p className={styles.error} id="priceError" role="alert">
                {errors.price.message}
              </p>
            ) : null}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.imageUploadContainer}>
            <div
              className={cx(styles.imageUpload, {
                [styles.imageUploadError]: !!errors.imageFile,
              })}
            >
              <div
                className={cx(styles.icon, {
                  [styles.iconUploaded]: !!imageFile,
                })}
              >
                <img
                  src={
                    imageFile ? URL.createObjectURL(imageFile) : photoSkeleton
                  }
                  alt="upload image"
                  className={styles.photo}
                />
              </div>
              <div className={styles.button}>
                <label htmlFor="imageUpload" className={styles.label}>
                  Upload New Image
                </label>
                <Controller
                  control={control}
                  name="imageFile"
                  render={({ field }) => (
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      className={styles.input}
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      aria-describedby="imageFileError"
                    />
                  )}
                />
              </div>
            </div>
            {errors.imageFile ? (
              <p className={styles.error} id="imageFileError" role="alert">
                {errors.imageFile.message}
              </p>
            ) : null}
          </div>

          <div className={styles.trackType}>
            <span className={styles.name}>TRACK TYPE*</span>
            <div className={styles.select}>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select field={field} error={errors?.type?.message} />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <button
          className={styles.publishButton}
          disabled={!(isDirty && isValid)}
          title={
            !(isDirty && isValid) ? "Form is invalid or incomplete" : undefined
          }
        >
          Publish
        </button>
      </div>
    </form>
  );
};

export default Form;
