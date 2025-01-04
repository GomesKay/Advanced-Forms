import { z } from "zod"

// Define o Esquema de Validação do formulário usando Zod
export const createUserFormSchema = z.object({
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
