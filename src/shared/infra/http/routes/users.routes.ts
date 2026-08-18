import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { createUserSchema } from "@modules/users/useCases/createUser/createUserValidation";

const createUserController = new CreateUserController();

export async function usersRoutes(app: FastifyInstance) {
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  appWithZod.post(
    "/",
    {
      schema: {
        tags: ["Users"],
        description:
          "Cria um novo usuário no sistema com validação de CPF e regras de negócio",
        body: createUserSchema, // O Zod converte isso automaticamente para o JSON Schema do Swagger!
      },
    },
    createUserController.handle.bind(createUserController),
  );
}
