import { ICreateRefreshTokenDTO, IRefreshToken } from "@modules/auth/DTOs/";

export interface IRefreshTokenRepository {
  create(data: ICreateRefreshTokenDTO): Promise<IRefreshToken>;
  findById(id: string): Promise<IRefreshToken | null>;
  delete(id: string): Promise<void>;
}
