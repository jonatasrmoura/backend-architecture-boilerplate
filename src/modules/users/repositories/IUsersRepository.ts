import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IReadUserDTO,
  IListUsersDTO,
  IUserPrisma,
} from "@modules/users/DTOs";
import { PaginationQuery } from "@shared/common/paginationQuerySchema";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(id: string, data: IUpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findByDocument(document: string): Promise<IReadUserDTO | null>;
  findByEmail(email: string): Promise<IReadUserDTO | null>;
  findById(id: string): Promise<IReadUserDTO | null>;
  listAll(query: PaginationQuery): Promise<IListUsersDTO>;
}
