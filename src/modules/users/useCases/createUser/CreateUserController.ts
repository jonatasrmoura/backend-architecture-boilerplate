import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

import type { ICreateUserDTO } from "@modules/users/DTOs";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { createUserSchema } from "./createUserValidation";

export class CreateUserController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { name, email, document, password } = createUserSchema.parse(
      request.body,
    ) as ICreateUserDTO;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      document,
      password,
    });

    return reply.status(201).send();
  }
}
