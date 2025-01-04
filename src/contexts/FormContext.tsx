import { createContext } from "react"

interface FormContextProps {
  register: any
  handleSubmit: (
    callback: (data: any) => void,
  ) => (event?: React.BaseSyntheticEvent) => Promise<void>
  errors: any
  fields: any[]
  remove: (index: number) => void
  createUser: (data: any) => void
  addNewTech: () => void
}

export const FormContext = createContext({} as FormContextProps)
