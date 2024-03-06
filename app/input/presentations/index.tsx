import React from "react";
import { useFormContext } from "react-hook-form";
import { inputForm } from "../page";

export const Name: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<inputForm>()
  return (
    <>
      <div className="sm:col-span-3">
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
          姓
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="lastName"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("lastName", { required: "姓を入力してください" })}
          />
        </div>
        <p className="text-red-700 py-3 text-sm">{errors.lastName && errors.lastName.message}</p>
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
          名
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="firstName"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("firstName", { required: "名を入力してください" })}
          />
        </div>
        <p className="text-red-700 py-3 text-sm">{errors.firstName && errors.firstName.message}</p>
      </div>
    </>
  )
}