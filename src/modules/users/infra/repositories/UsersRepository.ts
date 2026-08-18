import { prisma } from "@shared/infra/prisma/client";
import type {
  ICreateUserDTO,
  IUpdateUserDTO,
  IReadUserDTO,
  IListUsersDTO,
  IUserPrisma,
} from "@modules/users/DTOs";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  public async create(data: ICreateUserDTO): Promise<void> {
    await prisma.users.create({
      data,
    });
  }

  public async update(id: string, data: IUpdateUserDTO): Promise<void> {
    await prisma.users.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async findByDocument(document: string): Promise<IReadUserDTO | null> {
    const response = await prisma.users.findUnique({ where: { document } });
    const result = this._preperUserData(response);

    return !response ? null : result;
  }

  public async findByEmail(email: string): Promise<IReadUserDTO | null> {
    const response = await prisma.users.findUnique({ where: { email } });
    const result = this._preperUserData(response);

    return !response ? null : result;
  }

  public async findById(id: string): Promise<IReadUserDTO | null> {
    const response = await prisma.users.findUnique({ where: { id } });
    const result = this._preperUserData(response);

    return !response ? null : result;
  }

  public async list(): Promise<IListUsersDTO> {
    throw new Error("Method not implemented.");
  }

  private _preperUserData(userPrimsa: IUserPrisma | null): IReadUserDTO {
    return <IReadUserDTO>{
      id: userPrimsa?.id,
      name: userPrimsa?.name,
      email: userPrimsa?.email,
      isActive: userPrimsa?.isActive,
      document: userPrimsa?.document,
      createdAt: userPrimsa?.created_at,
    };
  }
}
