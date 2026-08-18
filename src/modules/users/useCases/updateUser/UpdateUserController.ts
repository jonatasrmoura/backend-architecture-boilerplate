import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

import { type ItemById } from "@shared/common/itemByIdSchema";
import type { IUpdateUserDTO } from "@modules/users/DTOs";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(
    request: FastifyRequest<{
      Params: ItemById;
      Body: IUpdateUserDTO;
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = request.params;
    const { name, email, document, isActive } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute(
      { id },
      { name, email, document, isActive },
    );

    return reply.status(204).send();
  }
}
