import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { createUserSchema } from "@modules/users/useCases/createUser/createUserValidation";
import { paginationQuerySchema } from "@shared/common/paginationQuerySchema";
import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

export async function usersRoutes(app: FastifyInstance) {
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  appWithZod.post(
    "/",
    {
      schema: {
        tags: ["Users"],
        description:
          "Cria um novo usuário no sistema com validação de CPF e regras de negócio",
        body: createUserSchema,
      },
    },
    createUserController.handle.bind(createUserController),
  );

  appWithZod.get(
    "/",
    {
      schema: {
        tags: ["Users"],
        description:
          "Listar todos os usuários não deletados com paginação do sistema",
        params: paginationQuerySchema,
      },
    },
    listUsersController.handle.bind(listUsersController),
  );
}
