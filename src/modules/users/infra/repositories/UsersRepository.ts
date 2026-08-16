import { ICreateUserDTO, IUpdateUserDTO, IUser } from "../../DTOs";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  public create(data: ICreateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public update(id: string, data: IUpdateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public findByDocument(document: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  public findByEmail(email: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  public findById(id: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  public list(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
}
