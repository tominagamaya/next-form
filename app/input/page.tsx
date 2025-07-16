'use client'

import { FormProvider, useForm } from "react-hook-form";
import { Name } from "./presentations/Name";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "../components/Modal";
import styles from "./index.module.css";
import { Button } from "../components/Button";
import { useStore } from "./store";

export type inputForm = {
  firstName: string;
  lastName: string;
}

/**
 * inputFormに変更があるか判定
 */
export type KeyObject = {
  [key: string]: unknown;
}

export const isChangedValue = (defaultValues: KeyObject, currentValues: KeyObject) => {
  const allKeys = new Set([...Object.keys(defaultValues), ...Object.keys(currentValues)]);
  const diffValues = Array.from(allKeys).reduce<KeyObject>((diff, key) => {
    if (defaultValues[key] !== currentValues[key]) {
      diff[key] = key in currentValues ? currentValues[key] : defaultValues[key];
    }
    return diff;
  }, {})
  return Object.keys(diffValues).length !== 0
}

const Input = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const firstName = useStore((state) => state.firstName)
  const lastName = useStore((state) => state.lastName)
  const setText = useStore((state) => state.setText)

  const methods = useForm<inputForm>({
    mode: "onBlur"
  })

  const onSubmit = (data: inputForm) => {
    setIsModalOpen(true)
  }

  /**
   * 入力内容の登録処理
   */
  async function postData(data: inputForm) {
    await fetch(`/api/input?firstName=${data.firstName}&lastName=${data.lastName}`);
  }

  const onSubmitComplete = (data: inputForm) => {
    postData(data);
    setText(data.firstName, data.lastName)
    router.push("../");
  }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={styles.container}>
            <h2 className={styles.title}>氏名入力</h2>
            <p className={styles.subText}>登録する氏名を入力してください</p>
            <div className={styles.nameContents}>
              <Name firstName={firstName} lastName={lastName} />
            </div>
          </div>
          <div className={styles.buttonContents}>
            <Button
              labelName={"確認"}
              disabled={!methods.formState.isValid || !methods.formState.isDirty || methods.formState.isSubmitting}
            />
          </div>
        </form>
      </FormProvider>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          text="登録しますか？"
          onClick={() => onSubmitComplete(methods.getValues())}
        ></Modal>)
      }
    </>
  )
}

export default Input;

