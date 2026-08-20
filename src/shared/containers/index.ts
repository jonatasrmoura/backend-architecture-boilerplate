import { container } from "tsyringe";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";
import { IRefreshTokenRepository } from "@modules/auth/repositories/IRefreshTokenRepository";
import { RefreshTokenRepository } from "@modules/auth/infra/repositories/RefreshTokenRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IRefreshTokenRepository>(
  "RefreshTokenRepository",
  RefreshTokenRepository,
);
