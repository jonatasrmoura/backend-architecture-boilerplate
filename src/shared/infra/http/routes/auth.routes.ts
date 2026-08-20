import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import {
  CreateTokenController,
  ReadMeAuthController,
  RefreshTokenController,
} from "@modules/auth/useCases";

import { createTokenSchema } from "@modules/auth/useCases/createToken/createTokenShema";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { refreshTokenSchema } from "../../../../modules/auth/useCases/refreshTokenUseCase/refreshTokenSchema";

const createTokenController = new CreateTokenController();
const readMeAuthController = new ReadMeAuthController();
const refreshTokenController = new RefreshTokenController();

export async function authRoutes(app: FastifyInstance) {
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  appWithZod.post(
    "/sessions",
    {
      schema: {
        tags: ["Auth"],
        description:
          "Autentica um usuário e retorna o access token e refresh token",
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

  appWithZod.post(
    "/refresh-token",
    {
      schema: {
        tags: ["Auth"],
        description: "Gera um novo access token utilizando o refresh token",
        body: refreshTokenSchema,
      },
    },
    refreshTokenController.handle.bind(refreshTokenController),
  );
}
