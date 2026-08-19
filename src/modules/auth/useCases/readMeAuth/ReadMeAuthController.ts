import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

import { ReadMeAuthUseCase } from "./ReadMeAuthUseCase";

export class ReadMeAuthController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const userId = request.user.id;
    const readMeAuthUseCase = container.resolve(ReadMeAuthUseCase);

    const result = await readMeAuthUseCase.execute({ id: userId });

    return reply.status(200).send(result);
  }
}
