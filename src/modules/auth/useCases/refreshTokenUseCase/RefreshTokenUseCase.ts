import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";

import { env } from "@config/env";
import { UnauthorizedError } from "@shared/errors/UnauthorizedError";
import type { IRefreshTokenRepository } from "@modules/auth/repositories/IRefreshTokenRepository";

@injectable()
export class RefreshTokenUseCase {
  private issuer: string = "login";
  private audience: string = "users";

  constructor(
    @inject("RefreshTokenRepository")
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(refresh_token_id: string) {
    const refreshTokenExists =
      await this.refreshTokenRepository.findById(refresh_token_id);

    if (!refreshTokenExists) {
      throw new UnauthorizedError("Refresh token does not exist.");
    }

    const user_id = refreshTokenExists.user_id;

    const accessToken = jwt.sign(
      {
        id: user_id,
      },
      env.JWT_SECRET,
      {
        subject: user_id,
        expiresIn: "15m",
        issuer: this.issuer,
        audience: this.audience,
      },
    );

    const newRefreshToken = await this.refreshTokenRepository.create({
      user_id,
      expires_in: 7,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken.id,
    };
  }
}
