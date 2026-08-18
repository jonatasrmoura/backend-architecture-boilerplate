import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

import type { ICreateUserDTO } from "@modules/users/DTOs";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(
    request: FastifyRequest<{
      Body: ICreateUserDTO;
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { name, email, document, password } = request.body;

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
