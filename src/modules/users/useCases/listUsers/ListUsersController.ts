import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { type PaginationQuery } from "@shared/common/paginationQuerySchema";
import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  async handle(
    request: FastifyRequest<{ Querystring: PaginationQuery }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { limit, page } = request.query;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const { data, total } = await listUsersUseCase.execute({ limit, page });

    return reply.status(200).send({ data, total });
  }
}
