import { v7 as uuidV7 } from "uuid";
import type {
  IReadUserDTO,
  IListUsersDTO,
  ICreateUserDTO,
  IUpdateUserDTO,
  IUserPrisma,
} from "@modules/users/DTOs";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: Array<IUserPrisma> = [];

  public async create(createUserDTO: ICreateUserDTO): Promise<void> {
    const newUser: IUserPrisma = {
      id: uuidV7(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      isActive: true,
      ...createUserDTO,
    };

    this._save(newUser);
  }

  public async update(
    id: string,
    updateUserDTO: IUpdateUserDTO,
  ): Promise<void> {
    const { user, userIndex } = this._getByIndex(id);

    const userUpdated: IUserPrisma = {
      ...user,
      name: updateUserDTO?.name ?? user.name,
      document: updateUserDTO?.document ?? user.document,
      email: updateUserDTO?.email ?? user.email,
      isActive: updateUserDTO?.isActive ?? user.isActive,
      updated_at: new Date(),
    };

    this.users[userIndex] = userUpdated;
  }

  public async delete(id: string): Promise<void> {
    const { user, userIndex } = this._getByIndex(id);

    const userDeleted: IUserPrisma = {
      ...user,
      deleted_at: new Date(),
    };

    this.users[userIndex] = userDeleted;
  }

  public async findById(id: string): Promise<IReadUserDTO | null> {
    const response = this.users.find((user) => user.id === id);
    return !response ? null : this._preperUserData(response);
  }

  public async findByEmail(email: string): Promise<IReadUserDTO | null> {
    const response = this.users.find((user) => user.email === email);
    return !response ? null : this._preperUserData(response);
  }

  public async findByDocument(document: string): Promise<IReadUserDTO | null> {
    const response = this.users.find((user) => user.document === document);
    return !response ? null : this._preperUserData(response);
  }

  public async list(): Promise<IListUsersDTO> {
    const response = this.users.filter((user) => user.deleted_at === null);
    return {
      data: response.map((userPrisma) => this._preperUserData(userPrisma)),
      total: response.length,
    };
  }

  private _getByIndex(id: string): { userIndex: number; user: IUserPrisma } {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with id ${id} does not exist.`);
    }

    const user = this.users[userIndex];

    if (!user) {
      throw new Error(`User with id ${id} does not exist.`);
    }

    return { userIndex, user };
  }

  private _save(data: IUserPrisma): void {
    this.users.push(data);
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
