import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "@modules/users/DTOs";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    document,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userEmailAlreadyExists =
      await this.usersRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
      throw new NotFoundError("User with this email already exists");
    }

    const userDocumentAlreadyExists =
      await this.usersRepository.findByDocument(document);

    if (userDocumentAlreadyExists) {
      throw new NotFoundError("User with this document already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      document,
      email,
      password: passwordHash,
    });
  }
}
