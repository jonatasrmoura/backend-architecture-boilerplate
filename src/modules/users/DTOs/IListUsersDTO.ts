import { IReadUserDTO } from "./IReadUserDTO";

export interface IListUsersDTO {
  data: Array<IReadUserDTO>;
  total: number;
}
