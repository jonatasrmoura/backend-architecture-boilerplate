import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import {
  CreateUserController,
  ListUsersController,
  ReadUserController,
} from "@modules/users/useCases";

import { createUserSchema } from "@modules/users/useCases/createUser/createUserValidation";
import { paginationQuerySchema } from "@shared/common/paginationQuerySchema";
import { itemByIdSchema } from "@shared/common/itemByIdSchema";

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const readUserController = new ReadUserController();

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

  appWithZod.get(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        description: "Exibir um único usuário do sistema",
        params: itemByIdSchema,
      },
    },
    readUserController.handle.bind(readUserController),
  );
}
