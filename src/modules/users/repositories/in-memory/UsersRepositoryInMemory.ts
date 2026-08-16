import { v7 as uuidV7 } from "uuid";
import type {
  IUser,
  ICreateUserDTO,
  IUpdateUserDTO,
  ISaveUserDTO,
} from "@modules/users/DTOs";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: Array<IUser> = [];

  public async create(createUserDTO: ICreateUserDTO): Promise<void> {
    const newUser: IUser = {
      id: uuidV7(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...createUserDTO,
    };

    this._save(newUser);
  }

  public async update(
    id: string,
    updateUserDTO: IUpdateUserDTO,
  ): Promise<void> {
    const { user, userIndex } = this._getByIndex(id);

    const userUpdated: IUser = {
      ...user,
      name: updateUserDTO?.name ?? user.name,
      document: updateUserDTO?.document ?? user.document,
      email: updateUserDTO?.email ?? user.email,
      updatedAt: new Date(),
    };

    this.users[userIndex] = userUpdated;
  }

  public async delete(id: string): Promise<void> {
    const { user, userIndex } = this._getByIndex(id);

    const userDeleted: IUser = {
      ...user,
      deletedAt: new Date(),
    };

    this.users[userIndex] = userDeleted;
  }

  public async findById(id: string): Promise<IUser> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User with id ${id} does not exist.`);
    }

    return user;
  }

  public async findByEmail(email: string): Promise<IUser> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new Error(`User with email ${email} does not exist.`);
    }

    return user;
  }

  public async findByDocument(document: string): Promise<IUser> {
    const user = this.users.find((user) => user.document === document);

    if (!user) {
      throw new Error(`User with document ${document} does not exist.`);
    }

    return user;
  }

  public async list(): Promise<Array<IUser>> {
    return this.users.filter((user) => user.deletedAt === null);
  }

  private _getByIndex(id: string): { userIndex: number; user: IUser } {
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

  private _save(saveUserDTO: ISaveUserDTO): void {
    this.users.push(saveUserDTO);
  }
}
