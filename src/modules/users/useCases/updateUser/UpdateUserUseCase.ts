import { inject, injectable } from "tsyringe";

import type { IUpdateUserDTO } from "@modules/users/DTOs";
import type { ItemById } from "@shared/common/itemByIdSchema";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ConflictError } from "@shared/errors/ConflictError"; // Se tiver essa classe de erro

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(
    { id }: ItemById,
    { name, email, document, isActive }: IUpdateUserDTO,
  ): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundError("User not found!");
    }

    // Verifica se o novo e-mail ou documento já pertencem a OUTRO usuário
    if (email && email !== userExists.email) {
      const emailAlreadyInUse = await this.usersRepository.findByEmail(email);
      if (emailAlreadyInUse) {
        throw new ConflictError("User with this email already exists");
      }
    }

    if (document && document !== userExists.document) {
      const documentAlreadyInUse =
        await this.usersRepository.findByDocument(document);
      if (documentAlreadyInUse) {
        throw new ConflictError("User with this document already exists");
      }
    }

    await this.usersRepository.update(id, {
      name,
      document,
      email,
      isActive,
    });
  }
}
