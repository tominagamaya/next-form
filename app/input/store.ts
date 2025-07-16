import { create } from "zustand"

type NameInfo = {
  firstName: string;
  lastName: string;
  setText: (irstText: string, lastText: string) => void;
}

export const useStore = create<NameInfo>((set) => ({
  firstName: "",
  lastName: "",
  setText: (firstText: string, lastText: string) => set({ firstName: firstText, lastName: lastText })
})
)

export type UseStore = ReturnType<typeof useStore>
