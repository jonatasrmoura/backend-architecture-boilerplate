import { prisma } from "@shared/infra/prisma/client";

import { IRefreshTokenRepository } from "@modules/auth/repositories/IRefreshTokenRepository";
import type { ICreateRefreshTokenDTO, IRefreshToken } from "@modules/auth/DTOs";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  async create({
    user_id,
    expires_in,
  }: ICreateRefreshTokenDTO): Promise<IRefreshToken> {
    const refreshToken = await prisma.refreshTokens.create({
      data: {
        user_id,
        expires_in,
      },
    });

    return refreshToken;
  }

  async findById(id: string): Promise<IRefreshToken | null> {
    const refreshToken = await prisma.refreshTokens.findUnique({
      where: { id },
    });

    return refreshToken;
  }

  async delete(id: string): Promise<void> {
    await prisma.refreshTokens.delete({
      where: { id },
    });
  }
}
