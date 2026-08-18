export interface IReadUserDTO {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  document: string;
  createdAt: Date;
  deletedAt: Date;
  password: string;
}
