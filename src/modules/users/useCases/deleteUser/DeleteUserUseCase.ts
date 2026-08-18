import { injectable, inject } from "tsyringe";

import type { ItemById } from "@shared/common/itemByIdSchema";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: ItemById): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundError("User not found!");
    }

    await this.usersRepository.delete(id);
  }
}
