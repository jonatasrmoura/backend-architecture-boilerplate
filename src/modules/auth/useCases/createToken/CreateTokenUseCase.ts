import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import type { ICreateTokenDTO } from "@modules/auth/DTOs/ICreateTokenDTO";
import type { IAccessTokenDTO } from "@modules/auth/DTOs/IAccessTokenDTO";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ConflictError } from "@shared/errors/ConflictError";
import { env } from "@config/env";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class CreateTokenUseCase {
  private issuer: string = "login";
  private audience: string = "users";

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: ICreateTokenDTO): Promise<IAccessTokenDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || user.deletedAt) {
      throw new NotFoundError("User not found.");
    }

    if (!user.isActive) {
      throw new AppError("User not actived.");
    }

    const passwordMatch = await compare(password, String(user.password));

    if (!passwordMatch) {
      throw new ConflictError("Email or Password incorrect!");
    }

    const accessToken = sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7 days",
        subject: String(user.id),
        issuer: this.issuer,
        audience: this.audience,
      },
    );

    return <IAccessTokenDTO>{
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
