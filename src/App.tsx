import { z } from "zod"
import { useState, createContext } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { ClipboardList } from "lucide-react"
import { Form } from "./components/Form"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { zodResolver } from "@hookform/resolvers/zod"

/*
 * [X] Registro do Formulário
 * [X] Validação | Transformação
 * [X] Field Arrays
 */

// Define o Esquema de Validação do formulário usando Zod
const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório") // Valida que o campo não pode ser vazio
    .transform((name) => {
      return name
        .trim() // Remove espaços em brancos nas extremidades
        .split(" ") // Divide o nome em palavras
        .map((word) => {
          // Mapeia a primeira letra da cada palavra
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(" ") // Junta as palavras de volta em uma string
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório") // Valida que o campo não pode ser vazio
    .email("Formato de e-mail inválido") // Valida que o formato do e-mail está correto
    .toLowerCase() // Converte o e-mail para letras minúsculas
    .refine((email) => {
      // Valida que o e-mail termina com "@gmail.com"
      return email.endsWith("@gmail.com")
    }, "O e-mail precisa ser do Gmail"),
  date: z.string().optional(), // Campo opcional
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"), // Valida o tamanho mínimo da senha
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("O título é obrigatório"), // Valida que o título não é vazio
        knowledge: z.coerce
          .number()
          .min(1)
          .max(10, "O máximo de nível é até 10"), // Valida que o conhecimento está entre 1 e 10
      }),
    )
    .min(2, "Insira pelo menos 2 tecnologias") // Valida que pelo menos 2 tecnologias são adicionadas
    .refine((techs) => {
      return techs.some((tech) => tech.knowledge > 2)
    }, "Você está iniciando!"),
})

// Define o tipo TypeScript baseado no esquema Zod
type CreateUserFormData = z.infer<typeof createUserFormSchema>

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
