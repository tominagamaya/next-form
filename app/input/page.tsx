'use client'

import { FormProvider, useForm } from "react-hook-form";
import { Name } from "./presentations/Name";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "../components/Modal";
import styles from "./index.module.css";
import { Button } from "../components/Button";
import { useStore } from "./store";
import { pagesPath } from "@/utils/$path";

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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const store = useStore();

  const methods = useForm<inputForm>({
    mode: "onBlur"
  })

  const onSubmit = (data: inputForm) => {
    const isChanged = isChangedValue({ firstName: store.firstName, lastName: store.lastName }, data)
    if (!isChanged) {
      setErrorMessage("変更がありません")
      return;
    }
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
    store.setText(data.firstName, data.lastName)
    router.push(pagesPath.$url().pathname);
  }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={styles.container}>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <h2 className={styles.title}>氏名入力</h2>
            <p className={styles.subText}>登録する氏名を入力してください</p>
            <div className={styles.nameContents}>
              <Name firstName={store.firstName} lastName={store.lastName} />
            </div>
          </div>
          <div className={styles.buttonContents}>
            <Button
              labelName={"確認"}
              disabled={!methods.formState.isValid || !methods.formState.isDirty || methods.formState.isSubmitting || !!errorMessage}
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

