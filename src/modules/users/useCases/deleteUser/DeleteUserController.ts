import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

import { type ItemById } from "@shared/common/itemByIdSchema";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  async handle(
    request: FastifyRequest<{ Params: ItemById }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = request.params;
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute({ id });

    return reply.status(204).send();
  }
}
