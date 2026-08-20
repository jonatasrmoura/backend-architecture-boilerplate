import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";
import type { RefreshTokenSchema } from "./refreshTokenSchema";

export class RefreshTokenController {
  async handle(
    request: FastifyRequest<{ Body: RefreshTokenSchema }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { refresh_token } = request.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const tokens = await refreshTokenUseCase.execute(refresh_token);

    return reply.status(200).send(tokens);
  }
}
