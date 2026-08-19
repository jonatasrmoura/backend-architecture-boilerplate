import { injectable, inject } from "tsyringe";

import type { ItemById } from "@shared/common/itemByIdSchema";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import type { IReadMeAuthDTO } from "../../DTOs/IReadMeAuthDTO";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
export class ReadMeAuthUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ id: userId }: ItemById): Promise<IReadMeAuthDTO> {
    const me = await this.usersRepository.findById(userId);

    if (!me) {
      throw new NotFoundError("User not found!");
    }

    return <IReadMeAuthDTO>{
      id: me.id,
      name: me.name,
      email: me.email,
      document: me.document,
      isActive: me.isActive,
      createdAt: me.createdAt,
    };
  }
}
