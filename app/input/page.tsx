'use client'

import { FormProvider, useForm } from "react-hook-form";
import { Name } from "./presentations";
import useSWRImmutable from "swr/immutable";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "../components/Modal";
import styles from "./index.module.css";
import { Button } from "../components/Button";

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Input: React.FC = () => {
  const router = useRouter();
  const isSubmit = useRef<boolean>(false);
  const initInputForm = useRef<KeyObject>({})
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
 const [isDiscardOpen, setIsDiscardOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const methods = useForm<inputForm>({
    mode: "onBlur"
  })

  const { data, error } = useSWRImmutable(`https://jsonplaceholder.typicode.com/posts/1`, fetcher)

  /**
   * 破棄確認モーダルでsubmitしたときの処理
   */
  const discardNextPage = (nextUrl: string) => {
    router.push(nextUrl)
  }

  /**
   * 入力項目の値を変更後に画面遷移をしようとした場合、
   * 遷移を停止して破棄確認を表示する
   */
  useEffect(() => {
    if (isSubmit.current || !methods.formState.isDirty) {
      // submit時は破棄確認せずに遷移を続行させる
      return;
    }
    if (!isChangedValue(initInputForm.current, methods.watch())) {
      // 自画面の再描画or初期値から値が変更されていない場合は、破棄確認をせずに遷移を続行させる
      return;
    }
    setIsDiscardOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
              <Name />
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
          text="登録しますか?"
          onClick={() => onSubmitComplete(methods.getValues())}
        ></Modal>)}
      {isDiscardOpen && (
        <Modal 
          setIsModalOpen={setIsModalOpen}
          text="破棄しますか?"
          onClick={() => discardNextPage(pathname)}
        ></Modal>)}
    </>
  )
}

export default Input;

