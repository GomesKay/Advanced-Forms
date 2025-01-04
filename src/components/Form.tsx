import { useContext } from "react"
import { Trash } from "lucide-react"
import { FormContext } from "@/contexts/FormContext"

export function Form() {
  const {
    register,
    handleSubmit,
    errors,
    fields,
    remove,
    createUser,
    addNewTech,
  } = useContext(FormContext)

  return (
    <form
      onSubmit={handleSubmit(createUser)}
      className="flex w-full max-w-sm flex-col gap-4 smartphone:w-60 laptop:max-w-xl laptop:text-xl"
    >
      {/* Campo do Nome */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          className="h-10 rounded border border-zinc-200 px-3 shadow-sm dark:border-zinc-600 dark:bg-zinc-900"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>

      {/* Campo do E-mail */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          className="h-10 rounded border border-zinc-200 px-3 shadow-sm dark:border-zinc-600 dark:bg-zinc-900"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>

      {/* Campo da Data de Nascimento */}
      <div className="flex flex-col gap-1">
        <label htmlFor="date">Data de Nascimento</label>
        <input
          type="date"
          className="h-10 rounded border border-zinc-200 px-3 shadow-sm dark:border-zinc-600 dark:bg-zinc-900"
          {...register("date")}
        />
        {errors.date && (
          <span className="text-sm text-red-500">{errors.date.message}</span>
        )}
      </div>

      {/* Campo da Senha */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          className="h-10 rounded border border-zinc-200 px-3 shadow-sm dark:border-zinc-600 dark:bg-zinc-900"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Campo de Tecnologias */}
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="flex items-center justify-between">
          Tecnologias
          <button
            type="button"
            onClick={addNewTech}
            className="text-sm text-emerald-500"
          >
            Adicionar
          </button>
        </label>

        {fields.map((field: any, index: number) => (
          <div key={field.id} className="flex gap-2">
            <div className="flex flex-1 flex-col gap-1">
              <input
                type="text"
                className="h-10 rounded border border-zinc-200 px-3 shadow-sm dark:border-zinc-600 dark:bg-zinc-900 smartphone:max-w-36 mobile:w-64"
                {...register(`techs.${index}.title`)}
              />

              {errors.techs?.[index]?.title && (
                <span className="text-sm text-red-500">
                  {errors.techs?.[index]?.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="number"
                min={0}
                max={10}
                className="h-10 w-full rounded border border-zinc-200 px-3 shadow-sm dark:border-zinc-600 dark:bg-zinc-900"
                {...register(`techs.${index}.knowledge`)}
              />
              {errors.techs?.[index]?.title && (
                <span className="text-sm text-red-500">
                  {errors.techs?.[index]?.title.message}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                remove(index)
              }}
              className="h-10 rounded border border-zinc-200 px-2 text-red-600 shadow-sm dark:border-zinc-600 dark:bg-zinc-900"
            >
              <Trash size={20} />
            </button>
          </div>
        ))}

        {errors.techs && (
          <span className="text-sm text-red-500">{errors.techs.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="h-10 rounded bg-emerald-500 font-semibold text-white hover:bg-emerald-600"
      >
        Salvar
      </button>
    </form>
  )
}
