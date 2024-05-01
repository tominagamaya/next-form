'use client'

import { FormProvider, useForm } from "react-hook-form";
import { Name } from "./presentations";
import useSWR from "swr";

export type inputForm = {
  firstName: string;
  lastName: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Input: React.FC = () => {
  const methods = useForm<inputForm>({
    mode: "onChange"
  })

  const { data, error } = useSWR(`/api/sample`, fetcher, { 
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  if (error) {
    console.log("api error!!")
  }
  console.log("data:", data)
  
  return (
    <FormProvider {...methods}>
      <form>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">入力画面</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">登録する情報を入力してください</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Name />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default Input;

