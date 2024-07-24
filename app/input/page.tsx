'use client'

import { FormProvider, useForm } from "react-hook-form";
import { Name } from "./presentations";
import useSWRImmutable from "swr/immutable";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const isMoveConfirmed = useRef<boolean>(false);
  const initInputForm = useRef<KeyObject>({})
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // TODO: 破棄確認オーバーレイを作成する
  const [isDiscardOpen, setIsDiscardOpen] = useState<boolean>(false);

  const methods = useForm<inputForm>({
    mode: "onChange"
  })

  const { data, error } = useSWRImmutable(`https://jsonplaceholder.typicode.com/posts/1`, fetcher)
  if (error) {
    console.log("api error!!")
  } else {
    console.log("data:", data)
  }

  /**
   * 破棄確認モーダルでsubmitしたときの処理
   */
  const discardNextPage = (nextUrl: string) => {
    isMoveConfirmed.current = true;
    router.push(nextUrl)
  }

  /**
   * 入力項目の値を変更後に画面遷移をしようとした場合、
   * 遷移を停止して破棄確認を表示する
   */
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isSubmit.current) {
        // submit時は破棄確認せずに遷移を続行させる
        return;
      }
      if (isMoveConfirmed.current === true || !isChangedValue(initInputForm.current, methods.watch())) {
        // 自画面の再描画or初期値から値が変更されていない場合は、破棄確認をせずに遷移を続行させる
        return;
      }
      // TODO: isDiscardOpen = true のときに破棄確認を表示させる
      setIsDiscardOpen(true);
      // router.events.emit('routeChangeError')
      throw `aborted`;
    }
    // TODO: 使えないので別の方法を試す
    // router.events.on("routeChangeStart", handleRouteChange)
    // return () => {
    //   router.events.off("routeChangeStart", handleRouteChange)
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (data: inputForm) => {
    // モーダルを表示
    setIsModalOpen(true)
    console.log(isModalOpen)
    console.log(data.firstName)
    console.log(data.lastName)
    // isSubmit.current = true;
    // router.push("/")
  }

  /**
   * 入力内容の登録処理
   */
  async function postData(data: inputForm) {
    const res = await fetch(`/api/input?firstName=${data.firstName}&lastName=${data.lastName}`);
    const jsonResult = await res.json();
    console.log("complete:", jsonResult)
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
    </>
  )
}

export default Input;

