import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { ClipboardList } from "lucide-react"
import { Form } from "./components/Form"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserFormData } from "./types/formTypes"
import { createUserFormSchema } from "./schemas/createUserFormSchema"
import { FormContext } from "./contexts/FormContext"

/*
 * [X] Registro do Formulário
 * [X] Validação | Transformação
 * [X] Field Arrays
 */

export function App() {
  const [output, setOutput] = useState("")

  // Configura o formulário com React Hook Form e integra com Zod para validação
  const {
    register, // Registra os campos do formulário
    handleSubmit, // Lida com a submissão do formulário
    formState: { errors }, // Captura os erros de validação
    control, // Controla os campos dinâmicos (arrays)
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema), // Usa o esquema Zod para validação
  })

  // Gerencia o array de tecnologias no formulário
  const { fields, append, remove } = useFieldArray({
    control, // Necessário para lidar com arrays de campos
    name: "techs", // Nome do campo no formulário
  })

  // Adiciona uma nova tecnologia ao array
  function addNewTech() {
    append({ title: "", knowledge: 0 }) // Adiciona um novo item com valores padrão
  }

  // Função chamada ao submeter o formulário
  function createUser(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2)) // Converte os dados para JSON formatado e salva no estado
  }

  return (
    <FormContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        fields,
        remove,
        createUser,
        addNewTech,
      }}
    >
      <div className="flex h-screen flex-col gap-24 bg-zinc-50 font-sans dark:bg-zinc-950 dark:text-white">
        <header className="flex items-center justify-between p-16 mobile:flex-col mobile:gap-6">
          <ClipboardList className="size-8 mobile:hidden" />

          <h1 className="text-3xl font-semibold mobile:text-sm">
            Formulários Avançados
          </h1>

          <ThemeSwitch />
        </header>

        <main className="flex flex-col items-center justify-center gap-10">
          <Form />

          <pre>{output}</pre>
        </main>
      </div>
    </FormContext.Provider>
  )
}
