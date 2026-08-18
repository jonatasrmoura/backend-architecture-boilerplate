import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import {
  type PaginationQuery,
  paginationQuerySchema,
} from "@shared/common/paginationQuerySchema";
import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { limit, page } = paginationQuerySchema.parse(
      request.params,
    ) as PaginationQuery;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const { data, total } = await listUsersUseCase.execute({ limit, page });

    return reply.status(200).send({ data, total });
  }
}
