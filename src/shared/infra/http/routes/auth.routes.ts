import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import {
  CreateTokenController,
  ReadMeAuthController,
} from "@modules/auth/useCases";

import { createTokenSchema } from "@modules/auth/useCases/createToken/createTokenShema";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createTokenController = new CreateTokenController();
const readMeAuthController = new ReadMeAuthController();

export async function authRoutes(app: FastifyInstance) {
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  appWithZod.post(
    "/",
    {
      schema: {
        tags: ["Auth"],
        description:
          "Cria uma autenticação com JWT no sistema para o usuário cadastrado.",
        body: createTokenSchema,
      },
    },
    createTokenController.handle.bind(createTokenController),
  );

  appWithZod.get(
    "/me",
    {
      onRequest: [ensureAuthenticated],
      schema: {
        tags: ["Auth"],
        description: "Exibe o perfil do usuário logado",
        security: [{ bearerAuth: [] }],
      },
    },
    readMeAuthController.handle.bind(readMeAuthController),
  );
}
