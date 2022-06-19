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
import PrimaryInput from "components/Input/Input";
import PrimaryArrayInput from "components/ArrayInput/ArrayInput";
import Button from "components/Button/Button";
import { useTrackStore } from "app/provider/Provider";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";

const AUDIO_FILE_FORMATS_LIST = [
  "audio/wav",
  "audio/mp3",
  "audio/ogg",
  "audio/webm",
  "audio/mpeg",
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
      (file) => {
        console.log(file);
        return file && AUDIO_FILE_FORMATS_LIST.includes(file.type);
      }
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
    .typeError("Invalid price")
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
  genre: yup.string().required("select genre"),
});

const GENERE_LIST = [
  {
    id: 0,
    name: 0,
    value: "Rock",
  },
  {
    id: 1,
    name: 1,
    value: "Pop",
  },
  {
    id: 2,
    name: 2,
    value: "PopRock",
  },
  {
    id: 3,
    name: 3,
    value: "PunkRock",
  },
  {
    id: 4,
    name: 4,
    value: "HipHop",
  },
  {
    id: 5,
    name: 5,
    value: "RnB",
  },
  {
    id: 6,
    name: 6,
    value: "Electronic",
  },
];

const Form = () => {
  const navigate = useNavigate();
  const { addTrack, isSubmitting } = useTrackStore();
  console.log("isSubmitting?");
  console.log(isSubmitting);
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
    addTrack(values).then(() => {
      navigate("/tracks");
    });
  };

  const [audioFile, imageFile] = watch(["audioFile", "imageFile"]);
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
            <PrimaryInput
              label="TITLE*"
              inputProps={register("title")}
              error={errors?.title?.message}
            />
          </div>
          <PrimaryArrayInput
            label="TAGS*"
            inputProps={{
              onChange: (e) => {
                console.log("on change");
                setTag(e.target.value);
              },
              value: tag,
            }}
            buttonText="Add tag +"
            onButtonClick={handleAddTag}
            error={errors?.tags?.message}
          />
          <div className={styles.tags}>
            {fields.map((item: any, key: number) => {
              return <Tag item={item} remove={() => remove(key)} />;
            })}
          </div>
          <PrimaryInput
            label="PRICE*"
            type="number"
            inputProps={register("price")}
            error={errors?.price?.message}
          />
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
            <span className={styles.name}>TRACK Genre*</span>
            <div className={styles.select}>
              <Controller
                control={control}
                name="genre"
                render={({ field }) => (
                  <Select
                    field={field}
                    error={errors?.genre?.message}
                    list={GENERE_LIST}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.button}>
          <Button
            disabled={!(isDirty && isValid)}
            title={
              !(isDirty && isValid)
                ? "Form is invalid or incomplete"
                : undefined
            }
          >
            {isSubmitting ? (
              <CircularProgress size={15} sx={{ color: "#800760" }} />
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default observer(Form);
