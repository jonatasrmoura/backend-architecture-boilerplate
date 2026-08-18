import { prisma } from "@shared/infra/prisma/client";
import type {
  ICreateUserDTO,
  IUpdateUserDTO,
  IReadUserDTO,
  IListUsersDTO,
  IUserPrisma,
} from "@modules/users/DTOs";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { PaginationQuery } from "@shared/common/paginationQuerySchema";

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

  public async listAll({
    limit,
    page,
  }: PaginationQuery): Promise<IListUsersDTO> {
    const [data, total] = await Promise.all([
      this._list({ limit, page }),
      this._count({ limit, page }),
    ]);

    return { data, total };
  }

  private async _list({
    limit,
    page,
  }: PaginationQuery): Promise<IReadUserDTO[]> {
    const users = await prisma.users.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        created_at: "desc",
      },
    });

    const data = users.map((user) => this._preperUserData(user));

    return data;
  }

  private async _count({ limit, page }: PaginationQuery): Promise<number> {
    return prisma.users.count({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        created_at: "desc",
      },
    });
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
