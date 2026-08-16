import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { ICreateUserDTO } from "@modules/users/DTOs";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    document,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
      throw new Error("User with this email already exists");
    }

    const userDocumentAlreadyExists =
      await this.userRepository.findByDocument(document);

    if (userDocumentAlreadyExists) {
      throw new Error("User with this document already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      document,
      email,
      password: passwordHash,
    });
  }
}
