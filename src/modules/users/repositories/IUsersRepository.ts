import { ICreateUserDTO, IUser, IUpdateUserDTO } from "../DTOs";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(id: string, data: IUpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findByDocument(document: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  list(): Promise<Array<IUser>>;
}
