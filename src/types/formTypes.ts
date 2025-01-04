import { z } from "zod"
import { createUserFormSchema } from "@/schemas/createUserFormSchema"

// Define o tipo TypeScript baseado no esquema Zod
export type CreateUserFormData = z.infer<typeof createUserFormSchema>
