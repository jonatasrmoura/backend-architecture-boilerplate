import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

import { ICreateTokenDTO } from "@modules/auth/DTOs/ICreateTokenDTO";
import { CreateTokenUseCase } from "./CreateTokenUseCase";

export class CreateTokenController {
  async handle(
    request: FastifyRequest<{
      Body: ICreateTokenDTO;
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { email, password } = request.body;

    const createTokenUseCase = container.resolve(CreateTokenUseCase);

    const result = await createTokenUseCase.execute({ email, password });

    return reply.status(201).send(result);
  }
}
