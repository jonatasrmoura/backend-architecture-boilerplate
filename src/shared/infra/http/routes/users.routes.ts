import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import {
  CreateUserController,
  ListUsersController,
  ReadUserController,
  UpdateUserController,
} from "@modules/users/useCases";

import { createUserSchema } from "@modules/users/useCases/createUser/createUserValidation";
import { paginationQuerySchema } from "@shared/common/paginationQuerySchema";
import { itemByIdSchema } from "@shared/common/itemByIdSchema";
import { updateUserSchema } from "../../../../modules/users/useCases/updateUser/updateUserValidation";

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const readUserController = new ReadUserController();
const updateUserController = new UpdateUserController();

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
        querystring: paginationQuerySchema,
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

  appWithZod.patch(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        description: "Atualiza parcialmente os dados de um usuário existente",
        params: itemByIdSchema,
        body: updateUserSchema,
      },
    },
    updateUserController.handle.bind(updateUserController),
  );
}
