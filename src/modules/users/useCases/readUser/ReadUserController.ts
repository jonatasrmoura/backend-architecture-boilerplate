import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

import { type ItemById, itemByIdSchema } from "@shared/common/itemByIdSchema";
import { ReadUserUseCase } from "./ReadUserUseCase";

export class ReadUserController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = itemByIdSchema.parse(request.params) as ItemById;

    const readUserUseCase = container.resolve(ReadUserUseCase);

    const result = await readUserUseCase.execute({ id });

    return reply.status(200).send(result);
  }
}
