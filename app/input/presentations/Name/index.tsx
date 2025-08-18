import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./index.module.css"
import { InputText } from "@/app/components/InputText";
import { InputForm } from "../../schema";

type NameInfo = {
  firstName: string;
  lastName: string;
}

export const Name = ({ firstName, lastName }: NameInfo) => {
  const { register, formState: { errors }, watch } = useFormContext<InputForm>()
  return (
    <>
      <div className={styles.inputContainer}>
        <InputText
          placeholder={"苗字"}
          value={watch("lastName") ?? lastName}
          errorMessage={errors.lastName && errors.lastName.message}
          {...register("lastName")}
        />
        <InputText
          placeholder={"名前"}
          value={watch("firstName") ?? firstName}
          errorMessage={errors.firstName && errors.firstName.message}
          {...register("firstName")}
        />
      </div>
    </>
  )
}