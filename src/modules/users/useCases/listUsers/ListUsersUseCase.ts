import { inject, injectable } from "tsyringe";

import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { type PaginationQuery } from "@shared/common/paginationQuerySchema";
import type { IListUsersDTO } from "@modules/users/DTOs";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ limit, page }: PaginationQuery): Promise<IListUsersDTO> {
    const { data, total } = await this.usersRepository.listAll({ limit, page });

    const result = data.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return {
      data: result,
      total,
    };
  }
}
