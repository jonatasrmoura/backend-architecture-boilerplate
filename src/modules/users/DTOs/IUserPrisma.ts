export interface IUserPrisma {
  id: string;
  name: string;
  isActive: boolean;
  document: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
