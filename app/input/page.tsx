'use client'

import { FormProvider, useForm } from "react-hook-form";
import { Name } from "./presentations";
import useSWRImmutable from "swr/immutable";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
    console.log(data.firstName)
    console.log(data.lastName)
    isSubmit.current = true;
    router.push("/")
  }
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">入力画面</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">登録する情報を入力してください</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Name />
          </div>
        </div>
        <input type="submit" />
      </form>
    </FormProvider>
  )
}

export default Input;

