import { injectable, inject } from "tsyringe";

import type { ItemId } from "@shared/common/itemByIdSchema";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import type { IReadUserDTO } from "@modules/users/DTOs";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
export class ReadUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: ItemId): Promise<IReadUserDTO> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundError("User not found!");
    }

    return userExists;
  }
}
