import z from "zod"

export const formSchema = z.object({
  firstName: z.string().min(1, { message: "名前は必須です" }),
  lastName: z.string().min(1, { message: "苗字は必須です" }),
})

export type InputForm = z.infer<typeof formSchema>