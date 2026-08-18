import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { CreateTokenController } from "@modules/auth/useCases/createToken/CreateTokenController";

import { createTokenSchema } from "@modules/auth/useCases/createToken/createTokenShema";

const createTokenController = new CreateTokenController();

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
}
